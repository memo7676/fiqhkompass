/* Languages. German is the original; English (i18n-en.js) comes first, Turkish follows.
   - T("German text", { n: 3 }) -> the text in the chosen language, {name} filled in.
     A missing translation simply stays German, so nothing ever breaks.
   - The fixed texts of index.html are translated once on load: a whole element when its
     inner HTML is in the dictionary (paragraphs with <b> inside), otherwise text by text,
     plus placeholder / aria-label / title / alt.
   - Changing the language reloads the page (choice in localStorage "fiqh:lang"). */
(function () {
  "use strict";
  var LANGS = [["de", "Deutsch"], ["en", "English"]];
  var LOCALE = { de: "de-DE", en: "en-GB" };
  var DICT = { en: window.I18N_EN || {} };

  var lang = null;
  try { lang = localStorage.getItem("fiqh:lang"); } catch (e) {}
  if (!LOCALE[lang]) lang = /^en\b/i.test(navigator.language || "") ? "en" : "de";

  function fill(s, vars) {
    return vars ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; }) : s;
  }
  function T(de, vars) {
    var d = DICT[lang], out = d && d[de];
    return fill(out !== undefined && out !== "" ? out : de, vars);
  }
  /* one form for 1, another for the rest: N(n, "Frage", "Fragen") */
  function N(n, one, many) { return T(n === 1 ? one : many); }

  /* ---------- fixed texts in the page ---------- */
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, OPTION: 1 };
  function norm(s) { return String(s).replace(/\s+/g, " ").trim(); }
  function translateDom(root) {
    var d = DICT[lang];
    if (!d) return;
    /* 1. whole elements (text with inline markup) */
    Array.prototype.forEach.call(root.querySelectorAll("*"), function (el) {
      if (!el.children.length || SKIP[el.nodeName] || el.closest("[lang='ar'], [data-no-i18n]")) return;
      var html = el.innerHTML;
      if (html.length > 2000) return;
      var key = norm(html);
      if (key.indexOf("<") !== -1 && d[key]) el.innerHTML = d[key];
    });
    /* 2. single texts */
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), node, list = [];
    while ((node = walker.nextNode())) list.push(node);
    list.forEach(function (t) {
      var p = t.parentNode;
      if (!p || SKIP[p.nodeName] || (p.closest && p.closest("[lang='ar'], [data-no-i18n]"))) return;
      var key = norm(t.nodeValue);
      if (!key || !d[key]) return;
      var lead = t.nodeValue.match(/^\s*/)[0], tail = t.nodeValue.match(/\s*$/)[0];
      t.nodeValue = lead + d[key] + tail;
    });
    /* 3. attributes */
    ["placeholder", "aria-label", "title", "alt"].forEach(function (a) {
      Array.prototype.forEach.call(root.querySelectorAll("[" + a + "]"), function (el) {
        var v = norm(el.getAttribute(a));
        if (d[v]) el.setAttribute(a, d[v]);
      });
    });
  }

  document.documentElement.setAttribute("lang", lang);
  if (lang !== "de") {
    translateDom(document.body);
    document.title = T(document.title);
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", T(meta.getAttribute("content")));
  }

  /* ---------- the language switch in the header ---------- */
  var sel = document.getElementById("lang-select");
  if (sel) {
    sel.innerHTML = LANGS.map(function (l) { return '<option value="' + l[0] + '" title="' + l[1] + '"' + (l[0] === lang ? " selected" : "") + ">" + l[0].toUpperCase() + "</option>"; }).join("");
    sel.title = LANGS.filter(function (l) { return l[0] === lang; })[0][1];
    sel.addEventListener("change", function () {
      try { localStorage.setItem("fiqh:lang", sel.value); } catch (e) {}
      location.reload();
    });
  }

  window.I18N = { lang: lang, locale: LOCALE[lang], T: T, N: N, translate: translateDom };
  window.T = T;
})();
