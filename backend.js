/* Accounts and shared data via Firebase (Auth + Firestore).
   Exposes window.FIQH_BACKEND; social.js and auth.js only talk to this object,
   so a test can put its own FIQH_BACKEND in place before this file runs.

   Firestore layout (enforced by firestore.rules):
     usernames/<key>   { uid, name }       one document per player name, key = name in lower case
     users/<uid>       private: { birthYear, parentalConsent, termsAt, createdAt, friends (old, only shrinks), blocked }, after deletion only { deletedAt }
     friendRequests/<from>_<to>  { from, to, at }   friendships/<a>_<b>  { users: [a, b], at }
     players/<uid>     public:  { nick, nickKey, g, total, games, comp, at }
     avatars/<uid>     public:  { img }   128 x 128 JPEG as data URL
     chats/<a>_<b>     { members: [a, b], last, updatedAt, read: { uid: time } }   only brother-brother or sister-sister
       messages/<id>   { from, text, at }
     reports/<id>      { from, about, chatId, text, at }   only readable in the Firebase console        */
(function () {
  "use strict";
  if (window.FIQH_BACKEND) return;

  /* Letters incl. German umlauts, Turkish ç ş ğ ı and the Arabic alphabet (with the
     Persian/Urdu letters پ چ ژ ک گ ی), digits (also ٠-٩), _ . - and single spaces.
     Arabic vowel signs (tashkīl) and tatweel are left out so that "محمد" and "مُحَمَّد"
     can not become two different players. */
  var AR = "\u0621-\u063A\u0641-\u064A\u0660-\u0669\u067E\u0686\u0698\u06A9\u06AF\u06CC\u06F0-\u06F9";
  var CH = "A-Za-z0-9ÄÖÜäöüßÇçŞşĞğı_.\\-" + AR;
  var NAME_RE = new RegExp("^[" + CH + "]+( [" + CH + "]+)*$");
  var LETTER_RE = new RegExp("[A-Za-zÄÖÜäöüßÇçŞşĞğı\u0621-\u063A\u0641-\u064A\u067E\u0686\u0698\u06A9\u06AF\u06CC]");
  var TASHKIL_RE = /[\u0610-\u061A\u0640\u064B-\u065F\u0670\u06D6-\u06ED]/;
  var ARABIC_RE = /[\u0600-\u06FF]/;
  /* Sisters play under a kunya ("Umm Yusuf", "Bint Ömer", "أم يوسف", "بنت عمر"), never their own first name. */
  var KUNYA_PREFIXES = ["Umm", "Bint", "Mutter von", "Tochter von", "أم", "بنت"];
  var KUNYA_RE = /^(umm|bint|mutter von|tochter von|ام|بنت) \S/;
  var RESERVED = ["admin", "administrator", "moderator", "mod", "support", "fiqh", "fiqhkompass", "fiqh-kompass", "system", "root", "null", "undefined", "مدير", "مشرف", "ادمن"];
  /* The key that makes a name unique: lower case, and Arabic letters that look alike folded
     together (أ إ آ → ا, ى ی → ي, ک → ك). firestore.rules does the same in fold(). */
  function nameKey(name) {
    return String(name || "").normalize("NFC").toLowerCase()
      .replace(/[أإآ]/g, "ا").replace(/[ىی]/g, "ي").replace(/ک/g, "ك");
  }
  function isKunya(name) { return KUNYA_RE.test(nameKey(name)); }
  function hasArabic(name) { return ARABIC_RE.test(String(name || "")); }
  /* gender: "m", "f" or empty (then only the general rules are checked). */
  function checkName(name, gender) {
    name = String(name || "").normalize("NFC").trim();
    if (name.length < 3 || name.length > 24) return "Der Spielername muss 3–24 Zeichen lang sein.";
    if (TASHKIL_RE.test(name)) return "Bitte den arabischen Namen ohne Vokalzeichen (Taschkīl) und ohne Streckstrich schreiben, z. B. محمد statt مُحَمَّد.";
    if (!NAME_RE.test(name)) return "Erlaubt sind lateinische und arabische Buchstaben (auch ä, ö, ü, ß, ç, ş, ğ), Ziffern, _ . - und einzelne Leerzeichen.";
    if (!LETTER_RE.test(name)) return "Der Spielername braucht mindestens einen Buchstaben.";
    if (RESERVED.indexOf(nameKey(name)) !== -1) return "Dieser Name ist reserviert.";
    if (gender === "f" && !isKunya(name)) return "Schwestern spielen mit einer Kunya, z. B. „Umm Yusuf“, „Bint Ömer“ oder „أم يوسف“.";
    if (gender === "m" && isKunya(name)) return "Namen mit Umm, Bint, أم, بنت, Mutter von oder Tochter von sind Schwestern vorbehalten.";
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
    "name-rejected": "Der Server hat diesen Namen nicht angenommen, obwohl er frei ist. Wahrscheinlich sind die Server-Regeln nicht aktuell (firestore.rules in Firebase neu veröffentlichen).",
    "permission-denied": "Das ist nicht erlaubt. Ist deine E-Mail-Adresse bestätigt?"
  };
  function message(e) {
    var code = e && (e.code || e.message);
    return MESSAGES[code] || (e && e.userMessage) || "Das hat nicht geklappt. Versuch es bitte noch einmal.";
  }

  var helpers = { KUNYA_PREFIXES: KUNYA_PREFIXES, isKunya: isKunya, hasArabic: hasArabic, checkName: checkName, checkPassword: checkPassword, passwordStrength: passwordStrength, nameKey: nameKey, message: message };

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

  function millis(v) { return v && v.toMillis ? v.toMillis() : typeof v === "number" ? v : 0; }
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
      var err = checkName(name, d.gender) || checkPassword(d.password, d.email, name);
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
        }, function (e) {
          // Undo the fresh login account, then say why: taken a moment earlier, or refused by the rules.
          return cred.user.delete().catch(function () {}).then(function () {
            registering = false;
            notify();
            return api.nameAvailable(name).catch(function () { return true; });
          }).then(function (free) {
            if (!free) throw { code: "name-taken" };
            console.error("Registrierung abgelehnt:", e);
            throw { code: "name-rejected" };
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

    changeName: function (oldKey, name, gender) {
      name = String(name).normalize("NFC").trim();
      var err = checkName(name, gender);
      if (err) return Promise.reject({ userMessage: err });
      var key = nameKey(name), uid = auth.currentUser.uid;
      return api.nameAvailable(name).then(function (free) {
        if (!free && key !== oldKey) throw { code: "name-taken" };
        var b = fs.batch();
        if (oldKey && oldKey !== key) b.delete(fs.doc("usernames/" + oldKey));
        b.set(fs.doc("usernames/" + key), { uid: uid, name: name });   // same key = only the spelling changes
        b.update(fs.doc("players/" + uid), { nick: name, nickKey: key, at: new Date().toISOString() });
        return b.commit().catch(function (e) {
          if (!(e && e.code === "permission-denied" && key !== oldKey)) throw e;
          return api.nameAvailable(name).catch(function () { return true; }).then(function (free) {
            if (!free) throw { code: "name-taken" };
            console.error("Namensänderung abgelehnt:", e);
            throw { code: "name-rejected" };
          });
        });
      });
    },

    /* ---------- friends: request -> accept -> friendship ---------- */
    watchFriends: function (uid, next, err) {
      return fs.collection("friendships").where("users", "array-contains", uid).onSnapshot(function (qs) {
        next(qs.docs.map(function (d) { var u = d.data().users || []; return u[0] === uid ? u[1] : u[0]; }).filter(Boolean));
      }, err);
    },
    /* next({ incoming: [{ from, at }], outgoing: [{ to, at }] }) */
    watchFriendRequests: function (uid, next, err) {
      var state = { incoming: null, outgoing: null };
      function map(qs, key) {
        return qs.docs.map(function (d) { var r = d.data({ serverTimestamps: "estimate" }); var o = { at: millis(r.at) }; o[key] = r[key]; return o; });
      }
      function emit() { if (state.incoming && state.outgoing) next({ incoming: state.incoming, outgoing: state.outgoing }); }
      var a = fs.collection("friendRequests").where("to", "==", uid).onSnapshot(function (qs) { state.incoming = map(qs, "from"); emit(); }, err);
      var b = fs.collection("friendRequests").where("from", "==", uid).onSnapshot(function (qs) { state.outgoing = map(qs, "to"); emit(); }, err);
      return function () { a(); b(); };
    },
    sendFriendRequest: function (to) {
      var uid = auth.currentUser.uid;
      return fs.doc("friendRequests/" + uid + "_" + to).set({ from: uid, to: to, at: FieldValue.serverTimestamp() });
    },
    /* alsoMine: I had sent one to them as well -> remove it too */
    acceptFriendRequest: function (from, alsoMine) {
      var uid = auth.currentUser.uid, users = [uid, from].sort(), b = fs.batch();
      b.set(fs.doc("friendships/" + users.join("_")), { users: users, at: FieldValue.serverTimestamp() });
      b.delete(fs.doc("friendRequests/" + from + "_" + uid));
      if (alsoMine) b.delete(fs.doc("friendRequests/" + uid + "_" + from));
      return b.commit();
    },
    declineFriendRequest: function (from) { return fs.doc("friendRequests/" + from + "_" + auth.currentUser.uid).delete(); },
    cancelFriendRequest: function (to) { return fs.doc("friendRequests/" + auth.currentUser.uid + "_" + to).delete(); },
    removeFriend: function (other) { return fs.doc("friendships/" + [auth.currentUser.uid, other].sort().join("_")).delete(); },

    /* ---------- chat ---------- */
    chatId: function (a, b) { return [a, b].sort().join("_"); },
    /* Opens the conversation with another player, creating it on first use.
       The rules refuse it unless both are brothers or both are sisters. */
    openChat: function (other) {
      var uid = auth.currentUser.uid, id = api.chatId(uid, other);
      var ref = fs.doc("chats/" + id);
      return ref.get().then(function (s) {
        if (s.exists) return id;
        return ref.set({ members: [uid, other].sort(), createdAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp(), last: null, read: {} })
          .then(function () { return id; });
      });
    },
    watchChats: function (uid, next, err) {
      return fs.collection("chats").where("members", "array-contains", uid).onSnapshot(function (qs) {
        next(qs.docs.map(function (d) {
          var c = d.data({ serverTimestamps: "estimate" }), read = {};
          Object.keys(c.read || {}).forEach(function (k) { read[k] = millis(c.read[k]); });
          return {
            id: d.id, members: c.members || [], updatedAt: millis(c.updatedAt), read: read,
            last: c.last ? { text: String(c.last.text || ""), from: c.last.from, at: millis(c.last.at) } : null
          };
        }));
      }, err);
    },
    watchMessages: function (chatId, next, err) {
      return fs.collection("chats/" + chatId + "/messages").orderBy("at").limitToLast(200).onSnapshot(function (qs) {
        next(qs.docs.map(function (d) {
          var m = d.data({ serverTimestamps: "estimate" });
          return { id: d.id, from: m.from, text: String(m.text || ""), at: millis(m.at), pending: d.metadata.hasPendingWrites };
        }));
      }, err);
    },
    sendMessage: function (chatId, text) {
      var uid = auth.currentUser.uid, b = fs.batch(), now = FieldValue.serverTimestamp();
      b.set(fs.collection("chats/" + chatId + "/messages").doc(), { from: uid, text: text, at: now });
      var upd = { last: { text: text.slice(0, 120), from: uid, at: now }, updatedAt: now };
      upd["read." + uid] = now;
      b.update(fs.doc("chats/" + chatId), upd);
      return b.commit();
    },
    markRead: function (chatId) {
      var upd = {};
      upd["read." + auth.currentUser.uid] = FieldValue.serverTimestamp();
      return fs.doc("chats/" + chatId).update(upd);
    },
    report: function (about, chatId, text) {
      return fs.collection("reports").add({ from: auth.currentUser.uid, about: about, chatId: chatId, text: String(text || "").slice(0, 1000), at: FieldValue.serverTimestamp() });
    },

    /* Deletes everything stored about the player, then the login itself. */
    deleteAccount: function (password, nickKey) {
      var uid = auth.currentUser.uid;
      var mine = [];
      return api.reauth(password).then(function () {
        /* friendships and open requests go too */
        return Promise.all([
          fs.collection("friendships").where("users", "array-contains", uid).get(),
          fs.collection("friendRequests").where("to", "==", uid).get(),
          fs.collection("friendRequests").where("from", "==", uid).get()
        ]).then(function (all) { all.forEach(function (qs) { qs.docs.forEach(function (d) { mine.push(d.ref); }); }); }, function () {});
      }).then(function () {
        var b = fs.batch();
        mine.slice(0, 400).forEach(function (ref) { b.delete(ref); });
        b.delete(fs.doc("players/" + uid));
        b.delete(fs.doc("avatars/" + uid));
        b.delete(fs.doc("progress/" + uid));
        b.set(fs.doc("users/" + uid), { deletedAt: FieldValue.serverTimestamp() });   // tombstone, see firestore.rules
        if (nickKey) b.delete(fs.doc("usernames/" + nickKey));
        return b.commit();
      }).then(function () { return auth.currentUser.delete(); });
    }
  }, helpers);

  window.FIQH_BACKEND = api;
})();
