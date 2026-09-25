/* Fehlerordner: every question answered wrong – in Lernen, Arabisch, Quiz or Wettbewerb –
   stays here until it is answered right once (see learn.js).
   It reads the shared progress of learn.js: level -1 (falsch) and 1 (fast) are "in the folder".
   practice(list, label, back) runs one learn-style round; afterwards the folder shows the result
   and a way back to where it was started (Quiz, Lernen, Arabisch, …). */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN, AR = window.FIQH_ARABIC;
  var view = document.getElementById("view-mistakes");
  if (!APP || !L || !view) return;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var esc = APP.esc, T = window.T || function (s, v) { return v ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; }) : s; };
  var ROUND = 10;

  function lv(q) { return L.levelOf(q._lid); }
  function isOpen(q) { var l = lv(q); return l === -1 || l === 1; }

  /* one folder per Fiqh topic and per Arabic lesson, in catalogue order */
  var SUBJECTS = [];
  (function () {
    var byTopic = {};
    APP.QUESTIONS.forEach(function (q) { if (q._lid) (byTopic[q.t] = byTopic[q.t] || []).push(q); });
    var fiqh = [];
    APP.GROUPS.forEach(function (g) {
      g.topics.forEach(function (t) {
        if (byTopic[t.id]) fiqh.push({ key: "f-" + t.id, title: t.title, ar: t.ar, topic: t.id, qs: byTopic[t.id] });
      });
    });
    SUBJECTS.push({ id: "fiqh", name: T("Fiqh"), back: "lernen", folders: fiqh });
    /* Arabic questions grow (new Iʿrāb sentences), so its folders are built when needed */
    if (AR) SUBJECTS.push({ id: "arabisch", name: T("Arabisch"), back: "arabisch", make: function () {
      var byLesson = {};
      (AR.allQuestions || AR.questions).forEach(function (q) { (byLesson[q.lesson] = byLesson[q.lesson] || []).push(q); });
      var out = (AR.allLessons || AR.lessons).filter(function (l) { return byLesson[l.id]; }).map(function (l) {
        return { key: "a-" + l.id, title: (l.book === 2 ? T("Buch 2") + " · " : "") + T("Lektion") + " " + l.n + " · " + l.title, ar: l.ar, qs: byLesson[l.id] };
      });
      if (byLesson.gen) out.push({ key: "a-gen", title: T("Iʿrāb · neue Sätze"), ar: "إِعْرَابٌ", qs: byLesson.gen });
      return out;
    } });
  })();
  function foldersOf(subject) { return subject.make ? subject.make() : subject.folders; }
  function openIn(folder) { return folder.qs.filter(isOpen); }
  function openOf(subject) { return foldersOf(subject).reduce(function (a, f) { return a.concat(openIn(f)); }, []); }
  function allOpen() { return SUBJECTS.reduce(function (a, s) { return a.concat(openOf(s)); }, []); }
  function count() { return allOpen().length; }

  /* ---------- practising ---------- */
  var state = { filter: "alle", opened: {} };
  var last = null;
  var BACK = { quiz: T("Zurück zum Quiz"), wettbewerb: T("Zurück zum Wettbewerb"), lernen: T("Zurück zu Fiqh – Lernen"), arabisch: T("Zurück zu Arabisch") };

  /* wrong ones first, then "fast"; size limits the round (folder rounds), none = all given */
  function practice(list, label, back, size) {
    var seen = {}, wrong = [], almost = [], rest = [];
    list.forEach(function (q) {
      if (!q || !q._lid || seen[q._lid]) return;
      seen[q._lid] = 1;
      var l = lv(q);
      (l === -1 ? wrong : l === 1 ? almost : rest).push(q);
    });
    var qs = APP.shuffle(wrong).concat(APP.shuffle(almost), APP.shuffle(rest));
    if (size) qs = qs.slice(0, size);
    if (!qs.length) return;
    APP.startQuiz(practicePreset(APP.shuffle(qs), label, back, count()));
  }
  function practicePreset(qs, label, back, before) {
    var correct = 0;
    return {
      learn: true,
      questions: qs,
      label: label,
      resume: { kind: "mistakes", args: { label: label, back: back, before: before } },
      onAnswer: function (q, ok) { if (ok) correct++; return L.recordId(q._lid, ok); },
      onFinish: function (p) {
        last = { label: label, answered: p.answered, correct: correct, before: before, after: count(), back: back, wrong: p.wrong || [] };
        L.sync();
      },
      onLeave: function () { APP.showView("fehler"); window.scrollTo(0, 0); }
    };
  }
  APP.onResume("mistakes", function (a, qs) { return practicePreset(qs, APP.relang(a.label), a.back, a.before); });
  function goBack(name) {
    if (name === "quiz" || name === "wettbewerb") APP.renderSetup();
    APP.showView(name);
    window.scrollTo(0, 0);
  }

  /* ---------- rendering ---------- */
  /* text that may mix German and Arabic: Arabic only → right to left, otherwise left to right with isolated Arabic runs */
  function mixed(text, tag, cls) {
    var c = cls ? ' class="' + cls + '"' : "";
    if (APP.arOnly(text)) return "<" + tag + c + ' lang="ar" dir="rtl">' + esc(text) + "</" + tag + ">";
    return "<" + tag + c + ' dir="ltr">' + APP.bidiHtml(text) + "</" + tag + ">";
  }
  function arLine(q) {
    if (!q.ar) return "";
    return '<p class="mf-ar" lang="ar" dir="rtl">' + String(q.ar).split(/\s+/).map(function (w, i) {
      return i === q.arMark ? "<mark>" + esc(w) + "</mark>" : esc(w);
    }).join(" ") + "</p>";
  }
  function item(q) {
    var l = lv(q);
    return '<li class="review-item">' +
      '<p class="rv-q">' + (l === -1 ? '<span class="rv-label bad">' + T("falsch") + "</span>" : '<span class="rv-label mid">' + T("fast · noch 1× richtig") + "</span>") +
      mixed(q.q, "span") + "</p>" + arLine(q) +
      '<p class="rv-a"><span class="rv-label good">' + T("Richtig") + "</span> " + mixed(q.a[q.c], "span") + "</p>" +
      (q.e ? mixed(q.e, "p", "rv-e") : "") +
      (APP.whyHtml && APP.whyHtml(q) ? '<div class="fb-why">' + APP.whyHtml(q) + "</div>" : "") +
      (q.s !== undefined && APP.sourceLine ? '<p class="fb-source">' + esc(APP.sourceLine(q)) + "</p>" : "") +
      (APP.dalilHtml && APP.dalilHtml(q) ? '<ul class="fb-dalil">' + APP.dalilHtml(q) + "</ul>" : "") +
      (APP.termsHtml && APP.termsHtml(q) ? '<div class="fb-terms">' + APP.termsHtml(q) + "</div>" : "") + "</li>";
  }

  function renderRound() {
    var box = $("#mf-round");
    if (!last) { box.hidden = true; box.innerHTML = ""; return; }
    var r = last, cleared = r.before - r.after;
    box.hidden = false;
    box.className = "panel learn-round" + (r.after === 0 ? " is-mastered" : "");
    box.innerHTML =
      (r.after === 0 ? '<p class="lr-badge">' + T("✓ Ordner leer") + "</p>" : "") +
      "<h3>" + esc(r.label) + ": " + T("{n} von {m} richtig", { n: r.correct, m: r.answered }) + "</h3>" +
      "<p>" + T("Im Fehlerordner:") + " <b>" + r.before + " → " + r.after + "</b>" +
      (cleared > 0 ? " · " + T(cleared === 1 ? "{n} Frage sitzt wieder" : "{n} Fragen sitzen wieder", { n: cleared }) : "") + "</p>" +
      '<div class="lr-actions">' +
      (r.wrong.length ? '<button type="button" class="btn btn-primary" data-mf-again>' + T("Diese Fehler nochmal ({n})", { n: r.wrong.length }) + "</button>" : "") +
      (r.back && BACK[r.back] ? '<button type="button" class="btn" data-mf-back>' + esc(BACK[r.back]) + "</button>" : "") +
      '<button type="button" class="linkish" data-mf-close>' + T("Schließen") + "</button></div>";
    var again = $("[data-mf-again]", box);
    if (again) again.addEventListener("click", function () { practice(r.wrong, T("Fehler wiederholen"), r.back); });
    var back = $("[data-mf-back]", box);
    if (back) back.addEventListener("click", function () { last = null; goBack(r.back); });
    $("[data-mf-close]", box).addEventListener("click", function () { last = null; renderRound(); });
  }

  function render() {
    renderRound();
    var all = allOpen();
    var wrong = all.filter(function (q) { return lv(q) === -1; }).length;
    $("#mf-stats").innerHTML = all.length
      ? "<span>" + T(all.length === 1 ? "<b>{n}</b> Frage im Ordner" : "<b>{n}</b> Fragen im Ordner", { n: all.length }) + "</span>" +
        (wrong ? "<span>" + T("<b>{n}</b> falsch", { n: wrong }) + "</span>" : "") +
        (all.length - wrong ? "<span>" + T("<b>{n}</b> fast gelernt", { n: all.length - wrong }) + "</span>" : "")
      : "<span>" + T("Keine offenen Fehler – mā schāʾ Allāh!") + "</span>";
    var go = $("#mf-all");
    go.hidden = !all.length;
    go.textContent = all.length > ROUND ? T("Wiederholen: {n} von {m}", { n: ROUND, m: all.length }) : T("Alle wiederholen ({n})", { n: all.length });

    var shown = SUBJECTS.filter(function (s) { return state.filter === "alle" || state.filter === s.id; });
    var filters = $("#mf-filter");
    filters.hidden = SUBJECTS.length < 2 || !all.length;
    filters.innerHTML = [{ id: "alle", name: T("Alle"), n: all.length }].concat(SUBJECTS.map(function (s) { return { id: s.id, name: s.name, n: openOf(s).length }; }))
      .map(function (f) {
        return '<button type="button" data-mf-filter="' + f.id + '" aria-current="' + (state.filter === f.id ? "true" : "false") + '">' + esc(f.name) + " <small>" + f.n + "</small></button>";
      }).join("");

    var body = $("#mf-body");
    if (!all.length) {
      body.innerHTML = '<div class="panel mf-empty"><p><b>' + T("Dein Fehlerordner ist leer.") + "</b></p><p>" + T("Jede Frage, die du im Quiz, im Wettbewerb, beim Lernen oder in Arabisch falsch beantwortest, landet hier – bis du sie richtig beantwortest.") + "</p></div>";
    } else {
      body.innerHTML = shown.map(function (s) {
        var n = openOf(s).length;
        if (!n) return state.filter === s.id ? '<div class="panel mf-empty"><p>' + T("In {s} gibt es keine offenen Fehler.", { s: esc(s.name) }) + "</p></div>" : "";
        return '<section class="lg"><h3 class="lg-head"><span>' + esc(s.name) + "</span><small>" + T(n === 1 ? "{n} Frage" : "{n} Fragen", { n: n }) + "</small></h3>" +
          '<div class="mf-list">' + foldersOf(s).map(function (f) {
            var qs = openIn(f);
            if (!qs.length) return "";
            return '<details class="mf"' + (state.opened[f.key] ? " open" : "") + ' data-mf-key="' + f.key + '">' +
              '<summary><span class="mf-icon" aria-hidden="true"></span><span class="mf-title"><strong>' + esc(f.title) + "</strong>" +
              (f.ar ? '<span class="lt-ar" lang="ar" dir="rtl">' + esc(f.ar) + "</span>" : "") + "</span>" +
              '<span class="mf-count">' + qs.length + "</span></summary>" +
              '<div class="mf-inner"><div class="mf-actions">' +
              '<button type="button" class="btn btn-primary btn-sm" data-mf-practice="' + f.key + '">' + (qs.length === 1 ? T("Diese Frage wiederholen") : T("Diese {n} wiederholen", { n: qs.length })) + "</button>" +
              (f.topic ? '<button type="button" class="linkish" data-mf-read="' + f.topic + '">' + T("Im Nachschlagen lesen") + "</button>" : "") +
              '</div><ul class="review">' + qs.map(item).join("") + "</ul></div></details>";
          }).join("") + "</div></section>";
      }).join("");
    }
    wire();
  }

  function folderByKey(key) {
    for (var i = 0; i < SUBJECTS.length; i++) {
      var fs = foldersOf(SUBJECTS[i]);
      for (var j = 0; j < fs.length; j++) if (fs[j].key === key) return { folder: fs[j], subject: SUBJECTS[i] };
    }
    return null;
  }
  function wire() {
    $all("[data-mf-filter]", view).forEach(function (b) {
      b.addEventListener("click", function () { state.filter = b.getAttribute("data-mf-filter"); render(); });
    });
    $all("details.mf", view).forEach(function (d) {
      d.addEventListener("toggle", function () { state.opened[d.getAttribute("data-mf-key")] = d.open; });
    });
    $all("[data-mf-practice]", view).forEach(function (b) {
      b.addEventListener("click", function () {
        var hit = folderByKey(b.getAttribute("data-mf-practice"));
        if (hit) practice(openIn(hit.folder), T("Fehler") + " · " + hit.folder.title, null);
      });
    });
    $all("[data-mf-read]", view).forEach(function (b) {
      b.addEventListener("click", function () { APP.showView("nachschlagen"); APP.openTopic(b.getAttribute("data-mf-read")); window.scrollTo(0, 0); });
    });
  }

  $("#mf-all").addEventListener("click", function () {
    var list = state.filter === "alle" ? allOpen() : openOf(SUBJECTS.filter(function (s) { return s.id === state.filter; })[0]);
    practice(list.length ? list : allOpen(), T("Fehlerordner"), null, ROUND);
  });
  /* "Fehlerordner" buttons anywhere on the page */
  $all("[data-open-mistakes]").forEach(function (b) {
    b.addEventListener("click", function () { APP.showView("fehler"); window.scrollTo(0, 0); });
  });
  function badges() {
    var n = count();
    $all("[data-mistakes-count]").forEach(function (el) { el.textContent = n ? " (" + n + ")" : ""; });
  }

  APP.on("view", function (name) { badges(); if (name === "fehler") render(); });
  L.onChange(function () { badges(); if (!view.hidden) render(); });

  window.FIQH_MISTAKES = { count: count, practice: practice };
  badges();
  if (!view.hidden) render();
})();
