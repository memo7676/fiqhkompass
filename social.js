/* Wettbewerb, Ranglisten und Freunde.
   Talks only to window.FIQH_BACKEND (backend.js, Firebase). Rankings are public,
   playing and scoring need an account with a confirmed e-mail address.

   Data (see backend.js / firestore.rules):
     players/<uid>   public score card { nick, nickKey, g, total, games, comp: { "s1w2": {...} }, at }
     avatars/<uid>   public profile picture { img }
     users/<uid>     private { friends: [uid, ...], ... }                                 */
(function () {
  "use strict";
  var APP = window.FIQH_APP;
  var B = window.FIQH_BACKEND;
  if (!APP) return;
  var esc = APP.esc;
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
  function day(ms) { return new Date(ms).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" }); }
  function dayLong(ms) { return new Date(ms).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" }); }
  function pts(n) { return Number(n || 0).toLocaleString("de-DE"); }

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
  var friends = [];           // uids
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
        if (!/^s\d+w[1-4]$/.test(k)) return;
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
  function compTotal(p) {
    return Object.keys(p.comp).reduce(function (n, k) { return n + p.comp[k].score; }, 0);
  }
  function seasonSum(p, season) {
    var s = 0, weeks = 0;
    for (var w = 1; w <= WEEKS_PER_SEASON; w++) {
      var e = p.comp[weekKey(season, w)];
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
  function saveFriends() {
    if (!me) return;
    B.doc("users/" + me).update({ friends: friends.slice(0, 200) }).catch(function (e) { showError(B.message(e)); });
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
        label: "Wettbewerb · " + cal.theme.name,
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

  function openAuth(pane) {
    if (window.FIQH_AUTH) window.FIQH_AUTH.open(pane);
  }

  /* ---------- names & pictures ---------- */
  function playerFor(id) { return id === me && mine ? mine : (players[id] || cleanPlayer({})); }
  function baseName(id) { return playerFor(id).nick; }
  function displayName(id) {
    var n = baseName(id);
    if (id === me) return n ? n + " (du)" : "Du";
    return n || "Gelöschtes Konto";
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
    $("#comp-eyebrow").textContent = "Wochenwettbewerb · Saison " + cal.season;
    $("#comp-title").textContent = "Woche " + cal.week + " von " + WEEKS_PER_SEASON;
    $("#comp-theme").textContent = cal.theme.name;
    $("#comp-theme-topics").textContent = cal.theme.topics.map(function (t) { return t.title; }).join(" · ");
    $("#comp-sub").textContent = "Saison " + cal.season + " läuft vom " + day(cal.seasonStart) + " bis " +
      day(cal.seasonEnd - 1) + ". Jede Woche ein anderes Sachgebiet, 15 Fragen – die Summe der vier Wochen entscheidet.";
    updateCountdown();

    var comp = mine ? mine.comp : {};
    $("#comp-weeks").innerHTML = [1, 2, 3, 4].map(function (w) {
      var e = comp[weekKey(cal.season, w)];
      var start = cal.seasonStart + (w - 1) * WEEK;
      var theme = themeFor(cal.index - cal.week + w).name;
      var cls = w === cal.week ? "now" : w > cal.week ? "future" : "";
      var val, note;
      if (e) { cls += " done"; val = pts(e.score); note = e.done ? e.correct + " / 15 richtig" : "abgebrochen"; }
      else if (w < cal.week) { val = "–"; note = mine ? "verpasst" : "vorbei"; }
      else if (w === cal.week) { val = "offen"; note = "bis " + dayLong(cal.weekEnd - 1); }
      else { val = "–"; note = "ab " + day(start); }
      return '<li class="week ' + cls + '"><span>Woche ' + w + '</span><em>' + esc(theme) + "</em><b>" + esc(val) + "</b><small>" + esc(note) + "</small></li>";
    }).join("");

    var btn = $("#comp-start");
    var state = $("#comp-state");
    if (!authUser) {
      btn.hidden = false;
      btn.textContent = "Registrieren und mitspielen";
      state.textContent = "Mitspielen können alle mit einem kostenlosen Konto.";
      return;
    }
    btn.textContent = "Wochenquiz starten";
    if (!mine) { btn.hidden = true; state.textContent = "Dein Spielerprofil wird geladen …"; return; }
    var e = mine.comp[cal.key];
    btn.hidden = !!e;
    if (!authUser.emailVerified) {
      state.textContent = "Bestätige zuerst deine E-Mail-Adresse – dann kannst du mitspielen.";
    } else if (!e) {
      state.textContent = "Ein Versuch, 15 Fragen, dieselben wie bei allen anderen.";
    } else if (e.done) {
      state.innerHTML = "Diese Woche erledigt: <b>" + pts(e.score) + " Punkte</b> (" + e.correct + " / 15 richtig). Nächstes Wochenquiz ab " + esc(dayLong(cal.weekEnd));
    } else if (APP.isPlaying()) {
      state.textContent = "Dein Wochenquiz läuft gerade.";
    } else {
      state.innerHTML = "Dein Versuch wurde abgebrochen und zählt mit <b>" + pts(e.score) + " Punkten</b>. Nächstes Wochenquiz ab " + esc(dayLong(cal.weekEnd));
    }
  }

  function updateCountdown() {
    var cal = calendar(Date.now());
    var left = cal.weekEnd - Date.now();
    var d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4);
    $("#comp-countdown").innerHTML = "<small>Woche endet in</small><b>" + (d ? d + " T " : "") + h + " Std " + (d ? "" : m + " Min") + "</b>" +
      "<small>Saisonende " + esc(day(cal.seasonEnd - 1)) + "</small>";
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
    box.innerHTML = '<img alt="" src="' + esc(avatarOf(prev.id)) + '"><p><small class="eyebrow">Gewinner Saison ' + (cal.season - 1) +
      "</small><br><strong></strong> mit " + pts(prev.sum) + " Punkten</p>";
    $("strong", box).textContent = prev.id === me ? "Du hast gewonnen" : displayName(prev.id);
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
  function addAction(id) {
    if (!me || id === me || friends.indexOf(id) !== -1) return null;
    return { label: "+", title: "Als Freund hinzufügen", run: function () { addFriend(id); } };
  }
  function gSub(p) { return p.g === "f" ? "Schwester" : p.g === "m" ? "Bruder" : ""; }
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
    $("#top-title").textContent = topFilter === "season" ? "Saison " + cal.season + " – die besten 10" : "Alle Wettbewerbspunkte seit Saison 1";
    var rows = allIds().map(function (id) {
      var p = playerFor(id);
      var s = topFilter === "season" ? seasonSum(p, cal.season) : { sum: compTotal(p), weeks: Object.keys(p.comp).length };
      return { id: id, p: p, s: s };
    }).filter(function (r) { return r.s.weeks > 0 && (genderFilter === "all" || r.p.g === genderFilter); });
    rows.sort(function (a, b) { return b.s.sum - a.s.sum; });
    var list = $("#top10");
    list.innerHTML = "";
    var myRank = 0;
    rows.forEach(function (r, i) { if (r.id === me) myRank = i + 1; });
    rows.slice(0, 10).forEach(function (r, i) {
      var weeks = r.s.weeks + (r.s.weeks === 1 ? " Woche" : " Wochen") + " gespielt";
      var isFriend = friends.indexOf(r.id) !== -1;
      list.appendChild(row({
        pos: i + 1, me: r.id === me, score: r.s.sum, unit: "Punkte",
        name: displayName(r.id), avatar: avatarOf(r.id), sub: [weeks, gSub(r.p), isFriend ? "Freund" : ""].filter(Boolean).join(" · "),
        action: addAction(r.id)
      }));
    });
    if (!rows.length) empty(list, loaded ? "Noch keine Wettbewerbspunkte. Wer diese Woche als Erstes spielt, steht ganz oben." : "Rangliste wird geladen …");
    var note = $("#top-me");
    if (!me) note.textContent = rows.length ? "Registriere dich, um selbst in die Weltrangliste zu kommen." : "";
    else if (myRank > 10) note.innerHTML = "Dein Platz: <b>" + myRank + "</b> von " + rows.length + " – " + pts(rows[9].s.sum - rows[myRank - 1].s.sum) + " Punkte bis zu den Top 10.";
    else if (myRank) note.innerHTML = "Du bist in den Top 10 – <b>Platz " + myRank + "</b>.";
    else note.textContent = "Spiel das Wochenquiz, um in die Weltrangliste zu kommen.";
  }
  $all("[data-top]").forEach(function (b) {
    b.addEventListener("click", function () { topFilter = b.getAttribute("data-top"); APP.store("top", topFilter); render(); });
  });
  $all("[data-gender]").forEach(function (b) {
    b.addEventListener("click", function () { genderFilter = b.getAttribute("data-gender"); APP.store("gender", genderFilter); render(); });
  });

  /* ---------- season ranking ---------- */
  function renderBoard(cal) {
    $("#board-title").textContent = "Saison " + cal.season;
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
        var e = r.p.comp[weekKey(cal.season, w)];
        return "W" + w + " " + (e ? pts(e.score) : "–");
      }).join(" · ");
      list.appendChild(row({
        pos: pos, me: r.id === me, score: r.s.sum, unit: "Summe",
        name: displayName(r.id), avatar: avatarOf(r.id), sub: weeks, action: addAction(r.id)
      }));
    });
    if (rows.length < 2) {
      empty(list, boardFilter === "friends"
        ? "Noch keine Freunde – such rechts nach Spielernamen oder tippe in einer Rangliste auf +."
        : rows.length ? "Noch niemand sonst hat in dieser Saison gespielt. Lade deine Freunde ein!" : "In dieser Saison hat noch niemand gespielt.");
    }

    var note = $("#board-note");
    if (!mine) { note.textContent = ""; return; }
    var mySum = seasonSum(mine, cal.season).sum;
    var ahead = rows.filter(function (r) { return r.s.sum > mySum; });
    if (!mySum && !mine.comp[cal.key]) note.textContent = "Spiel das Wochenquiz, um in die Wertung zu kommen.";
    else if (!ahead.length && rows.length > 1) note.innerHTML = "<b>Du führst!</b> Halte den Vorsprung bis " + esc(day(cal.seasonEnd - 1)) + ".";
    else if (ahead.length) {
      var next = ahead[ahead.length - 1];
      note.innerHTML = "Platz <b>" + myPos + "</b> – <b>" + pts(next.s.sum - mySum) + " Punkte</b> hinter <b></b>.";
      $all("b", note)[2].textContent = displayName(next.id);
    } else note.innerHTML = "Platz <b>1</b> – noch ohne Konkurrenz.";
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
      var sub = r.p.games + (r.p.games === 1 ? " Quiz" : " Quizze") + " · diese Woche " + (e ? pts(e.score) : "–");
      list.appendChild(row({
        pos: i + 1, me: r.id === me, score: r.p.total, unit: "Punkte",
        name: displayName(r.id), avatar: avatarOf(r.id), sub: sub,
        actions: r.id === me ? [] : [
          canChat(r.id) ? { label: "✉", title: "Nachricht schreiben", run: function () { if (window.FIQH_CHAT) window.FIQH_CHAT.openWith(r.id); } } : null,
          { label: "×", title: "Aus Freunden entfernen", run: function () { removeFriend(r.id); } }
        ]
      }));
    });
    if (!friends.length) empty(list, "Noch keine Freunde. Such unten nach Spielernamen oder tippe in einer Rangliste auf +.");
  }
  function addFriend(id) {
    if (!me || id === me || friends.indexOf(id) !== -1) return;
    friends.push(id);
    saveFriends();
    render();
    runSearch($("#friend-q").value.trim());
  }
  function removeFriend(id) {
    friends = friends.filter(function (f) { return f !== id; });
    saveFriends();
    render();
  }

  /* Search by player name among everyone who has an account. */
  function runSearch(q) {
    var box = $("#friend-hits");
    box.innerHTML = "";
    if (!q || !me) return;
    var lq = q.toLowerCase();
    var hits = Object.keys(players).filter(function (id) {
      return id !== me && players[id].nick && players[id].nick.toLowerCase().indexOf(lq) !== -1;
    }).sort(function (a, b) {
      return (players[a].nick.toLowerCase().indexOf(lq) === 0 ? 0 : 1) - (players[b].nick.toLowerCase().indexOf(lq) === 0 ? 0 : 1) ||
        players[a].nick.localeCompare(players[b].nick);
    }).slice(0, 8);
    if (!hits.length) { box.innerHTML = '<li class="note">Kein Spieler mit diesem Namen gefunden.</li>'; return; }
    hits.forEach(function (id) {
      var li = document.createElement("li");
      li.className = "hit";
      li.innerHTML = '<img alt=""><span></span>';
      $("img", li).src = avatarOf(id);
      $("span", li).textContent = players[id].nick;
      if (friends.indexOf(id) !== -1) {
        var s = document.createElement("small");
        s.className = "chip-count";
        s.textContent = "Freund";
        li.appendChild(s);
      } else {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "linkish";
        b.textContent = "Hinzufügen";
        b.addEventListener("click", function () { addFriend(id); });
        li.appendChild(b);
      }
      box.appendChild(li);
    });
  }
  $("#friend-q").addEventListener("input", function (e) { runSearch(e.target.value.trim()); });

  /* ---------- own profile: player name and picture ---------- */
  var draftImg = null;   // null = unchanged, "" = remove, data URL = new picture
  function renderAccount() {
    var editing = !$("#acc-form").hidden;
    $("#acc-avatar").src = avatarOf(me);
    $("#acc-name").textContent = mine.nick || "Spieler";
    $("#acc-stats").textContent = pts(mine.total) + " Punkte · " + mine.games + (mine.games === 1 ? " Quiz" : " Quizze") +
      " · " + pts(compTotal(mine)) + " im Wettbewerb";
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
        ? "Als Schwester spielst du mit einer Kunya: Umm …, Bint …, Mutter von … oder Tochter von …. Jeden Namen gibt es nur einmal."
        : "3–24 Zeichen, jeden Namen gibt es nur einmal.";
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
    accMsg("Bild wird beim Speichern entfernt.");
  });
  $("#acc-file").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\//.test(file.type)) { accMsg("Bitte eine Bilddatei wählen.", "bad"); return; }
    if (file.size > 15 * 1024 * 1024) { accMsg("Das Bild ist zu groß (max. 15 MB).", "bad"); return; }
    accMsg("Bild wird vorbereitet …");
    shrink(file).then(function (url) {
      draftImg = url;
      $("#acc-preview").src = url;
      accMsg("Vorschau – mit „Speichern“ übernehmen.");
    }, function () { accMsg("Das Bild konnte nicht gelesen werden.", "bad"); });
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
        accMsg(free ? "„" + v + "“ ist frei." : "„" + v + "“ ist schon vergeben.", free ? "good" : "bad");
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
    accMsg("Speichere …");
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
    me: function () { return me; },
    canPlay: canPlay,
    canChat: canChat,
    players: function () { return players; },
    name: function (id) { return displayName(id); },
    avatar: function (id) { return avatarOf(id); },
    blocked: function () { return blocked.slice(); },
    setBlocked: function (id, on) {
      blocked = blocked.filter(function (x) { return x !== id; });
      if (on) blocked.push(id);
      return B.doc("users/" + me).update({ blocked: blocked.slice(0, 500) });
    },
    render: render
  };

  if (!B || !B.available) {
    off("Online-Funktionen noch nicht eingerichtet",
      B && B.reason === "sdk"
        ? "Die Verbindung zum Server konnte nicht geladen werden. Prüfe deine Internetverbindung und lade die Seite neu. Nachschlagen und Quiz funktionieren trotzdem."
        : "Konten, Ranglisten und der Wochenwettbewerb brauchen einen Server (Firebase). Die Anleitung steht in SETUP.md. Nachschlagen und Quiz funktionieren schon jetzt.");
    return;
  }

  B.collection("players").onSnapshot(function (snap) {
    var next = {};
    snap.docs.forEach(function (d) { if (d.exists) next[d.id] = cleanPlayer(d.data()); });
    players = next;
    loaded = true;
    render();
  }, function () { showError("Die Rangliste wird gerade nicht aktualisiert. Lade die Seite neu."); });
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
    if (!u) { me = null; mine = null; friends = []; blocked = []; $("#acc-form").hidden = true; $("#acc-edit").hidden = false; render(); return; }
    if (sameUser && mine) { render(); return; }   // e.g. e-mail just confirmed
    me = u.uid;
    mine = null;
    render();
    Promise.all([B.doc("players/" + me).get(), B.doc("users/" + me).get()]).then(function (snaps) {
      if (token !== authToken) return;
      mine = snaps[0].exists ? cleanPlayer(snaps[0].data()) : null;
      var f = snaps[1].exists ? snaps[1].data().friends : [];
      friends = Array.isArray(f) ? f.filter(function (x) { return typeof x === "string" && x !== me; }) : [];
      var bl = snaps[1].exists ? snaps[1].data().blocked : [];
      blocked = Array.isArray(bl) ? bl.filter(function (x) { return typeof x === "string"; }) : [];
      if (!mine) showError("Zu deinem Konto gibt es kein Spielerprofil. Melde dich ab und registriere dich neu oder wende dich an die Betreiber.");
      render();
    }, function (e) { showError(B.message(e)); });
  });

  APP.on("view", function (name) { if (name === "wettbewerb") render(); });
  setInterval(function () {
    var before = calendar(Date.now() - 30000).key;
    if (before !== calendar(Date.now()).key) render(); else updateCountdown();
  }, 30000);
  render();
})();
