/* Accounts and shared data via Firebase (Auth + Firestore).
   Exposes window.FIQH_BACKEND; social.js and auth.js only talk to this object,
   so a test can put its own FIQH_BACKEND in place before this file runs.

   Firestore layout (enforced by firestore.rules):
     usernames/<key>   { uid, name }       one document per player name, key = name in lower case
     users/<uid>       private: { birthYear, parentalConsent, termsAt, createdAt, friends }, after deletion only { deletedAt }
     players/<uid>     public:  { nick, nickKey, g, total, games, comp, at }
     avatars/<uid>     public:  { img }   128 x 128 JPEG as data URL                       */
(function () {
  "use strict";
  if (window.FIQH_BACKEND) return;

  var NAME_RE = /^[A-Za-z0-9ÄÖÜäöüß_.-]{3,20}$/;
  var RESERVED = ["admin", "administrator", "moderator", "mod", "support", "fiqh", "fiqhkompass", "fiqh-kompass", "system", "root", "null", "undefined"];
  function nameKey(name) { return String(name || "").normalize("NFC").toLowerCase(); }
  function checkName(name) {
    name = String(name || "").normalize("NFC").trim();
    if (name.length < 3 || name.length > 20) return "Der Spielername muss 3–20 Zeichen lang sein.";
    if (!NAME_RE.test(name)) return "Erlaubt sind Buchstaben (auch ä, ö, ü, ß), Ziffern sowie _ . und -.";
    if (!/[A-Za-zÄÖÜäöüß]/.test(name)) return "Der Spielername braucht mindestens einen Buchstaben.";
    if (RESERVED.indexOf(nameKey(name)) !== -1) return "Dieser Name ist reserviert.";
    return "";
  }
  function checkPassword(pw, email, name) {
    pw = String(pw || "");
    if (pw.length < 8) return "Mindestens 8 Zeichen.";
    if (pw.length > 128) return "Höchstens 128 Zeichen.";
    if (!/[A-Za-zÄÖÜäöüß]/.test(pw) || !/\d/.test(pw)) return "Mindestens ein Buchstabe und eine Ziffer.";
    var low = pw.toLowerCase();
    if (name && low.indexOf(nameKey(name)) !== -1) return "Das Passwort darf den Spielernamen nicht enthalten.";
    var local = String(email || "").split("@")[0].toLowerCase();
    if (local.length >= 4 && low.indexOf(local) !== -1) return "Das Passwort darf die E-Mail-Adresse nicht enthalten.";
    if (/^(.)\1+$/.test(pw) || /^(12345678|password|passwort|qwertz12|qwerty12)/.test(low)) return "Dieses Passwort ist zu leicht zu erraten.";
    return "";
  }
  /* 0..4 for the strength meter */
  function passwordStrength(pw) {
    pw = String(pw || "");
    var s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[a-zäöüß]/.test(pw) && /[A-ZÄÖÜ]/.test(pw)) s++;
    if (/\d/.test(pw) && /[^A-Za-z0-9ÄÖÜäöüß]/.test(pw)) s++;
    return Math.min(4, s);
  }

  var MESSAGES = {
    "auth/email-already-in-use": "Für diese E-Mail-Adresse gibt es schon ein Konto. Melde dich an oder setze das Passwort zurück.",
    "auth/invalid-email": "Die E-Mail-Adresse ist ungültig.",
    "auth/weak-password": "Das Passwort ist zu schwach.",
    "auth/wrong-password": "E-Mail oder Passwort stimmt nicht.",
    "auth/user-not-found": "E-Mail oder Passwort stimmt nicht.",
    "auth/invalid-credential": "E-Mail oder Passwort stimmt nicht.",
    "auth/invalid-login-credentials": "E-Mail oder Passwort stimmt nicht.",
    "auth/too-many-requests": "Zu viele Versuche. Warte ein paar Minuten und versuch es dann erneut.",
    "auth/network-request-failed": "Keine Verbindung. Prüfe dein Internet.",
    "auth/requires-recent-login": "Bitte gib zur Sicherheit dein Passwort erneut ein.",
    "auth/user-disabled": "Dieses Konto wurde gesperrt.",
    "name-taken": "Dieser Spielername ist schon vergeben.",
    "permission-denied": "Das ist nicht erlaubt. Ist deine E-Mail-Adresse bestätigt?"
  };
  function message(e) {
    var code = e && (e.code || e.message);
    return MESSAGES[code] || (e && e.userMessage) || "Das hat nicht geklappt. Versuch es bitte noch einmal.";
  }

  var helpers = { checkName: checkName, checkPassword: checkPassword, passwordStrength: passwordStrength, nameKey: nameKey, message: message };

  var cfg = window.FIQH_FIREBASE;
  if (!cfg || !window.firebase || !firebase.initializeApp) {
    window.FIQH_BACKEND = Object.assign({ available: false, reason: !cfg ? "config" : "sdk" }, helpers);
    return;
  }

  firebase.initializeApp(cfg);
  var auth = firebase.auth();
  var fs = firebase.firestore();
  auth.languageCode = "de";
  var FieldValue = firebase.firestore.FieldValue;

  /* Auth listeners: fired by Firebase and again after refreshUser() (e-mail confirmed). */
  var listeners = [], known = false, registering = false;
  function notify() { var u = simpleUser(auth.currentUser); listeners.forEach(function (cb) { cb(u); }); }
  // During a registration the new login exists a moment before its profile: hold back until both are there.
  auth.onAuthStateChanged(function () { known = true; if (!registering) notify(); });

  function snapOf(s) { return { id: s.id, exists: s.exists, data: function () { return s.data(); } }; }
  function simpleUser(u) { return u ? { uid: u.uid, email: u.email, emailVerified: !!u.emailVerified } : null; }

  var api = Object.assign({
    available: true,

    onAuth: function (cb) { listeners.push(cb); if (known) cb(simpleUser(auth.currentUser)); },
    currentUser: function () { return simpleUser(auth.currentUser); },

    doc: function (path) {
      var ref = fs.doc(path);
      return {
        get: function () { return ref.get().then(snapOf); },
        set: function (data) { return ref.set(data); },
        update: function (data) { return ref.update(data); },
        delete: function () { return ref.delete(); }
      };
    },
    collection: function (path) {
      return {
        onSnapshot: function (next, err) {
          return fs.collection(path).onSnapshot(function (qs) { next({ docs: qs.docs.map(snapOf) }); }, err);
        }
      };
    },

    nameAvailable: function (name) {
      return fs.doc("usernames/" + nameKey(name)).get().then(function (s) { return !s.exists; });
    },

    /* Account + name reservation + public player card + private profile, as one unit. */
    register: function (d) {
      var name = String(d.name).normalize("NFC").trim();
      var key = nameKey(name);
      var err = checkName(name) || checkPassword(d.password, d.email, name);
      if (err) return Promise.reject({ userMessage: err });
      return api.nameAvailable(name).then(function (free) {
        if (!free) throw { code: "name-taken" };
        registering = true;
        return auth.createUserWithEmailAndPassword(d.email, d.password);
      }).then(function (cred) {
        var uid = cred.user.uid;
        var b = fs.batch();
        b.set(fs.doc("usernames/" + key), { uid: uid, name: name });
        b.set(fs.doc("users/" + uid), {
          birthYear: d.birthYear, parentalConsent: !!d.parentalConsent,
          termsAt: FieldValue.serverTimestamp(), createdAt: FieldValue.serverTimestamp(), friends: []
        });
        b.set(fs.doc("players/" + uid), { nick: name, nickKey: key, g: d.gender, total: 0, games: 0, comp: {}, at: new Date().toISOString() });
        return b.commit().then(function () {
          registering = false;
          notify();
          return cred.user.sendEmailVerification().catch(function () {});
        }, function () {
          // Someone took the name a moment earlier: undo the fresh login account.
          return cred.user.delete().catch(function () {}).then(function () {
            registering = false;
            notify();
            throw { code: "name-taken" };
          });
        });
      }, function (e) {
        if (registering) { registering = false; notify(); }
        throw e;
      });
    },

    login: function (email, password) { return auth.signInWithEmailAndPassword(email, password); },
    logout: function () { return auth.signOut(); },
    resetPassword: function (email) { return auth.sendPasswordResetEmail(email); },
    resendVerification: function () { return auth.currentUser ? auth.currentUser.sendEmailVerification() : Promise.resolve(); },
    /* After clicking the link in the mail: fetch the new state and a fresh token (rules read email_verified from it). */
    refreshUser: function () {
      var u = auth.currentUser;
      if (!u) return Promise.resolve(null);
      return u.reload().then(function () { return u.getIdToken(true); }).then(function () { notify(); return simpleUser(auth.currentUser); });
    },

    reauth: function (password) {
      var u = auth.currentUser;
      return u.reauthenticateWithCredential(firebase.auth.EmailAuthProvider.credential(u.email, password));
    },
    changePassword: function (oldPw, newPw) {
      var err = checkPassword(newPw, auth.currentUser && auth.currentUser.email);
      if (err) return Promise.reject({ userMessage: err });
      return api.reauth(oldPw).then(function () { return auth.currentUser.updatePassword(newPw); });
    },
    changeEmail: function (password, email) {
      return api.reauth(password).then(function () { return auth.currentUser.verifyBeforeUpdateEmail(email); });
    },

    changeName: function (oldKey, name) {
      name = String(name).normalize("NFC").trim();
      var err = checkName(name);
      if (err) return Promise.reject({ userMessage: err });
      var key = nameKey(name), uid = auth.currentUser.uid;
      return api.nameAvailable(name).then(function (free) {
        if (!free && key !== oldKey) throw { code: "name-taken" };
        var b = fs.batch();
        if (oldKey && oldKey !== key) b.delete(fs.doc("usernames/" + oldKey));
        b.set(fs.doc("usernames/" + key), { uid: uid, name: name });   // same key = only the spelling changes
        b.update(fs.doc("players/" + uid), { nick: name, nickKey: key, at: new Date().toISOString() });
        return b.commit().catch(function (e) { throw e && e.code === "permission-denied" && key !== oldKey ? { code: "name-taken" } : e; });
      });
    },

    /* Deletes everything stored about the player, then the login itself. */
    deleteAccount: function (password, nickKey) {
      var uid = auth.currentUser.uid;
      return api.reauth(password).then(function () {
        var b = fs.batch();
        b.delete(fs.doc("players/" + uid));
        b.delete(fs.doc("avatars/" + uid));
        b.set(fs.doc("users/" + uid), { deletedAt: FieldValue.serverTimestamp() });   // tombstone, see firestore.rules
        if (nickKey) b.delete(fs.doc("usernames/" + nickKey));
        return b.commit();
      }).then(function () { return auth.currentUser.delete(); });
    }
  }, helpers);

  window.FIQH_BACKEND = api;
})();
