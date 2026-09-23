/* Anmelden, Registrieren, Passwort vergessen, E-Mail bestätigen, Konto verwalten.
   Uses window.FIQH_BACKEND (backend.js). */
(function () {
  "use strict";
  var B = window.FIQH_BACKEND;
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  if (!B || !B.available) return;

  var dlg = $("#auth-dlg");
  var btn = $("#acc-btn");
  var TITLES = { login: "Anmelden", register: "Konto erstellen", forgot: "Passwort vergessen", verify: "E-Mail bestätigen", account: "Mein Konto" };
  var authUser = null;

  function pane(name) { return $('[data-pane="' + name + '"]', dlg); }
  function msg(p, text, kind) {
    var m = $(".form-msg", typeof p === "string" ? pane(p) : p);
    m.textContent = text || "";
    m.className = "form-msg" + (kind ? " " + kind : "");
  }
  function show(name) {
    $all(".auth-pane", dlg).forEach(function (el) { el.hidden = el.getAttribute("data-pane") !== name; });
    $("#auth-title").textContent = TITLES[name];
    $all(".form-msg", pane(name)).forEach(function (m) { m.textContent = ""; m.className = "form-msg"; });
    if (name === "verify") $("#vf-email").textContent = authUser ? authUser.email : "";
    if (name === "account") fillAccount();
    var first = $("input:not([type=hidden]):not([tabindex='-1']), button.btn-primary", pane(name));
    if (first) setTimeout(function () { first.focus(); }, 30);
  }
  function open(name) {
    if (!name) name = !authUser ? "login" : !authUser.emailVerified ? "verify" : "account";
    if ((name === "account" || name === "verify") && !authUser) name = "login";
    show(name);
    if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", ""); }
  }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  window.FIQH_AUTH = { open: open, close: close };

  $("#auth-close").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  $all("[data-go]", dlg).forEach(function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-go")); }); });
  $all(".pw-toggle", dlg).forEach(function (b) {
    b.addEventListener("click", function () {
      var input = document.getElementById(b.getAttribute("data-pw"));
      var hide = input.type === "text";
      input.type = hide ? "password" : "text";
      b.textContent = hide ? "Zeigen" : "Verbergen";
    });
  });
  btn.hidden = false;
  btn.addEventListener("click", function () { open(); });

  function busy(form, on) {
    $all("button, input, select", form).forEach(function (el) { if (on) { el.dataset.was = el.disabled ? "1" : ""; el.disabled = true; } else el.disabled = el.dataset.was === "1"; });
  }
  function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }

  /* ---------- Anmelden ---------- */
  pane("login").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, email = $("#li-email").value.trim(), pw = $("#li-pw").value;
    if (!emailOk(email) || !pw) { msg(f, "Bitte E-Mail-Adresse und Passwort eingeben.", "bad"); return; }
    busy(f, true);
    msg(f, "Anmelden …");
    B.login(email, pw).then(function () {
      busy(f, false);
      $("#li-pw").value = "";
      close();
    }, function (err) { busy(f, false); msg(f, B.message(err), "bad"); });
  });

  /* ---------- Registrieren ---------- */
  /* Brothers type a player name, sisters build a kunya: prefix + name of child or father. */
  var NAME_HINT = "3–24 Zeichen: lateinische oder arabische Buchstaben, Ziffern, _ . -. Jeden Namen gibt es nur einmal.";
  var KUNYA_HINT = "Jeden Namen gibt es nur einmal.";
  function gender() { var g = $('input[name="rg-gender"]:checked', pane("register")); return g ? g.value : ""; }
  function regName() {
    if (gender() === "f") {
      var n = $("#rg-kunya-name").value.trim();
      return n ? $("#rg-kunya-pre").value + " " + n : "";
    }
    return $("#rg-name").value.trim();
  }
  var nameTimer = null, nameState = { value: "", free: null };
  function nameHint(text, kind) {
    var f = gender() === "f";
    var h = f ? $("#rg-kunya-hint") : $("#rg-name-hint");
    h.textContent = text;
    h.className = "hint" + (kind ? " " + kind : "");
    (f ? $("#rg-kunya-name") : $("#rg-name")).setAttribute("aria-invalid", kind === "bad" ? "true" : "false");
  }
  function checkRegName() {
    clearTimeout(nameTimer);
    var g = gender(), v = regName();
    $("#rg-kunya-preview").textContent = g === "f" && v ? v : "–";
    nameState = { value: v, free: null };
    if (!v) { nameHint(g === "f" ? KUNYA_HINT : NAME_HINT); return; }
    var err = B.checkName(v, g);
    if (err) { nameHint(err, "bad"); return; }
    nameHint("Prüfe, ob der Name frei ist …");
    nameTimer = setTimeout(function () {
      B.nameAvailable(v).then(function (free) {
        if (regName() !== v) return;
        nameState = { value: v, free: free };
        nameHint(free ? "„" + v + "“ ist frei." : "„" + v + "“ ist schon vergeben. Wähle einen anderen Namen.", free ? "good" : "bad");
      }, function () { nameHint("Konnte nicht prüfen, ob der Name frei ist.", "bad"); });
    }, 350);
  }
  function showNameFields() {
    var g = gender();
    $("#rg-name-wait").hidden = !!g;
    $("#rg-name-plain").hidden = g !== "m";
    $("#rg-kunya-wrap").hidden = g !== "f";
    $("#rg-name-hint").textContent = NAME_HINT; $("#rg-name-hint").className = "hint";
    $("#rg-kunya-hint").textContent = KUNYA_HINT; $("#rg-kunya-hint").className = "hint";
    if (g) checkRegName();
  }
  $all('input[name="rg-gender"]', pane("register")).forEach(function (r) { r.addEventListener("change", showNameFields); });
  ["#rg-name", "#rg-kunya-name"].forEach(function (sel) { $(sel).addEventListener("input", checkRegName); });
  $("#rg-kunya-pre").addEventListener("change", checkRegName);
  var METER = [["0%", "var(--bad)"], ["25%", "var(--bad)"], ["50%", "var(--accent)"], ["75%", "var(--good)"], ["100%", "var(--good)"]];
  $("#rg-pw").addEventListener("input", function (e) {
    var v = e.target.value, s = v ? Math.max(1, B.passwordStrength(v)) : 0;
    if (v && B.checkPassword(v, $("#rg-email").value, regName())) s = 1;
    var m = $("#rg-meter");
    m.style.width = METER[s][0];
    m.style.background = METER[s][1];
    var err = v ? B.checkPassword(v, $("#rg-email").value, regName()) : "";
    var hint = $("#rg-pw-hint");
    hint.textContent = err || (v ? ["", "Schwach", "Geht so – länger oder mit Sonderzeichen ist sicherer.", "Gut", "Sehr gut"][s] : "Mindestens 8 Zeichen mit Buchstaben und Ziffern. Länger ist sicherer.");
    hint.className = "hint" + (err ? " bad" : s >= 3 ? " good" : "");
  });
  function age(year) { return new Date().getFullYear() - year; }
  $("#rg-year").addEventListener("change", function (e) {
    var y = +e.target.value;
    $("#rg-parent-wrap").hidden = !(y && age(y) < 16);
  });

  pane("register").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if ($("#rg-website").value) return;   // bots fill the hidden field
    var g = gender();
    var name = regName();
    var email = $("#rg-email").value.trim();
    var pw = $("#rg-pw").value, pw2 = $("#rg-pw2").value;
    var year = +$("#rg-year").value;
    var problems = [];
    var nameErr = !g ? "" : !name ? (g === "f" ? "Bitte deine Kunya vervollständigen (z. B. Bint Ömer)." : "Bitte einen Spielernamen eingeben.") : B.checkName(name, g);
    if (!g) problems.push("Bitte angeben, ob du ein Mann oder eine Frau bist.");
    if (nameErr) problems.push(nameErr);
    else if (nameState.value === name && nameState.free === false) problems.push("Der Spielername ist schon vergeben.");
    if (!emailOk(email)) problems.push("Bitte eine gültige E-Mail-Adresse eingeben.");
    var pwErr = B.checkPassword(pw, email, name);
    if (pwErr) problems.push("Passwort: " + pwErr);
    else if (pw !== pw2) problems.push("Die beiden Passwörter stimmen nicht überein.");
    if (!year) problems.push("Bitte dein Geburtsjahr wählen.");
    else if (age(year) < 16 && !$("#rg-parent").checked) problems.push("Unter 16 Jahren brauchst du das Einverständnis deiner Eltern.");
    if (!$("#rg-terms").checked) problems.push("Bitte den Datenschutzhinweisen und Regeln zustimmen.");
    if (problems.length) { msg(f, problems.join(" "), "bad"); return; }

    busy(f, true);
    msg(f, "Konto wird erstellt …");
    B.register({ name: name, email: email, password: pw, gender: g, birthYear: year, parentalConsent: age(year) < 16 }).then(function () {
      busy(f, false);
      f.reset();
      $("#rg-meter").style.width = "0";
      $("#rg-parent-wrap").hidden = true;
      showNameFields();
      authUser = B.currentUser() || authUser;
      show("verify");
      msg("verify", "Willkommen, " + name + "! Dein Konto ist angelegt.", "good");
    }, function (err) {
      busy(f, false);
      if (err && err.code === "name-taken") nameHint("„" + name + "“ ist schon vergeben. Wähle einen anderen Namen.", "bad");
      msg(f, B.message(err), "bad");
    });
  });

  /* ---------- Passwort vergessen ---------- */
  pane("forgot").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, email = $("#fg-email").value.trim();
    if (!emailOk(email)) { msg(f, "Bitte eine gültige E-Mail-Adresse eingeben.", "bad"); return; }
    busy(f, true);
    // Same answer whether or not an account exists, so nobody can probe addresses.
    function done() { busy(f, false); msg(f, "Falls es ein Konto mit dieser Adresse gibt, ist der Link unterwegs. Schau auch im Spam-Ordner nach.", "good"); }
    B.resetPassword(email).then(done, function (err) {
      if (err && (err.code === "auth/user-not-found" || err.code === "auth/invalid-email")) done();
      else { busy(f, false); msg(f, B.message(err), "bad"); }
    });
  });

  /* ---------- E-Mail bestätigen ---------- */
  var resendAt = 0;
  $("#vf-check").addEventListener("click", function () {
    msg("verify", "Prüfe …");
    B.refreshUser().then(function (u) {
      if (u && u.emailVerified) { msg("verify", "Danke, deine E-Mail-Adresse ist bestätigt!", "good"); setTimeout(close, 900); }
      else msg("verify", "Noch nicht bestätigt. Klicke auf den Link in der Mail und versuch es dann noch einmal.", "bad");
    }, function (err) { msg("verify", B.message(err), "bad"); });
  });
  $("#vf-resend").addEventListener("click", function () {
    var wait = Math.ceil((resendAt - Date.now()) / 1000);
    if (wait > 0) { msg("verify", "Bitte warte noch " + wait + " Sekunden.", "bad"); return; }
    resendAt = Date.now() + 60000;
    B.resendVerification().then(function () { msg("verify", "Die Mail ist erneut unterwegs.", "good"); },
      function (err) { msg("verify", B.message(err), "bad"); });
  });
  $("#vf-later").addEventListener("click", close);

  /* ---------- Konto ---------- */
  function fillAccount() {
    var S = window.FIQH_SOCIAL, mine = S && S.mine();
    $("#ac-name").textContent = mine ? mine.nick : "";
    $("#ac-email").textContent = authUser ? authUser.email : "";
    $("#ac-status").textContent = authUser && authUser.emailVerified ? "E-Mail bestätigt" : "E-Mail noch nicht bestätigt";
    $("#ac-img").src = $("#acc-btn-img").src || "";
    $("#ac-img").hidden = !$("#acc-btn-img").src;
    $all("details", pane("account")).forEach(function (d) { d.open = false; });
  }
  $("#ac-pw-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, oldPw = $("#ac-pw-old").value, pw = $("#ac-pw-new").value;
    var err = B.checkPassword(pw, authUser && authUser.email);
    if (!oldPw) { msg(f, "Bitte dein aktuelles Passwort eingeben.", "bad"); return; }
    if (err) { msg(f, err, "bad"); return; }
    if (pw !== $("#ac-pw-new2").value) { msg(f, "Die beiden neuen Passwörter stimmen nicht überein.", "bad"); return; }
    busy(f, true);
    B.changePassword(oldPw, pw).then(function () { busy(f, false); f.reset(); msg(f, "Dein Passwort wurde geändert.", "good"); },
      function (e2) { busy(f, false); msg(f, B.message(e2), "bad"); });
  });
  $("#ac-mail-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, email = $("#ac-mail-new").value.trim(), pw = $("#ac-mail-pw").value;
    if (!emailOk(email)) { msg(f, "Bitte eine gültige E-Mail-Adresse eingeben.", "bad"); return; }
    busy(f, true);
    B.changeEmail(pw, email).then(function () {
      busy(f, false); f.reset();
      msg(f, "Wir haben einen Link an " + email + " geschickt. Die neue Adresse gilt, sobald du ihn anklickst.", "good");
    }, function (e2) { busy(f, false); msg(f, B.message(e2), "bad"); });
  });
  $("#ac-del-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, pw = $("#ac-del-pw").value;
    if (!$("#ac-del-ok").checked) { msg(f, "Bitte bestätige, dass du dein Konto löschen möchtest.", "bad"); return; }
    if (!pw) { msg(f, "Bitte dein Passwort eingeben.", "bad"); return; }
    var mine = window.FIQH_SOCIAL && window.FIQH_SOCIAL.mine();
    busy(f, true);
    msg(f, "Lösche …");
    B.deleteAccount(pw, mine && mine.nickKey).then(function () {
      busy(f, false); f.reset(); close();
    }, function (e2) { busy(f, false); msg(f, B.message(e2), "bad"); });
  });
  $("#ac-logout").addEventListener("click", function () { B.logout().then(close); });

  /* ---------- header button ---------- */
  function updateButton() {
    var S = window.FIQH_SOCIAL, mine = S && S.mine();
    var img = $("#acc-btn-img");
    if (!authUser) {
      $("#acc-btn-text").textContent = "Anmelden";
      img.hidden = true;
      img.removeAttribute("src");
      return;
    }
    $("#acc-btn-text").textContent = mine ? mine.nick : "Mein Konto";
    var src = $("#acc-avatar").getAttribute("src");
    if (src) { img.src = src; img.hidden = false; } else img.hidden = true;
  }
  B.onAuth(function (u) {
    authUser = u;
    updateButton();
    if (!u && dlg.open && (pane("account").hidden === false || pane("verify").hidden === false)) close();
  });
  // The profile loads a moment after the login; keep the button in step.
  new MutationObserver(updateButton).observe($("#acc-avatar"), { attributes: true, attributeFilter: ["src"] });
  new MutationObserver(updateButton).observe($("#acc-name"), { childList: true, characterData: true, subtree: true });
})();
