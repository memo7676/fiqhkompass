/* Service worker: makes Ṭālibu l-ʿIlm installable and usable offline.
   Own files: network first (always the newest version when online), cache as fallback.
   Fonts and the Firebase SDK: cache first. Firebase data itself is never cached here. */
var CACHE = "fiqh-kompass-v29";
var CORE = [
  "./", "index.html", "datenschutz.html", "manifest.webmanifest", "i18n-en.js", "i18n.js",
  "data.js", "fiqh-en.js", "fiqh-belege.js", "glossar.js", "app.js", "learn.js", "irabgen.js", "sarf.js", "arabic.js", "mistakes.js", "progress.js", "home.js", "arabisch/madina1-a.js", "arabisch/madina1-b.js", "arabisch/madina1-c.js", "arabisch/madina2-a.js", "arabisch/madina2-b.js", "arabisch/madina2-c.js", "arabisch/madina-en.js", "social.js", "chat.js", "install.js", "auth.js", "backend.js", "firebase-config.js",
  "buch/01-grundlagen.js", "buch/02-iman.js", "buch/03-tahara-wudhu.js", "buch/04-ghusl-tayammum-frauen.js",
  "buch/05-gebet.js", "buch/06-gebet-2.js", "buch/07-fasten.js", "buch/08-zakat.js", "buch/09-hajj-qurban.js", "buch/10-alltag.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function isStaticThirdParty(url) {
  return url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com" ||
    (url.hostname === "www.gstatic.com" && url.pathname.indexOf("/firebasejs/") === 0);
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  if (url.origin === self.location.origin) {
    e.respondWith(fetch(req).then(function (res) {
      if (res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); return res; }
      /* e.g. a short 404 while GitHub Pages deploys: a broken script (i18n.js) would leave the
         whole page without texts, so the cached copy is used when there is one */
      return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || res; });
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (hit) {
        return hit || (req.mode === "navigate" ? caches.match("index.html") : Response.error());
      });
    }));
    return;
  }

  if (isStaticThirdParty(url)) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res.ok || res.type === "opaque") { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
        return res;
      });
    }));
  }
  // everything else (Firebase data, sign-in) goes straight to the network
});
