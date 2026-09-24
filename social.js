/* Wettbewerb, Ranglisten und Freunde.
   Talks only to window.FIQH_BACKEND (backend.js, Firebase). Rankings are public,
   playing and scoring need an account with a confirmed e-mail address.

   Data (see backend.js / firestore.rules):
     players/<uid>   public score card { nick, nickKey, g, total, games, comp: { "s1w2": {...} }, at }
     avatars/<uid>   public profile picture { img }
     friendRequests  { from, to, at }  -> accepted: friendships { users: [a, b], at }
     Friends only between two brothers or two sisters, like the chat.                   */
(function () {
  "use strict";
  var APP = window.FIQH_APP;
  var B = window.FIQH_BACKEND;
  if (!APP) return;
  var esc = APP.esc, T = window.T || function (x) { return x; };
  var LOC = window.I18N ? window.I18N.locale : "de-DE";
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- season calendar ----------
     Season 1 starts Monday 21.09.2026, 00:00 German time. A season is 4 weeks. */
  var ANCHOR = Date.UTC(2026, 8, 20, 22, 0, 0);
  var WEEK = 7 * 864e5;
  var WEEKS_PER_SEASON = 4;
  var COMP_QUESTIONS = 15;

  function calendar(now) {
    var w = Math.max(0, Math.floor((now - ANCHOR) / WEEK));
    var season = Math.floor(w / WEEKS_PER_SEASON) + 1;
    var week = w % WEEKS_PER_SEASON + 1;
    var seasonStart = ANCHOR + (season - 1) * WEEKS_PER_SEASON * WEEK;
    return {
      index: w, season: season, week: week, key: weekKey(season, week), theme: themeFor(w),
      weekStart: ANCHOR + w * WEEK, weekEnd: ANCHOR + (w + 1) * WEEK,
      seasonStart: seasonStart, seasonEnd: seasonStart + WEEKS_PER_SEASON * WEEK
    };
  }
  function weekKey(season, week) { return "s" + season + "w" + week; }
  /* Every week has its own Sachgebiet, in turn: Glaube, Reinheit, Gebet, Fasten, Zakāt & Ḥaǧǧ, Alltag, … */
  function themeFor(weekIndex) { var G = APP.GROUPS; return G[weekIndex % G.length]; }
  function day(ms) { return new Date(ms).toLocaleDateString(LOC, { day: "2-digit", month: "2-digit" }); }
  function dayLong(ms) { return new Date(ms).toLocaleDateString(LOC, { weekday: "short", day: "2-digit", month: "2-digit" }); }
  function pts(n) { return Number(n || 0).toLocaleString(LOC); }

  /* Same 15 questions for everyone in a given week: a seeded pick. */
  function seeded(str) {
    var h = 1779033703 ^ str.length;
    for (var i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
    var a = h >>> 0;
    return function () {
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  /* ---------- the two leagues ----------
     Fiqh-Liga: 15 questions from the Sachgebiet of the week (key "s1w2").
     Arabisch-Liga (key "s1w2a"): 10 Vokabeln from the lessons of the week (5 Arabic → German,
     5 German → Arabic), 10 Grammatik from the whole book (one from each tenth, easy to hard),
     10 new Iʿrāb sentences (irabgen.js, patterns in turn) and the Sarf of three verbs from three
     different abwāb, past and present (sarf.js). Every week is thus about equally hard.
     Its points count only in the Arabic rankings, not in the quiz total. */
  var AR_Q = 10, AR_VERBS = 3;
  var AR_CELLS = AR_VERBS * 2 * 14, AR_TOTAL = 3 * AR_Q + AR_CELLS;
  var SARF_CELL = 10, SARF_PERFECT = 50;
  var league = APP.store("league") === "arabisch" ? "arabisch" : "fiqh";
  function arTheme(weekIndex) {
    var A = window.FIQH_ARABIC, ls = A ? A.lessons : [], per = Math.ceil(ls.length / WEEKS_PER_SEASON) || 1;
    var b = weekIndex % WEEKS_PER_SEASON, part = ls.slice(b * per, b * per + per);
    var label = weekIndex >= AR_BALANCED_FROM ? "Vokabeln aus Lektion {a}–{b}" : "Lektionen {a}–{b}";
    return { name: part.length ? T(label, { a: part[0].n, b: part[part.length - 1].n }) : T("Arabisch"), lessons: part, topics: [] };
  }
  var LEAGUES = {
    fiqh: { sfx: "", total: COMP_QUESTIONS, name: T("Fiqh-Liga"), theme: themeFor, what: T("jede Woche ein anderes Sachgebiet, 15 Fragen") },
    arabisch: { sfx: "a", total: AR_TOTAL, name: T("Arabisch-Liga"), theme: arTheme,
      what: T("10 Vokabeln aus den Lektionen der Woche, 10 Grammatikfragen aus dem ganzen Buch, 10 neue Iʿrāb-Sätze und der Sarf von 3 Verben – jede Woche gleich schwer") }
  };
  function LG() { return LEAGUES[league]; }
  function lkey(cal) { return cal.key + LG().sfx; }
  /* The balanced rules apply from the first week on (index 0). */
  var AR_BALANCED_FROM = 0;
  function arVocab(pool, rnd) {
    var keys = [], seen = {};
    APP.shuffle(pool.filter(function (q) { return /^ar-v-/.test(q._lid); }), rnd).forEach(function (q) {
      var k = q._lid.slice(5); if (!seen[k]) { seen[k] = 1; keys.push(k); }
    });
    var byId = {};
    pool.forEach(function (q) { byId[q._lid] = q; });
    var half = AR_Q / 2, out = [];
    keys.forEach(function (k, i) {
      var q = i < half ? byId["ar-v-" + k] : i < AR_Q ? byId["ar-d-" + k] : null;
      if (q) out.push(q);
    });
    return out;
  }
  /* Grammar in book order, cut into AR_Q bands (easy → hard); each week takes one question
     per band, walking through a fixed shuffle of the band, so weeks repeat only after a band is used up. */
  function arGrammar(A, weekIndex) {
    var order = {};
    A.lessons.forEach(function (l, i) { order[l.id] = i; });
    var all = A.questions.filter(function (q) { return /^ar-g-/.test(q._lid); })
      .map(function (q, i) { return { q: q, i: i }; })
      .sort(function (a, b) { return order[a.q.lesson] - order[b.q.lesson] || a.i - b.i; })
      .map(function (x) { return x.q; });
    var out = [];
    for (var b = 0; b < AR_Q; b++) {
      var band = all.slice(Math.floor(b * all.length / AR_Q), Math.floor((b + 1) * all.length / AR_Q));
      if (!band.length) continue;
      band = APP.shuffle(band, seeded("arabisch-liga:gram:" + b));
      out.push(band[weekIndex % band.length]);
    }
    return out;
  }
  function arVerbs(S, rnd) {
    var out = [], babs = {};
    APP.shuffle(S.VERBS, rnd).forEach(function (v) {
      var b = v.bab.p + "/" + v.bab.m;
      if (out.length < AR_VERBS && !babs[b]) { babs[b] = 1; out.push(v); }
    });
    return out;
  }
  function arWeek(cal) {
    var A = window.FIQH_ARABIC, S = window.FIQH_SARF, G = window.FIQH_IRABGEN;
    var theme = arTheme(cal.index), ids = theme.lessons.map(function (l) { return l.id; });
    var rnd = seeded("arabisch-liga:" + cal.key);
    if (cal.index >= AR_BALANCED_FROM) {
      var lessonPool = A.questions.filter(function (q) { return ids.indexOf(q.lesson) !== -1; });
      var list = arVocab(lessonPool, rnd).concat(arGrammar(A, cal.index));
      if (G) list = list.concat(G.make("liga-" + cal.key, AR_Q, null, true).map(function (x) {
        return { t: "arabisch", tt: T("Arabisch-Liga") + " · Iʿrāb", srcText: T("Neuer Satz dieser Woche"), c: 0, q: x.q, ar: x.ar, arMark: x.arMark, a: x.a, e: x.e };
      }));
      var tabs = [];
      if (S) arVerbs(S, rnd).forEach(function (v) { tabs.push(S.table(v.id, "madi"), S.table(v.id, "mudari")); });
      return { theme: theme, questions: list, tables: tabs };
    }
    var pool = A.questions.filter(function (q) { return ids.indexOf(q.lesson) !== -1; });
    function take(re) { return APP.shuffle(pool.filter(function (q) { return re.test(q._lid); }), rnd).slice(0, AR_Q); }
    var qs = take(/^ar-[vd]-/).concat(take(/^ar-g-/));
    if (G) qs = qs.concat(G.make("liga-" + cal.key, AR_Q).map(function (x) {
      return { t: "arabisch", tt: T("Arabisch-Liga") + " · Iʿrāb", srcText: T("Neuer Satz dieser Woche"), c: 0, q: x.q, ar: x.ar, arMark: x.arMark, a: x.a, e: x.e };
    }));
    var verbs = S ? APP.shuffle(S.VERBS, rnd).slice(0, AR_VERBS) : [];
    var tables = [];
    verbs.forEach(function (v) { tables.push(S.table(v.id, "madi"), S.table(v.id, "mudari")); });
    return { theme: theme, questions: qs, tables: tables };
  }
  function weeklyQuestions(cal) {
    var ids = cal.theme.topics.map(function (t) { return t.id; });
    var pool = APP.QUESTIONS.filter(function (q) { return ids.indexOf(q.t) !== -1; });
    return APP.pickQuestions(pool, COMP_QUESTIONS, seeded("fiqh-kompass:" + cal.key));
  }

  /* ---------- state ---------- */
  var authUser = null;        // { uid, email, emailVerified } or null
  var me = null;              // uid when signed in
  var mine = null;            // my own player doc (local truth)
  var players = {};           // uid -> sanitized player doc (everyone)
  var avatars = {};           // uid -> validated data: URL
  var friends = [];           // uids (from friendships, both sides agreed)
  var incoming = [], outgoing = [];   // open friend requests: [{ from|to, at }]
  var legacyFriends = [];     // old one-sided list in users/<uid>, turned into requests once
  var blocked = [];           // uids this player blocked (chat)
  var loaded = false;         // first players snapshot arrived
  var topFilter = APP.store("top") || "season";
  var genderFilter = APP.store("gender") || "all";
  var boardFilter = APP.store("board") || "all";

  function num(v) { v = Number(v); return isFinite(v) && v > 0 ? Math.round(v) : 0; }
  function cleanPlayer(d) {
    d = d || {};
    var comp = {};
    if (d.comp && typeof d.comp === "object") {
      Object.keys(d.comp).forEach(function (k) {
        if (!/^s\d+w[1-4]a?$/.test(k)) return;
        var e = d.comp[k] || {};
        comp[k] = { score: num(e.score), correct: num(e.correct), answered: num(e.answered), done: !!e.done, at: String(e.at || "") };
      });
    }
    return {
      nick: typeof d.nick === "string" ? d.nick.slice(0, 24) : "",
      nickKey: typeof d.nickKey === "string" ? d.nickKey : "",
      g: d.g === "f" ? "f" : d.g === "m" ? "m" : "",
      total: num(d.total), games: num(d.games), comp: comp, at: String(d.at || "")
    };
  }
  function cleanImg(v) {
    return typeof v === "string" && v.length < 60000 && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(v) ? v : "";
  }
  /* sfx "" Fiqh-Liga, "a" Arabisch-Liga, undefined both */
  function compKeys(p, sfx) {
    return Object.keys(p.comp).filter(function (k) { return sfx === undefined || (sfx ? /a$/.test(k) : !/a$/.test(k)); });
  }
  function compTotal(p, sfx) {
    return compKeys(p, sfx).reduce(function (n, k) { return n + p.comp[k].score; }, 0);
  }
  function seasonSum(p, season, sfx) {
    var s = 0, weeks = 0;
    if (sfx === undefined) sfx = LG().sfx;
    for (var w = 1; w <= WEEKS_PER_SEASON; w++) {
      var e = p.comp[weekKey(season, w) + sfx];
      if (e) { s += e.score; weeks++; }
    }
    return { sum: s, weeks: weeks };
  }
  function canPlay() { return !!(mine && authUser && authUser.emailVerified); }

  /* ---------- writes: one at a time, my own doc only ---------- */
  var chain = Promise.resolve();
  var queued = false;
  function save() {
    if (!canPlay()) return Promise.reject(new Error("not allowed"));
    if (queued) return chain;
    queued = true;
    chain = chain.then(function () {
      queued = false;
      mine.at = new Date().toISOString();
      return B.doc("players/" + me).set(JSON.parse(JSON.stringify(mine)));
    }).catch(function (e) {
      queued = false;
      showError(B.message(e));
      throw e;
    });
    return chain;
  }
  function showError(msg) {
    var el = $("#comp-error");
    el.textContent = msg;
    el.hidden = false;
  }

  /* Every finished normal quiz adds to the all-time total. */
  APP.on("finish", function (r) {
    if (!canPlay()) return;
    addGame(r.score);
    save().catch(function () {});
    render();
  });
  function addGame(score) {
    mine.total = num(mine.total) + num(score);
    mine.games = num(mine.games) + 1;
  }

  /* ---------- weekly competition ---------- */
  function startCompetition() {
    if (!authUser) { openAuth("register"); return; }
    if (!canPlay()) { openAuth("verify"); return; }
    if (league === "arabisch") { startArabic(); return; }
    var cal = calendar(Date.now());
    if (mine.comp[cal.key]) return;
    var btn = $("#comp-start");
    btn.disabled = true;
    $("#comp-error").hidden = true;
    var entry = { score: 0, correct: 0, answered: 0, done: false, at: new Date().toISOString() };
    mine.comp[cal.key] = entry;
    // The attempt is recorded before the first question: one try per week.
    save().then(function () {
      btn.disabled = false;
      var counted = 0;
      APP.startQuiz({
        questions: weeklyQuestions(cal),
        rnd: seeded("fiqh-kompass:options:" + cal.key),
        label: T("Wettbewerb") + " · " + T(cal.theme.name),
        onProgress: function (p) {
          entry.score = p.score; entry.correct = p.correct; entry.answered = p.answered;
          save().catch(function () {});
        },
        onFinish: function (p) {
          if (entry.done) return;
          entry.score = p.score; entry.correct = p.correct; entry.answered = p.answered; entry.done = true;
          if (!counted) { counted = 1; addGame(p.score); }
          save().catch(function () {});
          render();
        },
        onLeave: function () {
          APP.renderSetup();
          APP.showView("wettbewerb");
          window.scrollTo(0, 0);
        }
      });
    }, function () {
      delete mine.comp[cal.key];
      btn.disabled = false;
      render();
    });
  }
  $("#comp-start").addEventListener("click", startCompetition);

  /* Arabisch-Liga: first the 30 questions (quiz engine, with time and series bonus),
     then the Sarf tables; every table is saved at once. */
  function startArabic() {
    var cal = calendar(Date.now()), key = cal.key + "a";
    if (mine.comp[key] || !window.FIQH_ARABIC) return;
    var week = arWeek(cal);
    var btn = $("#comp-start");
    btn.disabled = true;
    $("#comp-error").hidden = true;
    var entry = { score: 0, correct: 0, answered: 0, done: false, at: new Date().toISOString() };
    var quiz = { score: 0, correct: 0, answered: 0 }, sarf = { score: 0, correct: 0, answered: 0 };
    function sync() {
      entry.score = quiz.score + sarf.score; entry.correct = quiz.correct + sarf.correct; entry.answered = quiz.answered + sarf.answered;
      save().catch(function () {});
    }
    mine.comp[key] = entry;
    save().then(function () {
      btn.disabled = false;
      var finished = false;
      APP.startQuiz({
        questions: week.questions,
        rnd: seeded("arabisch-liga:options:" + cal.key),
        label: T("Arabisch-Liga") + " · " + week.theme.name,
        nextLabel: week.tables.length ? T("Weiter zum Sarf") : T("Zur Rangliste"),
        onProgress: function (p) { quiz.score = p.score; quiz.correct = p.correct; quiz.answered = p.answered; sync(); },
        onFinish: function (p) {
          quiz.score = p.score; quiz.correct = p.correct; quiz.answered = p.answered;
          finished = p.answered >= p.total;
          if (!finished || !week.tables.length) entry.done = true;
          sync();
          render();
        },
        onLeave: function () {
          if (!finished || !week.tables.length) { APP.renderSetup(); APP.showView("wettbewerb"); window.scrollTo(0, 0); return; }
          window.FIQH_SARF.play({
            tables: week.tables, label: T("Arabisch-Liga") + " · Sarf", tab: "wettbewerb",
            onTable: function (res) {
              var perfect = res.correct === res.total, got = res.correct * SARF_CELL + (perfect ? SARF_PERFECT : 0);
              sarf.score += got; sarf.correct += res.correct; sarf.answered += res.total;
              sync();
              return perfect ? T("+{n} Punkte (mit {b} Bonus)", { n: got, b: SARF_PERFECT }) : T("+{n} Punkte", { n: got });
            },
            onFinish: function () { entry.done = true; sync(); render(); },
            onLeave: function () { APP.renderSetup(); APP.showView("wettbewerb"); window.scrollTo(0, 0); }
          });
        }
      });
    }, function () {
      delete mine.comp[key];
      btn.disabled = false;
      render();
    });
  }
  $all("[data-league]").forEach(function (b) {
    b.addEventListener("click", function () { league = b.getAttribute("data-league"); APP.store("league", league); render(); });
  });

  function openAuth(pane) {
    if (window.FIQH_AUTH) window.FIQH_AUTH.open(pane);
  }

  /* ---------- names & pictures ---------- */
  function playerFor(id) { return id === me && mine ? mine : (players[id] || cleanPlayer({})); }
  function baseName(id) { return playerFor(id).nick; }
  function displayName(id) {
    var n = baseName(id);
    // U+2068/U+2069 isolate the name, so "(du)" stays behind an Arabic name too.
    if (id === me) return n ? "\u2068" + n + "\u2069 " + T("(du)") : T("Du");
    return n || T("Gelöschtes Konto");
  }
  function hue(id) { var h = 0; for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360; return h; }
  var initialsCache = {};
  function avatarOf(id) {
    if (avatars[id]) return avatars[id];
    var ch = (baseName(id) || "?").charAt(0).toUpperCase();
    var k = id + ch;
    if (!initialsCache[k]) {
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="hsl(' + hue(id) + ',40%,40%)"/>' +
        '<text x="32" y="42" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" fill="#fff" text-anchor="middle">' +
        ch.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</text></svg>";
      initialsCache[k] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }
    return initialsCache[k];
  }
  function allIds() {
    var ids = Object.keys(players);
    if (me && ids.indexOf(me) === -1 && mine) ids.push(me);
    return ids;
  }

  /* ---------- rendering ---------- */
  function render() {
    if (!B.available) return;
    var cal = calendar(Date.now());
    var guest = !authUser;
    $("#social-off").hidden = true;
    $("#social-on").hidden = false;
    $("#account").hidden = guest || !mine;
    $("#guest-cta").hidden = !guest;
    $("#verify-note").hidden = guest || authUser.emailVerified;
    $("#friends-panel").hidden = guest;
    $("#board-filter").hidden = guest;
    if (guest && boardFilter === "friends") boardFilter = "all";
    var prev = cal.season > 1 ? leader(cal.season - 1) : null;
    renderComp(cal);
    renderWinner(cal, prev);
    renderTop(cal);
    renderBoard(cal);
    if (!guest) renderFriends(cal);
    if (mine) renderAccount();
    if (window.FIQH_CHAT) window.FIQH_CHAT.refresh();
  }

  function renderComp(cal) {
    var lg = LG(), theme = lg.theme(cal.index);
    $all("[data-league]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-league") === league ? "true" : "false"); });
    $("#comp-eyebrow").textContent = lg.name + " · " + T("Saison {n}", { n: cal.season });
    $("#comp-title").textContent = T("Woche {n} von {m}", { n: cal.week, m: WEEKS_PER_SEASON });
    $("#comp-theme").textContent = T(theme.name);
    $("#comp-theme-topics").textContent = league === "fiqh" ? theme.topics.map(function (t) { return t.title; }).join(" · ")
      : theme.lessons.map(function (l) { return l.title; }).join(" · ");
    $("#comp-sub").textContent = T("Saison {n} läuft vom {a} bis {b}", { n: cal.season, a: day(cal.seasonStart), b: day(cal.seasonEnd - 1) }) +
      " – " + lg.what + ". " + T("Die Summe der vier Wochen entscheidet.");
    updateCountdown();

    var comp = mine ? mine.comp : {};
    $("#comp-weeks").innerHTML = [1, 2, 3, 4].map(function (w) {
      var e = comp[weekKey(cal.season, w) + lg.sfx];
      var start = cal.seasonStart + (w - 1) * WEEK;
      var theme = T(lg.theme(cal.index - cal.week + w).name);
      var cls = w === cal.week ? "now" : w > cal.week ? "future" : "";
      var val, note;
      if (e) { cls += " done"; val = pts(e.score); note = e.done ? T("{n} / {m} richtig", { n: e.correct, m: lg.total }) : T("abgebrochen"); }
      else if (w < cal.week) { val = "–"; note = mine ? T("verpasst") : T("vorbei"); }
      else if (w === cal.week) { val = T("offen"); note = T("bis {d}", { d: dayLong(cal.weekEnd - 1) }); }
      else { val = "–"; note = T("ab {d}", { d: day(start) }); }
      return '<li class="week ' + cls + '"><span>' + T("Woche {n}", { n: w }) + "</span>" + '<em>' + esc(theme) + "</em><b>" + esc(val) + "</b><small>" + esc(note) + "</small></li>";
    }).join("");

    var btn = $("#comp-start");
    var state = $("#comp-state");
    if (!authUser) {
      btn.hidden = false;
      btn.textContent = T("Registrieren und mitspielen");
      state.textContent = T("Mitspielen können alle mit einem kostenlosen Konto.");
      return;
    }
    btn.textContent = league === "fiqh" ? T("Wochenquiz starten") : T("Arabisch-Liga starten");
    if (!mine) { btn.hidden = true; state.textContent = T("Dein Spielerprofil wird geladen …"); return; }
    var e = mine.comp[lkey(cal)];
    btn.hidden = !!e;
    if (!authUser.emailVerified) {
      state.textContent = T("Bestätige zuerst deine E-Mail-Adresse – dann kannst du mitspielen.");
    } else if (!e) {
      state.textContent = league === "fiqh" ? T("Ein Versuch, 15 Fragen, dieselben wie bei allen anderen.")
        : T("Ein Versuch: 30 Fragen, dann 6 Sarf-Tabellen (3 Verben, Vergangenheit und Gegenwart) – für alle dieselben.");
    } else if (e.done) {
      state.innerHTML = T("Diese Woche erledigt: <b>{p} Punkte</b> ({n} / {m} richtig). Nächste Runde ab {d}", { p: pts(e.score), n: e.correct, m: lg.total, d: esc(dayLong(cal.weekEnd)) });
    } else if (APP.isPlaying()) {
      state.textContent = T("Deine Runde läuft gerade.");
    } else {
      state.innerHTML = T("Dein Versuch wurde abgebrochen und zählt mit <b>{p} Punkten</b>. Nächste Runde ab {d}", { p: pts(e.score), d: esc(dayLong(cal.weekEnd)) });
    }
  }

  function updateCountdown() {
    var cal = calendar(Date.now());
    var left = cal.weekEnd - Date.now();
    var d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4);
    $("#comp-countdown").innerHTML = "<small>" + T("Woche endet in") + "</small><b>" + (d ? d + " " + T("T") + " " : "") + h + " " + T("Std") + " " + (d ? "" : m + " " + T("Min")) + "</b>" +
      "<small>" + T("Saisonende {d}", { d: esc(day(cal.seasonEnd - 1)) }) + "</small>";
  }

  function leader(season) {
    var best = null;
    allIds().forEach(function (id) {
      var s = seasonSum(playerFor(id), season);
      if (s.weeks && s.sum > 0 && (!best || s.sum > best.sum)) best = { id: id, sum: s.sum };
    });
    return best;
  }

  function renderWinner(cal, prev) {
    var box = $("#last-winner");
    if (!prev) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = '<img alt="" src="' + esc(avatarOf(prev.id)) + '"><p><small class="eyebrow">' + esc(LG().name) + " · " + T("Gewinner Saison {n}", { n: cal.season - 1 }) +
      "</small><br><strong></strong> mit " + pts(prev.sum) + " Punkten</p>";
    $("strong", box).textContent = prev.id === me ? T("Du hast gewonnen") : displayName(prev.id);
  }

  function row(opts) {
    var li = document.createElement("li");
    li.className = "rank-row" + (opts.me ? " me" : "") + (opts.pos === 1 && opts.score > 0 ? " top" : "");
    li.innerHTML = '<span class="rank-pos">' + opts.pos + '.</span><img alt="" src="' + esc(opts.avatar) + '">' +
      '<span class="rank-name"><strong></strong><small></small></span>' +
      '<span class="rank-pts">' + pts(opts.score) + "<small>" + esc(opts.unit) + "</small></span>" +
      '<span class="row-actions"></span>';
    $("strong", li).textContent = opts.name;
    $("small", li).textContent = opts.sub;
    var actions = (opts.actions || [opts.action]).filter(Boolean);
    var box = $(".row-actions", li);
    if (!actions.length) box.innerHTML = '<span class="icon-spacer"></span>';
    actions.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "icon-btn";
      b.textContent = a.label;
      b.title = a.title;
      b.setAttribute("aria-label", a.title);
      b.addEventListener("click", a.run);
      box.appendChild(b);
    });
    return li;
  }
  /* Chat only between two brothers or two sisters (the server rules enforce it too). */
  function canChat(id) { return !!(mine && players[id] && players[id].g && players[id].g === mine.g && id !== me); }
  function hasIncoming(id) { return incoming.some(function (r) { return r.from === id; }); }
  function hasOutgoing(id) { return outgoing.some(function (r) { return r.to === id; }); }
  function canBefriend(id) { return canChat(id) && friends.indexOf(id) === -1 && blocked.indexOf(id) === -1; }
  function addAction(id) {
    if (!me || !canBefriend(id) || hasOutgoing(id)) return null;
    if (hasIncoming(id)) return { label: "✓", title: T("Freundschaftsanfrage annehmen"), run: function () { acceptFriend(id); } };
    return { label: "+", title: T("Freundschaftsanfrage senden"), run: function () { requestFriend(id); } };
  }
  function gSub(p) { return p.g === "f" ? T("Schwester") : p.g === "m" ? T("Bruder") : ""; }
  function empty(list, text) {
    var li = document.createElement("li");
    li.className = "empty";
    li.textContent = text;
    list.appendChild(li);
  }

  /* ---------- top 10 worldwide ---------- */
  function renderTop(cal) {
    $all("[data-top]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-top") === topFilter ? "true" : "false"); });
    $all("[data-gender]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-gender") === genderFilter ? "true" : "false"); });
    $("#top-title").textContent = LG().name + " · " + (topFilter === "season" ? T("Saison {n} – die besten 10", { n: cal.season }) : T("alle Punkte seit Saison 1"));
    var rows = allIds().map(function (id) {
      var p = playerFor(id);
      var s = topFilter === "season" ? seasonSum(p, cal.season) : { sum: compTotal(p, LG().sfx), weeks: compKeys(p, LG().sfx).length };
      return { id: id, p: p, s: s };
    }).filter(function (r) { return r.s.weeks > 0 && (genderFilter === "all" || r.p.g === genderFilter); });
    rows.sort(function (a, b) { return b.s.sum - a.s.sum; });
    var list = $("#top10");
    list.innerHTML = "";
    var myRank = 0;
    rows.forEach(function (r, i) { if (r.id === me) myRank = i + 1; });
    rows.slice(0, 10).forEach(function (r, i) {
      var weeks = T(r.s.weeks === 1 ? "{n} Woche gespielt" : "{n} Wochen gespielt", { n: r.s.weeks });
      var isFriend = friends.indexOf(r.id) !== -1;
      list.appendChild(row({
        pos: i + 1, me: r.id === me, score: r.s.sum, unit: T("Punkte"),
        name: displayName(r.id), avatar: avatarOf(r.id), sub: [weeks, gSub(r.p), isFriend ? T("Freund") : ""].filter(Boolean).join(" · "),
        action: addAction(r.id)
      }));
    });
    if (!rows.length) empty(list, loaded ? T("Noch keine Wettbewerbspunkte. Wer diese Woche als Erstes spielt, steht ganz oben.") : T("Rangliste wird geladen …"));
    var note = $("#top-me");
    if (!me) note.textContent = rows.length ? T("Registriere dich, um selbst in die Weltrangliste zu kommen.") : "";
    else if (myRank > 10) note.innerHTML = T("Dein Platz: <b>{r}</b> von {n} – {p} Punkte bis zu den Top 10.", { r: myRank, n: rows.length, p: pts(rows[9].s.sum - rows[myRank - 1].s.sum) });
    else if (myRank) note.innerHTML = T("Du bist in den Top 10 – <b>Platz {r}</b>.", { r: myRank });
    else note.textContent = T("Spiel das Wochenquiz, um in die Weltrangliste zu kommen.");
  }
  $all("[data-top]").forEach(function (b) {
    b.addEventListener("click", function () { topFilter = b.getAttribute("data-top"); APP.store("top", topFilter); render(); });
  });
  $all("[data-gender]").forEach(function (b) {
    b.addEventListener("click", function () { genderFilter = b.getAttribute("data-gender"); APP.store("gender", genderFilter); render(); });
  });

  /* ---------- season ranking ---------- */
  function renderBoard(cal) {
    $("#board-title").textContent = LG().name + " · " + T("Saison {n}", { n: cal.season });
    $all("[data-board]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-board") === boardFilter ? "true" : "false"); });
    var ids = allIds();
    if (boardFilter === "friends") ids = ids.filter(function (id) { return id === me || friends.indexOf(id) !== -1; });
    var rows = ids.map(function (id) {
      var p = playerFor(id);
      return { id: id, p: p, s: seasonSum(p, cal.season) };
    }).filter(function (r) { return r.id === me || boardFilter === "friends" || r.s.weeks; });
    rows.sort(function (a, b) { return b.s.sum - a.s.sum || (a.id === me ? -1 : b.id === me ? 1 : 0); });

    var list = $("#board");
    list.innerHTML = "";
    var myPos = 0, lastPos = 0;
    rows.forEach(function (r, i) {
      var pos = i > 0 && rows[i - 1].s.sum === r.s.sum ? lastPos : i + 1;
      lastPos = pos;
      if (r.id === me) myPos = pos;
      var weeks = [1, 2, 3, 4].map(function (w) {
        var e = r.p.comp[weekKey(cal.season, w) + LG().sfx];
        return T("W") + w + " " + (e ? pts(e.score) : "–");
      }).join(" · ");
      list.appendChild(row({
        pos: pos, me: r.id === me, score: r.s.sum, unit: T("Summe"),
        name: displayName(r.id), avatar: avatarOf(r.id), sub: weeks, action: addAction(r.id)
      }));
    });
    if (rows.length < 2) {
      empty(list, boardFilter === "friends"
        ? T("Noch keine Freunde – such rechts nach Spielernamen oder tippe in einer Rangliste auf +.")
        : rows.length ? T("Noch niemand sonst hat in dieser Saison gespielt. Lade deine Freunde ein!") : T("In dieser Saison hat noch niemand gespielt."));
    }

    var note = $("#board-note");
    if (!mine) { note.textContent = ""; return; }
    var mySum = seasonSum(mine, cal.season).sum;
    var ahead = rows.filter(function (r) { return r.s.sum > mySum; });
    if (!mySum && !mine.comp[lkey(cal)]) note.textContent = T("Spiel die Runde dieser Woche, um in die Wertung zu kommen.");
    else if (!ahead.length && rows.length > 1) note.innerHTML = T("<b>Du führst!</b> Halte den Vorsprung bis {d}.", { d: esc(day(cal.seasonEnd - 1)) });
    else if (ahead.length) {
      var next = ahead[ahead.length - 1];
      note.innerHTML = T("Platz <b>{r}</b> – <b>{p} Punkte</b> hinter <b></b>.", { r: myPos, p: pts(next.s.sum - mySum) });
      $all("b", note)[2].textContent = displayName(next.id);
    } else note.innerHTML = T("Platz <b>1</b> – noch ohne Konkurrenz.");
  }
  $all("[data-board]").forEach(function (b) {
    b.addEventListener("click", function () { boardFilter = b.getAttribute("data-board"); APP.store("board", boardFilter); render(); });
  });

  /* ---------- friends ---------- */
  function renderFriends(cal) {
    var ids = (mine ? [me] : []).concat(friends);
    var rows = ids.map(function (id) { return { id: id, p: playerFor(id) }; });
    rows.sort(function (a, b) { return b.p.total - a.p.total; });
    var list = $("#friend-board");
    list.innerHTML = "";
    rows.forEach(function (r, i) {
      var e = r.p.comp[cal.key];
      var sub = T(r.p.games === 1 ? "{n} Quiz" : "{n} Quizze", { n: r.p.games }) + " · " + T("diese Woche") + " " + (e ? pts(e.score) : "–");
      list.appendChild(row({
        pos: i + 1, me: r.id === me, score: r.p.total, unit: T("Punkte"),
        name: displayName(r.id), avatar: avatarOf(r.id), sub: sub,
        actions: r.id === me ? [] : [
          canChat(r.id) ? { label: "✉", title: T("Nachricht schreiben"), run: function () { if (window.FIQH_CHAT) window.FIQH_CHAT.openWith(r.id); } } : null,
          { label: "×", title: T("Freundschaft beenden"), run: function () { removeFriend(r.id); } }
        ]
      }));
    });
    if (!friends.length) empty(list, T("Noch keine Freunde. Such unten nach Spielernamen und schick eine Freundschaftsanfrage."));
    renderRequests();
  }

  /* Open requests: received ones to accept or decline, sent ones to withdraw. */
  function renderRequests() {
    var box = $("#friend-requests");
    box.innerHTML = "";
    box.hidden = !incoming.length && !outgoing.length;
    function item(id, text, buttons) {
      var li = document.createElement("li");
      li.className = "req";
      li.innerHTML = '<img alt=""><span class="req-name"><strong></strong><small></small></span><span class="req-actions"></span>';
      $("img", li).src = avatarOf(id);
      $("strong", li).textContent = displayName(id);
      $("small", li).textContent = text;
      buttons.forEach(function (b) {
        var el = document.createElement("button");
        el.type = "button";
        el.className = b.primary ? "btn btn-primary btn-sm" : "btn btn-sm";
        el.textContent = b.label;
        el.addEventListener("click", function () { el.disabled = true; b.run(); });
        $(".req-actions", li).appendChild(el);
      });
      return li;
    }
    function list(title, items) {
      if (!items.length) return;
      var h = document.createElement("p");
      h.className = "step-label";
      h.textContent = title;
      var ul = document.createElement("ul");
      ul.className = "req-list";
      items.forEach(function (li) { ul.appendChild(li); });
      box.appendChild(h);
      box.appendChild(ul);
    }
    list(T("Freundschaftsanfragen ({n})", { n: incoming.length }), incoming.map(function (r) {
      return item(r.from, T("möchte mit dir befreundet sein"), [
        { label: T("Annehmen"), primary: true, run: function () { acceptFriend(r.from); } },
        { label: T("Ablehnen"), run: function () { declineFriend(r.from); } }
      ]);
    }));
    list(T("Gesendet – wartet auf Antwort"), outgoing.map(function (r) {
      return item(r.to, T("Anfrage gesendet"), [{ label: T("Zurückziehen"), run: function () { cancelFriend(r.to); } }]);
    }));
  }
  function updateBadge() {
    var badge = $("#friend-badge");
    if (!badge) return;
    badge.hidden = !incoming.length;
    badge.textContent = incoming.length > 9 ? "9+" : String(incoming.length);
    badge.setAttribute("aria-label", T("{n} Freundschaftsanfragen", { n: incoming.length }));
  }
  function friendOp(p, done) {
    return p.then(function () { if (done) done(); }, function (e) { showError(B.message(e)); render(); });
  }
  function afterChange() { render(); runSearch($("#friend-q").value.trim()); }
  function requestFriend(id) {
    if (!canPlay()) { showError(T("Bestätige zuerst deine E-Mail-Adresse – dann kannst du Freundschaftsanfragen senden.")); return; }
    if (hasIncoming(id)) { acceptFriend(id); return; }
    if (!canBefriend(id) || hasOutgoing(id)) return;
    outgoing.push({ to: id, at: Date.now() });   // shown at once, the snapshot confirms it
    afterChange();
    friendOp(B.sendFriendRequest(id));
  }
  function acceptFriend(id) {
    if (!canPlay()) { showError(T("Bestätige zuerst deine E-Mail-Adresse – dann kannst du Anfragen annehmen.")); return; }
    var alsoMine = hasOutgoing(id);
    incoming = incoming.filter(function (r) { return r.from !== id; });
    outgoing = outgoing.filter(function (r) { return r.to !== id; });
    if (friends.indexOf(id) === -1) friends.push(id);
    updateBadge(); afterChange();
    friendOp(B.acceptFriendRequest(id, alsoMine));
  }
  function declineFriend(id) {
    incoming = incoming.filter(function (r) { return r.from !== id; });
    updateBadge(); afterChange();
    friendOp(B.declineFriendRequest(id));
  }
  function cancelFriend(id) {
    outgoing = outgoing.filter(function (r) { return r.to !== id; });
    afterChange();
    friendOp(B.cancelFriendRequest(id));
  }
  function removeFriend(id) {
    friends = friends.filter(function (f) { return f !== id; });
    afterChange();
    friendOp(B.removeFriend(id));
  }

  /* Search by player name among everyone who has an account. */
  function runSearch(q) {
    var box = $("#friend-hits");
    box.innerHTML = "";
    if (!q || !me) return;
    var lq = B.nameKey(q);   // also finds "أحمد" when typing "احمد"
    // only brothers find brothers and sisters find sisters (like the chat)
    var hits = Object.keys(players).filter(function (id) {
      return id !== me && canChat(id) && players[id].nick && B.nameKey(players[id].nick).indexOf(lq) !== -1;
    }).sort(function (a, b) {
      return (B.nameKey(players[a].nick).indexOf(lq) === 0 ? 0 : 1) - (B.nameKey(players[b].nick).indexOf(lq) === 0 ? 0 : 1) ||
        players[a].nick.localeCompare(players[b].nick);
    }).slice(0, 8);
    if (!hits.length) { box.innerHTML = '<li class="note">' + T("Kein Spieler mit diesem Namen gefunden.") + "</li>"; return; }
    hits.forEach(function (id) {
      var li = document.createElement("li");
      li.className = "hit";
      li.innerHTML = '<img alt=""><span></span>';
      $("img", li).src = avatarOf(id);
      $("span", li).textContent = players[id].nick;
      var label = null, run = null;
      if (friends.indexOf(id) !== -1) label = T("Freund");
      else if (blocked.indexOf(id) !== -1) label = T("blockiert");
      else if (hasIncoming(id)) { label = T("Annehmen"); run = function () { acceptFriend(id); }; }
      else if (hasOutgoing(id)) { label = T("Angefragt · zurückziehen"); run = function () { cancelFriend(id); }; }
      else { label = T("Anfrage senden"); run = function () { requestFriend(id); }; }
      var el = document.createElement(run ? "button" : "small");
      el.textContent = label;
      if (run) { el.type = "button"; el.className = "linkish"; el.addEventListener("click", run); }
      else el.className = "chip-count";
      li.appendChild(el);
      box.appendChild(li);
    });
  }
  $("#friend-q").addEventListener("input", function (e) { runSearch(e.target.value.trim()); });

  /* ---------- own profile: player name and picture ---------- */
  var draftImg = null;   // null = unchanged, "" = remove, data URL = new picture
  function renderAccount() {
    var editing = !$("#acc-form").hidden;
    $("#acc-avatar").src = avatarOf(me);
    $("#acc-name").textContent = mine.nick || T("Spieler");
    $("#acc-stats").textContent = T("{p} Punkte", { p: pts(mine.total) }) + " · " + T(mine.games === 1 ? "{n} Quiz" : "{n} Quizze", { n: mine.games }) +
      " · " + T("{p} im Wettbewerb", { p: pts(compTotal(mine)) });
    if (!editing) $("#acc-preview").src = avatarOf(me);
  }
  function accMsg(text, kind) {
    var m = $("#acc-msg");
    m.textContent = text;
    m.className = "acc-msg" + (kind ? " " + kind : "");
  }
  function openAccount(open) {
    if (open && !canPlay()) { openAuth("verify"); return; }
    $("#acc-form").hidden = !open;
    $("#acc-edit").setAttribute("aria-expanded", open ? "true" : "false");
    $("#acc-edit").hidden = open;
    draftImg = null;
    accMsg("");
    if (open) {
      $("#acc-nick-hint").textContent = mine.g === "f"
        ? T("Als Schwester spielst du mit einer Kunya: Umm …, Bint …, أم …, بنت …, Mutter von … oder Tochter von …. Jeden Namen gibt es nur einmal.")
        : T("3–24 Zeichen, lateinisch oder arabisch, jeden Namen gibt es nur einmal.");
      $("#acc-nick").value = mine.nick || "";
      $("#acc-preview").src = avatarOf(me);
      $("#acc-nick").focus();
    }
  }
  $("#acc-edit").addEventListener("click", function () { openAccount(true); });
  $("#acc-cancel").addEventListener("click", function () { openAccount(false); });
  $("#acc-clear").addEventListener("click", function () {
    draftImg = "";
    var keep = avatars[me];
    delete avatars[me];
    $("#acc-preview").src = avatarOf(me);
    if (keep) avatars[me] = keep;
    accMsg(T("Bild wird beim Speichern entfernt."));
  });
  $("#acc-file").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\//.test(file.type)) { accMsg(T("Bitte eine Bilddatei wählen."), "bad"); return; }
    if (file.size > 15 * 1024 * 1024) { accMsg(T("Das Bild ist zu groß (max. 15 MB)."), "bad"); return; }
    accMsg(T("Bild wird vorbereitet …"));
    shrink(file).then(function (url) {
      draftImg = url;
      $("#acc-preview").src = url;
      accMsg(T("Vorschau – mit „Speichern“ übernehmen."));
    }, function () { accMsg(T("Das Bild konnte nicht gelesen werden."), "bad"); });
  });
  /* Square center crop, 128 x 128 JPEG: a few KB, fits easily in one document. */
  function shrink(file) {
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () {
        var size = 128, side = Math.min(img.naturalWidth, img.naturalHeight);
        var c = document.createElement("canvas");
        c.width = c.height = size;
        var ctx = c.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
        URL.revokeObjectURL(url);
        var out = c.toDataURL("image/jpeg", 0.82);
        cleanImg(out) ? resolve(out) : reject(new Error("bad image"));
      };
      img.onerror = function () { URL.revokeObjectURL(url); reject(new Error("load")); };
      img.src = url;
    });
  }
  /* Live check of the new player name. */
  var nameTimer = null;
  $("#acc-nick").addEventListener("input", function (e) {
    clearTimeout(nameTimer);
    var v = e.target.value.trim();
    if (!v || B.nameKey(v) === mine.nickKey) { accMsg(""); return; }
    var err = B.checkName(v, mine.g);
    if (err) { accMsg(err, "bad"); return; }
    nameTimer = setTimeout(function () {
      B.nameAvailable(v).then(function (free) {
        if ($("#acc-nick").value.trim() !== v) return;
        accMsg(free ? T("„{v}“ ist frei.", { v: v }) : T("„{v}“ ist schon vergeben.", { v: v }), free ? "good" : "bad");
      }, function () {});
    }, 350);
  });
  $("#acc-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var nick = $("#acc-nick").value.trim().normalize("NFC");
    var jobs = [];
    if (nick !== mine.nick) {
      var err = B.checkName(nick, mine.g);
      if (err) { accMsg(err, "bad"); return; }
      jobs.push(B.changeName(mine.nickKey, nick, mine.g).then(function () { mine.nick = nick; mine.nickKey = B.nameKey(nick); }));
    }
    if (draftImg !== null) {
      var img = draftImg;
      var ref = B.doc("avatars/" + me);
      jobs.push((img ? ref.set({ img: img }) : ref.delete()).then(function () { if (img) avatars[me] = img; else delete avatars[me]; }));
    }
    if (!jobs.length) { openAccount(false); return; }
    $("#acc-save").disabled = true;
    accMsg(T("Speichere …"));
    Promise.all(jobs).then(function () {
      $("#acc-save").disabled = false;
      openAccount(false);
      render();
    }, function (err) {
      $("#acc-save").disabled = false;
      accMsg(B.message(err), "bad");
      render();
    });
  });
  $("#guest-register").addEventListener("click", function () { openAuth("register"); });
  $("#guest-login").addEventListener("click", function () { openAuth("login"); });
  $("#verify-open").addEventListener("click", function () { openAuth("verify"); });

  /* ---------- boot ---------- */
  function off(title, text) {
    $("#social-off-title").textContent = title;
    $("#social-off-text").textContent = text;
    $("#social-off").hidden = false;
    $("#social-on").hidden = true;
  }

  window.FIQH_SOCIAL = {
    mine: function () { return mine; },
    arWeek: function (i) { return arWeek(calendar(ANCHOR + i * WEEK + 1)); },
    me: function () { return me; },
    canPlay: canPlay,
    canChat: canChat,
    players: function () { return players; },
    name: function (id) { return displayName(id); },
    avatar: function (id) { return avatarOf(id); },
    blocked: function () { return blocked.slice(); },
    setBlocked: function (id, on) {
      blocked = blocked.filter(function (x) { return x !== id; });
      if (on) {
        blocked.push(id);
        /* blocking also ends the friendship and open requests */
        if (friends.indexOf(id) !== -1) removeFriend(id);
        if (hasIncoming(id)) declineFriend(id);
        if (hasOutgoing(id)) cancelFriend(id);
      }
      return B.doc("users/" + me).update({ blocked: blocked.slice(0, 500) });
    },
    render: render
  };

  if (!B || !B.available) {
    off(T("Online-Funktionen noch nicht eingerichtet"),
      B && B.reason === "sdk"
        ? T("Die Verbindung zum Server konnte nicht geladen werden. Prüfe deine Internetverbindung und lade die Seite neu. Nachschlagen und Quiz funktionieren trotzdem.")
        : T("Konten, Ranglisten und der Wochenwettbewerb brauchen einen Server (Firebase). Die Anleitung steht in SETUP.md. Nachschlagen und Quiz funktionieren schon jetzt."));
    return;
  }

  B.collection("players").onSnapshot(function (snap) {
    var next = {};
    snap.docs.forEach(function (d) { if (d.exists) next[d.id] = cleanPlayer(d.data()); });
    players = next;
    loaded = true;
    render();
    migrate();
  }, function () { showError(T("Die Rangliste wird gerade nicht aktualisiert. Lade die Seite neu.")); });
  B.collection("avatars").onSnapshot(function (snap) {
    var next = {};
    snap.docs.forEach(function (d) { var img = d.exists && cleanImg((d.data() || {}).img); if (img) next[d.id] = img; });
    avatars = next;
    render();
  }, function () {});

  var authToken = 0;
  B.onAuth(function (u) {
    var token = ++authToken;
    var sameUser = u && me === u.uid;
    authUser = u;
    if (!u) {
      me = null; mine = null; friends = []; incoming = []; outgoing = []; blocked = []; stopFriends();
      updateBadge(); $("#acc-form").hidden = true; $("#acc-edit").hidden = false; render(); return;
    }
    if (sameUser && mine) { render(); return; }   // e.g. e-mail just confirmed
    me = u.uid;
    mine = null;
    stopFriends();
    friends = []; incoming = []; outgoing = [];
    watchFriends(me);
    render();
    Promise.all([B.doc("players/" + me).get(), B.doc("users/" + me).get()]).then(function (snaps) {
      if (token !== authToken) return;
      mine = snaps[0].exists ? cleanPlayer(snaps[0].data()) : null;
      var f = snaps[1].exists ? snaps[1].data().friends : [];
      legacyFriends = Array.isArray(f) ? f.filter(function (x) { return typeof x === "string" && x !== me; }) : [];
      var bl = snaps[1].exists ? snaps[1].data().blocked : [];
      blocked = Array.isArray(bl) ? bl.filter(function (x) { return typeof x === "string"; }) : [];
      if (!mine) showError(T("Zu deinem Konto gibt es kein Spielerprofil. Melde dich ab und registriere dich neu oder wende dich an die Betreiber."));
      render();
      migrate();
    }, function (e) { showError(B.message(e)); });
  });

  /* ---------- friends and requests from the server ---------- */
  var unwatch = [], requestsLoaded = false;
  function stopFriends() { unwatch.forEach(function (fn) { try { fn(); } catch (e) {} }); unwatch = []; requestsLoaded = false; }
  function watchFriends(uid) {
    unwatch.push(B.watchFriends(uid, function (list) {
      if (uid !== me) return;
      friends = list.filter(function (x) { return typeof x === "string" && x !== me; });
      afterChange();
    }, function () {}));
    unwatch.push(B.watchFriendRequests(uid, function (r) {
      if (uid !== me) return;
      incoming = r.incoming.filter(function (x) { return typeof x.from === "string" && blocked.indexOf(x.from) === -1; });
      outgoing = r.outgoing.filter(function (x) { return typeof x.to === "string"; });
      requestsLoaded = true;
      updateBadge(); afterChange(); migrate();
    }, function () {}));
  }
  /* The old list was one-sided: each old friend now gets a request instead, once. */
  function migrate() {
    if (!legacyFriends.length || !canPlay() || !loaded || !requestsLoaded) return;
    var list = legacyFriends;
    legacyFriends = [];
    list.forEach(function (id) {
      if (friends.indexOf(id) === -1 && !hasOutgoing(id) && canBefriend(id)) {
        if (hasIncoming(id)) acceptFriend(id); else requestFriend(id);
      }
    });
    B.doc("users/" + me).update({ friends: [] }).catch(function () {});
  }

  APP.on("view", function (name) { if (name === "wettbewerb") render(); });
  setInterval(function () {
    var before = calendar(Date.now() - 30000).key;
    if (before !== calendar(Date.now()).key) render(); else updateCountdown();
  }, 30000);
  render();
})();
