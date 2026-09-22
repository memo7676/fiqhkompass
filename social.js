/* Freunde & Wochenwettbewerb.
   Needs the artifact runtime (claude.use("db") and claude.use("user")).
   Opened as a plain file there is no shared state: the tab explains that
   and the normal quiz keeps working.

   Data (db):
     players/<uid>                 public score card, written only by its owner
       { total, games, comp: { "s1w2": { score, correct, answered, done, at } }, at }
     data/users/<uid>/social       private: { friends: [uid, ...] }            */
(function () {
  "use strict";
  var APP = window.FIQH_APP;
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
      season: season, week: week, key: weekKey(season, week),
      weekStart: ANCHOR + w * WEEK, weekEnd: ANCHOR + (w + 1) * WEEK,
      seasonStart: seasonStart, seasonEnd: seasonStart + WEEKS_PER_SEASON * WEEK
    };
  }
  function weekKey(season, week) { return "s" + season + "w" + week; }
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
  function weeklyQuestions(key) {
    return APP.pickQuestions(APP.QUESTIONS.slice(), COMP_QUESTIONS, seeded("fiqh-kompass:" + key));
  }

  /* ---------- state ---------- */
  var db = null, user = null, me = null;
  var mine = null;            // my own player doc (local truth)
  var players = {};           // uid -> sanitized player doc
  var friends = [];           // uids
  var boardFilter = APP.store("board") || "all";
  var pendingPoints = [];     // quiz results that finished before db was ready
  var readOnly = false;

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
    return { total: num(d.total), games: num(d.games), comp: comp, at: String(d.at || "") };
  }
  function seasonSum(p, season) {
    var s = 0, weeks = 0;
    for (var w = 1; w <= WEEKS_PER_SEASON; w++) {
      var e = p.comp[weekKey(season, w)];
      if (e) { s += e.score; weeks++; }
    }
    return { sum: s, weeks: weeks };
  }

  /* ---------- writes: one at a time, my own doc only ---------- */
  var chain = Promise.resolve();
  var queued = false;
  function save() {
    if (!db || !me || !mine || readOnly) return chain;
    if (queued) return chain;
    queued = true;
    chain = chain.then(function () {
      queued = false;
      mine.at = new Date().toISOString();
      return db.doc("players/" + me).set(JSON.parse(JSON.stringify(mine)));
    }).catch(function (e) {
      queued = false;
      showError(e && e.code === "invalid_argument"
        ? "Du hast für diese Seite nur Leserechte. Deine Punkte können nicht gespeichert werden."
        : "Speichern hat nicht geklappt. Prüfe die Verbindung.");
      if (e && e.code === "invalid_argument") readOnly = true;
      throw e;
    });
    return chain;
  }
  function saveFriends() {
    if (!db || !me) return;
    db.doc("data/users/" + me + "/social").set({ friends: friends.slice(0, 200) }).catch(function () {
      showError("Die Freundesliste konnte nicht gespeichert werden.");
    });
  }
  function showError(msg) {
    var el = $("#comp-error");
    el.textContent = msg;
    el.hidden = false;
  }

  /* Every finished normal quiz adds to the all-time total. */
  APP.on("finish", function (r) {
    if (!mine) { pendingPoints.push(r); return; }
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
    var cal = calendar(Date.now());
    if (!mine || mine.comp[cal.key] || readOnly) return;
    var btn = $("#comp-start");
    btn.disabled = true;
    $("#comp-error").hidden = true;
    var entry = { score: 0, correct: 0, answered: 0, done: false, at: new Date().toISOString() };
    mine.comp[cal.key] = entry;
    // The attempt is recorded before the first question: one try per week.
    save().then(function () {
      var counted = 0;
      APP.startQuiz({
        questions: weeklyQuestions(cal.key),
        rnd: seeded("fiqh-kompass:options:" + cal.key),
        label: "Wettbewerb S" + cal.season + "·W" + cal.week,
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

  /* ---------- rendering ---------- */
  var renderToken = 0;
  function render() {
    if (!mine) return;
    var token = ++renderToken;
    var cal = calendar(Date.now());
    var ids = Object.keys(players);
    if (ids.indexOf(me) === -1) ids.push(me);
    friends.forEach(function (f) { if (ids.indexOf(f) === -1) ids.push(f); });
    var prev = cal.season > 1 ? leader(cal.season - 1) : null;
    if (prev) ids.push(prev.id);
    user.profiles(ids).then(function (ps) {
      if (token !== renderToken) return;
      renderComp(cal);
      renderWinner(cal, prev, ps);
      renderBoard(cal, ps);
      renderFriends(cal, ps);
    });
  }

  function playerFor(id) { return id === me ? mine : (players[id] || cleanPlayer({})); }

  function renderComp(cal) {
    $("#comp-eyebrow").textContent = "Wochenwettbewerb · Saison " + cal.season;
    $("#comp-title").textContent = "Woche " + cal.week + " von " + WEEKS_PER_SEASON;
    $("#comp-sub").textContent = "Saison " + cal.season + " läuft vom " + day(cal.seasonStart) + " bis " +
      day(cal.seasonEnd - 1) + " – jede Woche 15 neue Fragen, die Summe der vier Wochen entscheidet.";
    updateCountdown();

    $("#comp-weeks").innerHTML = [1, 2, 3, 4].map(function (w) {
      var e = mine.comp[weekKey(cal.season, w)];
      var start = cal.seasonStart + (w - 1) * WEEK;
      var cls = w === cal.week ? "now" : w > cal.week ? "future" : "";
      var val, note;
      if (e) { cls += " done"; val = pts(e.score); note = e.done ? e.correct + " / 15 richtig" : "abgebrochen"; }
      else if (w < cal.week) { val = "–"; note = "verpasst"; }
      else if (w === cal.week) { val = "offen"; note = "bis " + dayLong(cal.weekEnd - 1); }
      else { val = "–"; note = "ab " + day(start); }
      return '<li class="week ' + cls + '"><span>Woche ' + w + "</span><b>" + esc(val) + "</b><small>" + esc(note) + "</small></li>";
    }).join("");

    var e = mine.comp[cal.key];
    var btn = $("#comp-start");
    var state = $("#comp-state");
    btn.hidden = !!e;
    btn.disabled = readOnly;
    if (!e) {
      state.innerHTML = "Ein Versuch, 15 Fragen, dieselben wie bei allen anderen.";
    } else if (e.done) {
      state.innerHTML = "Diese Woche erledigt: <b>" + pts(e.score) + " Punkte</b> (" + e.correct + " / 15 richtig). Nächstes Wochenquiz ab " + esc(dayLong(cal.weekEnd)) + "";
    } else if (APP.isPlaying()) {
      state.innerHTML = "Dein Wochenquiz läuft gerade.";
    } else {
      state.innerHTML = "Dein Versuch wurde abgebrochen und zählt mit <b>" + pts(e.score) + " Punkten</b>. Nächstes Wochenquiz ab " + esc(dayLong(cal.weekEnd)) + "";
    }
  }

  function updateCountdown() {
    var cal = calendar(Date.now());
    var left = cal.weekEnd - Date.now();
    var d = Math.floor(left / 864e5), h = Math.floor(left % 864e5 / 36e5), m = Math.floor(left % 36e5 / 6e4);
    var el = $("#comp-countdown");
    el.innerHTML = "<small>Woche endet in</small><b>" + (d ? d + " T " : "") + h + " Std " + (d ? "" : m + " Min") + "</b>" +
      "<small>Saisonende " + esc(day(cal.seasonEnd - 1)) + "</small>";
  }

  function leader(season) {
    var best = null;
    var all = Object.keys(players).map(function (id) { return { id: id, p: playerFor(id) }; });
    if (!players[me]) all.push({ id: me, p: mine });
    all.forEach(function (x) {
      var s = seasonSum(x.p, season);
      if (s.weeks && s.sum > 0 && (!best || s.sum > best.sum)) best = { id: x.id, sum: s.sum };
    });
    return best;
  }

  function renderWinner(cal, prev, ps) {
    var box = $("#last-winner");
    if (!prev) { box.hidden = true; return; }
    var p = ps[prev.id] || {};
    var name = prev.id === me ? "Du" : (p.name || "Jemand");
    box.hidden = false;
    box.innerHTML = '<img alt="" src="' + esc(p.avatarUrl || "") + '"><p><small class="eyebrow">Gewinner Saison ' + (cal.season - 1) +
      "</small><br><strong></strong> mit " + pts(prev.sum) + " Punkten</p>";
    $("strong", box).textContent = prev.id === me ? "Du hast gewonnen" : name;
  }

  function row(opts) {
    var li = document.createElement("li");
    li.className = "rank-row" + (opts.me ? " me" : "") + (opts.pos === 1 && opts.score > 0 ? " top" : "");
    li.innerHTML = '<span class="rank-pos">' + opts.pos + '.</span><img alt="" src="' + esc(opts.avatar) + '">' +
      '<span class="rank-name"><strong></strong><small></small></span>' +
      '<span class="rank-pts">' + pts(opts.score) + "<small>" + esc(opts.unit) + "</small></span>" +
      (opts.action ? '<button type="button" class="icon-btn"></button>' : '<span class="icon-spacer"></span>');
    $("strong", li).textContent = opts.name;
    $("small", li).textContent = opts.sub;
    if (opts.action) {
      var b = $(".icon-btn", li);
      b.textContent = opts.action.label;
      b.title = opts.action.title;
      b.setAttribute("aria-label", opts.action.title);
      b.addEventListener("click", opts.action.run);
    }
    return li;
  }
  function displayName(id, ps) { return id === me ? "Du" : ((ps[id] && ps[id].name) || "Jemand"); }

  function renderBoard(cal, ps) {
    $("#board-title").textContent = "Saison " + cal.season;
    $all("[data-board]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-board") === boardFilter ? "true" : "false"); });
    var ids = Object.keys(players);
    if (ids.indexOf(me) === -1) ids.push(me);
    if (boardFilter === "friends") ids = ids.filter(function (id) { return id === me || friends.indexOf(id) !== -1; })
      .concat(friends.filter(function (f) { return !players[f]; }));
    var rows = ids.map(function (id) {
      var p = playerFor(id);
      return { id: id, p: p, s: seasonSum(p, cal.season) };
    }).filter(function (r) { return r.id === me || boardFilter === "friends" || r.s.weeks; });
    rows.sort(function (a, b) { return b.s.sum - a.s.sum || (a.id === me ? -1 : b.id === me ? 1 : 0); });

    var list = $("#board");
    list.innerHTML = "";
    var myPos = 0;
    rows.forEach(function (r, i) {
      var pos = i + 1;
      if (i > 0 && rows[i - 1].s.sum === r.s.sum) pos = list.lastChild ? +list.lastChild.getAttribute("data-pos") : pos;
      if (r.id === me) myPos = pos;
      var weeks = [1, 2, 3, 4].map(function (w) {
        var e = r.p.comp[weekKey(cal.season, w)];
        return "W" + w + " " + (e ? pts(e.score) : "–");
      }).join(" · ");
      var isFriend = friends.indexOf(r.id) !== -1;
      var li = row({
        pos: pos, me: r.id === me, score: r.s.sum, unit: "Summe",
        name: displayName(r.id, ps), avatar: (ps[r.id] || {}).avatarUrl || "", sub: weeks,
        action: r.id === me || isFriend ? null : { label: "+", title: "Als Freund hinzufügen", run: function () { addFriend(r.id); } }
      });
      li.setAttribute("data-pos", pos);
      list.appendChild(li);
    });
    if (rows.length < 2) {
      var hint = document.createElement("li");
      hint.className = "empty";
      hint.textContent = boardFilter === "friends"
        ? "Noch keine Freunde – füge rechts jemanden hinzu oder tippe in der Gesamtliste auf +."
        : "Noch niemand sonst hat in dieser Saison gespielt. Teile den Link mit deinen Freunden!";
      list.appendChild(hint);
    }

    var note = $("#board-note");
    var mySum = seasonSum(mine, cal.season).sum;
    var ahead = rows.filter(function (r) { return r.s.sum > mySum; });
    if (!mySum && !mine.comp[cal.key]) note.innerHTML = "Spiel das Wochenquiz, um in die Wertung zu kommen.";
    else if (!ahead.length && rows.length > 1) note.innerHTML = "<b>Du führst!</b> Halte den Vorsprung bis " + esc(day(cal.seasonEnd - 1)) + ".";
    else if (ahead.length) {
      var next = ahead[ahead.length - 1];
      note.innerHTML = "Platz <b>" + myPos + "</b> – <b>" + pts(next.s.sum - mySum) + " Punkte</b> hinter <b></b>.";
      $all("b", note)[2].textContent = displayName(next.id, ps);
    } else note.innerHTML = "Platz <b>1</b> – noch ohne Konkurrenz.";
  }

  function renderFriends(cal, ps) {
    var ids = [me].concat(friends);
    var rows = ids.map(function (id) { return { id: id, p: playerFor(id) }; });
    rows.sort(function (a, b) { return b.p.total - a.p.total; });
    var list = $("#friend-board");
    list.innerHTML = "";
    rows.forEach(function (r, i) {
      var e = r.p.comp[cal.key];
      var sub = r.p.games + (r.p.games === 1 ? " Quiz" : " Quizze") + " · diese Woche " + (e ? pts(e.score) : "–");
      list.appendChild(row({
        pos: i + 1, me: r.id === me, score: r.p.total, unit: "Punkte",
        name: displayName(r.id, ps), avatar: (ps[r.id] || {}).avatarUrl || "", sub: sub,
        action: r.id === me ? null : { label: "×", title: "Aus Freunden entfernen", run: function () { removeFriend(r.id); } }
      }));
    });
    if (!friends.length) {
      var hint = document.createElement("li");
      hint.className = "empty";
      hint.textContent = "Noch keine Freunde. Such unten nach Namen oder tippe in der Saisonrangliste auf +.";
      list.appendChild(hint);
    }
  }

  function addFriend(id) {
    if (!id || id === me || friends.indexOf(id) !== -1) return;
    friends.push(id);
    saveFriends();
    render();
    runSearch($("#friend-q").value);
  }
  function removeFriend(id) {
    friends = friends.filter(function (f) { return f !== id; });
    saveFriends();
    render();
  }

  $all("[data-board]").forEach(function (b) {
    b.addEventListener("click", function () {
      boardFilter = b.getAttribute("data-board");
      APP.store("board", boardFilter);
      render();
    });
  });

  /* ---------- friend search (organization directory) ---------- */
  function runSearch(q) {
    if (!user) return;
    user.search(q || "").then(function (hits) {
      if (($("#friend-q").value || "") !== (q || "")) return;
      var box = $("#friend-hits");
      box.innerHTML = "";
      hits = hits.filter(function (h) { return h.id !== me; });
      if (!hits.length) {
        if (q) { box.innerHTML = '<li class="note">Niemand gefunden. Mitspielende aus der Rangliste kannst du dort mit + hinzufügen.</li>'; }
        return;
      }
      hits.forEach(function (h) {
        var li = document.createElement("li");
        li.className = "hit";
        li.innerHTML = '<img alt=""><span></span>';
        $("img", li).src = h.avatarUrl;
        $("span", li).textContent = h.name || "Jemand";
        if (friends.indexOf(h.id) !== -1) {
          var s = document.createElement("small");
          s.className = "chip-count";
          s.textContent = "Freund";
          li.appendChild(s);
        } else {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "linkish";
          b.textContent = "Hinzufügen";
          b.addEventListener("click", function () { addFriend(h.id); });
          li.appendChild(b);
        }
        box.appendChild(li);
      });
    });
  }
  $("#friend-q").addEventListener("input", function (e) { runSearch(e.target.value.trim()); });
  $("#friend-q").addEventListener("focus", function (e) { runSearch(e.target.value.trim()); });

  /* ---------- boot ---------- */
  function off(title, text) {
    $("#social-off-title").textContent = title;
    $("#social-off-text").textContent = text;
    $("#social-off").hidden = false;
    $("#social-on").hidden = true;
  }

  function boot() {
    if (!window.claude || typeof window.claude.use !== "function") {
      off("Nur in der geteilten Version", "Rangliste, Freunde und der Wochenwettbewerb brauchen einen gemeinsamen Speicher. Den gibt es in der veröffentlichten Seite auf claude.ai – als lokale Datei funktionieren Nachschlagen und Quiz ganz normal.");
      return;
    }
    Promise.all([window.claude.use("db"), window.claude.use("user")]).then(function (r) {
      db = r[0]; user = r[1];
      if (!db || !user) { off("Gerade nicht verfügbar", "Der gemeinsame Speicher ist in dieser Ansicht nicht erreichbar. Nachschlagen und Quiz funktionieren trotzdem."); return null; }
      return user.id();
    }).then(function (id) {
      if (!db || !user) return;
      if (!id) { off("Bitte anmelden", "Für Rangliste und Wettbewerb brauchst du ein Konto in der Organisation, damit deine Punkte dir zugeordnet werden."); return; }
      me = id;
      return Promise.all([db.doc("players/" + me).get(), db.doc("data/users/" + me + "/social").get()]);
    }).then(function (snaps) {
      if (!snaps) return;
      mine = cleanPlayer(snaps[0].exists ? snaps[0].data() : {});
      var f = snaps[1].exists ? snaps[1].data().friends : [];
      friends = Array.isArray(f) ? f.filter(function (x) { return typeof x === "string" && x !== me; }) : [];
      if (pendingPoints.length) {
        pendingPoints.forEach(function (p) { addGame(p.score); });
        pendingPoints = [];
        save().catch(function () {});
      }
      $("#social-off").hidden = true;
      $("#social-on").hidden = false;
      render();
      db.collection("players").onSnapshot(function (snap) {
        var next = {};
        snap.docs.forEach(function (d) { if (d.exists && d.id !== me) next[d.id] = cleanPlayer(d.data()); });
        players = next;
        render();
      }, function () { showError("Die Rangliste wird gerade nicht aktualisiert. Lade die Seite neu."); });
      setInterval(function () {
        var before = calendar(Date.now() - 30000).key;
        if (before !== calendar(Date.now()).key) render(); else updateCountdown();
      }, 30000);
    }).catch(function () {
      off("Gerade nicht verfügbar", "Die Rangliste konnte nicht geladen werden. Nachschlagen und Quiz funktionieren trotzdem.");
    });
  }

  APP.on("view", function (name) { if (name === "wettbewerb" && mine) render(); });
  boot();
})();
