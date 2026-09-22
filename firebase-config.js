/* Firebase connection for accounts, rankings and the weekly competition.
   Setup: see SETUP.md. These values are not secret: every Firebase web app
   ships them to the browser. Security comes from firestore.rules.

   Paste the object from the Firebase console
   (Project settings -> General -> Your apps -> SDK setup, "Config"): */
window.FIQH_FIREBASE = {
  apiKey: "AIzaSyDZgfqg-XUfUdiAj-Y3PFvZB795MQnRTV0",
  authDomain: "fiqh-kompass.firebaseapp.com",
  projectId: "fiqh-kompass",
  storageBucket: "fiqh-kompass.firebasestorage.app",
  messagingSenderId: "279916289479",
  appId: "1:279916289479:web:72fbe11ade698d6979cde2"
};
