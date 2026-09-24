/* Arabisch: Madina-Buch 1 und 2 – Lektionen, Vokabeln, Grammatik und Iʿrāb.
   Data: arabisch/madina1-*.js and madina2-*.js (window.MADINA; book-2 lessons carry book: 2).
   Book 2 opens once the last BOOK2_GATE lessons of book 1 are learned to 100 % (no open mistakes).
   Learning uses the quiz engine (learn mode)
   and the shared progress of learn.js; ids start with "ar-":
     ar-v-… meaning of a word · ar-d-… German → Arabic · ar-p-… plural
     ar-g-… grammar question · ar-i-… iʿrāb of a marked word */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN, M = window.MADINA, S = window.FIQH_SARF;
  if (!APP || !L || !M || !document.getElementById("view-arabic")) return;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var esc = APP.esc, hash = L.hash, T = window.T || function (x) { return x; };
  var ROUND = 10;
  var LESSONS = M.lessons;
  var BY_ID = {};
  LESSONS.forEach(function (l) { BY_ID[l.id] = l; });
  function bookOf(l) { return l.book || 1; }
  var BOOKS = { 1: LESSONS.filter(function (l) { return bookOf(l) === 1; }), 2: LESSONS.filter(function (l) { return bookOf(l) === 2; }) };
  var BOOK2_GATE = 5;

  /* ---------- text helpers ---------- */
  var AR = "\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF";
  /* one Arabic phrase, including **bold** inside it, so it stays one right-to-left block */
  var AR_RUN = new RegExp("(?:\\*\\*)?[" + AR + "](?:[" + AR + "\\s،؛؟.…–\\-/()*]*[" + AR + "])?[؟]?(?:\\*\\*)?", "g");
  function strip(s) { return String(s).replace(/\*\*/g, ""); }
  /* German text with inline Arabic and **bold** -> HTML */
  function rich(s) {
    var html = esc(s).replace(AR_RUN, function (m) { return '<span class="ar-in" lang="ar" dir="rtl">' + m + "</span>"; });
    /* ** toggles bold; close and reopen <b> around span borders so tags stay nested */
    var bold = false;
    return html.replace(/\*\*|<span[^>]*>|<\/span>/g, function (t) {
      if (t === "**") { bold = !bold; return bold ? "<b>" : "</b>"; }
      return bold ? "</b>" + t + "<b>" : t;
    }) + (bold ? "</b>" : "");
  }
  function ar(s, cls) { return '<span class="' + (cls || "ar-in") + '" lang="ar" dir="rtl">' + esc(s) + "</span>"; }

  /* deterministic random (same distractors on every device) */
  function seeded(str) {
    var h = parseInt(hash(str), 36) || 1;
    return function () { h = (h * 1103515245 + 12345) & 0x7fffffff; return h / 0x7fffffff; };
  }
  function pickOthers(pool, avoid, n, rnd) {
    var seen = {}, out = [];
    avoid.forEach(function (a) { seen[a] = 1; });
    var copy = pool.slice();
    while (out.length < n && copy.length) {
      var x = copy.splice(Math.floor(rnd() * copy.length), 1)[0];
      if (!seen[x]) { seen[x] = 1; out.push(x); }
    }
    return out;
  }

  /* ---------- questions ---------- */
  var ALL_DE = [], ALL_AR = [], ALL_PL = [];
  LESSONS.forEach(function (l) {
    l.vocab.forEach(function (v) {
      ALL_DE.push(v[1]); ALL_AR.push(v[0]);
      if (v[2]) ALL_PL.push(v[2]);
    });
  });
  function near(list, key, field) {
    /* distractors: first from the same lesson, then from all */
    return list.map(function (v) { return v[field]; }).filter(function (x) { return x && x !== key; });
  }
  var SETS = {};     // lessonId -> { vocab: [...], gram: [...], irab: [...] }
  var QS = [];       // all questions
  var seenIds = {};
  function add(set, q) {
    if (seenIds[q._lid]) return;
    seenIds[q._lid] = 1;
    set.push(q); QS.push(q);
  }
  LESSONS.forEach(function (l) {
    var s = SETS[l.id] = { vocab: [], gram: [], irab: [] };
    var b2 = bookOf(l) === 2, pre = b2 ? "b2|" : "";
    var tt = b2 ? T("Arabisch · Buch 2 · Lektion {n}", { n: l.n }) : T("Arabisch · Lektion {n}", { n: l.n });
    var srcText = T("Quelle: Madina-Buch {b}, Lektion {n}", { b: bookOf(l), n: l.n }) + " – " + l.title;
    function base(id, extra) {
      var q = { t: "arabisch", tt: tt, srcText: srcText, c: 0, lesson: l.id, _lid: id };
      Object.keys(extra).forEach(function (k) { q[k] = extra[k]; });
      return q;
    }
    l.vocab.forEach(function (v) {
      var word = v[0], de = v[1], pl = v[2], key = hash(pre + word + "|" + de), rnd = seeded(key);
      var sameDe = near(l.vocab, de, 1), sameAr = near(l.vocab, word, 0);
      var info = word + " = " + de + (pl ? " · Plural: " + pl : "");
      var wrongDe = pickOthers(sameDe, [de], 3, rnd);
      if (wrongDe.length < 3) wrongDe = wrongDe.concat(pickOthers(ALL_DE, [de].concat(wrongDe), 3 - wrongDe.length, rnd));
      add(s.vocab, base("ar-v-" + key, { q: T("Was bedeutet dieses Wort?"), ar: word, a: [de].concat(wrongDe), e: info }));
      var wrongAr = pickOthers(sameAr, [word], 3, rnd);
      if (wrongAr.length < 3) wrongAr = wrongAr.concat(pickOthers(ALL_AR, [word].concat(wrongAr), 3 - wrongAr.length, rnd));
      add(s.vocab, base("ar-d-" + key, { q: T("Wie heißt „{w}“ auf Arabisch?", { w: de }), a: [word].concat(wrongAr), e: info }));
      if (pl && pl.indexOf("/") === -1) {
        var wrongPl = pickOthers(near(l.vocab, pl, 2), [pl, word], 3, rnd);
        if (wrongPl.length < 3) wrongPl = wrongPl.concat(pickOthers(ALL_PL, [pl, word].concat(wrongPl), 3 - wrongPl.length, rnd));
        add(s.vocab, base("ar-p-" + key, { q: T("Wie lautet der Plural von „{w}“?", { w: de }), ar: word, a: [pl].concat(wrongPl), e: info }));
      }
    });
    l.quiz.forEach(function (g) {
      add(s.gram, base("ar-g-" + hash(pre + g.q + "|" + g.a[0]), { q: strip(g.q), ar: g.ar, a: g.a, e: strip(g.e) }));
    });
    l.irab.forEach(function (it) {
      add(s.irab, base("ar-i-" + hash(pre + it.s + "|" + it.w), { q: T("Iʿrāb des markierten Wortes:"), ar: it.s, arMark: it.w, a: it.a, e: strip(it.e) }));
    });
  });
  function lessonQs(id) { var s = SETS[id]; return s.vocab.concat(s.gram, s.irab); }
  /* ALL_IRAB: book 1 plus the generated sentences (irabgen.js works with the book-1 vocabulary) */
  var ALL_IRAB = [], IRAB2 = [];
  BOOKS[1].forEach(function (l) { ALL_IRAB = ALL_IRAB.concat(SETS[l.id].irab); });
  BOOKS[2].forEach(function (l) { IRAB2 = IRAB2.concat(SETS[l.id].irab); });
  function qBook(q) { return q.lesson === "gen" ? 1 : bookOf(BY_ID[q.lesson]); }

  /* ---------- new Iʿrāb sentences (irabgen.js) ----------
     When every Iʿrāb sentence is learned, 10 new ones are unlocked after GEN_WAIT.
     Batch k is always the same 10 sentences, so the progress ids stay valid on every device;
     the number of batches is remembered here and found again from the synced progress. */
  var GEN = window.FIQH_IRABGEN, GEN_SIZE = 10, GEN_WAIT = 24 * 36e5;
  var gen = { n: 0, doneAt: 0, fresh: 0 };
  try { var g0 = JSON.parse(localStorage.getItem("fiqh:irabgen") || "null"); if (g0) { gen.n = +g0.n || 0; gen.doneAt = +g0.doneAt || 0; } } catch (e) {}
  function saveGen() { try { localStorage.setItem("fiqh:irabgen", JSON.stringify({ n: gen.n, doneAt: gen.doneAt })); } catch (e) {} }
  var genSkip = {}, genBatches = [];
  ALL_IRAB.forEach(function (q) { genSkip[q.ar + "|" + q.arMark] = 1; genSkip[q.ar.replace(/\.$/, "") + ".|" + q.arMark] = 1; });
  function genBatch(k) {
    while (genBatches.length < k) {
      var list = GEN.make("batch" + (genBatches.length + 1), GEN_SIZE, genSkip).map(function (x) {
        genSkip[x.key] = 1;
        return { t: "arabisch", tt: T("Arabisch · Iʿrāb (neue Sätze)"), srcText: T("Neue Sätze aus dem Wortschatz von Madina-Buch 1"),
          c: 0, lesson: "gen", _lid: "ar-x-" + hash(x.key), q: x.q, ar: x.ar, arMark: x.arMark, a: x.a, e: x.e };
      });
      genBatches.push(list);
    }
    return genBatches[k - 1];
  }
  function genTouched(k) { return genBatch(k).some(function (q) { return L.levelOf(q._lid) !== 0; }); }
  function genAdd(upTo) {
    if (!GEN) return;
    while (gen.n < upTo) {
      gen.n++;
      genBatch(gen.n).forEach(function (q) { if (!seenIds[q._lid]) { seenIds[q._lid] = 1; ALL_IRAB.push(q); QS.push(q); } });
    }
  }
  function genLoaded() {
    var have = 0;
    ALL_IRAB.forEach(function (q) { if (q.lesson === "gen") have++; });
    return have / GEN_SIZE;
  }
  /* catch up with batches unlocked on another device (they show up in the synced progress) */
  function genSync() {
    if (!GEN) return;
    var n = gen.n;
    while (n < 200 && genTouched(n + 1)) n++;
    if (n > gen.n || genLoaded() < gen.n) { var want = Math.max(n, gen.n); gen.n = genLoaded(); genAdd(want); saveGen(); }
  }
  function genCheck() {
    if (!GEN) return;
    var all = ALL_IRAB.every(function (q) { return L.levelOf(q._lid) === 2; });
    if (!all) { if (gen.doneAt) { gen.doneAt = 0; saveGen(); } return; }
    if (!gen.doneAt) { gen.doneAt = Date.now(); saveGen(); }
    if (Date.now() - gen.doneAt >= GEN_WAIT) { genAdd(gen.n + 1); gen.doneAt = 0; gen.fresh = GEN_SIZE; saveGen(); }
  }
  function genNote() {
    if (!GEN) return "";
    if (gen.fresh) return '<p class="ar-gen-note is-new">✦ ' + T("{n} neue Sätze sind da – sie stehen im Iʿrāb-Training ganz vorne.", { n: gen.fresh }) + "</p>";
    if (!gen.doneAt) return gen.n ? '<p class="ar-gen-note">' + T("Darunter {n} neue Sätze, die nach dem Meistern freigeschaltet wurden.", { n: gen.n * GEN_SIZE }) + "</p>" : "";
    var left = Math.max(0, GEN_WAIT - (Date.now() - gen.doneAt)), h = Math.ceil(left / 36e5);
    return '<p class="ar-gen-note is-done">' + (h <= 1 ? T("Mā schāʾ Allāh – alle Sätze sitzen! Neue Sätze kommen in weniger als einer Stunde.") : T("Mā schāʾ Allāh – alle Sätze sitzen! Neue Sätze kommen in {n} Stunden.", { n: h })) + "</p>";
  }
  genSync();

  /* ---------- progress (shared store of learn.js) ---------- */
  function lv(q) { return L.levelOf(q._lid); }
  function stats(list) {
    var s = { total: list.length, learned: 0, almost: 0, wrong: 0, fresh: 0 };
    list.forEach(function (q) {
      var l = lv(q);
      if (l === 2) s.learned++; else if (l === 1) s.almost++; else if (l === -1) s.wrong++; else s.fresh++;
    });
    s.pct = s.total ? Math.floor(s.learned / s.total * 100) : 0;
    if (s.total && s.learned === s.total) s.pct = 100;
    return s;
  }
  function roundFor(list, size) {
    var wrong = [], almost = [], fresh = [], learned = [];
    list.forEach(function (q) { var l = lv(q); (l === -1 ? wrong : l === 1 ? almost : l === 2 ? learned : fresh).push(q); });
    var pick = APP.shuffle(wrong).concat(APP.shuffle(almost), fresh).slice(0, size || ROUND);
    return pick.length ? { qs: APP.shuffle(pick), review: false } : { qs: APP.shuffle(learned).slice(0, size || ROUND), review: true };
  }

  /* ---------- state ---------- */
  var state = { tab: "lektionen", lesson: null, filter: "", book: 1 };
  try {
    var saved = JSON.parse(localStorage.getItem("fiqh:arabic") || "null");
    if (saved && saved.tab) state.tab = saved.tab;
    if (saved && saved.book === 2 && BOOKS[2].length) state.book = 2;
  } catch (e) {}
  function remember() { try { localStorage.setItem("fiqh:arabic", JSON.stringify({ tab: state.tab, book: state.book })); } catch (e) {} }
  function lessons() { return BOOKS[state.book]; }
  function bookQs() { return QS.filter(function (q) { return qBook(q) === state.book; }); }
  function irabList() { return state.book === 2 ? IRAB2 : ALL_IRAB; }
  function gateLessons() { return BOOKS[1].slice(-BOOK2_GATE); }
  /* Once earned, book 2 stays open: a later mistake in book 1 does not lock it again. Progress in
     book 2 (synced with the account) counts as proof, so it also opens on a new device. */
  var b2Earned = false;
  try { b2Earned = localStorage.getItem("fiqh:book2") === "1"; } catch (e) {}
  function book2Open() {
    if (b2Earned) return true;
    var ok = gateLessons().every(function (l) { return stats(lessonQs(l.id)).pct === 100; }) ||
      QS.some(function (q) { return qBook(q) === 2 && lv(q) !== 0; });
    if (ok) { b2Earned = true; try { localStorage.setItem("fiqh:book2", "1"); } catch (e) {} }
    return ok;
  }
  function locked() { return state.book === 2 && !book2Open(); }
  var lastRound = null;

  function start(list, label, info, size) {
    var r = roundFor(list, size);
    if (!r.qs.length) return;
    var before = stats(list), correct = 0;
    APP.startQuiz({
      learn: true,
      questions: r.qs,
      label: r.review ? label + " " + T("(Wiederholung)") : label,
      onAnswer: function (q, ok) { if (ok) correct++; return L.recordId(q._lid, ok); },
      onFinish: function (p) {
        lastRound = { label: label, info: info, answered: p.answered, correct: correct, before: before, after: stats(list), list: list, size: size, wrong: p.wrong || [] };
        L.sync();
      },
      onLeave: function () { APP.showView("arabisch"); render(); window.scrollTo(0, 0); }
    });
  }
  function startLesson(id, part) {
    var l = BY_ID[id], s = SETS[id];
    if (bookOf(l) === 2 && !book2Open()) return;
    var list = part ? s[part] : lessonQs(id);
    var names = { vocab: T("Vokabeln"), gram: T("Grammatik"), irab: "Iʿrāb" };
    start(list, (bookOf(l) === 2 ? T("Buch 2") + " · " : "") + T("Lektion") + " " + l.n + (part ? " · " + names[part] : ""), { lesson: id, part: part });
  }
  function nextLesson() {
    var ls = lessons();
    for (var i = 0; i < ls.length; i++) if (stats(lessonQs(ls[i].id)).pct < 100) return ls[i];
    return null;
  }

  /* ---------- rendering ---------- */
  function bar(s) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / s.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + T("{n} von {m} gelernt", { n: s.learned, m: s.total }) + '">' + seg(s.learned, "ok") + seg(s.almost, "mid") + seg(s.wrong, "bad") + "</span>";
  }
  function ring(pct) {
    var r = 52, c = 2 * Math.PI * r;
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="' + r + '" class="ring-bg"/>' +
      '<circle cx="60" cy="60" r="' + r + '" class="ring-fg" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - pct / 100)).toFixed(1) + '"/></svg>' +
      '<span class="ring-num"><b>' + pct + "</b><small>%</small></span>";
  }

  function render() {
    var qs = bookQs(), all = stats(qs), irab = stats(irabList()), ls = lessons(), lock = locked();
    $("#ar-ring").innerHTML = ring(all.pct);
    var done = ls.filter(function (l) { return stats(lessonQs(l.id)).pct === 100; }).length;
    $("#ar-stats").innerHTML =
      "<span>" + T("<b>{n}</b> von {m} Lektionen bei 100 %", { n: done, m: ls.length }) + "</span>" +
      "<span>" + T("<b>{n}</b> Vokabelfragen gelernt", { n: stats(qs.filter(function (q) { return q._lid.indexOf("ar-g-") && q._lid.indexOf("ar-i-"); })).learned }) + "</span>" +
      "<span><b>" + irab.pct + " %</b> Iʿrāb</span>";
    renderBooks();
    var nl = lock ? null : nextLesson(), go = $("#ar-next");
    go.hidden = !nl;
    if (nl) go.textContent = (all.learned ? T("Weiter: Lektion {n}", { n: nl.n }) : T("Loslegen: Lektion {n}", { n: nl.n }));
    var open = all.wrong + all.almost, mis = $("#ar-mistakes");
    mis.hidden = !open || lock;
    mis.textContent = T("Fehler wiederholen ({n})", { n: open });
    $all(".ar-tab").forEach(function (b) { b.setAttribute("aria-selected", b.getAttribute("data-ar-tab") === state.tab ? "true" : "false"); });
    renderRound();
    var body = $("#ar-body");
    if (state.tab === "sarf" && S) { body.innerHTML = S.pane(); S.wire(body, render); return; }
    if (lock) { body.innerHTML = lockPane(); wire(body); return; }
    if (state.tab === "vokabeln") body.innerHTML = vocabPane();
    else if (state.tab === "irab") body.innerHTML = irabPane();
    else body.innerHTML = state.lesson ? lessonPane(BY_ID[state.lesson]) : listPane();
    wire(body);
  }

  function renderRound() {
    var box = $("#ar-round");
    if (!lastRound) { box.hidden = true; return; }
    var r = lastRound, mastered = r.after.pct === 100 && r.before.pct < 100;
    box.hidden = false;
    box.className = "panel learn-round" + (mastered ? " is-mastered" : "");
    var gain = r.after.learned - r.before.learned;
    box.innerHTML = (mastered ? '<p class="lr-badge">' + T("✓ Gemeistert") + "</p><h3>" + T("Mā schāʾ Allāh – „{t}“ sitzt zu 100 %!", { t: esc(r.label) }) + "</h3>"
      : "<h3>" + T("Runde geschafft: {n} von {m} richtig", { n: r.correct, m: r.answered }) + "</h3>") +
      "<p>" + esc(r.label) + ": <b>" + r.before.pct + " % → " + r.after.pct + " %</b>" +
      (gain > 0 ? " · " + T(gain === 1 ? "{n} Frage neu gelernt" : "{n} Fragen neu gelernt", { n: gain }) : "") + "</p>" +
      '<div class="lr-actions">' + (r.after.pct < 100 ? '<button type="button" class="btn btn-primary" data-ar-again>' + T("Nächste Runde") + "</button>" : "") +
      (r.wrong.length && window.FIQH_MISTAKES ? '<button type="button" class="btn" data-ar-wrong>' + T("Fehler dieser Runde wiederholen ({n})", { n: r.wrong.length }) + "</button>" : "") +
      '<button type="button" class="linkish" data-ar-close>' + T("Schließen") + "</button></div>";
    var again = $("[data-ar-again]", box);
    if (again) again.addEventListener("click", function () { start(r.list, r.label, r.info, r.size); });
    var wrongBtn = $("[data-ar-wrong]", box);
    if (wrongBtn) wrongBtn.addEventListener("click", function () { window.FIQH_MISTAKES.practice(r.wrong, T("Fehler dieser Runde"), "arabisch"); });
    $("[data-ar-close]", box).addEventListener("click", function () { lastRound = null; renderRound(); });
  }

  function listPane() {
    return '<ol class="ar-lessons">' + lessons().map(function (l) {
      var s = stats(lessonQs(l.id)), st = s.pct === 100 ? "done" : s.learned + s.almost + s.wrong ? "busy" : "new";
      return '<li class="lt lt-' + st + '"><button type="button" class="ar-lesson" data-ar-lesson="' + l.id + '">' +
        '<span class="ar-num">' + esc(l.n) + "</span>" +
        '<span class="lt-main"><span class="lt-title"><strong>' + esc(l.title) + "</strong>" + ar(l.ar, "lt-ar") + "</span>" + bar(s) +
        '<small class="lt-meta">' + T("{n} Vokabeln · {m} Übungen", { n: l.vocab.length, m: l.quiz.length + l.irab.length }) +
        (s.learned ? " · " + T("{n} % gelernt", { n: s.pct }) : "") + "</small></span>" +
        '<span class="lt-pct">' + (st === "done" ? "✓" : s.pct + " %") + "</span></button></li>";
    }).join("") + "</ol>";
  }

  function partBtn(id, part, label) {
    var s = stats(SETS[id][part]);
    if (!s.total) return "";
    return '<button type="button" class="ar-part' + (s.pct === 100 ? " is-done" : "") + '" data-ar-learn="' + id + '" data-part="' + part + '">' +
      "<strong>" + label + "</strong>" + bar(s) + "<small>" + (s.pct === 100 ? T("✓ gelernt") : T("{n} von {m} gelernt", { n: s.learned, m: s.total })) + "</small></button>";
  }
  function modelHtml(m) {
    return '<figure class="ar-model"><p class="ar-sentence" lang="ar" dir="rtl">' + esc(m.s) + "</p><figcaption>" + esc(m.de) + "</figcaption>" +
      '<div class="ar-table-wrap"><table class="ar-table ar-irab-table"><thead><tr><th>' + T("Wort") + "</th><th>Iʿrāb</th><th>" + T("Erklärung") + "</th></tr></thead><tbody>" +
      m.words.map(function (w) {
        return "<tr><td>" + ar(w[0], "ar-word") + "</td><td>" + ar(w[1], "ar-irab") + "</td><td>" + esc(w[2]) + "</td></tr>";
      }).join("") + "</tbody></table></div></figure>";
  }
  function lessonPane(l) {
    var s = stats(lessonQs(l.id)), ls = BOOKS[bookOf(l)], idx = ls.indexOf(l);
    var prev = ls[idx - 1], next = ls[idx + 1];
    return '<div class="ar-lesson-view">' +
      '<button type="button" class="linkish ar-back" data-ar-back>← ' + T("Alle Lektionen") + "</button>" +
      '<header class="ar-lesson-head"><p class="eyebrow">' + (bookOf(l) === 2 ? T("Buch 2") + " · " : "") + T("Lektion") + " " + esc(l.n) + "</p>" + '<h2>' + esc(l.title) + "</h2>" + ar(l.ar, "ar-title") + "</header>" +
      '<div class="ar-parts">' + partBtn(l.id, "vocab", T("Vokabeln")) + partBtn(l.id, "gram", T("Grammatik")) + partBtn(l.id, "irab", "Iʿrāb") + "</div>" +
      '<button type="button" class="btn btn-primary" data-ar-learn="' + l.id + '">' + (s.pct === 100 ? T("✓ Ganze Lektion wiederholen") : T("Ganze Lektion lernen · {n} %", { n: s.pct })) + "</button>" +
      '<section class="ar-block"><h3>' + T("Grammatik") + "</h3>" + '<ul class="ar-grammar">' + l.grammar.map(function (g) { return "<li>" + rich(g) + "</li>"; }).join("") + "</ul></section>" +
      (l.examples.length ? '<section class="ar-block"><h3>' + T("Beispiele") + "</h3>" + '<ul class="ar-examples">' + l.examples.map(function (e) {
        return "<li>" + ar(e[0], "ar-ex") + '<span class="ar-de">' + esc(e[1]) + "</span></li>";
      }).join("") + "</ul></section>" : "") +
      '<section class="ar-block"><h3>' + T("Vokabeln") + " <small>" + l.vocab.length + "</small></h3>" + vocabTable(l.vocab) + "</section>" +
      (l.model.length ? '<section class="ar-block"><h3>' + T("Iʿrāb Schritt für Schritt") + "</h3>" + l.model.map(modelHtml).join("") + "</section>" : "") +
      '<nav class="ar-pager">' + (prev ? '<button type="button" class="btn" data-ar-lesson="' + prev.id + '">← ' + T("Lektion") + " " + esc(prev.n) + "</button>" : "<span></span>") +
      (next ? '<button type="button" class="btn" data-ar-lesson="' + next.id + '">' + T("Lektion") + " " + esc(next.n) + " →</button>" : "") + "</nav></div>";
  }
  function vocabTable(list, withLesson) {
    return '<div class="ar-table-wrap"><table class="ar-table ar-vocab"><thead><tr><th>' + T("Arabisch") + "</th><th>" + T("Deutsch") + "</th><th>" + T("Plural") + "</th>" + (withLesson ? "<th>" + T("Lek.") + "</th>" : "") + "</tr></thead><tbody>" +
      list.map(function (v) {
        return "<tr><td>" + ar(v[0], "ar-word") + "</td><td>" + esc(v[1]) + "</td><td>" + (v[2] ? ar(v[2], "ar-word") : "") + "</td>" + (withLesson ? '<td class="ar-lek">' + esc(v[3]) + "</td>" : "") + "</tr>";
      }).join("") + "</tbody></table></div>";
  }
  function fold(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[ً-ٰٟ̀-ͯ]/g, "")
      .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي");
  }
  function vocabPane() {
    var rows = [];
    lessons().forEach(function (l) { l.vocab.forEach(function (v) { rows.push([v[0], v[1], v[2], l.n]); }); });
    var f = fold(state.filter.trim());
    var hit = f ? rows.filter(function (r) { return fold(r[0] + " " + r[1] + " " + (r[2] || "")).indexOf(f) !== -1; }) : rows;
    var vs = stats(bookQs().filter(function (q) { return /^ar-[vdp]-/.test(q._lid); }));
    return '<div class="ar-vocab-pane"><div class="ar-vocab-head">' +
      '<form class="search" role="search" data-ar-search><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
      '<input id="ar-filter" type="search" dir="auto" autocomplete="off" aria-label="' + T("Vokabeln durchsuchen") + '" placeholder="' + T("Suchen: Haus, بيت …") + '" value="' + esc(state.filter) + '"></form>' +
      '<button type="button" class="btn btn-primary" data-ar-vocab-train>Vokabeltrainer · ' + vs.pct + " %</button></div>" +
      '<p class="ar-count">' + T("{n} von {m} Vokabeln · der Trainer fragt Bedeutung, Arabisch und Plural ab und beginnt mit deinen Fehlern.", { n: hit.length, m: rows.length }) + "</p>" +
      vocabTable(hit.slice(0, 400), true) + "</div>";
  }
  function irabPane() {
    genCheck();
    var list = irabList(), is = stats(list), b1 = state.book === 1;
    var models = [];
    lessons().forEach(function (l) { l.model.forEach(function (m) { models.push([l, m]); }); });
    return '<div class="ar-irab-pane">' +
      '<div class="panel ar-irab-cta"><div><p class="eyebrow">' + T("Ziel des Kurses") + "</p><h3>" + T("Einen Satz vollständig analysieren") + "</h3>" +
      "<p>" + (b1 ? T("{n} Iʿrāb-Aufgaben aus allen Lektionen: Du siehst einen Satz mit einem markierten Wort und wählst die richtige Analyse. Wenn alle sitzen, kommen nach einem Tag neue Sätze dazu.", { n: list.length })
        : T("{n} Iʿrāb-Aufgaben aus allen Lektionen von Buch 2: Du siehst einen Satz mit einem markierten Wort und wählst die richtige Analyse.", { n: list.length })) + "</p>" + (b1 ? genNote() : "") + "</div>" +
      '<div class="ar-irab-actions"><button type="button" class="btn btn-primary" data-ar-irab-train>' + T("Iʿrāb-Training") + " · " + is.pct + " %</button>" +
      '<button type="button" class="btn" data-ar-irab-exam>' + T("Prüfung: 20 gemischte Sätze") + "</button></div></div>" +
      '<section class="ar-block"><h3>' + T("Einführung") + "</h3>" + M.irabIntro.map(function (sec, i) {
        return "<details class=\"ar-intro\"" + (i === 0 ? " open" : "") + "><summary>" + esc(sec.t) + "</summary>" +
          sec.p.map(function (p) { return "<p>" + rich(p) + "</p>"; }).join("") + "</details>";
      }).join("") + "</section>" +
      '<section class="ar-block"><h3>' + T("Fachbegriffe") + " <small>" + M.glossary.length + "</small></h3>" +
      '<div class="ar-table-wrap"><table class="ar-table ar-gloss"><thead><tr><th>' + T("Begriff") + "</th><th>" + T("Umschrift") + "</th><th>" + T("Bedeutung") + "</th></tr></thead><tbody>" +
      M.glossary.map(function (g) { return "<tr><td>" + ar(g[0], "ar-word") + "</td><td><i>" + esc(g[1]) + "</i></td><td>" + esc(g[2]) + "</td></tr>"; }).join("") +
      "</tbody></table></div></section>" +
      '<section class="ar-block"><h3>' + T("Musteranalysen") + " <small>" + models.length + "</small></h3>" +
      models.map(function (x) { return '<p class="ar-model-src">' + T("Lektion") + " " + esc(x[0].n) + " · " + esc(x[0].title) + "</p>" + modelHtml(x[1]); }).join("") +
      "</section></div>";
  }

  /* book switch above the tabs */
  function renderBooks() {
    var box = $("#ar-books");
    box.hidden = !BOOKS[2].length;
    var open = book2Open();
    box.innerHTML = [1, 2].map(function (b) {
      var lockIcon = b === 2 && !open ? ' <span aria-hidden="true">🔒</span>' : "";
      return '<button type="button" class="ar-book" data-ar-book="' + b + '" aria-pressed="' + (state.book === b) + '">' +
        T("Madina-Buch {n}", { n: b }) + lockIcon + "</button>";
    }).join("");
  }
  /* book 2 is locked: show what is still missing */
  function lockPane() {
    var gate = gateLessons(), left = gate.filter(function (l) { return stats(lessonQs(l.id)).pct < 100; }).length;
    return '<div class="panel ar-lock"><p class="ar-lock-icon" aria-hidden="true">🔒</p>' +
      "<h3>" + T("Madina-Buch 2 ist noch gesperrt") + "</h3>" +
      "<p>" + T("Buch 2 wird frei, sobald du die letzten {n} Lektionen von Buch 1 (Lektion {a}–{b}) ohne Fehler gelernt hast: jede zu 100 %, keine offenen Fehler.",
        { n: BOOK2_GATE, a: gate[0].n, b: gate[gate.length - 1].n }) + "</p>" +
      "<p><b>" + T(left === 1 ? "Noch {n} Lektion" : "Noch {n} Lektionen", { n: left }) + "</b></p>" +
      '<ol class="ar-lessons">' + gate.map(function (l) {
        var s = stats(lessonQs(l.id)), st = s.pct === 100 ? "done" : s.learned + s.almost + s.wrong ? "busy" : "new";
        return '<li class="lt lt-' + st + '"><button type="button" class="ar-lesson" data-ar-gate="' + l.id + '">' +
          '<span class="ar-num">' + esc(l.n) + "</span>" +
          '<span class="lt-main"><span class="lt-title"><strong>' + esc(l.title) + "</strong>" + ar(l.ar, "lt-ar") + "</span>" + bar(s) +
          '<small class="lt-meta">' + (s.wrong + s.almost ? T("{n} offene Fehler", { n: s.wrong + s.almost }) + " · " : "") + T("{n} % gelernt", { n: s.pct }) + "</small></span>" +
          '<span class="lt-pct">' + (st === "done" ? "✓" : s.pct + " %") + "</span></button></li>";
      }).join("") + "</ol></div>";
  }

  function wire(body) {
    $all("[data-ar-gate]", body).forEach(function (b) {
      b.addEventListener("click", function () { state.book = 1; state.lesson = b.getAttribute("data-ar-gate"); state.tab = "lektionen"; remember(); render(); scrollToPane(); });
    });
    $all("[data-ar-lesson]", body).forEach(function (b) {
      b.addEventListener("click", function () { state.lesson = b.getAttribute("data-ar-lesson"); state.tab = "lektionen"; render(); scrollToPane(); });
    });
    var back = $("[data-ar-back]", body);
    if (back) back.addEventListener("click", function () { state.lesson = null; render(); scrollToPane(); });
    $all("[data-ar-learn]", body).forEach(function (b) {
      b.addEventListener("click", function () { startLesson(b.getAttribute("data-ar-learn"), b.getAttribute("data-part")); });
    });
    var f = $("#ar-filter", body);
    if (f) {
      f.addEventListener("input", function () {
        state.filter = f.value;
        var pos = f.selectionStart;
        render();
        var nf = $("#ar-filter");
        nf.focus();
        try { nf.setSelectionRange(pos, pos); } catch (e) {}
      });
      $("[data-ar-search]", body).addEventListener("submit", function (e) { e.preventDefault(); });
    }
    var vt = $("[data-ar-vocab-train]", body);
    if (vt) vt.addEventListener("click", function () {
      start(bookQs().filter(function (q) { return /^ar-[vdp]-/.test(q._lid); }), T("Vokabeltrainer"), {});
    });
    var it = $("[data-ar-irab-train]", body);
    if (it) it.addEventListener("click", function () {
      if (state.book === 2) { start(IRAB2, T("Iʿrāb-Training"), {}); return; }
      var fresh = gen.fresh ? genBatch(gen.n) : null;
      gen.fresh = 0;
      start(fresh && fresh.some(function (q) { return lv(q) !== 2; }) ? fresh : ALL_IRAB, fresh ? T("Neue Iʿrāb-Sätze") : T("Iʿrāb-Training"), {});
    });
    var ex = $("[data-ar-irab-exam]", body);
    if (ex) ex.addEventListener("click", function () {
      var pool = irabList(), qs = APP.shuffle(pool.slice()).slice(0, 20), correct = 0;
      APP.startQuiz({
        learn: true, questions: qs, label: T("Iʿrāb-Prüfung"),
        onAnswer: function (q, ok) { if (ok) correct++; return L.recordId(q._lid, ok); },
        onFinish: function (p) {
          var s = stats(pool);
          lastRound = { label: T("Iʿrāb-Prüfung"), info: {}, answered: p.answered, correct: correct, before: s, after: s, list: pool, wrong: p.wrong || [] };
          L.sync();
        },
        onLeave: function () { APP.showView("arabisch"); render(); window.scrollTo(0, 0); }
      });
    });
  }
  function scrollToPane() {
    var el = $("#ar-tabs");
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: "start" });
  }

  $all(".ar-tab").forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-ar-tab");
      if (t === "lektionen" && state.tab === "lektionen") state.lesson = null;
      state.tab = t; remember(); render();
    });
  });
  $("#ar-next").addEventListener("click", function () { var l = nextLesson(); if (l) startLesson(l.id); });
  $("#ar-mistakes").addEventListener("click", function () {
    start(bookQs().filter(function (q) { var l = lv(q); return l === -1 || l === 1; }), T("Fehler wiederholen"), {});
  });
  $("#ar-reset").addEventListener("click", function () { var b = $("#ar-reset-confirm"); b.hidden = !b.hidden; });
  $("#ar-reset-no").addEventListener("click", function () { $("#ar-reset-confirm").hidden = true; });
  $("#ar-reset-yes").addEventListener("click", function () {
    $("#ar-reset-confirm").hidden = true;
    lastRound = null;
    b2Earned = false;
    try { localStorage.removeItem("fiqh:book2"); } catch (e) {}
    L.reset(function (k) { return k.indexOf("ar-") === 0; });
  });

  APP.on("view", function (name) { if (name === "arabisch") render(); });
  L.onChange(function () { genSync(); if (!$("#view-arabic").hidden) render(); });
  $("#ar-count-lessons").textContent = LESSONS.length;
  $("#ar-books").addEventListener("click", function (e) {
    var b = e.target.closest("[data-ar-book]");
    if (!b) return;
    var n = +b.getAttribute("data-ar-book");
    if (n === state.book) return;
    state.book = n; state.lesson = null; state.filter = ""; lastRound = null; remember(); render();
  });
  $("#ar-count-vocab").textContent = LESSONS.reduce(function (n, l) { return n + l.vocab.length; }, 0);
  $("#ar-count-q").textContent = QS.length;
  render();

  /* sarf.js comes back here after a round of tables */
  window.FIQH_ARABIC_RENDER = function (tab) { if (tab) { state.tab = tab; remember(); } render(); };
  /* questions/lessons: book 1 only (the Arabic league); allQuestions/allLessons: both books */
  window.FIQH_ARABIC = { questions: QS.filter(function (q) { return qBook(q) === 1; }), lessons: BOOKS[1],
    allQuestions: QS, allLessons: LESSONS,
    /* overall progress: book 2 counts only once it is open */
    stats: function () { return stats(book2Open() ? QS : QS.filter(function (q) { return qBook(q) === 1; })); } };
})();
