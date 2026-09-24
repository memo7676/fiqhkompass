(function () {
  "use strict";
  var T = window.T || function (s, v) { return v ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k]; }) : s; };

  var TOPICS = window.FIQH_TOPICS || [];
  var QUESTIONS = window.FIQH_QUESTIONS || [];
  var TOPIC_BY_ID = {};
  TOPICS.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });

  /* English: swap in translated questions and topic names. q_de keeps the
     German text so progress ids (learn.js) stay the same in every language. */
  var EN = window.I18N && I18N.lang === "en" && window.FIQH_EN;
  if (EN) {
    QUESTIONS.forEach(function (q) {
      var x = EN.q[q.q];
      if (!x) return;
      q.q_de = q.q; q.q = x[0]; q.a = x[1].slice(); q.e = x[2];
    });
    TOPICS.forEach(function (t) {
      var x = EN.topics[t.id];
      if (!x) return;
      t.title = x[0]; t.intro = x[1]; t.lessons = x[2];
      if (x[3] && x[3].length === t.sections.length) t.sections.forEach(function (s, i) { s.h = x[3][i]; });
    });
  }

  /* Topics are grouped into Sachgebiete; unknown ids fall into "Weitere". */
  var GROUPS = [
    { name: "Glaube & Grundlagen", ids: ["quellen", "madhabs", "ahkam", "iman"] },
    { name: "Reinheit", ids: ["tahara", "wudhu", "ghusl", "tayammum", "frauen"] },
    { name: "Gebet", ids: ["gebet", "ablauf", "adhan", "jamaa", "jumua", "nawafil", "sujud", "janaza"] },
    { name: "Fasten", ids: ["fasten", "kaffara"] },
    { name: "Zakāt & Ḥaǧǧ", ids: ["zakat", "hajj", "qurban"] },
    { name: "Alltag & Gesellschaft", ids: ["familie", "wirtschaft", "alltag"] }
  ];
  (function () {
    var placed = {};
    GROUPS.forEach(function (g) {
      g.topics = g.ids.map(function (id) { return TOPIC_BY_ID[id]; }).filter(Boolean);
      g.topics.forEach(function (t) { placed[t.id] = true; });
    });
    var rest = TOPICS.filter(function (t) { return !placed[t.id]; });
    if (rest.length) GROUPS.push({ name: "Weitere", topics: rest });
    GROUPS = GROUPS.filter(function (g) { return g.topics.length; });
    TOPICS = [];
    GROUPS.forEach(function (g) { TOPICS = TOPICS.concat(g.topics); });
  })();

  var BOOK = "İlmihal (H. Döndüren)";
  function hasBook(t) { return t.sections.some(function (s) { return s.src; }); }
  function topicSource(t) {
    return hasBook(t) && t.lessons.indexOf("İlmihal") === -1 ? t.lessons + " · " + T("ergänzt aus dem İlmihal") : t.lessons;
  }
  /* "İlmihal S. 126–132" → "S. 126–132" (English: "pp. 126–132"). */
  function pages(src) {
    var p = String(src).replace(/^İlmihal S\. /, "");
    return window.I18N && I18N.lang === "en" && p.indexOf("–") !== -1 ? "pp. " + p : T("S. {p}", { p: p });
  }
  function lessonNo(s) { return (s.u || "").replace(/^Unterricht /, ""); }
  function srcBadge(s) {
    if (s.src) return ' <span class="src-badge" title="' + esc(BOOK) + '">İlmihal ' + esc(pages(s.src)) + "</span>";
    return s.u ? ' <span class="src-badge">' + esc(T("Unterricht {n}", { n: lessonNo(s) })) + "</span>" : "";
  }
  /* Evidence (fiqh-belege.js): Qurʾān verse, hadith, qiyās … with the place in the İlmihal. */
  var DALIL = window.FIQH_DALIL || {};
  var DALIL_KIND = { Q: "Qurʾān", H: "Hadith", A: "Wort eines Gefährten", I: "Idschmāʿ", K: "Qiyās", S: "Istiḥsān",
    R: "Rechtsgrundsatz", J: "Begründung der Gelehrten", L: "Sprache", D: "Begriff", G: "Geschichte" };
  function dalilHtml(q) {
    var list = DALIL[q.q_de || q.q];
    if (!list || !list.length) return "";
    var en = window.I18N && I18N.lang === "en";
    return list.map(function (d) {
      var bk = d[4] ? T("İlmihal S. {p}", { p: d[4] }) + (d[5] ? ", " + T("Fn. {n}", { n: d[5] }) : "") : "";
      return "<li><span class=\"dl-kind\">" + esc(T(DALIL_KIND[d[0]] || "")) + "</span>" +
        (d[1] ? ' <span class="dl-ref">· ' + esc(en && d[6] ? d[6] : d[1]) + "</span>" : "") + " – " + esc(en ? d[3] : d[2]) +
        (bk ? '<span class="dl-bk">' + esc(bk) + "</span>" : "") + "</li>";
    }).join("");
  }
  /* Where a quiz question comes from: lesson or book pages, topic and section. */
  function sourceLine(q) {
    var t = TOPIC_BY_ID[q.t];
    if (!t) return T(q.srcText || "");
    var s = t.sections[q.s];
    if (!s) return T("Quelle:") + " " + (q.src === "buch" ? BOOK : t.lessons) + " – " + t.title;
    var where = s.src ? BOOK + ", " + pages(s.src) : T("Fiqh-Unterricht {n}", { n: lessonNo(s) });
    return T("Quelle:") + " " + where + " · " + t.title + " › " + s.h;
  }

  var QUESTION_SECONDS = 30;
  var BASE_POINTS = 100;
  var MAX_TIME_BONUS = 50;
  var STREAK_STEP = 20;
  var STREAK_CAP = 4;

  /* ---------- helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); }
  function shuffle(arr, rnd) {
    var a = arr.slice();
    rnd = rnd || Math.random;
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function store(key, val) {
    try {
      if (val === undefined) { var raw = localStorage.getItem("fiqh:" + key); return raw ? JSON.parse(raw) : null; }
      localStorage.setItem("fiqh:" + key, JSON.stringify(val));
    } catch (e) { return null; }
    return null;
  }
  function normalize(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯʿʾʼ´`'’ʿʾ]/g, "");
  }
  function countFor(topicId) {
    return QUESTIONS.filter(function (q) { return q.t === topicId; }).length;
  }

  /* ---------- views ---------- */
  /* "start" is the page with all subjects (Fächer); a subject's views belong to that tab */
  var views = { start: $("#view-home"), nachschlagen: $("#view-lookup"), lernen: $("#view-learn"), arabisch: $("#view-arabic"), fehler: $("#view-mistakes"), sarf: $("#view-sarf"), quiz: $("#view-quiz"), wettbewerb: $("#view-social"), chat: $("#view-chat") };
  var TAB_OF = { nachschlagen: "start", lernen: "start", arabisch: "start", fehler: "start", sarf: "start" };
  function showView(name, push) {
    if (!views[name]) name = "start";
    /* A learning round (Lernen, Arabisch, Fehler, Sarf) ends without the result screen and hides
       the quiz panels; without a running round the quiz tab would stay empty. */
    if (name === "quiz" && !game && $("#quiz-setup").hidden) renderSetup();
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    var tab = TAB_OF[name] || name;
    $all(".tab").forEach(function (b) {
      var on = b.getAttribute("data-view") === tab;
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (push !== false) { try { history.replaceState(null, "", "#" + name); } catch (e) {} }
    store("view", name);
    emit("view", name);
  }
  $all(".tab").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-view");
      showView(v);
      window.scrollTo(0, 0);
    });
  });
  /* subject bar: back to all subjects, or between a subject's parts */
  $all(".subject-bar [data-go]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-go");
      if (v === "nachschlagen" && !views.nachschlagen.hidden && currentTopic) { $("#search").value = ""; showOverview(); }
      showView(v);
      window.scrollTo(0, 0);
    });
  });
  var brand = $(".brand");
  if (brand) brand.addEventListener("click", function (e) { e.preventDefault(); showView("start"); window.scrollTo(0, 0); });

  /* =====================================================
     NACHSCHLAGEN
     ===================================================== */
  var currentTopic = null;   // null = overview of all topics

  /* Overview: every topic as a card, grouped; the text opens on click. */
  function showOverview() {
    currentTopic = null;
    store("topic", null);
    $("#lookup").className = "wrap lookup is-overview";
    $all(".topic-link").forEach(function (b) { b.setAttribute("aria-current", "false"); });
    var html = GROUPS.map(function (g) {
      return '<section class="ov-group"><h2 class="ov-head">' + esc(T(g.name)) + ' <small>' + T("{n} Themen", { n: g.topics.length }) + "</small></h2>" +
        '<div class="ov-grid">' + g.topics.map(function (t) {
          return '<button type="button" class="topic-card" data-open-topic="' + t.id + '">' +
            '<span class="tc-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span>" +
            '<strong class="tc-title">' + esc(t.title) + "</strong>" +
            '<span class="tc-intro">' + esc(t.intro) + "</span>" +
            '<span class="tc-meta">' + T("{n} Abschnitte · {m} Quizfragen", { n: t.sections.length, m: countFor(t.id) }) + "</span>" +
            '<span class="tc-learn" data-learn-card="' + t.id + '"></span></button>';
        }).join("") + "</div></section>";
    }).join("");
    var art = $("#article");
    art.innerHTML = html;
    wireArticle(art);
    emit("overview");
  }

  function renderTopicNav() {
    var nav = $("#topic-nav");
    nav.innerHTML = GROUPS.map(function (g) {
      return '<p class="nav-group">' + esc(T(g.name)) + "</p>" + g.topics.map(function (t) {
        return '<button type="button" class="topic-link" data-topic="' + t.id + '">' +
          '<span class="tl-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span>" +
          '<span class="tl-title">' + esc(t.title) + "</span>" +
          '<span class="tl-meta">' + esc(topicSource(t)) + "</span></button>";
      }).join("");
    }).join("");
    $all(".topic-link", nav).forEach(function (b) {
      b.addEventListener("click", function () {
        $("#search").value = "";
        openTopic(b.getAttribute("data-topic"));
      });
    });
  }

  function openTopic(id, keepScroll) {
    var t = TOPIC_BY_ID[id];
    if (!t) return;
    currentTopic = id;
    store("topic", id);
    $("#lookup").className = "wrap lookup is-detail";
    $all(".topic-link").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-topic") === id ? "true" : "false");
    });
    var html = '<button type="button" class="back-link" data-overview>← ' + T("Alle Themen") + "</button>" +
      '<header class="article-head">' +
      '<p class="eyebrow">' + esc(topicSource(t)) + "</p>" +
      '<h2>' + esc(t.title) + ' <span class="h-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span></h2>" +
      '<p class="lede">' + esc(t.intro) + "</p>" +
      '<div class="article-actions">' +
      '<span class="learn-slot" data-learn-slot="' + t.id + '"></span>' +
      '<button type="button" class="btn" data-quiz-topic="' + t.id + '">' + T("Quiz zu diesem Thema · {n} Fragen", { n: countFor(t.id) }) + "</button>" +
      "</div>" +
      '<nav class="toc" aria-label="' + T("Abschnitte") + '">' + t.sections.map(function (s, i) {
        return '<a href="#" data-jump="sec-' + t.id + "-" + i + '">' + esc(s.h) + "</a>";
      }).join("") + "</nav></header>";
    html += t.sections.map(function (s, i) {
      return '<section class="entry" id="sec-' + t.id + "-" + i + '"><h3>' + esc(s.h) + srcBadge(s) + "</h3><ul>" +
        s.li.map(function (li) { return "<li>" + fmt(li) + "</li>"; }).join("") + "</ul></section>";
    }).join("");
    var art = $("#article");
    art.innerHTML = html;
    wireArticle(art);
    emit("topic", id);
    if (!keepScroll) {
      var top = art.getBoundingClientRect().top + window.scrollY - 90;
      if (window.scrollY > top) window.scrollTo(0, Math.max(0, top));
    }
  }

  function wireArticle(root) {
    $all("[data-quiz-topic]", root).forEach(function (b) {
      b.addEventListener("click", function () {
        setup.mode = "topic";
        setup.topics = [b.getAttribute("data-quiz-topic")];
        renderSetup();
        showView("quiz");
        window.scrollTo(0, 0);
      });
    });
    $all("[data-jump]", root).forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var el = document.getElementById(a.getAttribute("data-jump"));
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
      });
    });
    $all("[data-open-topic]", root).forEach(function (a) {
      a.addEventListener("click", function () {
        $("#search").value = "";
        openTopic(a.getAttribute("data-open-topic"));
        window.scrollTo(0, 0);
      });
    });
    $all("[data-overview]", root).forEach(function (a) {
      a.addEventListener("click", function () { $("#search").value = ""; showOverview(); window.scrollTo(0, 0); });
    });
  }

  function highlight(text, terms) {
    var html = fmt(text);
    terms.forEach(function (term) {
      if (term.length < 2) return;
      var safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(new RegExp("(" + safe + ")(?![^<]*>)", "gi"), "<mark>$1</mark>");
    });
    return html;
  }

  function runSearch(q) {
    var art = $("#article");
    var query = q.trim();
    if (!query) { if (currentTopic) openTopic(currentTopic, true); else showOverview(); return; }
    $("#lookup").className = "wrap lookup is-detail";
    var terms = normalize(query).split(/\s+/).filter(Boolean);
    var rawTerms = query.split(/\s+/).filter(Boolean);
    var hits = [];
    TOPICS.forEach(function (t) {
      t.sections.forEach(function (s, i) {
        var items = s.li.filter(function (li) {
          var n = normalize(li + " " + s.h + " " + t.title);
          return terms.every(function (term) { return n.indexOf(term) !== -1; });
        });
        if (items.length) hits.push({ t: t, s: s, i: i, items: items });
      });
    });
    var total = hits.reduce(function (n, h) { return n + h.items.length; }, 0);
    var html = '<button type="button" class="back-link" data-overview>← ' + T("Alle Themen") + "</button>" +
      '<header class="article-head"><p class="eyebrow">' + T("Suche") + "</p><h2>„" + esc(query) + "“</h2>" +
      '<p class="lede">' + (total ? T("{n} Treffer in {m} Abschnitten", { n: total, m: hits.length }) : T("Keine Treffer. Versuche einen anderen Begriff, z. B. „Mest“, „Qibla“ oder „Kaffāra“.")) + "</p></header>";
    html += hits.map(function (h) {
      return '<section class="entry"><p class="hit-topic"><button type="button" class="linkish" data-open-topic="' + h.t.id + '">' +
        esc(h.t.title) + "</button> · " + esc(h.s.src || h.t.lessons) + "</p><h3>" + esc(h.s.h) + "</h3><ul>" +
        h.items.map(function (li) { return "<li>" + highlight(li, rawTerms) + "</li>"; }).join("") + "</ul></section>";
    }).join("");
    art.innerHTML = html;
    wireArticle(art);
    $all(".topic-link").forEach(function (b) { b.setAttribute("aria-current", "false"); });
  }

  var searchTimer;
  $("#search").addEventListener("input", function (e) {
    clearTimeout(searchTimer);
    var v = e.target.value;
    searchTimer = setTimeout(function () { runSearch(v); }, 120);
  });
  $("#search-form").addEventListener("submit", function (e) { e.preventDefault(); runSearch($("#search").value); });

  /* =====================================================
     QUIZ
     ===================================================== */
  var setup = {
    mode: store("mode") || "topic",
    topics: store("topics") || ["wudhu"],
    count: store("count") || 5
  };
  setup.topics = setup.topics.filter(function (id) { return TOPIC_BY_ID[id]; });
  if (!setup.topics.length) setup.topics = [TOPICS[0].id];

  function bestKey() {
    return setup.mode === "mixed" ? "best:mixed:" + setup.count : "best:" + setup.topics.slice().sort().join("+") + ":" + setup.count;
  }

  function renderSetup() {
    $("#quiz-setup").hidden = false;
    $("#quiz-play").hidden = true;
    $("#quiz-result").hidden = true;

    $all("[data-mode]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-mode") === setup.mode ? "true" : "false");
    });
    $("#topic-picker").hidden = setup.mode !== "topic";
    $("#mixed-note").hidden = setup.mode !== "mixed";

    var chips = $("#topic-chips");
    chips.innerHTML = GROUPS.map(function (g, gi) {
      var allOn = g.topics.every(function (t) { return setup.topics.indexOf(t.id) !== -1; });
      return '<div class="chip-group"><div class="chip-group-head"><span>' + esc(T(g.name)) + "</span>" +
        '<button type="button" class="linkish" data-chip-group="' + gi + '">' + (allOn ? T("abwählen") : T("alle wählen")) + "</button></div>" +
        '<div class="chips">' + g.topics.map(function (t) {
          var on = setup.topics.indexOf(t.id) !== -1;
          return '<button type="button" class="chip" data-chip="' + t.id + '" aria-pressed="' + on + '">' +
            '<span class="chip-check" aria-hidden="true"></span>' + esc(t.title) +
            '<span class="chip-count">' + countFor(t.id) + "</span></button>";
        }).join("") + "</div></div>";
    }).join("");
    $all("[data-chip-group]", chips).forEach(function (b) {
      b.addEventListener("click", function () {
        var g = GROUPS[+b.getAttribute("data-chip-group")];
        var allOn = g.topics.every(function (t) { return setup.topics.indexOf(t.id) !== -1; });
        g.topics.forEach(function (t) {
          var i = setup.topics.indexOf(t.id);
          if (allOn && i !== -1) setup.topics.splice(i, 1);
          if (!allOn && i === -1) setup.topics.push(t.id);
        });
        renderSetup();
      });
    });
    $all("[data-chip]", chips).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-chip");
        var i = setup.topics.indexOf(id);
        if (i === -1) setup.topics.push(id); else setup.topics.splice(i, 1);
        renderSetup();
      });
    });

    $all("[data-count]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(+b.getAttribute("data-count") === setup.count));
    });

    var pool = poolFor();
    var mixed = setup.mode === "mixed";
    var startBtn = $("#start-quiz");
    var ok = mixed || pool.length > 0;
    startBtn.disabled = !ok;
    var n = mixed ? Math.min(setup.count, QUESTIONS.length) : Math.min(setup.count, pool.length);
    var paused = mixed ? QUESTIONS.length - pool.length : 0;
    $("#setup-summary").textContent = ok
      ? T("{n} Fragen aus {from} · {p} im Pool", { n: n, p: pool.length,
          from: setup.mode === "mixed" ? T("allen {n} Themengebieten", { n: TOPICS.length }) :
            setup.topics.length === 1 ? T("„{t}“", { t: TOPIC_BY_ID[setup.topics[0]].title }) : T("{n} Themengebieten", { n: setup.topics.length }) })
      : T("Wähle mindestens ein Themengebiet.");
    if (ok && paused) $("#setup-summary").textContent += " · " + T("{k} kürzlich gestellt (2 Std. Pause)", { k: paused });

    var best = store(bestKey());
    $("#setup-best").textContent = best ? T("Dein Bestwert hier: {s} Punkte ({c}/{t})", { s: best.score, c: best.correct, t: best.total }) : T("Noch kein Bestwert für diese Auswahl.");

    store("mode", setup.mode); store("topics", setup.topics); store("count", setup.count);
  }

  $all("[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () { setup.mode = b.getAttribute("data-mode"); renderSetup(); });
  });
  $all("[data-count]").forEach(function (b) {
    b.addEventListener("click", function () { setup.count = +b.getAttribute("data-count"); renderSetup(); });
  });
  $("#select-all").addEventListener("click", function () { setup.topics = TOPICS.map(function (t) { return t.id; }); renderSetup(); });
  $("#select-none").addEventListener("click", function () { setup.topics = []; renderSetup(); });

  /* Mixed mode: a question that was asked in the last two hours is left out.
     Only if too few remain are the longest-ago ones used to fill the round. */
  var MIX_PAUSE = 2 * 60 * 60 * 1000;
  function qid(q) { return q._lid || q.t + "|" + (q.q_de || q.q); }
  function mixSeen() {
    var seen = store("mixseen") || {}, now = Date.now(), out = {};
    Object.keys(seen).forEach(function (k) { if (now - seen[k] < MIX_PAUSE) out[k] = seen[k]; });
    return out;
  }
  function markMixSeen(q) {
    var seen = mixSeen();
    seen[qid(q)] = Date.now();
    store("mixseen", seen);
  }
  function poolFor() {
    if (setup.mode === "mixed") {
      var seen = mixSeen();
      return QUESTIONS.filter(function (q) { return !seen[qid(q)]; });
    }
    return QUESTIONS.filter(function (q) { return setup.topics.indexOf(q.t) !== -1; });
  }
  function mixFill(pool, n) {
    if (pool.length >= n) return [];
    var seen = mixSeen();
    return QUESTIONS.filter(function (q) { return seen[qid(q)]; })
      .sort(function (a, b) { return seen[qid(a)] - seen[qid(b)]; })
      .slice(0, n - pool.length);
  }

  /* Pick questions spread across topics so a mixed round really is mixed.
     With a seeded rnd everyone gets the same set (weekly competition). */
  function pickQuestions(pool, n, rnd) {
    var byTopic = {};
    shuffle(pool, rnd).forEach(function (q) { (byTopic[q.t] = byTopic[q.t] || []).push(q); });
    var order = shuffle(Object.keys(byTopic).sort(), rnd);
    var out = [];
    while (out.length < n) {
      var added = false;
      for (var i = 0; i < order.length && out.length < n; i++) {
        var list = byTopic[order[i]];
        if (list.length) { out.push(list.shift()); added = true; }
      }
      if (!added) break;
    }
    return shuffle(out, rnd);
  }

  var game = null;
  var timerId = null;

  function withOptions(q, rnd) {
    var opts = q.a.map(function (text, i) { return { text: text, correct: i === q.c }; });
    return { src: q, options: shuffle(opts, rnd) };
  }

  /* preset (optional): { questions, rnd, label, onProgress(p), onFinish(p), onLeave() }
     is used by the weekly competition in social.js.
     With learn: true (learn.js) there is no timer, no points and no joker; instead
     onAnswer(question, ok) returns the line shown under "Richtig!/Falsch" and
     the round ends straight in onFinish/onLeave without the result screen. */
  function startQuiz(preset) {
    var qs;
    if (preset) {
      qs = preset.questions.map(function (q) { return withOptions(q, preset.rnd); });
    } else {
      var pool = poolFor();
      var extra = setup.mode === "mixed" ? mixFill(pool, setup.count) : [];
      if (!pool.length && !extra.length) return;
      qs = shuffle(pickQuestions(pool, Math.min(setup.count, pool.length)).concat(extra))
        .map(function (q) { return withOptions(q); });
    }
    game = { qs: qs, i: 0, score: 0, correct: 0, streak: 0, bestStreak: 0, joker: true, answers: [], key: preset ? null : bestKey(), preset: preset || null,
      mixed: !preset && setup.mode === "mixed" };
    showView("quiz");
    var learn = !!(preset && preset.learn);
    $("#quiz-play").classList.toggle("is-learn", learn);
    $("#quit-quiz").textContent = learn ? T("Pause") : preset ? T("Beenden (zählt so)") : T("Abbrechen");
    $("#quiz-setup").hidden = true;
    $("#quiz-result").hidden = true;
    $("#quiz-play").hidden = false;
    renderQuestion();
    window.scrollTo(0, 0);
  }
  $("#start-quiz").addEventListener("click", function () { startQuiz(); });

  function renderQuestion() {
    var item = game.qs[game.i];
    var t = TOPIC_BY_ID[item.src.t];
    game.answered = false;
    game.hidden = [];
    game.startedAt = Date.now();
    if (game.mixed) markMixSeen(item.src);

    $("#q-progress-text").textContent = (game.preset ? game.preset.label + " · " : "") + T("Frage {n} von {m}", { n: game.i + 1, m: game.qs.length });
    $("#q-bar").style.width = (game.i / game.qs.length * 100) + "%";
    $("#q-topic").textContent = t ? t.title : item.src.tt || "";
    $("#q-score").textContent = game.score;
    $("#q-streak").textContent = game.streak > 1 ? T("{n}er-Serie", { n: game.streak }) : "";
    $("#q-streak").hidden = game.streak < 2;
    setText($("#q-text"), item.src.q);
    renderArabicLine(item.src);
    $("#q-feedback").hidden = true;
    $("#joker").disabled = !game.joker;
    $("#joker").textContent = game.joker ? T("50:50-Joker") : T("Joker verbraucht");

    var letters = ["A", "B", "C", "D"];
    var box = $("#q-options");
    box.innerHTML = item.options.map(function (o, i) {
      return '<button type="button" class="option" data-opt="' + i + '"><span class="opt-key">' + letters[i] + "</span>" +
        '<span class="opt-text' + (arOnly(o.text) ? ' opt-ar" lang="ar" dir="rtl"' : '" dir="auto"') + '>' + esc(o.text) + "</span></button>";
    }).join("");
    $all(".option", box).forEach(function (b) {
      b.addEventListener("click", function () { answer(+b.getAttribute("data-opt")); });
    });
    if (game.preset && game.preset.learn) stopTimer(); else startTimer();
    var first = $(".option", box);
    if (first && document.activeElement && document.activeElement.classList.contains("option")) first.focus();
  }

  /* Arabic in questions and answers (Arabisch-Bereich): whole-Arabic text gets the Arabic
     font and right-to-left; mixed text finds its direction itself. */
  var AR_RE = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  function arOnly(s) { return AR_RE.test(s) && !/[A-Za-zÄÖÜäöüß]/.test(s); }
  function setText(el, s) {
    el.textContent = s;
    el.setAttribute("dir", "auto");
    el.classList.toggle("is-ar", arOnly(s));
    if (arOnly(s)) el.setAttribute("lang", "ar"); else el.removeAttribute("lang");
  }
  /* q.ar: an Arabic word or sentence shown large; q.arMark: index of the word to highlight */
  function renderArabicLine(q) {
    var el = $("#q-ar");
    if (!el) return;
    el.hidden = !q.ar;
    if (!q.ar) { el.innerHTML = ""; return; }
    el.innerHTML = String(q.ar).split(/\s+/).map(function (w, i) {
      return i === q.arMark ? "<mark>" + esc(w) + "</mark>" : esc(w);
    }).join(" ");
  }

  function startTimer() {
    stopTimer();
    var ring = $("#q-timer");
    function tick() {
      var left = Math.max(0, QUESTION_SECONDS - (Date.now() - game.startedAt) / 1000);
      $("#q-timer-text").textContent = Math.ceil(left);
      ring.style.setProperty("--p", (left / QUESTION_SECONDS).toFixed(3));
      ring.classList.toggle("low", left <= 8);
      if (left <= 0) stopTimer();
    }
    tick();
    timerId = setInterval(tick, 200);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  function useJoker() {
    if (!game || !game.joker || game.answered) return;
    game.joker = false;
    var item = game.qs[game.i];
    var wrong = [];
    item.options.forEach(function (o, i) { if (!o.correct) wrong.push(i); });
    shuffle(wrong).slice(0, 2).forEach(function (i) {
      var b = $('[data-opt="' + i + '"]');
      b.disabled = true; b.classList.add("struck");
      game.hidden.push(i);
    });
    $("#joker").disabled = true;
    $("#joker").textContent = T("Joker verbraucht");
  }
  $("#joker").addEventListener("click", useJoker);

  function answer(idx) {
    if (game.answered || game.hidden.indexOf(idx) !== -1) return;
    game.answered = true;
    stopTimer();
    var item = game.qs[game.i];
    var ok = item.options[idx].correct;
    var left = Math.max(0, QUESTION_SECONDS - (Date.now() - game.startedAt) / 1000);
    var gained = 0, timeBonus = 0, streakBonus = 0;
    if (ok) {
      game.streak += 1;
      game.bestStreak = Math.max(game.bestStreak, game.streak);
      game.correct += 1;
      timeBonus = Math.round(left / QUESTION_SECONDS * MAX_TIME_BONUS);
      streakBonus = Math.min(game.streak - 1, STREAK_CAP) * STREAK_STEP;
      gained = BASE_POINTS + timeBonus + streakBonus;
      game.score += gained;
    } else {
      game.streak = 0;
    }
    game.answers.push({ item: item, chosen: idx, ok: ok });
    if (!(game.preset && game.preset.learn)) noteForFolder(item.src, ok);
    if (game.preset && game.preset.onProgress) game.preset.onProgress(progress(false));
    var learnNote = game.preset && game.preset.onAnswer ? game.preset.onAnswer(item.src, ok) : "";

    $all(".option").forEach(function (b) {
      var i = +b.getAttribute("data-opt");
      b.disabled = true;
      if (item.options[i].correct) b.classList.add("is-correct");
      else if (i === idx) b.classList.add("is-wrong");
    });

    var fb = $("#q-feedback");
    fb.hidden = false;
    fb.className = "feedback " + (ok ? "good" : "bad");
    var parts = [];
    if (ok) {
      parts.push("+" + BASE_POINTS);
      if (timeBonus) parts.push("+" + timeBonus + " " + T("Zeit"));
      if (streakBonus) parts.push("+" + streakBonus + " " + T("Serie"));
    }
    $("#fb-title").textContent = ok ? T("Richtig!") : T("Leider falsch");
    $("#fb-points").textContent = learnNote || (ok ? parts.join("  ") : T("Die richtige Antwort ist markiert."));
    setText($("#fb-text"), item.src.e);
    $("#fb-source").textContent = sourceLine(item.src);
    var dl = dalilHtml(item.src);
    $("#fb-dalil").innerHTML = dl;
    $("#fb-dalil").hidden = !dl;
    $("#next-q").textContent = game.i + 1 < game.qs.length ? T("Nächste Frage") : (game.preset && game.preset.learn ? T("Runde abschließen") : T("Ergebnis ansehen"));
    $("#q-score").textContent = game.score;
    $("#q-streak").textContent = game.streak > 1 ? T("{n}er-Serie", { n: game.streak }) : "";
    $("#q-streak").hidden = game.streak < 2;
    $("#q-bar").style.width = ((game.i + 1) / game.qs.length * 100) + "%";
    $("#next-q").focus({ preventScroll: true });
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  /* Quiz and Wettbewerb feed the Fehlerordner (mistakes.js): a wrong answer puts the question in,
     a right one only counts for questions that are already in it, so the quiz never marks
     new questions as "gelernt". */
  function noteForFolder(q, ok) {
    var L = window.FIQH_LEARN;
    if (!L || !q._lid) return;
    var l = L.levelOf(q._lid);
    if (!ok || l === -1 || l === 1) L.recordId(q._lid, ok);
  }

  $("#next-q").addEventListener("click", function () {
    if (!game) return;
    if (game.i + 1 < game.qs.length) { game.i += 1; renderQuestion(); }
    else showResult();
  });
  $("#quit-quiz").addEventListener("click", function () {
    stopTimer();
    var g = game;
    game = null;
    if (g && g.preset) { g.preset.onFinish(progressOf(g, true)); g.preset.onLeave(); }
    else renderSetup();
  });

  function progressOf(g, done) {
    return {
      score: g.score, correct: g.correct, answered: g.answers.length, total: g.qs.length, done: !!done,
      wrong: g.answers.filter(function (a) { return !a.ok; }).map(function (a) { return a.item.src; })
    };
  }
  function progress(done) { return progressOf(game, done); }

  function maxScore(n) {
    var s = 0;
    for (var k = 1; k <= n; k++) s += BASE_POINTS + MAX_TIME_BONUS + Math.min(k - 1, STREAK_CAP) * STREAK_STEP;
    return s;
  }

  function rankFor(ratio) {
    if (ratio === 1) return { name: T("Mā schāʾ Allāh – alles richtig!"), note: T("Du beherrschst dieses Gebiet. Probier den gemischten Modus mit 15 Fragen.") };
    if (ratio >= 0.8) return { name: T("Sehr gut (Mutqin)"), note: T("Nur noch Kleinigkeiten – schau dir die markierten Fragen an.") };
    if (ratio >= 0.5) return { name: T("Auf gutem Weg (Mutawassiṭ)"), note: T("Lies die Abschnitte zu deinen Fehlern im Nachschlagen nach und versuch es erneut.") };
    return { name: T("Am Anfang des Weges (Mubtadiʾ)"), note: T("„Wer sich auf den Weg macht, um Wissen zu erlangen, dem erleichtert Allah den Weg ins Paradies.“") };
  }

  function showResult() {
    stopTimer();
    if (game.preset && game.preset.learn) {
      var g = game;
      game = null;
      $("#quiz-play").hidden = true;
      g.preset.onFinish(progressOf(g, true));
      g.preset.onLeave();
      return;
    }
    $("#quiz-play").hidden = true;
    $("#quiz-result").hidden = false;
    var total = game.qs.length;
    var ratio = game.correct / total;
    var rank = rankFor(ratio);
    var stars = ratio === 1 ? 3 : ratio >= 0.6 ? 2 : ratio > 0 ? 1 : 0;

    var prev = game.key ? store(game.key) : null;
    var isBest = !!game.key && (!prev || game.score > prev.score);
    if (isBest) store(game.key, { score: game.score, correct: game.correct, total: total });
    if (game.preset) game.preset.onFinish(progress(true));
    else emit("finish", { score: game.score, correct: game.correct, total: total, mode: setup.mode });
    $("#again").hidden = !!game.preset;
    $("#to-setup").textContent = game.preset ? game.preset.nextLabel || T("Zur Rangliste") : T("Anderes Thema wählen");

    $("#r-score").textContent = game.score;
    $("#r-max").textContent = T("von max. {n} Punkten", { n: maxScore(total) });
    $("#r-correct").textContent = game.correct + " / " + total;
    $("#r-streak").textContent = game.bestStreak;
    $("#r-rank").textContent = rank.name;
    $("#r-note").textContent = rank.note;
    $("#r-best").hidden = !isBest || game.score === 0;
    $all(".star").forEach(function (s, i) { s.classList.toggle("on", i < stars); });

    var wrong = game.answers.filter(function (a) { return !a.ok; });
    resultWrong = { qs: wrong.map(function (a) { return a.item.src; }), back: game.preset ? "wettbewerb" : "quiz" };
    var rm = $("#r-mistakes");
    rm.hidden = !(window.FIQH_MISTAKES && wrong.length) || !!(game.preset && game.preset.nextLabel);
    rm.textContent = T("Fehler wiederholen ({n})", { n: wrong.length });
    $("#review-title").textContent = wrong.length ? T("Zum Nachlesen ({n})", { n: wrong.length }) : T("Alle Antworten richtig");
    $("#review").innerHTML = wrong.map(function (a) {
      var right = a.item.options.filter(function (o) { return o.correct; })[0].text;
      var t = TOPIC_BY_ID[a.item.src.t];
      return '<li class="review-item"><p class="rv-q">' + esc(a.item.src.q) + "</p>" +
        '<p class="rv-a"><span class="rv-label bad">' + T("Deine Antwort") + "</span> " + esc(a.item.options[a.chosen].text) + "</p>" +
        '<p class="rv-a"><span class="rv-label good">' + T("Richtig") + "</span> " + esc(right) + "</p>" +
        '<p class="rv-e">' + esc(a.item.src.e) + "</p>" +
        '<p class="fb-source">' + esc(sourceLine(a.item.src)) + "</p>" +
        (dalilHtml(a.item.src) ? '<ul class="fb-dalil">' + dalilHtml(a.item.src) + "</ul>" : "") +
        (t ? '<button type="button" class="linkish" data-review-topic="' + t.id + '"' +
          (t.sections[a.item.src.s] ? ' data-review-sec="' + a.item.src.s + '"' : "") + ">" + T("Im Nachschlagen öffnen:") + " " +
          esc(t.title + (t.sections[a.item.src.s] ? " › " + t.sections[a.item.src.s].h : "")) + "</button>" : "") + "</li>";
    }).join("");
    $all("[data-review-topic]").forEach(function (b) {
      b.addEventListener("click", function () {
        showView("nachschlagen");
        $("#search").value = "";
        var id = b.getAttribute("data-review-topic"), sec = b.getAttribute("data-review-sec");
        openTopic(id);
        window.scrollTo(0, 0);
        var el = sec !== null && document.getElementById("sec-" + id + "-" + sec);
        if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 80);
      });
    });
    window.scrollTo(0, 0);
  }

  var resultWrong = null;
  $("#r-mistakes").addEventListener("click", function () {
    if (!resultWrong || !window.FIQH_MISTAKES) return;
    game = null;
    window.FIQH_MISTAKES.practice(resultWrong.qs, T("Fehler aus dem Quiz"), resultWrong.back);
  });
  $("#again").addEventListener("click", function () { startQuiz(); });
  $("#to-setup").addEventListener("click", function () {
    var g = game;
    game = null;
    if (g && g.preset) { g.preset.onLeave(); return; }
    renderSetup(); window.scrollTo(0, 0);
  });

  /* ---------- small API for social.js ---------- */
  var listeners = {};
  function emit(name, data) {
    (listeners[name] || []).forEach(function (fn) { try { fn(data); } catch (e) { console.error(e); } });
  }
  window.FIQH_APP = {
    TOPICS: TOPICS, QUESTIONS: QUESTIONS, TOPIC_BY_ID: TOPIC_BY_ID, GROUPS: GROUPS,
    esc: esc, store: store, sourceLine: sourceLine, dalilHtml: dalilHtml, shuffle: shuffle, pickQuestions: pickQuestions, maxScore: maxScore,
    showView: showView, tabOf: TAB_OF, startQuiz: startQuiz, renderSetup: renderSetup, openTopic: openTopic,
    isPlaying: function () { return !!game && !$("#quiz-play").hidden; },
    on: function (name, fn) { (listeners[name] = listeners[name] || []).push(fn); }
  };

  document.addEventListener("keydown", function (e) {
    if (views.quiz.hidden || !game || $("#quiz-play").hidden) return;
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var k = e.key.toLowerCase();
    var map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
    if (!game.answered && map.hasOwnProperty(k)) { e.preventDefault(); answer(map[k]); }
    else if (game.answered && (k === "enter" || k === " ") && document.activeElement !== $("#next-q")) { e.preventDefault(); $("#next-q").click(); }
  });

  /* ---------- boot ---------- */
  $("#stat-topics").textContent = TOPICS.length;
  $("#stat-questions").textContent = QUESTIONS.length;
  $("#stat-sections").textContent = TOPICS.reduce(function (n, t) { return n + t.sections.length; }, 0);

  renderTopicNav();
  showOverview();
  renderSetup();
  var hash = (location.hash || "").replace("#", "");
  showView(views[hash] ? hash : (store("view") || "start"), false);
  window.addEventListener("hashchange", function () {
    var h = (location.hash || "").replace("#", "");
    if (views[h] && views[h].hidden) { showView(h, false); window.scrollTo(0, 0); }
  });
})();
