/* Fächer: the start page with one card per subject.
   A new subject (e.g. ʿAqīda) gets its own view and an entry in SUBJECTS below;
   until then it shows up as "bald". */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN, AR = window.FIQH_ARABIC;
  var box = document.getElementById("subjects");
  if (!APP || !box) return;
  var esc = APP.esc, T = window.T || function (x) { return x; };
  function num(n) { return Number(n).toLocaleString(window.I18N ? window.I18N.locale : "de-DE"); }

  var SUBJECTS = [
    { id: "fiqh", name: "Fiqh", ar: "الفقه",
      text: T("Das praktische Recht: Reinheit, Gebet, Fasten, Zakāt, Ḥaǧǧ und Alltag – mit Schwerpunkt auf der hanafitischen Rechtsschule."),
      meta: function () { return [[APP.TOPICS.length, T("Themen")], [APP.QUESTIONS.length, T("Fragen")]]; },
      stats: function () { return L ? L.stats() : null; },
      actions: [{ label: T("Nachschlagen"), view: "nachschlagen", primary: true }, { label: T("Lernen"), view: "lernen", progress: true }] },
    { id: "arabisch", name: T("Arabisch"), ar: "اللُّغَةُ الْعَرَبِيَّةُ",
      text: T("Madina-Buch 1: Vokabeln, Grammatik, Sarf nach der Emsile und Iʿrāb – bis du einen Satz vollständig analysieren kannst."),
      meta: function () {
        if (!AR) return [];
        return [[AR.lessons.length, T("Lektionen")], [AR.lessons.reduce(function (n, l) { return n + l.vocab.length; }, 0), T("Vokabeln")]];
      },
      stats: function () { return AR ? AR.stats() : null; },
      actions: [{ label: T("Lektionen öffnen"), view: "arabisch", primary: true }] },
    { id: "aqida", name: "ʿAqīda", ar: "العقيدة", soon: true,
      text: T("Die Glaubenslehre: Allah, Seine Namen und Eigenschaften und die sechs Säulen des Īmān.") },
    { id: "tazkiya", name: "Tazkiya", ar: "التزكية", soon: true,
      text: T("Die Läuterung des Herzens: Aufrichtigkeit, Reue, Geduld, Dankbarkeit und guter Charakter.") },
    { id: "propheten", name: T("Propheten"), ar: "قصص الأنبياء", soon: true,
      text: T("Die Geschichten der Propheten – von Ādam bis Muḥammad ﷺ – und was wir aus ihnen lernen.") }
  ];

  function bar(s) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / s.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + T("{n} von {m} gelernt", { n: s.learned, m: s.total }) + '">' + seg(s.learned, "ok") + seg(s.almost, "mid") + seg(s.wrong, "bad") + "</span>";
  }

  /* the Fehlerordner sits right after the subjects you can already learn */
  function folderHtml() {
    var MF = window.FIQH_MISTAKES;
    if (!MF) return "";
    var n = MF.count();
    return '<div class="panel home-folder"><span class="mf-icon" aria-hidden="true"></span><p><b>' + T("Fehlerordner") + "</b> · " +
      (n ? T(n === 1 ? "{n} Frage wartet aufs Wiederholen" : "{n} Fragen warten aufs Wiederholen", { n: n }) : T("keine offenen Fehler")) + "</p>" +
      '<button type="button" class="btn' + (n ? " btn-primary" : "") + '" data-open="fehler">' + (n ? T("Fehler wiederholen") : T("Öffnen")) + "</button></div>";
  }

  function render() {
    var folderDone = false;
    box.innerHTML = SUBJECTS.map(function (sub) {
      var head = '<div class="subject-head"><h2>' + esc(sub.name) + '</h2><span class="subject-ar" lang="ar" dir="rtl">' + esc(sub.ar) + "</span></div>";
      if (sub.soon) {
        var pre = folderDone ? "" : folderHtml();
        folderDone = true;
        return pre + '<article class="subject is-soon">' + head + "<p>" + esc(sub.text) + '</p><span class="soon-badge">' + T("Kommt bald") + "</span></article>";
      }
      var s = sub.stats && sub.stats();
      var started = s && s.learned + s.almost + s.wrong > 0;
      var meta = sub.meta().map(function (m) { return "<span><b>" + num(m[0]) + "</b> " + esc(m[1]) + "</span>"; }).join("");
      return '<article class="subject">' + head + "<p>" + esc(sub.text) + "</p>" +
        '<div class="subject-meta">' + meta + "</div>" +
        (started ? '<div class="subject-progress">' + bar(s) + "<small>" + (s.pct === 100 ? T("✓ alles gelernt") : T("{n} % gelernt", { n: s.pct })) + "</small></div>" : "") +
        '<div class="subject-actions">' + sub.actions.map(function (a) {
          var label = a.label + (a.progress && started ? " · " + s.pct + " %" : "");
          return '<button type="button" class="btn' + (a.primary ? " btn-primary" : "") + '" data-open="' + a.view + '">' + esc(label) + "</button>";
        }).join("") + "</div></article>";
    }).join("") + (folderDone ? "" : folderHtml());
    Array.prototype.forEach.call(box.querySelectorAll("[data-open]"), function (b) {
      b.addEventListener("click", function () { APP.showView(b.getAttribute("data-open")); window.scrollTo(0, 0); });
    });
  }

  APP.on("view", function (name) { if (name === "start") render(); });
  if (L && L.onChange) L.onChange(function () { if (!document.getElementById("view-home").hidden) render(); });
  render();
})();
