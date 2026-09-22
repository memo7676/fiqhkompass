(function () {
  "use strict";

  var TOPICS = window.FIQH_TOPICS || [];
  var QUESTIONS = window.FIQH_QUESTIONS || [];
  var TOPIC_BY_ID = {};
  TOPICS.forEach(function (t) { TOPIC_BY_ID[t.id] = t; });

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
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
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
  var views = { nachschlagen: $("#view-lookup"), quiz: $("#view-quiz") };
  function showView(name, push) {
    if (!views[name]) name = "nachschlagen";
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
    $all(".tab").forEach(function (b) {
      var on = b.getAttribute("data-view") === name;
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    if (push !== false) { try { history.replaceState(null, "", "#" + name); } catch (e) {} }
    store("view", name);
  }
  $all(".tab").forEach(function (b) {
    b.addEventListener("click", function () { showView(b.getAttribute("data-view")); window.scrollTo(0, 0); });
  });

  /* =====================================================
     NACHSCHLAGEN
     ===================================================== */
  var currentTopic = TOPICS[0] && TOPICS[0].id;

  function renderTopicNav() {
    var nav = $("#topic-nav");
    nav.innerHTML = TOPICS.map(function (t) {
      return '<button type="button" class="topic-link" data-topic="' + t.id + '">' +
        '<span class="tl-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span>" +
        '<span class="tl-title">' + esc(t.title) + "</span>" +
        '<span class="tl-meta">' + esc(t.lessons) + "</span></button>";
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
    $all(".topic-link").forEach(function (b) {
      b.setAttribute("aria-current", b.getAttribute("data-topic") === id ? "true" : "false");
    });
    var html = '<header class="article-head">' +
      '<p class="eyebrow">' + esc(t.lessons) + "</p>" +
      '<h2>' + esc(t.title) + ' <span class="h-ar" lang="ar" dir="rtl">' + esc(t.ar) + "</span></h2>" +
      '<p class="lede">' + esc(t.intro) + "</p>" +
      '<div class="article-actions">' +
      '<button type="button" class="btn btn-primary" data-quiz-topic="' + t.id + '">Quiz zu diesem Thema · ' + countFor(t.id) + ' Fragen</button>' +
      "</div>" +
      '<nav class="toc" aria-label="Abschnitte">' + t.sections.map(function (s, i) {
        return '<a href="#" data-jump="sec-' + t.id + "-" + i + '">' + esc(s.h) + "</a>";
      }).join("") + "</nav></header>";
    html += t.sections.map(function (s, i) {
      return '<section class="entry" id="sec-' + t.id + "-" + i + '"><h3>' + esc(s.h) + "</h3><ul>" +
        s.li.map(function (li) { return "<li>" + fmt(li) + "</li>"; }).join("") + "</ul></section>";
    }).join("");
    var art = $("#article");
    art.innerHTML = html;
    wireArticle(art);
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
      });
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
    if (!query) { openTopic(currentTopic, true); return; }
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
    var html = '<header class="article-head"><p class="eyebrow">Suche</p><h2>„' + esc(query) + "“</h2>" +
      '<p class="lede">' + (total ? total + " Treffer in " + hits.length + " Abschnitten" : "Keine Treffer. Versuche einen anderen Begriff, z. B. „Mest“, „Qibla“ oder „Kaffāra“.") + "</p></header>";
    html += hits.map(function (h) {
      return '<section class="entry"><p class="hit-topic"><button type="button" class="linkish" data-open-topic="' + h.t.id + '">' +
        esc(h.t.title) + "</button> · " + esc(h.t.lessons) + "</p><h3>" + esc(h.s.h) + "</h3><ul>" +
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
    chips.innerHTML = TOPICS.map(function (t) {
      var on = setup.topics.indexOf(t.id) !== -1;
      return '<button type="button" class="chip" data-chip="' + t.id + '" aria-pressed="' + on + '">' +
        '<span class="chip-check" aria-hidden="true"></span>' + esc(t.title) +
        '<span class="chip-count">' + countFor(t.id) + "</span></button>";
    }).join("");
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
    var startBtn = $("#start-quiz");
    var ok = pool.length > 0;
    startBtn.disabled = !ok;
    var n = Math.min(setup.count, pool.length);
    $("#setup-summary").textContent = ok
      ? n + " Fragen aus " + (setup.mode === "mixed" ? "allen " + TOPICS.length + " Themengebieten" :
        (setup.topics.length === 1 ? "„" + TOPIC_BY_ID[setup.topics[0]].title + "“" : setup.topics.length + " Themengebieten")) +
        " · " + pool.length + " im Pool"
      : "Wähle mindestens ein Themengebiet.";

    var best = store(bestKey());
    $("#setup-best").textContent = best ? "Dein Bestwert hier: " + best.score + " Punkte (" + best.correct + "/" + best.total + ")" : "Noch kein Bestwert für diese Auswahl.";

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

  function poolFor() {
    if (setup.mode === "mixed") return QUESTIONS.slice();
    return QUESTIONS.filter(function (q) { return setup.topics.indexOf(q.t) !== -1; });
  }

  /* Pick questions spread across topics so a mixed round really is mixed. */
  function pickQuestions(pool, n) {
    var byTopic = {};
    shuffle(pool).forEach(function (q) { (byTopic[q.t] = byTopic[q.t] || []).push(q); });
    var order = shuffle(Object.keys(byTopic));
    var out = [];
    while (out.length < n) {
      var added = false;
      for (var i = 0; i < order.length && out.length < n; i++) {
        var list = byTopic[order[i]];
        if (list.length) { out.push(list.shift()); added = true; }
      }
      if (!added) break;
    }
    return shuffle(out);
  }

  var game = null;
  var timerId = null;

  function startQuiz() {
    var pool = poolFor();
    if (!pool.length) return;
    var qs = pickQuestions(pool, Math.min(setup.count, pool.length)).map(function (q) {
      var opts = q.a.map(function (text, i) { return { text: text, correct: i === q.c }; });
      return { src: q, options: shuffle(opts) };
    });
    game = { qs: qs, i: 0, score: 0, correct: 0, streak: 0, bestStreak: 0, joker: true, answers: [], key: bestKey() };
    $("#quiz-setup").hidden = true;
    $("#quiz-result").hidden = true;
    $("#quiz-play").hidden = false;
    renderQuestion();
    window.scrollTo(0, 0);
  }
  $("#start-quiz").addEventListener("click", startQuiz);

  function renderQuestion() {
    var item = game.qs[game.i];
    var t = TOPIC_BY_ID[item.src.t];
    game.answered = false;
    game.hidden = [];
    game.startedAt = Date.now();

    $("#q-progress-text").textContent = "Frage " + (game.i + 1) + " von " + game.qs.length;
    $("#q-bar").style.width = (game.i / game.qs.length * 100) + "%";
    $("#q-topic").textContent = t.title;
    $("#q-score").textContent = game.score;
    $("#q-streak").textContent = game.streak > 1 ? game.streak + "er-Serie" : "";
    $("#q-streak").hidden = game.streak < 2;
    $("#q-text").textContent = item.src.q;
    $("#q-feedback").hidden = true;
    $("#joker").disabled = !game.joker;
    $("#joker").textContent = game.joker ? "50:50-Joker" : "Joker verbraucht";

    var letters = ["A", "B", "C", "D"];
    var box = $("#q-options");
    box.innerHTML = item.options.map(function (o, i) {
      return '<button type="button" class="option" data-opt="' + i + '"><span class="opt-key">' + letters[i] + "</span>" +
        '<span class="opt-text">' + esc(o.text) + "</span></button>";
    }).join("");
    $all(".option", box).forEach(function (b) {
      b.addEventListener("click", function () { answer(+b.getAttribute("data-opt")); });
    });
    startTimer();
    var first = $(".option", box);
    if (first && document.activeElement && document.activeElement.classList.contains("option")) first.focus();
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
    $("#joker").textContent = "Joker verbraucht";
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
      if (timeBonus) parts.push("+" + timeBonus + " Zeit");
      if (streakBonus) parts.push("+" + streakBonus + " Serie");
    }
    $("#fb-title").textContent = ok ? "Richtig!" : "Leider falsch";
    $("#fb-points").textContent = ok ? parts.join("  ") : "Die richtige Antwort ist markiert.";
    $("#fb-text").textContent = item.src.e;
    $("#fb-source").textContent = "Quelle: " + TOPIC_BY_ID[item.src.t].lessons + " – " + TOPIC_BY_ID[item.src.t].title;
    $("#next-q").textContent = game.i + 1 < game.qs.length ? "Nächste Frage" : "Ergebnis ansehen";
    $("#q-score").textContent = game.score;
    $("#q-streak").textContent = game.streak > 1 ? game.streak + "er-Serie" : "";
    $("#q-streak").hidden = game.streak < 2;
    $("#q-bar").style.width = ((game.i + 1) / game.qs.length * 100) + "%";
    $("#next-q").focus({ preventScroll: true });
    fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  $("#next-q").addEventListener("click", function () {
    if (!game) return;
    if (game.i + 1 < game.qs.length) { game.i += 1; renderQuestion(); }
    else showResult();
  });
  $("#quit-quiz").addEventListener("click", function () { stopTimer(); game = null; renderSetup(); });

  function maxScore(n) {
    var s = 0;
    for (var k = 1; k <= n; k++) s += BASE_POINTS + MAX_TIME_BONUS + Math.min(k - 1, STREAK_CAP) * STREAK_STEP;
    return s;
  }

  function rankFor(ratio) {
    if (ratio === 1) return { name: "Mā schāʾ Allāh – alles richtig!", note: "Du beherrschst dieses Gebiet. Probier den gemischten Modus mit 15 Fragen." };
    if (ratio >= 0.8) return { name: "Sehr gut (Mutqin)", note: "Nur noch Kleinigkeiten – schau dir die markierten Fragen an." };
    if (ratio >= 0.5) return { name: "Auf gutem Weg (Mutawassiṭ)", note: "Lies die Abschnitte zu deinen Fehlern im Nachschlagen nach und versuch es erneut." };
    return { name: "Am Anfang des Weges (Mubtadiʾ)", note: "„Wer sich auf den Weg macht, um Wissen zu erlangen, dem erleichtert Allah den Weg ins Paradies.“" };
  }

  function showResult() {
    stopTimer();
    $("#quiz-play").hidden = true;
    $("#quiz-result").hidden = false;
    var total = game.qs.length;
    var ratio = game.correct / total;
    var rank = rankFor(ratio);
    var stars = ratio === 1 ? 3 : ratio >= 0.6 ? 2 : ratio > 0 ? 1 : 0;

    var prev = store(game.key);
    var isBest = !prev || game.score > prev.score;
    if (isBest) store(game.key, { score: game.score, correct: game.correct, total: total });

    $("#r-score").textContent = game.score;
    $("#r-max").textContent = "von max. " + maxScore(total) + " Punkten";
    $("#r-correct").textContent = game.correct + " / " + total;
    $("#r-streak").textContent = game.bestStreak;
    $("#r-rank").textContent = rank.name;
    $("#r-note").textContent = rank.note;
    $("#r-best").hidden = !isBest || game.score === 0;
    $all(".star").forEach(function (s, i) { s.classList.toggle("on", i < stars); });

    var wrong = game.answers.filter(function (a) { return !a.ok; });
    $("#review-title").textContent = wrong.length ? "Zum Nachlesen (" + wrong.length + ")" : "Alle Antworten richtig";
    $("#review").innerHTML = wrong.map(function (a) {
      var right = a.item.options.filter(function (o) { return o.correct; })[0].text;
      var t = TOPIC_BY_ID[a.item.src.t];
      return '<li class="review-item"><p class="rv-q">' + esc(a.item.src.q) + "</p>" +
        '<p class="rv-a"><span class="rv-label bad">Deine Antwort</span> ' + esc(a.item.options[a.chosen].text) + "</p>" +
        '<p class="rv-a"><span class="rv-label good">Richtig</span> ' + esc(right) + "</p>" +
        '<p class="rv-e">' + esc(a.item.src.e) + "</p>" +
        '<button type="button" class="linkish" data-review-topic="' + t.id + '">Im Nachschlagen öffnen: ' + esc(t.title) + "</button></li>";
    }).join("");
    $all("[data-review-topic]").forEach(function (b) {
      b.addEventListener("click", function () {
        showView("nachschlagen");
        $("#search").value = "";
        openTopic(b.getAttribute("data-review-topic"));
        window.scrollTo(0, 0);
      });
    });
    window.scrollTo(0, 0);
  }

  $("#again").addEventListener("click", startQuiz);
  $("#to-setup").addEventListener("click", function () { game = null; renderSetup(); window.scrollTo(0, 0); });

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
  var savedTopic = store("topic");
  openTopic(TOPIC_BY_ID[savedTopic] ? savedTopic : currentTopic, true);
  renderSetup();
  var hash = (location.hash || "").replace("#", "");
  showView(views[hash] ? hash : (store("view") || "nachschlagen"), false);
})();
