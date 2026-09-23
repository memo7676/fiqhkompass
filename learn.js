/* Lernen: Themen durcharbeiten wie in einer Fahrschul-App.
   Every question has a state:
     new (not seen) · wrong (-1) · almost (1: right once after a mistake) · learned (2)
   Right at the first try -> learned. After a mistake it takes two right answers in a row.
   A wrong answer always sends it back. A topic is done at 100 % learned.
   Progress lives in localStorage ("fiqh:learn") and, when signed in, in progress/<uid>. */
(function () {
  "use strict";
  var APP = window.FIQH_APP, B = window.FIQH_BACKEND;
  if (!APP) return;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var esc = APP.esc, T = window.T || function (x) { return x; };
  var ROUND = 10;

  /* ---------- question ids (stable as long as topic and question text stay) ---------- */
  function hash(str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = (h * 33 + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  var byTopic = {};
  APP.QUESTIONS.forEach(function (q) {
    q._lid = q.t + "-" + hash(q.q_de || q.q);
    (byTopic[q.t] = byTopic[q.t] || []).push(q);
  });

  /* ---------- progress ---------- */
  var prog = cleanProg(APP.store("learn"));       // id -> [level, time]
  function cleanProg(o) {
    var out = {};
    if (o && typeof o === "object") Object.keys(o).forEach(function (k) {
      var v = o[k];
      if (Array.isArray(v) && (v[0] === -1 || v[0] === 1 || v[0] === 2) && typeof v[1] === "number") out[k] = [v[0], v[1]];
    });
    return out;
  }
  function levelOf(id) { var v = prog[id]; return v ? v[0] : 0; }
  function level(q) { return levelOf(q._lid); }
  function stats(list) {
    var s = { total: list.length, learned: 0, almost: 0, wrong: 0, fresh: 0 };
    list.forEach(function (q) {
      var l = level(q);
      if (l === 2) s.learned++; else if (l === 1) s.almost++; else if (l === -1) s.wrong++; else s.fresh++;
    });
    s.pct = s.total ? Math.floor(s.learned / s.total * 100) : 0;
    if (s.learned === s.total && s.total) s.pct = 100;
    return s;
  }
  function allQuestions() { return APP.QUESTIONS; }
  function topicStats(id) { return stats(byTopic[id] || []); }

  var saveTimer = null;
  function persist() {
    APP.store("learn", prog);
    clearTimeout(saveTimer);
    saveTimer = setTimeout(pushCloud, 1500);
  }

  /* one answer -> new level and the line shown in the feedback box */
  function record(q, ok) { return recordId(q._lid, ok); }
  function recordId(id, ok) {
    var l = levelOf(id), next, note;
    if (!ok) {
      next = -1;
      note = l === 2 ? T("Schon gelernt, aber vergessen – kommt wieder.") : T("Kommt wieder – die richtige Antwort ist markiert.");
    } else if (l === 0) { next = 2; note = T("✓ Gelernt"); }
    else if (l === -1) { next = 1; note = T("Gut! Noch einmal richtig, dann ist sie gelernt."); }
    else { next = 2; note = l === 1 ? T("✓ Jetzt gelernt") : T("✓ Sitzt"); }
    prog[id] = [next, Date.now()];
    persist();
    return note;
  }

  /* ---------- choosing questions ---------- */
  function shuffle(a) { return APP.shuffle(a); }
  /* wrong ones first, then "almost", then new ones in catalogue order */
  function roundFor(list) {
    var wrong = [], almost = [], fresh = [], learned = [];
    list.forEach(function (q) {
      var l = level(q);
      (l === -1 ? wrong : l === 1 ? almost : l === 2 ? learned : fresh).push(q);
    });
    var pick = shuffle(wrong).concat(shuffle(almost), fresh).slice(0, ROUND);
    return pick.length ? { qs: shuffle(pick), review: false } : { qs: shuffle(learned).slice(0, ROUND), review: true };
  }

  /* ---------- a round ---------- */
  var lastRound = null;
  function start(kind, topicId) {
    var list, label, t = topicId && APP.TOPIC_BY_ID[topicId];
    if (kind === "topic") { list = byTopic[topicId] || []; label = T("Lernen") + " · " + t.title; }
    else if (kind === "mistakes") {
      list = allQuestions().filter(function (q) { var l = level(q); return l === -1 || l === 1; });
      label = T("Fehler wiederholen");
    } else return;
    var r = roundFor(list);
    if (!r.qs.length) return;
    var before = kind === "topic" ? topicStats(topicId) : stats(allQuestions());
    var correct = 0;
    APP.startQuiz({
      learn: true,
      questions: r.qs,
      label: r.review ? label + " " + T("(Wiederholung)") : label,
      onAnswer: function (q, ok) { if (ok) correct++; return record(q, ok); },
      onFinish: function (p) {
        var after = kind === "topic" ? topicStats(topicId) : stats(allQuestions());
        lastRound = { kind: kind, topicId: topicId, answered: p.answered, correct: correct, before: before, after: after, wrong: p.wrong || [] };
        pushCloud();
      },
      onLeave: function () {
        APP.renderSetup();
        APP.showView("lernen");
        render();
        window.scrollTo(0, 0);
      }
    });
  }
  function nextTopic() {
    var ids = [];
    APP.GROUPS.forEach(function (g) { g.topics.forEach(function (t) { ids.push(t.id); }); });
    for (var i = 0; i < ids.length; i++) if (topicStats(ids[i]).pct < 100) return ids[i];
    return null;
  }

  /* ---------- rendering ---------- */
  function bar(s) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / s.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + T("{n} von {m} gelernt", { n: s.learned, m: s.total }) + '">' +
      seg(s.learned, "ok") + seg(s.almost, "mid") + seg(s.wrong, "bad") + "</span>";
  }
  function ring(pct) {
    var r = 52, c = 2 * Math.PI * r;
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="' + r + '" class="ring-bg"/>' +
      '<circle cx="60" cy="60" r="' + r + '" class="ring-fg" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pct / 100)).toFixed(1) + '"/></svg>' +
      '<span class="ring-num"><b>' + pct + '</b><small>%</small></span>';
  }

  function render() {
    var view = $("#view-learn");
    if (!view) return;
    var all = stats(allQuestions());
    var topicsDone = 0, topicsTotal = 0;
    APP.GROUPS.forEach(function (g) { g.topics.forEach(function (t) { topicsTotal++; if (topicStats(t.id).pct === 100) topicsDone++; }); });
    $("#learn-ring").innerHTML = ring(all.pct);
    $("#learn-stats").innerHTML =
      "<span>" + T("<b>{n}</b> von {m} Fragen gelernt", { n: all.learned, m: all.total }) + "</span>" +
      "<span>" + T("<b>{n}</b> von {m} Themen bei 100 %", { n: topicsDone, m: topicsTotal }) + "</span>" +
      (all.wrong + all.almost ? "<span>" + T("<b>{n}</b> Fehlerfragen offen", { n: all.wrong + all.almost }) + "</span>" : "");
    var nt = nextTopic();
    var go = $("#learn-next");
    go.hidden = !nt;
    if (nt) go.textContent = (all.learned ? T("Weiter lernen:") : T("Loslegen:")) + " " + APP.TOPIC_BY_ID[nt].title;
    var mis = $("#learn-mistakes");
    mis.hidden = !(all.wrong + all.almost);
    mis.textContent = T("Fehler wiederholen ({n})", { n: all.wrong + all.almost });
    $("#learn-alldone").hidden = !!nt;

    renderRound();

    $("#learn-groups").innerHTML = APP.GROUPS.map(function (g) {
      var gs = stats(g.topics.reduce(function (a, t) { return a.concat(byTopic[t.id] || []); }, []));
      return '<section class="lg"><h3 class="lg-head"><span>' + esc(T(g.name)) + '</span><small>' + gs.pct + ' %</small></h3><ol class="lt-list">' +
        g.topics.map(function (t) {
          var s = topicStats(t.id);
          var state = s.pct === 100 ? "done" : s.learned + s.almost + s.wrong ? "busy" : "new";
          var btn = state === "done" ? T("Wiederholen") : state === "busy" ? T("Weiter") : T("Starten");
          return '<li class="lt lt-' + state + '">' +
            '<span class="lt-icon" aria-hidden="true">' + (state === "done" ? "✓" : "") + "</span>" +
            '<span class="lt-main"><span class="lt-title"><strong>' + esc(t.title) + '</strong><span class="lt-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span></span>" +
            bar(s) +
            '<small class="lt-meta">' + (state === "done" ? T("Gemeistert · alle {n} Fragen gelernt", { n: s.total })
              : T("{n} von {m} gelernt", { n: s.learned, m: s.total }) + (s.wrong ? " · " + T("{n} falsch", { n: s.wrong }) : "") + (s.almost ? " · " + T("{n} fast", { n: s.almost }) : "")) + "</small></span>" +
            '<span class="lt-pct">' + s.pct + " %</span>" +
            '<button type="button" class="btn' + (state === "busy" ? " btn-primary" : "") + '" data-learn="' + t.id + '">' + btn + "</button></li>";
        }).join("") + "</ol></section>";
    }).join("");
    $all("[data-learn]", view).forEach(function (b) {
      b.addEventListener("click", function () { start("topic", b.getAttribute("data-learn")); });
    });
    renderSlots();
  }

  function renderRound() {
    var box = $("#learn-round");
    if (!lastRound) { box.hidden = true; return; }
    var r = lastRound, t = r.topicId && APP.TOPIC_BY_ID[r.topicId];
    var mastered = r.kind === "topic" && r.after.pct === 100 && r.before.pct < 100;
    box.hidden = false;
    box.className = "panel learn-round" + (mastered ? " is-mastered" : "");
    var gain = r.after.learned - r.before.learned;
    box.innerHTML =
      (mastered ? '<p class="lr-badge">' + T("✓ Gemeistert") + "</p><h3>" + T("Mā schāʾ Allāh – „{t}“ sitzt zu 100 %!", { t: esc(t.title) }) + "</h3>"
        : "<h3>" + T("Runde geschafft: {n} von {m} richtig", { n: r.correct, m: r.answered }) + "</h3>") +
      "<p>" + (r.kind === "topic" ? esc(t.title) + ": <b>" + r.before.pct + " % → " + r.after.pct + " %</b>" : T("Gesamt:") + " <b>" + r.after.pct + " %</b>") +
      (gain > 0 ? " · " + T(gain === 1 ? "{n} Frage neu gelernt" : "{n} Fragen neu gelernt", { n: gain }) : "") + "</p>" +
      '<div class="lr-actions">' +
      (r.kind === "topic" && r.after.pct < 100 ? '<button type="button" class="btn btn-primary" data-round-again>' + T("Nächste Runde") + "</button>" : "") +
      (r.kind === "mistakes" && r.after.wrong + r.after.almost ? '<button type="button" class="btn btn-primary" data-round-mistakes>' + T("Weiter Fehler wiederholen") + "</button>" : "") +
      (r.wrong.length && window.FIQH_MISTAKES ? '<button type="button" class="btn" data-round-wrong>' + T("Fehler dieser Runde wiederholen ({n})", { n: r.wrong.length }) + "</button>" : "") +
      (r.topicId ? '<button type="button" class="btn" data-round-read>' + T("Im Nachschlagen lesen") + "</button>" : "") +
      '<button type="button" class="linkish" data-round-close>' + T("Schließen") + "</button></div>";
    var again = $("[data-round-again]", box);
    if (again) again.addEventListener("click", function () { start("topic", r.topicId); });
    var mis = $("[data-round-mistakes]", box);
    if (mis) mis.addEventListener("click", function () { start("mistakes"); });
    var wrongBtn = $("[data-round-wrong]", box);
    if (wrongBtn) wrongBtn.addEventListener("click", function () { window.FIQH_MISTAKES.practice(r.wrong, T("Fehler dieser Runde"), "lernen"); });
    var read = $("[data-round-read]", box);
    if (read) read.addEventListener("click", function () { APP.showView("nachschlagen"); APP.openTopic(r.topicId); window.scrollTo(0, 0); });
    $("[data-round-close]", box).addEventListener("click", function () { lastRound = null; renderRound(); });
  }

  /* progress on the topic cards and in the open topic */
  function renderSlots() {
    $all("[data-learn-card]").forEach(function (el) {
      var s = topicStats(el.getAttribute("data-learn-card"));
      if (!(s.learned + s.almost + s.wrong)) { el.innerHTML = ""; return; }
      el.innerHTML = bar(s) + '<small>' + (s.pct === 100 ? T("✓ gemeistert") : T("{n} % gelernt", { n: s.pct })) + "</small>";
      el.classList.toggle("is-done", s.pct === 100);
    });
    $all("[data-learn-slot]").forEach(function (el) {
      var id = el.getAttribute("data-learn-slot"), s = topicStats(id);
      el.innerHTML = '<button type="button" class="btn btn-primary">' + (s.pct === 100 ? T("✓ Thema wiederholen") : T("Thema lernen · {n} %", { n: s.pct })) + "</button>";
      $("button", el).addEventListener("click", function () { start("topic", id); });
    });
  }

  $("#learn-next").addEventListener("click", function () { var id = nextTopic(); if (id) start("topic", id); });
  $("#learn-mistakes").addEventListener("click", function () { start("mistakes"); });
  $("#learn-reset").addEventListener("click", function () {
    var box = $("#learn-reset-confirm");
    box.hidden = !box.hidden;
  });
  $("#learn-reset-no").addEventListener("click", function () { $("#learn-reset-confirm").hidden = true; });
  $("#learn-reset-yes").addEventListener("click", function () {
    resetWhere(function (k) { return k.indexOf("ar-") !== 0; });
    lastRound = null;
    $("#learn-reset-confirm").hidden = true;
    render();
  });
  /* the Arabic part (arabic.js) keeps its progress in the same store, ids start with "ar-" */
  function resetWhere(test) {
    Object.keys(prog).forEach(function (k) { if (test(k)) delete prog[k]; });
    APP.store("learn", prog);
    pushCloud(true);
    changed();
  }
  var changeFns = [];
  function changed() { changeFns.forEach(function (fn) { try { fn(); } catch (e) { console.error(e); } }); }

  APP.on("view", function (name) { if (name === "lernen") render(); });
  APP.on("overview", renderSlots);
  APP.on("topic", renderSlots);

  /* ---------- sync with the account (progress/<uid>, only the owner can read it) ---------- */
  var uid = null, cloudReady = false, pushing = false;
  function merge(remote) {
    var changed = false;
    Object.keys(remote).forEach(function (k) {
      if (!prog[k] || remote[k][1] > prog[k][1]) { prog[k] = remote[k]; changed = true; }
    });
    return changed;
  }
  function pushCloud(force) {
    if (!B || !B.available || !uid || !cloudReady || pushing) return;
    var u = B.currentUser && B.currentUser();
    if (!u || !u.emailVerified) return;
    pushing = true;
    B.doc("progress/" + uid).set({ q: prog, at: Date.now() }).then(function () { pushing = false; }, function () { pushing = false; });
  }
  if (B && B.available) {
    B.onAuth(function (u) {
      uid = u && u.emailVerified ? u.uid : null;
      cloudReady = false;
      if (!uid) return;
      B.doc("progress/" + uid).get().then(function (snap) {
        var remote = snap.exists ? cleanProg((snap.data() || {}).q) : {};
        var hadLocal = Object.keys(prog).length;
        if (merge(remote)) { APP.store("learn", prog); render(); renderSlots(); changed(); }
        cloudReady = true;
        if (hadLocal) pushCloud();
      }, function () { cloudReady = true; });
    });
  }

  window.FIQH_LEARN = {
    stats: function () { return stats(allQuestions()); }, topicStats: topicStats,
    hash: hash, levelOf: levelOf, recordId: recordId, sync: function () { pushCloud(); },
    reset: resetWhere, onChange: function (fn) { changeFns.push(fn); }
  };
  render();
})();
