/* Chat zwischen Spielern: nur Bruder mit Bruder oder Schwester mit Schwester.
   The server rules (firestore.rules) enforce the same, this file only offers what is allowed.
   Uses window.FIQH_BACKEND and window.FIQH_SOCIAL (names, pictures, block list). */
(function () {
  "use strict";
  var T = window.T || function (s, v) { return v ? String(s).replace(/\{(\w+)\}/g, function (m, k) { return v[k] !== undefined ? v[k] : m; }) : s; }, LOC = window.I18N ? window.I18N.locale : "de-DE";
  var B = window.FIQH_BACKEND, S = window.FIQH_SOCIAL, APP = window.FIQH_APP;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  if (!APP || !S) return;

  var authUser = null;
  var chats = [];            // [{ id, members, last, read, updatedAt }]
  var active = null;         // chat id
  var messages = [];
  var unsubChats = null, unsubMsgs = null;
  var viewOpen = false;

  function me() { return S.me(); }
  function otherOf(c) { return c.members[0] === me() ? c.members[1] : c.members[0]; }
  function isUnread(c) {
    return !!(c.last && c.last.from !== me() && c.last.at > (c.read[me()] || 0));
  }
  function time(ms) { return new Date(ms).toLocaleTimeString(LOC, { hour: "2-digit", minute: "2-digit" }); }
  function dayLabel(ms) {
    var d = new Date(ms), today = new Date();
    var y = new Date(); y.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return T("Heute");
    if (d.toDateString() === y.toDateString()) return T("Gestern");
    return d.toLocaleDateString(LOC, { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" });
  }
  function shortWhen(ms) {
    if (!ms) return "";
    return new Date(ms).toDateString() === new Date().toDateString() ? time(ms) : new Date(ms).toLocaleDateString(LOC, { day: "2-digit", month: "2-digit" });
  }
  function openAuth(p) { if (window.FIQH_AUTH) window.FIQH_AUTH.open(p); }

  /* ---------- state of the whole tab ---------- */
  function off(title, text, showButtons) {
    $("#chat-off-title").textContent = title;
    $("#chat-off-text").textContent = text;
    $("#chat-off-actions").hidden = !showButtons;
    $("#chat-off").hidden = false;
    $("#chat-on").hidden = true;
  }
  function refresh() {
    if (!B || !B.available) { off(T("Chat noch nicht eingerichtet"), T("Der Chat braucht den Server (Firebase). Die Anleitung steht in SETUP.md."), false); return; }
    if (!authUser) { off(T("Chat mit anderen Spielern"), T("Melde dich an, um mit anderen Spielern zu schreiben – Brüder mit Brüdern, Schwestern mit Schwestern."), true); return; }
    if (!authUser.emailVerified) { off(T("Bitte bestätige deine E-Mail-Adresse"), T("Der Chat ist freigeschaltet, sobald deine E-Mail-Adresse bestätigt ist."), false); return; }
    var mine = S.mine();
    if (!mine) { off(T("Einen Moment …"), T("Dein Spielerprofil wird geladen."), false); return; }
    $("#chat-off").hidden = true;
    $("#chat-on").hidden = false;
    $("#chat-rule").textContent = mine.g === "f"
      ? T("Du kannst mit anderen Schwestern schreiben.")
      : T("Du kannst mit anderen Brüdern schreiben.");
    renderList();
    if (active) renderConvoHead();
  }
  $("#chat-login").addEventListener("click", function () { openAuth("login"); });
  $("#chat-register").addEventListener("click", function () { openAuth("register"); });

  function subscribe() {
    if (unsubChats) { unsubChats(); unsubChats = null; }
    chats = [];
    if (!authUser || !authUser.emailVerified || !B.watchChats) { refresh(); return; }
    unsubChats = B.watchChats(authUser.uid, function (list) {
      chats = list;
      renderList();
      updateBadge();
      maybeMarkRead();
    }, function () { off(T("Chat gerade nicht erreichbar"), T("Lade die Seite neu und versuch es noch einmal."), false); });
    refresh();
  }

  /* ---------- conversation list ---------- */
  function renderList() {
    var box = $("#chat-list");
    if (!box || !me()) return;
    var blocked = S.blocked();
    var list = chats.filter(function (c) { return c.last || c.id === active; })
      .sort(function (a, b) { return (b.last ? b.last.at : b.updatedAt) - (a.last ? a.last.at : a.updatedAt); });
    box.innerHTML = "";
    if (!list.length) {
      var li = document.createElement("li");
      li.className = "empty";
      li.textContent = T("Noch keine Gespräche. Such oben nach einem Spielernamen oder tippe bei einem Freund im Reiter „Wettbewerb“ auf ✉.");
      box.appendChild(li);
      return;
    }
    list.forEach(function (c) {
      var other = otherOf(c);
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chat-item" + (isUnread(c) ? " unread" : "");
      b.setAttribute("aria-current", c.id === active ? "true" : "false");
      b.innerHTML = '<img alt=""><span class="ci-text"><strong></strong><small></small></span><span class="ci-meta"><span class="ci-time"></span></span>';
      $("img", b).src = S.avatar(other);
      $("strong", b).textContent = S.name(other);
      $("small", b).textContent = blocked.indexOf(other) !== -1 ? "Blockiert"
        : c.last ? (c.last.from === me() ? T("Du: ") : "") + c.last.text : T("Noch keine Nachricht");
      $(".ci-time", b).textContent = c.last ? shortWhen(c.last.at) : "";
      if (isUnread(c)) { var dot = document.createElement("span"); dot.className = "dot"; dot.setAttribute("aria-label", "ungelesen"); $(".ci-meta", b).appendChild(dot); }
      b.addEventListener("click", function () { openChat(c.id); });
      li.appendChild(b);
      box.appendChild(li);
    });
  }
  function updateBadge() {
    var n = chats.filter(isUnread).length;
    var badge = $("#chat-badge");
    badge.hidden = !n;
    badge.textContent = n > 9 ? "9+" : String(n);
    badge.setAttribute("aria-label", T("{n} ungelesene Gespräche", { n: n }));
  }

  /* ---------- new chat: search players of the same group ---------- */
  function runSearch(q) {
    var box = $("#chat-new-hits");
    box.innerHTML = "";
    if (!q) return;
    var lq = B.nameKey(q), players = S.players();
    var hits = Object.keys(players).filter(function (id) {
      return S.canChat(id) && B.nameKey(players[id].nick).indexOf(lq) !== -1;
    }).slice(0, 8);
    if (!hits.length) {
      box.innerHTML = '<li class="note"></li>';
      $(".note", box).textContent = S.mine().g === "f" ? T("Keine Schwester mit diesem Namen gefunden.") : T("Keinen Bruder mit diesem Namen gefunden.");
      return;
    }
    hits.forEach(function (id) {
      var li = document.createElement("li");
      li.className = "hit";
      li.innerHTML = '<img alt=""><span></span><button type="button" class="linkish">Schreiben</button>';
      $("img", li).src = S.avatar(id);
      $("span", li).textContent = players[id].nick;
      $("button", li).addEventListener("click", function () { openWith(id); });
      box.appendChild(li);
    });
  }
  $("#chat-new").addEventListener("input", function (e) { runSearch(e.target.value.trim()); });

  function openWith(uid) {
    APP.showView("chat");
    window.scrollTo(0, 0);
    if (!authUser || !authUser.emailVerified || !S.canChat(uid)) { refresh(); return; }
    var id = B.chatId(me(), uid);
    var known = chats.some(function (c) { return c.id === id; });
    (known ? Promise.resolve(id) : B.openChat(uid)).then(function (cid) {
      $("#chat-new").value = "";
      $("#chat-new-hits").innerHTML = "";
      if (!chats.some(function (c) { return c.id === cid; })) chats.push({ id: cid, members: [me(), uid].sort(), last: null, read: {}, updatedAt: Date.now() });
      openChat(cid);
    }, function (e) {
      $("#chat-new-hits").innerHTML = '<li class="note"></li>';
      $("#chat-new-hits .note").textContent = B.message(e);
    });
  }

  /* ---------- one conversation ---------- */
  function chatById(id) { return chats.filter(function (c) { return c.id === id; })[0]; }
  function openChat(id) {
    if (unsubMsgs) { unsubMsgs(); unsubMsgs = null; }
    active = id;
    messages = [];
    $("#chat-on").classList.add("has-active");
    $("#convo-empty").hidden = true;
    $("#convo-inner").hidden = false;
    $("#report-box").hidden = true;
    renderConvoHead();
    renderMessages(true);
    renderList();
    unsubMsgs = B.watchMessages(id, function (list) {
      if (active !== id) return;
      var box = $("#msgs");
      var nearBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
      var grew = list.length > messages.length;
      messages = list;
      renderMessages(nearBottom || (grew && list.length && list[list.length - 1].from === me()));
      maybeMarkRead();
    }, function () {
      $("#msgs").innerHTML = '<li class="empty">' + T("Die Nachrichten konnten nicht geladen werden.") + "</li>";
    });
    if (window.matchMedia("(hover: hover)").matches) $("#msg-text").focus();
  }
  function closeChat() {
    if (unsubMsgs) { unsubMsgs(); unsubMsgs = null; }
    active = null;
    $("#chat-on").classList.remove("has-active");
    $("#convo-empty").hidden = false;
    $("#convo-inner").hidden = true;
    renderList();
  }
  $("#convo-back").addEventListener("click", closeChat);

  function renderConvoHead() {
    var c = chatById(active);
    if (!c) return;
    var other = otherOf(c), players = S.players();
    var isBlocked = S.blocked().indexOf(other) !== -1;
    var gone = !players[other];
    $("#convo-img").src = S.avatar(other);
    $("#convo-name").textContent = S.name(other);
    $("#convo-sub").textContent = gone ? T("Konto gelöscht") : players[other].g === "f" ? T("Schwester") : T("Bruder");
    $("#convo-block").textContent = isBlocked ? T("Blockierung aufheben") : T("Blockieren");
    var note = $("#convo-note");
    var canWrite = !isBlocked && !gone;
    note.hidden = canWrite;
    note.textContent = gone ? T("Dieses Konto wurde gelöscht.") : isBlocked ? T("Du hast diesen Spieler blockiert. Ihr könnt euch nicht mehr schreiben.") : "";
    $("#msg-text").disabled = !canWrite;
    $("#msg-send").disabled = !canWrite;
    $("#convo-report").hidden = gone;
    $("#convo-block").hidden = gone;
  }

  function renderMessages(scroll) {
    var box = $("#msgs");
    box.innerHTML = "";
    if (!messages.length) {
      var e = document.createElement("li");
      e.className = "empty";
      e.textContent = T("Noch keine Nachrichten. Schreib die erste – freundlich und respektvoll.");
      box.appendChild(e);
      return;
    }
    var lastDay = "";
    messages.forEach(function (m) {
      var d = dayLabel(m.at || Date.now());
      if (d !== lastDay) {
        var sep = document.createElement("li");
        sep.className = "msg-day";
        sep.textContent = d;
        box.appendChild(sep);
        lastDay = d;
      }
      var li = document.createElement("li");
      li.className = "msg" + (m.from === me() ? " mine" : "") + (m.pending ? " pending" : "");
      li.textContent = m.text;
      var t = document.createElement("time");
      t.textContent = m.pending ? T("wird gesendet …") : time(m.at);
      li.appendChild(t);
      box.appendChild(li);
    });
    if (scroll) box.scrollTop = box.scrollHeight;
  }

  /* Mark as read only when the conversation is really on screen and something is unread. */
  var marking = false;
  function maybeMarkRead() {
    var c = active && chatById(active);
    if (!c || !viewOpen || document.hidden || marking || !isUnread(c)) return;
    marking = true;
    B.markRead(active).then(function () { marking = false; }, function () { marking = false; });
  }
  document.addEventListener("visibilitychange", maybeMarkRead);

  /* ---------- sending ---------- */
  var ta = $("#msg-text");
  function grow() { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 140) + "px"; }
  ta.addEventListener("input", grow);
  ta.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); $("#composer").requestSubmit ? $("#composer").requestSubmit() : send(); }
  });
  var sending = false;
  function send() {
    var text = ta.value.replace(/\s+$/, "").replace(/^\s+/, "");
    if (!text || !active || sending) return;
    if (text.length > 1000) text = text.slice(0, 1000);
    sending = true;
    var chatId = active;
    ta.value = "";
    grow();
    B.sendMessage(chatId, text).then(function () { sending = false; }, function (e) {
      sending = false;
      if (active === chatId && !ta.value) { ta.value = text; grow(); }
      var note = $("#convo-note");
      note.hidden = false;
      note.textContent = T("Nicht gesendet: ") + B.message(e);
    });
  }
  $("#composer").addEventListener("submit", function (e) { e.preventDefault(); send(); });

  /* ---------- block & report ---------- */
  $("#convo-block").addEventListener("click", function () {
    var c = chatById(active);
    if (!c) return;
    var other = otherOf(c), on = S.blocked().indexOf(other) === -1;
    S.setBlocked(other, on).then(function () { renderConvoHead(); renderList(); }, function (e) {
      var note = $("#convo-note"); note.hidden = false; note.textContent = B.message(e);
    });
    renderConvoHead();
    renderList();
  });
  $("#convo-report").addEventListener("click", function () {
    $("#report-box").hidden = false;
    $("#report-text").value = "";
    $("#report-text").focus();
  });
  $("#report-cancel").addEventListener("click", function () { $("#report-box").hidden = true; });
  $("#report-box").addEventListener("submit", function (e) {
    e.preventDefault();
    var c = chatById(active);
    if (!c) return;
    var other = otherOf(c);
    var reason = $("#report-text").value.trim() || "(ohne Begründung)";
    var recent = messages.slice(-8).map(function (m) { return (m.from === me() ? "Ich" : "Gegenüber") + ": " + m.text; }).join("\n");
    B.report(other, c.id, (reason + "\n---\n" + recent).slice(0, 1000)).then(function () {
      $("#report-box").hidden = true;
      var note = $("#convo-note");
      note.hidden = false;
      note.textContent = T("Danke, deine Meldung ist eingegangen. Du kannst den Spieler zusätzlich blockieren.");
    }, function (e2) {
      var note = $("#convo-note"); note.hidden = false; note.textContent = B.message(e2);
    });
  });

  /* ---------- boot ---------- */
  window.FIQH_CHAT = { refresh: refresh, openWith: openWith };
  APP.on("view", function (name) {
    viewOpen = name === "chat";
    if (viewOpen) { refresh(); maybeMarkRead(); }
  });
  viewOpen = !$("#view-chat").hidden;
  if (B && B.available) {
    B.onAuth(function (u) {
      var changed = !u || !authUser || u.uid !== authUser.uid || u.emailVerified !== authUser.emailVerified;
      authUser = u;
      if (changed) { closeChat(); subscribe(); }
      else refresh();
    });
  }
  refresh();
})();
