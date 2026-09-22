/* Firebase connection for accounts, rankings and the weekly competition.
   Setup: see SETUP.md. These values are not secret: every Firebase web app
   ships them to the browser. Security comes from firestore.rules.

   Paste the object from the Firebase console
   (Project settings -> General -> Your apps -> SDK setup, "Config"): */
window.FIQH_FIREBASE = null;
/* Example:
window.FIQH_FIREBASE = {
  apiKey: "AIza...",
  authDomain: "fiqh-kompass.firebaseapp.com",
  projectId: "fiqh-kompass",
  storageBucket: "fiqh-kompass.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
*/
