/* App: registers the service worker and offers "add to home screen".
   Android/Chrome/Edge: the browser's own install dialog. iPhone/iPad: short instructions,
   because Safari only installs via Share -> "Zum Home-Bildschirm". */
(function () {
  "use strict";
  var T = window.T || function (s, v) { return v ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; }) : s; };
  function $(sel) { return document.querySelector(sel); }
  var APP = window.FIQH_APP;

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  }

  var box = $("#install");
  if (!box) return;
  var standalone = window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
  var ua = navigator.userAgent;
  var ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var dismissed = APP && APP.store("install-dismissed");
  var deferred = null;

  function show() { if (!standalone && !dismissed) box.hidden = false; }
  function hide(remember) {
    box.hidden = true;
    if (remember && APP) { APP.store("install-dismissed", Date.now()); dismissed = true; }
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    show();
  });
  window.addEventListener("appinstalled", function () { hide(true); });

  // Safari on iPhone/iPad never fires beforeinstallprompt: show the steps instead.
  if (ios && !standalone) setTimeout(show, 2500);

  $("#install-go").addEventListener("click", function () {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (c) { if (c && c.outcome === "accepted") hide(true); });
      deferred = null;
      return;
    }
    var how = $("#install-how");
    how.innerHTML = "";
    var ol = document.createElement("ol");
    ol.className = "install-steps";
    [T("Auf „Teilen“ tippen – das Quadrat mit Pfeil nach oben, unten in der Leiste oder im Menü „•••“."), T("„Zum Home-Bildschirm“ wählen (evtl. etwas nach unten scrollen)."), T("Oben rechts „Hinzufügen“ tippen.")].forEach(function (t) {
      var li = document.createElement("li"); li.textContent = t; ol.appendChild(li);
    });
    how.appendChild(ol);
    $("#install-go").hidden = true;
  });
  $("#install-close").addEventListener("click", function () { hide(true); });
})();
