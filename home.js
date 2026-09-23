/* Fächer: the start page with one card per subject.
   A new subject (e.g. ʿAqīda) gets its own view and an entry in SUBJECTS below;
   until then it shows up as "bald". */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN, AR = window.FIQH_ARABIC;
  var box = document.getElementById("subjects");
  if (!APP || !box) return;
  var esc = APP.esc;
  function num(n) { return Number(n).toLocaleString("de-DE"); }

  var SUBJECTS = [
    { id: "fiqh", name: "Fiqh", ar: "الفقه",
      text: "Das praktische Recht: Reinheit, Gebet, Fasten, Zakāt, Ḥaǧǧ und Alltag – mit Schwerpunkt auf der hanafitischen Rechtsschule.",
      meta: function () { return [[APP.TOPICS.length, "Themen"], [APP.QUESTIONS.length, "Fragen"]]; },
      stats: function () { return L ? L.stats() : null; },
      actions: [{ label: "Nachschlagen", view: "nachschlagen", primary: true }, { label: "Lernen", view: "lernen", progress: true }] },
    { id: "arabisch", name: "Arabisch", ar: "اللُّغَةُ الْعَرَبِيَّةُ",
      text: "Madina-Buch 1: Vokabeln, Grammatik und alles drumherum – bis du einen Satz vollständig analysieren kannst (Iʿrāb).",
      meta: function () {
        if (!AR) return [];
        return [[AR.lessons.length, "Lektionen"], [AR.lessons.reduce(function (n, l) { return n + l.vocab.length; }, 0), "Vokabeln"]];
      },
      stats: function () { return AR ? AR.stats() : null; },
      actions: [{ label: "Lektionen öffnen", view: "arabisch", primary: true }] },
    { id: "aqida", name: "ʿAqīda", ar: "العقيدة", soon: true,
      text: "Die Glaubenslehre: Allah, Seine Namen und Eigenschaften und die sechs Säulen des Īmān." },
    { id: "tazkiya", name: "Tazkiya", ar: "التزكية", soon: true,
      text: "Die Läuterung des Herzens: Aufrichtigkeit, Reue, Geduld, Dankbarkeit und guter Charakter." },
    { id: "propheten", name: "Propheten", ar: "قصص الأنبياء", soon: true,
      text: "Die Geschichten der Propheten – von Ādam bis Muḥammad ﷺ – und was wir aus ihnen lernen." }
  ];

  function bar(s) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / s.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + s.learned + " von " + s.total + ' gelernt">' + seg(s.learned, "ok") + seg(s.almost, "mid") + seg(s.wrong, "bad") + "</span>";
  }

  function render() {
    box.innerHTML = SUBJECTS.map(function (sub) {
      var head = '<div class="subject-head"><h2>' + esc(sub.name) + '</h2><span class="subject-ar" lang="ar" dir="rtl">' + esc(sub.ar) + "</span></div>";
      if (sub.soon) {
        return '<article class="subject is-soon">' + head + "<p>" + esc(sub.text) + '</p><span class="soon-badge">Kommt bald</span></article>';
      }
      var s = sub.stats && sub.stats();
      var started = s && s.learned + s.almost + s.wrong > 0;
      var meta = sub.meta().map(function (m) { return "<span><b>" + num(m[0]) + "</b> " + esc(m[1]) + "</span>"; }).join("");
      return '<article class="subject">' + head + "<p>" + esc(sub.text) + "</p>" +
        '<div class="subject-meta">' + meta + "</div>" +
        (started ? '<div class="subject-progress">' + bar(s) + "<small>" + (s.pct === 100 ? "✓ alles gelernt" : s.pct + " % gelernt") + "</small></div>" : "") +
        '<div class="subject-actions">' + sub.actions.map(function (a) {
          var label = a.label + (a.progress && started ? " · " + s.pct + " %" : "");
          return '<button type="button" class="btn' + (a.primary ? " btn-primary" : "") + '" data-open="' + a.view + '">' + esc(label) + "</button>";
        }).join("") + "</div></article>";
    }).join("");
    Array.prototype.forEach.call(box.querySelectorAll("[data-open]"), function (b) {
      b.addEventListener("click", function () { APP.showView(b.getAttribute("data-open")); window.scrollTo(0, 0); });
    });
  }

  APP.on("view", function (name) { if (name === "start") render(); });
  if (L && L.onChange) L.onChange(function () { if (!document.getElementById("view-home").hidden) render(); });
  render();
})();
