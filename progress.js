/* Mein Lernstand: where you are strong and where you still have problems – per subject.
   Arabisch: per skill (vocabulary, plural, grammar, iʿrāb, sarf) and per lesson; Fiqh: per topic.
   Data: the levels of learn.js (new / wrong / almost / learned, synced) plus the answer counts
   on this device (L.tries: answers, mistakes, last mistake; L.days: answers per day).
   A problem area gets a "Gezielt üben" round: its open mistakes first, then questions that went
   wrong before, then new ones. Shown in its own view (#lernstand), as a card on the Fächer page
   and as a hint line in Arabisch and Fiqh-Lernen. */
(function () {
  "use strict";
  var APP = window.FIQH_APP, L = window.FIQH_LEARN, AR = window.FIQH_ARABIC, S = window.FIQH_SARF;
  if (!APP || !L || !document.getElementById("view-progress")) return;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var esc = APP.esc, T = window.T || function (s, v) { return v ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; }) : s; };
  var ROUND = 10, DAY = 864e5, RECENT = 30 * DAY;

  var subject = APP.store("lp-subject") === "fiqh" ? "fiqh" : "arabisch";
  if (!AR) subject = "fiqh";

  /* ---------- measuring an area (a list of question ids) ---------- */
  function measure(ids) {
    var m = { total: ids.length, learned: 0, almost: 0, wrong: 0, fresh: 0, answers: 0, misses: 0, recent: 0, lastMiss: 0 };
    var now = Date.now();
    ids.forEach(function (id) {
      var l = L.levelOf(id);
      if (l === 2) m.learned++; else if (l === 1) m.almost++; else if (l === -1) m.wrong++; else m.fresh++;
      var t = L.tries(id);
      if (t) {
        m.answers += t[0]; m.misses += t[1];
        if (t[2] && now - t[2] < RECENT) m.recent++;
        if (t[2] > m.lastMiss) m.lastMiss = t[2];
      }
    });
    m.open = m.wrong + m.almost;
    m.seen = m.total - m.fresh;
    m.pct = m.total ? Math.floor(m.learned / m.total * 100) : 0;
    if (m.total && m.learned === m.total) m.pct = 100;
    /* hit rate: from the answer counts when there are enough, otherwise from the levels */
    m.acc = m.answers >= 5 ? (m.answers - m.misses) / m.answers : m.seen >= 3 ? m.learned / m.seen : null;
    m.problem = m.open >= 2 || (m.open >= 1 && m.total <= 6) || (m.acc !== null && m.answers >= 8 && m.acc < 0.7);
    m.strong = m.seen >= Math.max(5, Math.ceil(m.total * 0.3)) && m.open === 0 && (m.acc === null || m.acc >= 0.85);
    /* how urgent: open mistakes weigh most, then recent mistakes, then a low hit rate */
    m.score = m.open * 3 + m.recent + (m.acc === null ? 0 : (1 - m.acc) * 10);
    return m;
  }

  /* ---------- areas per subject ---------- */
  function idsOf(list) { return list.map(function (q) { return q._lid; }); }
  function arabicQs() {
    if (!AR) return [];
    var open2 = AR.book2Open ? AR.book2Open() : false;
    return AR.allQuestions.filter(function (q) { return q.lesson === "gen" || /^m/.test(q.lesson) || open2; });
  }
  function arabicAreas() {
    var qs = arabicQs(), areas = [];
    var SKILLS = [
      ["vocab", T("Vokabeln"), /^ar-[vd]-/], ["plural", T("Plural"), /^ar-p-/],
      ["gram", T("Grammatik"), /^ar-g-/], ["irab", "Iʿrāb", /^ar-[ix]-/]
    ];
    SKILLS.forEach(function (sk) {
      var list = qs.filter(function (q) { return sk[2].test(q._lid); });
      if (list.length) areas.push({ key: "skill-" + sk[0], kind: "skill", name: sk[1], qs: list, ids: idsOf(list) });
    });
    if (S && S.TABLES) areas.push({ key: "skill-sarf", kind: "skill", name: "Sarf", sarf: true, ids: S.TABLES.map(function (t) { return t.id; }) });
    var open2 = AR.book2Open ? AR.book2Open() : false;
    AR.allLessons.forEach(function (l) {
      if (l.book === 2 && !open2) return;
      var list = qs.filter(function (q) { return q.lesson === l.id; });
      if (!list.length) return;
      areas.push({ key: "lesson-" + l.id, kind: "lesson", lesson: l, qs: list, ids: idsOf(list),
        name: (l.book === 2 ? T("Buch 2") + " · " : "") + T("Lektion") + " " + l.n + " · " + l.title });
    });
    return areas;
  }
  function fiqhAreas() {
    return APP.TOPICS.map(function (t) {
      var list = APP.QUESTIONS.filter(function (q) { return q.t === t.id && q._lid; });
      return { key: "topic-" + t.id, kind: "topic", name: t.title, qs: list, ids: idsOf(list) };
    }).filter(function (a) { return a.qs.length; });
  }
  function areasFor(sub) {
    var list = sub === "arabisch" ? arabicAreas() : fiqhAreas();
    list.forEach(function (a) { a.m = measure(a.ids); });
    return list;
  }
  function allIds(sub) {
    if (sub === "arabisch") return idsOf(arabicQs()).concat(S && S.TABLES ? S.TABLES.map(function (t) { return t.id; }) : []);
    return idsOf(APP.QUESTIONS.filter(function (q) { return q._lid; }));
  }
  function problems(areas) {
    return areas.filter(function (a) { return a.m.problem; }).sort(function (a, b) { return b.m.score - a.m.score; });
  }
  function strengths(areas) {
    return areas.filter(function (a) { return a.m.strong && a.kind !== "skill"; })
      .sort(function (a, b) { return b.m.learned - a.m.learned; });
  }
  /* in a lesson: which part (vocabulary, grammar, iʿrāb) goes wrong most */
  function weakPart(a) {
    if (a.kind !== "lesson") return "";
    var parts = [[T("Vokabeln"), /^ar-[vdp]-/], [T("Grammatik"), /^ar-g-/], ["Iʿrāb", /^ar-i-/]], best = null;
    parts.forEach(function (p) {
      var m = measure(a.ids.filter(function (id) { return p[1].test(id); }));
      if (m.total && m.open && (!best || m.open > best.open)) best = { name: p[0], open: m.open };
    });
    return best ? T("vor allem {p}", { p: best.name }) : "";
  }

  /* ---------- a focused round ---------- */
  var lastRound = null;
  function focusList(a) {
    var open = [], missed = [], fresh = [], rest = [];
    a.qs.forEach(function (q) {
      var l = L.levelOf(q._lid), t = L.tries(q._lid);
      if (l === -1 || l === 1) open.push(q);
      else if (t && t[1]) missed.push(q);
      else if (l === 0) fresh.push(q);
      else rest.push(q);
    });
    missed.sort(function (x, y) { return (L.tries(y._lid)[2] || 0) - (L.tries(x._lid)[2] || 0); });
    return APP.shuffle(open).concat(missed, fresh, APP.shuffle(rest)).slice(0, ROUND);
  }
  function practise(key) {
    var a = areasFor(subject).filter(function (x) { return x.key === key; })[0];
    if (!a) return;
    if (a.sarf) { APP.showView("arabisch"); if (window.FIQH_ARABIC_RENDER) window.FIQH_ARABIC_RENDER("sarf"); window.scrollTo(0, 0); return; }
    var qs = focusList(a);
    if (!qs.length) return;
    APP.startQuiz(practisePreset(a, key, APP.shuffle(qs), measure(a.ids)));
  }
  function practisePreset(a, key, qs, before) {
    var correct = 0;
    return {
      learn: true, questions: qs, label: T("Gezielt üben") + " · " + a.name,
      resume: { kind: "progress", args: { subject: subject, key: key, before: before } },
      onAnswer: function (q, ok) { if (ok) correct++; return L.recordId(q._lid, ok); },
      onFinish: function (p) {
        lastRound = { name: a.name, key: key, answered: p.answered, correct: correct, before: before, after: measure(a.ids) };
        L.sync();
      },
      onLeave: function () { APP.showView("lernstand"); window.scrollTo(0, 0); }
    };
  }
  APP.onResume("progress", function (r, qs) {
    var a = areasFor(r.subject).filter(function (x) { return x.key === r.key; })[0];
    if (!a) return null;
    subject = r.subject;
    return practisePreset(a, r.key, qs, r.before);
  });
  /* the most urgent area over both subjects (for the Fächer page) */
  function topProblem() {
    var best = null;
    ["arabisch", "fiqh"].forEach(function (sub) {
      if (sub === "arabisch" && !AR) return;
      var p = problems(areasFor(sub))[0];
      if (p && (!best || p.m.score > best.a.m.score)) best = { sub: sub, a: p };
    });
    return best;
  }

  /* ---------- small pieces ---------- */
  function pct(x) { return Math.round(x * 100) + " %"; }
  function bar(m) {
    function seg(n, cls) { return n ? '<span class="lb-' + cls + '" style="width:' + (n / m.total * 100) + '%"></span>' : ""; }
    return '<span class="lbar" role="img" aria-label="' + esc(T("{n} von {m} gelernt", { n: m.learned, m: m.total })) + '">' +
      seg(m.learned, "ok") + seg(m.almost, "mid") + seg(m.wrong, "bad") + "</span>";
  }
  function ago(t) {
    if (!t) return "";
    var d = Math.floor((Date.now() - t) / DAY);
    return d <= 0 ? T("heute") : d === 1 ? T("gestern") : T("vor {n} Tagen", { n: d });
  }
  function facts(m) {
    var out = [];
    if (m.open) out.push(T(m.open === 1 ? "{n} offener Fehler" : "{n} offene Fehler", { n: m.open }));
    if (m.acc !== null) out.push(T("Trefferquote {p}", { p: pct(m.acc) }));
    if (m.lastMiss) out.push(T("zuletzt falsch: {d}", { d: ago(m.lastMiss) }));
    out.push(T("{n} % gelernt", { n: m.pct }));
    return out.join(" · ");
  }

  /* answers per day, last 14 days: stacked bars (right below, wrong above) */
  function activity(sub) {
    var days = L.days(), list = [], now = Date.now();
    for (var i = 13; i >= 0; i--) {
      var t = now - i * DAY, k = L.dayKey(t), c = (days[k] || {})[sub] || [0, 0];
      list.push({ t: t, k: k, n: c[0], ok: c[1], bad: c[0] - c[1], today: i === 0 });
    }
    return list;
  }
  function chartHtml(sub) {
    var list = activity(sub), max = 0, sumN = 0, sumOk = 0, week = 0;
    list.forEach(function (d, i) { if (d.n > max) max = d.n; sumN += d.n; sumOk += d.ok; if (i >= 7) week += d.n; });
    var loc = (window.I18N && window.I18N.locale) || "de-DE";
    var bars = list.map(function (d) {
      var label = new Date(d.t).toLocaleDateString(loc, { weekday: "short", day: "numeric", month: "numeric" }) + ": " +
        (d.n ? T("{n} beantwortet, {r} richtig, {w} falsch", { n: d.n, r: d.ok, w: d.bad }) : T("nichts geübt"));
      var hOk = max ? d.ok / max * 100 : 0, hBad = max ? d.bad / max * 100 : 0;
      return '<div class="lp-day' + (d.today ? " is-today" : "") + '" title="' + esc(label) + '" aria-label="' + esc(label) + '" role="img">' +
        '<div class="lp-col">' + (d.bad ? '<span class="lp-bad" style="height:' + hBad + '%"></span>' : "") +
        (d.ok ? '<span class="lp-ok" style="height:' + hOk + '%"></span>' : "") + "</div>" +
        '<small>' + (d.today ? T("heute") : new Date(d.t).toLocaleDateString(loc, { weekday: "narrow" })) + "</small></div>";
    }).join("");
    return '<div class="panel lp-chart"><div class="lp-chart-head"><h3>' + T("Deine letzten 14 Tage") + "</h3>" +
      '<span class="lp-legend"><i class="lp-sw ok"></i>' + T("richtig") + ' <i class="lp-sw bad"></i>' + T("falsch") + "</span></div>" +
      (sumN ? '<div class="lp-bars">' + bars + "</div>" +
        '<p class="lp-sum">' + T("{n} Antworten in 14 Tagen, davon {p} richtig · {w} in den letzten 7 Tagen", { n: sumN, p: pct(sumOk / sumN), w: week }) + "</p>"
        : '<p class="lp-empty">' + T("In den letzten 14 Tagen hast du hier noch nichts geübt. Jede beantwortete Frage erscheint in dieser Übersicht.") + "</p>") +
      "</div>";
  }

  function areaCard(a, i) {
    var wp = weakPart(a), n = a.sarf ? 0 : focusList(a).length;
    return '<li class="lp-area' + (i === 0 ? " is-top" : "") + '"><div class="lp-area-main"><strong>' + esc(a.name) + "</strong>" + bar(a.m) +
      "<small>" + esc(facts(a.m)) + (wp ? " · <b>" + esc(wp) + "</b>" : "") + "</small></div>" +
      '<button type="button" class="btn' + (i === 0 ? " btn-primary" : "") + '" data-lp-practise="' + esc(a.key) + '">' +
      (a.sarf ? T("Sarf üben") : T("Gezielt üben ({n})", { n: n })) + "</button></li>";
  }

  /* ---------- the view ---------- */
  function render() {
    var areas = areasFor(subject), all = measure(allIds(subject));
    var probs = problems(areas), strong = strengths(areas);
    $all("[data-lp-subject]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-lp-subject") === subject ? "true" : "false"); });
    $("#lp-subjects").hidden = !AR;

    var round = $("#lp-round");
    if (lastRound) {
      var r = lastRound;
      round.hidden = false;
      round.innerHTML = "<h3>" + T("Runde geschafft: {n} von {m} richtig", { n: r.correct, m: r.answered }) + "</h3>" +
        "<p>" + esc(r.name) + ": " + T("offene Fehler {a} → {b}", { a: r.before.open, b: r.after.open }) + " · <b>" + r.before.pct + " % → " + r.after.pct + " %</b></p>" +
        '<div class="lr-actions">' + (r.after.open ? '<button type="button" class="btn btn-primary" data-lp-practise="' + esc(r.key) + '">' + T("Weiter üben") + "</button>" : "") +
        '<button type="button" class="linkish" data-lp-close>' + T("Schließen") + "</button></div>";
    } else round.hidden = true;

    var tiles = [
      [all.pct + " %", T("gelernt"), T("{n} von {m}", { n: all.learned, m: all.total })],
      [String(all.open), T("offene Fehler"), all.open ? T("warten aufs Wiederholen") : T("alles wiederholt")],
      [all.acc === null ? "–" : pct(all.acc), T("Trefferquote"), all.answers >= 5 ? T("aus {n} Antworten", { n: all.answers }) : T("noch zu wenig Antworten")]
    ];
    $("#lp-tiles").innerHTML = tiles.map(function (t) {
      return '<div class="lp-tile"><b>' + esc(t[0]) + "</b><span>" + esc(t[1]) + "</span><small>" + esc(t[2]) + "</small></div>";
    }).join("");

    var body = "";
    body += '<section class="panel lp-block lp-problems"><h3>' + T("Hier hast du noch Probleme") + "</h3>" +
      (probs.length
        ? "<p>" + T("Sortiert nach Dringlichkeit: offene Fehler, kürzlich falsch beantwortete Fragen und eine niedrige Trefferquote. Konzentrier dich zuerst auf das oberste.") + "</p>" +
          '<ol class="lp-areas">' + probs.slice(0, 5).map(areaCard).join("") + "</ol>"
        : "<p>" + (all.seen ? T("Gerade gibt es keinen Bereich mit mehreren offenen Fehlern. Mā schāʾ Allāh – mach weiter mit neuen Lektionen.") : T("Beantworte ein paar Fragen, dann siehst du hier, worin du noch Probleme hast.")) + "</p>") +
      "</section>";
    body += chartHtml(subject);
    if (subject === "arabisch") {
      var skills = areas.filter(function (a) { return a.kind === "skill"; });
      body += '<section class="panel lp-block"><h3>' + T("Deine Fähigkeiten") + "</h3>" +
        "<p>" + T("Wie sicher du in den einzelnen Teilen bist – über alle Lektionen hinweg.") + "</p>" +
        '<ul class="lp-skills">' + skills.map(function (a) {
          var st = a.m.problem ? "bad" : a.m.strong ? "ok" : a.m.seen ? "mid" : "new";
          var badge = { bad: T("Baustelle"), ok: T("sicher"), mid: T("im Aufbau"), "new": T("noch nicht geübt") }[st];
          return '<li><span class="lp-skill-name">' + esc(a.name) + '</span><span class="lp-badge is-' + st + '">' + esc(badge) + "</span>" + bar(a.m) +
            "<small>" + esc(facts(a.m)) + "</small>" +
            '<button type="button" class="btn btn-sm" data-lp-practise="' + esc(a.key) + '">' + (a.sarf ? T("Sarf üben") : T("Üben")) + "</button></li>";
        }).join("") + "</ul></section>";
    }
    body += '<section class="panel lp-block"><h3>' + T("Darin bist du stark") + "</h3>" +
      (strong.length ? '<ul class="lp-strong">' + strong.slice(0, 8).map(function (a) { return "<li>✓ " + esc(a.name) + " <small>" + a.m.pct + " %</small></li>"; }).join("") + "</ul>"
        : "<p>" + T("Sobald du einen Bereich ohne offene Fehler sicher beherrschst, erscheint er hier.") + "</p>") + "</section>";
    var sorted = areas.filter(function (a) { return a.kind !== "skill"; }).sort(function (a, b) { return b.m.score - a.m.score || a.m.pct - b.m.pct; });
    body += '<details class="panel lp-block lp-all"><summary>' + (subject === "arabisch" ? T("Alle Lektionen im Überblick") : T("Alle Themen im Überblick")) +
      " <small>" + sorted.length + "</small></summary>" +
      '<ul class="lp-list">' + sorted.map(function (a) {
        var st = a.m.problem ? "bad" : a.m.strong ? "ok" : a.m.seen ? "mid" : "new";
        return '<li><span class="lp-dot is-' + st + '" aria-hidden="true"></span><span class="lp-list-name">' + esc(a.name) + "</span>" + bar(a.m) +
          "<small>" + esc(facts(a.m)) + "</small>" +
          (a.m.seen ? '<button type="button" class="linkish" data-lp-practise="' + esc(a.key) + '">' + T("Üben") + "</button>" : "") + "</li>";
      }).join("") + "</ul></details>";
    body += '<p class="lp-note">' + T("Offene Fehler und „gelernt“ werden mit deinem Konto gespeichert. Trefferquote und Tagesübersicht zählen die Antworten auf diesem Gerät.") + "</p>";
    $("#lp-body").innerHTML = body;
    wire($("#view-progress"));
  }
  function wire(root) {
    $all("[data-lp-practise]", root).forEach(function (b) {
      if (b.__lp) return; b.__lp = 1;
      b.addEventListener("click", function () { practise(b.getAttribute("data-lp-practise")); });
    });
    var c = $("[data-lp-close]", root);
    if (c && !c.__lp) { c.__lp = 1; c.addEventListener("click", function () { lastRound = null; render(); }); }
  }
  $all("[data-lp-subject]").forEach(function (b) {
    b.addEventListener("click", function () { subject = b.getAttribute("data-lp-subject"); APP.store("lp-subject", subject); lastRound = null; render(); });
  });

  /* ---------- hints elsewhere: Fächer page, Arabisch, Fiqh-Lernen ---------- */
  function hintHtml(sub) {
    var p = problems(areasFor(sub))[0];
    if (!p) return "";
    return '<p class="lp-hint"><span>' + T("Größte Baustelle:") + " <b>" + esc(p.name) + "</b> · " + esc(facts(p.m)) + "</span>" +
      '<button type="button" class="btn btn-sm" data-lp-go="' + sub + '" data-lp-key="' + esc(p.key) + '">' + T("Gezielt üben") + "</button>" +
      '<button type="button" class="linkish" data-lp-open="' + sub + '">' + T("Lernstand ansehen") + "</button></p>";
  }
  function wireHints(root) {
    $all("[data-lp-go]", root).forEach(function (b) {
      b.addEventListener("click", function () { subject = b.getAttribute("data-lp-go"); practise(b.getAttribute("data-lp-key")); });
    });
    $all("[data-lp-open]", root).forEach(function (b) {
      b.addEventListener("click", function () { open(b.getAttribute("data-lp-open")); });
    });
  }
  function open(sub) {
    if (sub) { subject = sub; APP.store("lp-subject", sub); }
    APP.showView("lernstand");
    window.scrollTo(0, 0);
  }
  function renderHints() {
    var ar = $("#ar-focus"), fq = $("#learn-focus");
    if (ar && AR) { ar.innerHTML = hintHtml("arabisch"); wireHints(ar); }
    if (fq) { fq.innerHTML = hintHtml("fiqh"); wireHints(fq); }
  }
  function renderHomeCard() {
    var box = $("#home-progress");
    if (!box) return;
    var top = topProblem(), any = measure(allIds("fiqh")).seen + (AR ? measure(allIds("arabisch")).seen : 0);
    box.innerHTML = '<div class="panel lp-home"><div><p class="eyebrow">' + T("Mein Lernstand") + "</p>" +
      (top ? "<h3>" + T("Deine größte Baustelle: {a}", { a: esc(top.a.name) }) + "</h3><p>" + esc((top.sub === "arabisch" ? T("Arabisch") : "Fiqh") + " · " + facts(top.a.m)) + "</p>"
        : any ? "<h3>" + T("Keine offenen Baustellen") + "</h3><p>" + T("Sieh dir an, worin du schon stark bist und wie viel du in den letzten Tagen geübt hast.") + "</p>"
          : "<h3>" + T("Verfolge deinen Lernerfolg") + "</h3><p>" + T("Sobald du lernst, siehst du hier, worin du fortgeschritten bist und wo du noch Probleme hast.") + "</p>") +
      '</div><div class="lp-home-actions">' + (top ? '<button type="button" class="btn btn-primary" data-lp-go="' + top.sub + '" data-lp-key="' + esc(top.a.key) + '">' + T("Gezielt üben") + "</button>" : "") +
      '<button type="button" class="btn" data-lp-open="' + (top ? top.sub : subject) + '">📈 ' + T("Lernstand ansehen") + "</button></div></div>";
    wireHints(box);
  }
  $all("[data-open-progress]").forEach(function (b) {
    b.addEventListener("click", function () { open(b.getAttribute("data-open-progress")); });
  });

  APP.on("view", function (name) {
    if (name === "lernstand") render();
    if (name === "start") renderHomeCard();
    if (name === "arabisch" || name === "lernen") renderHints();
  });
  L.onChange(function () {
    if (!$("#view-progress").hidden) render();
    renderHints();
    if (!$("#view-home").hidden) renderHomeCard();
  });
  renderHints();
  renderHomeCard();
  if (!$("#view-progress").hidden) render();
  window.FIQH_PROGRESS = { open: open, areas: areasFor, measure: measure, practise: practise };
})();
