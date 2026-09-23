/* Sarf (صَرْف): conjugation of sound three-letter verbs, laid out like the Emsile
   (الْأَمْثِلَةُ الْمُخْتَلِفَةُ, model verb نَصَرَ) and the six Abwāb of the Thulāthī Mujarrad.
   Only sound roots (no و/ي/ء, no doubled letter), so every form follows the pattern.

   - FIQH_SARF.conj(verb, form) -> the forms of one table row set (14 persons, or 6)
   - Learning (tab "Sarf" in Arabisch): a table is practised by putting the forms in the
     right order; it counts as learned (ids "ar-s-<root>-<form>", shared progress of learn.js)
     when it is filled without a mistake – right away, or twice after a mistake.
   - FIQH_SARF.play({ tables, label, ... }) runs a series of tables; the Arabisch-Liga uses it. */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN;
  var view = document.getElementById("view-sarf");
  if (!APP || !L || !view) return;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var esc = APP.esc, T = window.T || function (x) { return x; };

  /* ---------- letters ---------- */
  var FA = "َ", DA = "ُ", KA = "ِ", SU = "ْ", SH = "ّ", TUN = "ٌ";
  var V = { a: FA, i: KA, u: DA };

  /* ---------- the six Abwāb and the verbs ---------- */
  var ABWAB = [
    { n: 1, p: "a", m: "u", model: "نَصَرَ يَنْصُرُ", w: "فَعَلَ يَفْعُلُ" },
    { n: 2, p: "a", m: "i", model: "ضَرَبَ يَضْرِبُ", w: "فَعَلَ يَفْعِلُ" },
    { n: 3, p: "a", m: "a", model: "فَتَحَ يَفْتَحُ", w: "فَعَلَ يَفْعَلُ" },
    { n: 4, p: "i", m: "a", model: "عَلِمَ يَعْلَمُ", w: "فَعِلَ يَفْعَلُ" },
    { n: 5, p: "u", m: "u", model: "حَسُنَ يَحْسُنُ", w: "فَعُلَ يَفْعُلُ" },
    { n: 6, p: "i", m: "i", model: "حَسِبَ يَحْسِبُ", w: "فَعِلَ يَفْعِلُ" }
  ];
  /* [root, Bāb, German, transitive] */
  var VERBS = [
    ["نصر", 1, "helfen", 1], ["كتب", 1, "schreiben", 1], ["شكر", 1, "danken", 1], ["طلب", 1, "verlangen, suchen", 1],
    ["ترك", 1, "verlassen, lassen", 1], ["عبد", 1, "anbeten, dienen", 1], ["دخل", 1, "hineingehen", 0], ["خرج", 1, "hinausgehen", 0],
    ["نظر", 1, "schauen", 0], ["سجد", 1, "sich niederwerfen", 0], ["قعد", 1, "sitzen", 0], ["حضر", 1, "anwesend sein", 0],
    ["ضرب", 2, "schlagen", 1], ["غسل", 2, "waschen", 1], ["عرف", 2, "kennen", 1], ["حمل", 2, "tragen", 1],
    ["غفر", 2, "vergeben", 1], ["كسب", 2, "erwerben", 1], ["جلس", 2, "sich setzen", 0], ["نزل", 2, "herabkommen", 0],
    ["رجع", 2, "zurückkehren", 0], ["صبر", 2, "geduldig sein", 0],
    ["فتح", 3, "öffnen", 1], ["جمع", 3, "sammeln", 1], ["منع", 3, "verhindern", 1], ["نفع", 3, "nützen", 1],
    ["زرع", 3, "säen, pflanzen", 1], ["رفع", 3, "heben", 1], ["ذهب", 3, "gehen", 0],
    ["علم", 4, "wissen", 1], ["فهم", 4, "verstehen", 1], ["شرب", 4, "trinken", 1], ["ركب", 4, "reiten, einsteigen", 1],
    ["لبس", 4, "anziehen", 1], ["حفظ", 4, "auswendig lernen, bewahren", 1], ["عمل", 4, "tun, arbeiten", 1], ["سمع", 4, "hören", 1],
    ["فرح", 4, "sich freuen", 0], ["لعب", 4, "spielen", 0], ["حزن", 4, "traurig sein", 0],
    ["حسن", 5, "schön, gut sein", 0], ["كرم", 5, "edel, großzügig sein", 0], ["كبر", 5, "groß sein", 0],
    ["صغر", 5, "klein sein", 0], ["قرب", 5, "nahe sein", 0], ["بعد", 5, "fern sein", 0],
    ["حسب", 6, "meinen, glauben", 1]
  ].map(function (v) {
    var b = ABWAB[v[1] - 1], r = v[0].split("");
    var verb = { id: v[0], r: r, bab: b, de: v[2], t: !!v[3] };
    verb.past = r[0] + FA + r[1] + V[b.p] + r[2] + FA;
    verb.pres = "يَ" + r[0] + SU + r[1] + V[b.m] + r[2] + DA;
    return verb;
  });
  var BY_ID = {};
  VERBS.forEach(function (v) { BY_ID[v.id] = v; });

  /* Emsile order: هو هما هم هي هما هن أنتَ أنتما أنتم أنتِ أنتما أنتنّ أنا نحن */
  var PERSONS = [
    ["هُوَ", "er"], ["هُمَا", "sie beide (m.)"], ["هُمْ", "sie (m. Pl.)"],
    ["هِيَ", "sie"], ["هُمَا", "sie beide (f.)"], ["هُنَّ", "sie (f. Pl.)"],
    ["أَنْتَ", "du (m.)"], ["أَنْتُمَا", "ihr beide (m.)"], ["أَنْتُمْ", "ihr (m.)"],
    ["أَنْتِ", "du (f.)"], ["أَنْتُمَا", "ihr beide (f.)"], ["أَنْتُنَّ", "ihr (f.)"],
    ["أَنَا", "ich"], ["نَحْنُ", "wir"]
  ];
  var NOUN_ROWS = [["مُفْرَدٌ مُذَكَّرٌ", "Singular m."], ["مُثَنًّى مُذَكَّرٌ", "Dual m."], ["جَمْعٌ مُذَكَّرٌ", "Plural m."],
    ["مُفْرَدٌ مُؤَنَّثٌ", "Singular f."], ["مُثَنًّى مُؤَنَّثٌ", "Dual f."], ["جَمْعٌ مُؤَنَّثٌ", "Plural f."]];
  var SECOND = [6, 7, 8, 9, 10, 11];

  /* endings */
  var PAST_END = [FA, FA + "ا", DA + "وا", FA + "تْ", FA + "تَا", SU + "نَ", SU + "تَ", SU + "تُمَا", SU + "تُمْ", SU + "تِ", SU + "تُمَا", SU + "تُنَّ", SU + "تُ", SU + "نَا"];
  var PRE = ["ي", "ي", "ي", "ت", "ت", "ي", "ت", "ت", "ت", "ت", "ت", "ت", "أ", "ن"];
  var IND = [DA, FA + "انِ", DA + "ونَ", DA, FA + "انِ", SU + "نَ", DA, FA + "انِ", DA + "ونَ", KA + "ينَ", FA + "انِ", SU + "نَ", DA, DA];
  var JUS = [SU, FA + "ا", DA + "وا", SU, FA + "ا", SU + "نَ", SU, FA + "ا", DA + "وا", KA + "ي", FA + "ا", SU + "نَ", SU, SU];
  var SUBJ = [FA, FA + "ا", DA + "وا", FA, FA + "ا", SU + "نَ", FA, FA + "ا", DA + "وا", KA + "ي", FA + "ا", SU + "نَ", FA, FA];
  var NOUN_END = [TUN, FA + "انِ", DA + "ونَ", FA + "ةٌ", FA + "تَانِ", FA + "اتٌ"];

  /* the last root letter meets a suffix that starts with the same letter (سَكَتْتُ -> سَكَتُّ, حَسُنْنَ -> حَسُنَّ) */
  function join(stem, last, end) {
    if (end.charAt(0) === SU && end.charAt(1) === last) return stem + last + SH + end.slice(2);
    return stem + last + end;
  }
  function past(v, i, passive) {
    var r = v.r;
    return join(r[0] + (passive ? DA : FA) + r[1] + (passive ? KA : V[v.bab.p]), r[2], PAST_END[i]);
  }
  function present(v, i, ends, passive) {
    var r = v.r;
    return join(PRE[i] + (passive ? DA : FA) + r[0] + SU + r[1] + (passive ? FA : V[v.bab.m]), r[2], ends[i]);
  }
  function imperative(v, i) {
    var r = v.r;
    return join("ا" + (v.bab.m === "u" ? DA : KA) + r[0] + SU + r[1] + V[v.bab.m], r[2], JUS[i]);
  }
  function noun(stem, last, i) { return stem + last + NOUN_END[i]; }

  /* the forms, as in the Emsile */
  var FORMS = [
    { id: "madi", de: "Vergangenheit", ar: "الْفِعْلُ الْمَاضِي الْمَعْلُومُ", rows: "p", core: 1,
      make: function (v, i) { return past(v, i, false); } },
    { id: "mudari", de: "Gegenwart / Zukunft", ar: "الْفِعْلُ الْمُضَارِعُ الْمَعْلُومُ", rows: "p", core: 1,
      make: function (v, i) { return present(v, i, IND, false); } },
    { id: "madi_p", de: "Vergangenheit Passiv", ar: "الْمَاضِي الْمَجْهُولُ", rows: "p", passive: 1,
      make: function (v, i) { return past(v, i, true); } },
    { id: "mudari_p", de: "Gegenwart Passiv", ar: "الْمُضَارِعُ الْمَجْهُولُ", rows: "p", passive: 1,
      make: function (v, i) { return present(v, i, IND, true); } },
    { id: "amr", de: "Befehl", ar: "الْأَمْرُ الْحَاضِرُ", rows: "2",
      make: function (v, i) { return imperative(v, i); } },
    { id: "nahy", de: "Verbot (lā)", ar: "النَّهْيُ الْحَاضِرُ", rows: "2",
      make: function (v, i) { return "لَا " + present(v, i, JUS, false); } },
    { id: "lam", de: "Verneinte Vergangenheit (lam)", ar: "الْجَحْدُ الْمُطْلَقُ", rows: "p",
      make: function (v, i) { return "لَمْ " + present(v, i, JUS, false); } },
    { id: "lan", de: "Verneinte Zukunft (lan)", ar: "تَأْكِيدُ نَفْيِ الِاسْتِقْبَالِ", rows: "p",
      make: function (v, i) { return "لَنْ " + present(v, i, SUBJ, false); } },
    { id: "fail", de: "Partizip Aktiv (Tätiger)", ar: "اسْمُ الْفَاعِلِ", rows: "n",
      make: function (v, i) { return noun(v.r[0] + FA + "ا" + v.r[1] + KA, v.r[2], i); } },
    { id: "maful", de: "Partizip Passiv (Betroffener)", ar: "اسْمُ الْمَفْعُولِ", rows: "n", passive: 1,
      make: function (v, i) { return noun("مَ" + v.r[0] + SU + v.r[1] + DA + "و", v.r[2], i); } }
  ];
  var FORM_BY_ID = {};
  FORMS.forEach(function (f) { FORM_BY_ID[f.id] = f; });

  function formsFor(v) { return FORMS.filter(function (f) { return v.t || !f.passive; }); }
  function rowIdx(f) { return f.rows === "2" ? SECOND : f.rows === "n" ? [0, 1, 2, 3, 4, 5] : PERSONS.map(function (p, i) { return i; }); }
  function rowLabel(f, i) { return f.rows === "n" ? NOUN_ROWS[i] : PERSONS[i]; }
  function conj(v, f) {
    f = typeof f === "string" ? FORM_BY_ID[f] : f;
    return rowIdx(f).map(function (i) { return f.make(v, i); });
  }
  function tid(v, f) { return "ar-s-" + v.id + "-" + f.id; }

  /* ---------- progress: one table = one learning item ---------- */
  var TABLES = [];
  VERBS.forEach(function (v) { formsFor(v).forEach(function (f) { TABLES.push({ v: v, f: f, id: tid(v, f) }); }); });
  function lv(t) { return L.levelOf(t.id); }
  function stats(list) {
    var s = { total: list.length, learned: 0, almost: 0, wrong: 0 };
    list.forEach(function (t) { var l = lv(t); if (l === 2) s.learned++; else if (l === 1) s.almost++; else if (l === -1) s.wrong++; });
    s.pct = s.total ? Math.floor(s.learned / s.total * 100) : 0;
    if (s.total && s.learned === s.total) s.pct = 100;
    return s;
  }
  /* order for "Weiter üben": the core tenses of all verbs first, then the other forms */
  function nextTables(list, n) {
    var open = list.filter(function (t) { return lv(t) !== 2; });
    var wrong = open.filter(function (t) { return lv(t) < 0 || lv(t) === 1; });
    var fresh = open.filter(function (t) { return !lv(t); });
    fresh.sort(function (a, b) { return (b.f.core ? 1 : 0) - (a.f.core ? 1 : 0) || FORMS.indexOf(a.f) - FORMS.indexOf(b.f); });
    return wrong.concat(fresh).slice(0, n);
  }

  /* ---------- the table game ---------- */
  var run = null;   // { tables, i, results, opts }
  function play(opts) {
    run = { tables: opts.tables, i: 0, results: [], opts: opts };
    if (APP.tabOf) APP.tabOf.sarf = opts.tab || "start";
    APP.showView("sarf");
    board();
    window.scrollTo(0, 0);
  }
  function seededShuffle(list) { return APP.shuffle(list); }

  function board() {
    var t = run.tables[run.i], v = t.v, f = t.f;
    var right = conj(v, f), idx = rowIdx(f);
    /* two or three wrong forms of the same verb make the pool harder */
    var others = [];
    formsFor(v).forEach(function (g) { if (g !== f && g.rows === f.rows) others = others.concat(conj(v, g)); });
    if (f.rows === "2") others = others.concat(SECOND.map(function (i) { return present(v, i, JUS, false); }));
    others = others.filter(function (x, k) { return right.indexOf(x) === -1 && others.indexOf(x) === k; });
    var extra = seededShuffle(others).slice(0, run.opts.extra === undefined ? 3 : run.opts.extra);
    var st = { slots: right.map(function () { return null; }), pool: seededShuffle(right.concat(extra)).map(function (x, k) { return { k: k, x: x, used: false }; }), sel: 0, checked: false };
    run.st = st;
    $("#sarf-head").innerHTML =
      '<p class="eyebrow">' + esc(run.opts.label || "Sarf") + (run.tables.length > 1 ? " · " + T("Tabelle {n} von {m}", { n: run.i + 1, m: run.tables.length }) : "") + "</p>" +
      '<h2><span lang="ar" dir="rtl" class="sarf-verb">' + esc(v.past) + " " + esc(v.pres) + "</span> <small>" + esc(T(v.de)) + "</small></h2>" +
      '<p class="sarf-form"><b>' + esc(T(f.de)) + '</b> · <span lang="ar" dir="rtl">' + esc(f.ar) + "</span> · Bāb " + v.bab.n + ' <span lang="ar" dir="rtl">(' + esc(v.bab.w) + ")</span></p>" +
      '<p class="sarf-help">' + T("Tippe die Formen in der richtigen Reihenfolge an. Ein Feld antippen, um es zu leeren oder auszuwählen.") + (extra.length ? " " + T("Achtung: {n} Formen passen nicht in diese Tabelle.", { n: extra.length }) : "") + "</p>";
    draw();
  }
  function draw() {
    var t = run.tables[run.i], f = t.f, st = run.st, right = conj(t.v, f), idx = rowIdx(f);
    $("#sarf-grid").innerHTML = idx.map(function (pi, k) {
      var lab = rowLabel(f, pi), val = st.slots[k] !== null ? st.pool[st.slots[k]].x : "";
      var cls = "sarf-slot" + (k === st.sel && !st.checked ? " is-sel" : "") + (st.checked ? (val === right[k] ? " is-ok" : " is-bad") : "");
      return '<div class="sarf-row"><span class="sarf-p"><span lang="ar" dir="rtl">' + esc(lab[0]) + "</span><small>" + esc(T(lab[1])) + "</small></span>" +
        '<button type="button" class="' + cls + '" data-slot="' + k + '"' + (st.checked ? " disabled" : "") + ' lang="ar" dir="rtl">' + esc(val) +
        (st.checked && val !== right[k] ? '<small class="sarf-right">' + esc(right[k]) + "</small>" : "") + "</button></div>";
    }).join("");
    $("#sarf-pool").innerHTML = st.checked ? "" : st.pool.map(function (c) {
      return '<button type="button" class="sarf-chip" data-chip="' + c.k + '"' + (c.used ? " disabled" : "") + ' lang="ar" dir="rtl">' + esc(c.x) + "</button>";
    }).join("");
    var full = st.slots.every(function (s) { return s !== null; });
    var go = $("#sarf-check");
    if (st.checked) {
      var ok = st.slots.filter(function (s, k) { return st.pool[s].x === right[k]; }).length;
      $("#sarf-result").hidden = false;
      $("#sarf-result").className = "feedback " + (ok === right.length ? "good" : "bad");
      $("#sarf-result").innerHTML = "<p><b>" + (ok === right.length ? T("Fehlerfrei!") : T("{n} von {m} richtig", { n: ok, m: right.length })) + "</b>" +
        (st.note ? " · " + esc(st.note) : "") + "</p>";
      go.textContent = run.i + 1 < run.tables.length ? T("Nächste Tabelle") : T("Fertig");
      go.disabled = false;
    } else {
      $("#sarf-result").hidden = true;
      go.textContent = T("Prüfen");
      go.disabled = !full;
    }
    $all("[data-slot]", view).forEach(function (b) {
      b.addEventListener("click", function () {
        var k = +b.getAttribute("data-slot");
        if (st.slots[k] !== null) { st.pool[st.slots[k]].used = false; st.slots[k] = null; }
        st.sel = k;
        draw();
      });
    });
    $all("[data-chip]", view).forEach(function (b) {
      b.addEventListener("click", function () {
        var c = st.pool[+b.getAttribute("data-chip")];
        var k = st.slots[st.sel] === null ? st.sel : st.slots.indexOf(null);
        if (k === -1) return;
        st.slots[k] = c.k; c.used = true;
        var next = st.slots.indexOf(null, k + 1);
        st.sel = next !== -1 ? next : st.slots.indexOf(null);
        draw();
      });
    });
  }
  $("#sarf-check").addEventListener("click", function () {
    var t = run.tables[run.i], st = run.st, right = conj(t.v, t.f);
    if (!st.checked) {
      st.checked = true;
      var ok = st.slots.filter(function (s, k) { return st.pool[s].x === right[k]; }).length;
      var res = { table: t, correct: ok, total: right.length };
      run.results.push(res);
      if (run.opts.onTable) st.note = run.opts.onTable(res) || "";
      draw();
      return;
    }
    if (run.i + 1 < run.tables.length) { run.i++; board(); window.scrollTo(0, 0); return; }
    finish(true);
  });
  $("#sarf-quit").addEventListener("click", function () { if (run) finish(false); });
  function finish(done) {
    var r = run;
    run = null;
    if (r.opts.onFinish) r.opts.onFinish(r.results, done);
    if (r.opts.onLeave) r.opts.onLeave(); else { APP.showView("arabisch"); window.scrollTo(0, 0); }
  }

  /* ---------- learning (tab "Sarf" in Arabisch) ---------- */
  var state = { verb: null, last: null };
  function learnTables(list, label) {
    if (!list.length) return;
    var before = stats(TABLES);
    play({
      tables: list, label: label, tab: "start",
      onTable: function (res) { return L.recordId(res.table.id, res.correct === res.total); },
      onFinish: function (results) {
        if (!results.length) return;
        state.last = { n: results.length, perfect: results.filter(function (r) { return r.correct === r.total; }).length, before: before, after: stats(TABLES) };
        L.sync();
      },
      onLeave: function () { APP.showView("arabisch"); if (window.FIQH_ARABIC_RENDER) window.FIQH_ARABIC_RENDER("sarf"); window.scrollTo(0, 0); }
    });
  }
  function bar(s) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / s.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + T("{n} von {m} gelernt", { n: s.learned, m: s.total }) + '">' + seg(s.learned, "ok") + seg(s.almost, "mid") + seg(s.wrong, "bad") + "</span>";
  }
  function fullTable(v) {
    var fs = formsFor(v);
    function block(list, rows, labels) {
      return '<div class="ar-table-wrap"><table class="ar-table sarf-table"><thead><tr><th></th>' +
        list.map(function (f) { return '<th><span lang="ar" dir="rtl">' + esc(f.ar) + "</span><small>" + esc(T(f.de)) + "</small></th>"; }).join("") + "</tr></thead><tbody>" +
        rows.map(function (pi, k) {
          return '<tr><th><span lang="ar" dir="rtl">' + esc(labels(pi)[0]) + "</span><small>" + esc(T(labels(pi)[1])) + "</small></th>" +
            list.map(function (f) {
              var ri = rowIdx(f).indexOf(pi);
              return '<td lang="ar" dir="rtl">' + (ri === -1 ? "" : esc(f.make(v, pi))) + "</td>";
            }).join("") + "</tr>";
        }).join("") + "</tbody></table></div>";
    }
    var verbal = fs.filter(function (f) { return f.rows !== "n"; }), nouns = fs.filter(function (f) { return f.rows === "n"; });
    return block(verbal, PERSONS.map(function (p, i) { return i; }), function (i) { return PERSONS[i]; }) +
      block(nouns, [0, 1, 2, 3, 4, 5], function (i) { return NOUN_ROWS[i]; });
  }
  function pane() {
    var all = stats(TABLES), core = stats(TABLES.filter(function (t) { return t.f.core; }));
    var v = state.verb && BY_ID[state.verb];
    var html = '<div class="sarf-pane">';
    if (state.last) {
      var r = state.last;
      html += '<div class="panel learn-round"><h3>' + T(r.n === 1 ? "{p} von {n} Tabelle fehlerfrei" : "{p} von {n} Tabellen fehlerfrei", { p: r.perfect, n: r.n }) + "</h3>" +
        "<p>" + T("Sarf gesamt:") + " <b>" + r.before.pct + " % → " + r.after.pct + " %</b></p>" +
        '<div class="lr-actions"><button type="button" class="btn btn-primary" data-sarf-next>' + T("Weiter üben") + '</button><button type="button" class="linkish" data-sarf-close>' + T("Schließen") + "</button></div></div>";
    }
    if (!v) {
      html += '<div class="panel ar-irab-cta"><div><p class="eyebrow">Sarf · صَرْف</p><h3>' + T("Verben konjugieren wie in der Emsile") + "</h3>" +
        "<p>" + T("{v} Verben aus allen sechs Abwāb, je bis zu {f} Formen: Vergangenheit und Gegenwart, Passiv, Befehl, Verbot, Verneinung mit lam und lan, Partizip Aktiv und Passiv.", { v: VERBS.length, f: FORMS.length }) + " " +
        T("Eine Tabelle ist gelernt, wenn du sie fehlerfrei ordnest – nach einem Fehler zweimal hintereinander.") + "</p>" +
        '<div class="learn-stats"><span>' + T("<b>{n}</b> von {m} Tabellen gelernt", { n: all.learned, m: all.total }) + "</span><span>" + T("<b>{n} %</b> Vergangenheit &amp; Gegenwart", { n: core.pct }) + "</span></div></div>" +
        '<div class="ar-irab-actions"><button type="button" class="btn btn-primary" data-sarf-next>' + (all.learned ? T("Weiter üben") : T("Loslegen")) + " · " + all.pct + " %</button></div></div>";
      html += ABWAB.map(function (b) {
        var vs = VERBS.filter(function (x) { return x.bab === b; });
        return '<section class="lg"><h3 class="lg-head"><span>Bāb ' + b.n + ' <span lang="ar" dir="rtl" class="sarf-bab">' + esc(b.model) + "</span></span><small>" + esc(b.w) + "</small></h3>" +
          '<ol class="lt-list">' + vs.map(function (x) {
            var s = stats(TABLES.filter(function (t) { return t.v === x; }));
            var st = s.pct === 100 ? "done" : s.learned + s.almost + s.wrong ? "busy" : "new";
            return '<li class="lt lt-' + st + '"><button type="button" class="ar-lesson" data-sarf-verb="' + x.id + '">' +
              '<span class="ar-num sarf-num" lang="ar" dir="rtl">' + esc(x.past) + "</span>" +
              '<span class="lt-main"><span class="lt-title"><strong>' + esc(T(x.de)) + '</strong><span class="lt-ar" lang="ar" dir="rtl">' + esc(x.pres) + "</span></span>" + bar(s) +
              '<small class="lt-meta">' + T("{n} Tabellen", { n: s.total }) + (x.t ? "" : " · " + T("intransitiv, ohne Passiv")) + "</small></span>" +
              '<span class="lt-pct">' + (st === "done" ? "✓" : s.pct + " %") + "</span></button></li>";
          }).join("") + "</ol></section>";
      }).join("");
    } else {
      var ts = TABLES.filter(function (t) { return t.v === v; });
      html += '<div class="ar-lesson-view"><button type="button" class="linkish ar-back" data-sarf-back>← ' + T("Alle Verben") + "</button>" +
        '<div class="panel sarf-verb-head"><h3><span lang="ar" dir="rtl" class="sarf-verb">' + esc(v.past) + " " + esc(v.pres) + "</span> " + esc(T(v.de)) + "</h3>" +
        "<p>Bāb " + v.bab.n + ' <span lang="ar" dir="rtl">' + esc(v.bab.w) + "</span> · " + T("wie") + ' <span lang="ar" dir="rtl">' + esc(v.bab.model) + "</span>" + (v.t ? "" : " · " + T("intransitiv, daher ohne Passiv")) + "</p>" +
        '<div class="ar-parts">' + ts.map(function (t) {
          var l = lv(t), s = { total: 1, learned: l === 2 ? 1 : 0, almost: l === 1 ? 1 : 0, wrong: l === -1 ? 1 : 0 };
          return '<button type="button" class="ar-part' + (l === 2 ? " is-done" : "") + '" data-sarf-table="' + t.id + '"><strong>' + esc(T(t.f.de)) + "</strong>" + bar(s) +
            "<small>" + (l === 2 ? T("✓ gelernt") : l === 1 ? T("fast – noch 1× fehlerfrei") : l === -1 ? T("nochmal üben") : T("offen")) + "</small></button>";
        }).join("") + "</div>" +
        '<div class="lr-actions"><button type="button" class="btn btn-primary" data-sarf-verb-all>' + T("Alle offenen Tabellen üben") + "</button></div></div>" +
        '<section class="ar-block"><h3>' + T("Die ganze Tabelle") + "</h3>" + fullTable(v) + "</section></div>";
    }
    return html + "</div>";
  }
  function wire(body, rerender) {
    $all("[data-sarf-verb]", body).forEach(function (b) {
      b.addEventListener("click", function () { state.verb = b.getAttribute("data-sarf-verb"); rerender(); });
    });
    var back = $("[data-sarf-back]", body);
    if (back) back.addEventListener("click", function () { state.verb = null; rerender(); });
    $all("[data-sarf-next]", body).forEach(function (b) {
      b.addEventListener("click", function () { state.last = null; learnTables(nextTables(TABLES, 3), "Sarf"); });
    });
    var close = $("[data-sarf-close]", body);
    if (close) close.addEventListener("click", function () { state.last = null; rerender(); });
    $all("[data-sarf-table]", body).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-sarf-table");
        learnTables(TABLES.filter(function (t) { return t.id === id; }), "Sarf");
      });
    });
    var va = $("[data-sarf-verb-all]", body);
    if (va) va.addEventListener("click", function () {
      var ts = TABLES.filter(function (t) { return t.v.id === state.verb; });
      var open = nextTables(ts, ts.length);
      learnTables(open.length ? open : ts, "Sarf");
    });
  }

  window.FIQH_SARF = {
    VERBS: VERBS, FORMS: FORMS, FORM_BY_ID: FORM_BY_ID, PERSONS: PERSONS, TABLES: TABLES,
    conj: conj, formsFor: formsFor, play: play, pane: pane, wire: wire, stats: function () { return stats(TABLES); },
    table: function (verbId, formId) { var v = BY_ID[verbId]; return { v: v, f: FORM_BY_ID[formId], id: tid(v, FORM_BY_ID[formId]) }; }
  };
})();
