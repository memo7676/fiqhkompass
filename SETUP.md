# Einrichtung: eigene Website mit Konten

Die Seite liegt kostenlos auf **GitHub Pages**. Konten, Ranglisten und der Wochenwettbewerb laufen über **Firebase** (Google), ebenfalls kostenlos im „Spark“-Tarif. Dauer: etwa 20 Minuten.

## 1. Firebase-Projekt anlegen
1. <https://console.firebase.google.com> öffnen, mit einem Google-Konto anmelden, **Projekt hinzufügen**.
   Name z. B. `fiqh-kompass`. Google Analytics wird nicht gebraucht und kann aus bleiben.
2. **Build → Authentication → Jetzt starten → Anmeldemethode**: **E-Mail/Passwort** aktivieren.
   Den „E-Mail-Link (ohne Passwort)“ nicht aktivieren.
3. In **Authentication → Einstellungen**:
   - **Autorisierte Domains**: `memo7676.github.io` hinzufügen. Das ist die Adresse aus Schritt 3.
   - **Passwortrichtlinie** (empfohlen): mindestens 8 Zeichen, Klein- und Großbuchstaben oder Ziffern verlangen.
     Die Seite prüft das auch selbst, die Richtlinie sichert es zusätzlich auf dem Server.
   - **Schutz vor E-Mail-Enumeration**: eingeschaltet lassen.
4. **Authentication → Vorlagen**: unten die **Vorlagensprache auf Deutsch** stellen.
   Dann sind die Bestätigungs- und Passwort-Mails deutsch.
5. **Build → Firestore Database → Datenbank erstellen**:
   - Standort **`eur3 (Europa)`** oder **`europe-west3 (Frankfurt)`**. Den Standort kann man später nicht mehr ändern.
   - Im **Produktionsmodus** starten.
6. **Firestore → Regeln**: den gesamten Inhalt von [`firestore.rules`](firestore.rules) einfügen und **Veröffentlichen**.
7. **Projekteinstellungen (Zahnrad) → Allgemein → Meine Apps → Web-App hinzufügen (`</>`)**.
   Einen Namen vergeben, Firebase Hosting ist nicht nötig. Danach wird ein `firebaseConfig`-Objekt angezeigt.
8. Dieses Objekt in [`firebase-config.js`](firebase-config.js) einsetzen, statt `null`:
   ```js
   window.FIQH_FIREBASE = {
     apiKey: "…",
     authDomain: "….firebaseapp.com",
     projectId: "…",
     storageBucket: "…",
     messagingSenderId: "…",
     appId: "…"
   };
   ```
   Diese Werte sind nicht geheim, jede Firebase-Website liefert sie an den Browser aus. Geschützt werden die Daten durch die Regeln aus Schritt 6.

## 2. Datenschutz & Impressum
In [`datenschutz.html`](datenschutz.html) die gelb markierten Stellen ausfüllen: Name, Anschrift, E-Mail.
Für eine öffentliche Seite in Deutschland sind Impressum und Datenschutzhinweise Pflicht. Der Text ist eine Vorlage und keine Rechtsberatung.

## 3. GitHub Pages einschalten
1. Im Repository auf GitHub: **Settings → Pages**.
2. **Source: Deploy from a branch**, Branch **`main`** (nach dem Mergen) oder `claude/fiqh-reference-quiz-5ykw73`, Ordner **`/ (root)`**, **Save**.
3. Nach 1–2 Minuten ist die Seite unter **https://memo7676.github.io/Space/** erreichbar.
   Im kostenlosen GitHub-Tarif muss das Repository dafür **öffentlich** sein.

## 4. Testen
1. Seite öffnen → **Wettbewerb → Registrieren**.
2. Die Bestätigungs-Mail anklicken, zurück auf die Seite, **„Ich habe bestätigt“**.
3. Wochenquiz spielen. Die Punkte erscheinen in der Top 10.

## Gut zu wissen
- **Kosten:** Der Spark-Tarif ist kostenlos und bricht bei Überschreitung ab, statt Geld zu verlangen.
  Grenzen: 50 000 Lesezugriffe und 20 000 Schreibzugriffe pro Tag.
  Jeder Seitenbesuch im Reiter „Wettbewerb“ liest einmal alle Spielerprofile. Bis einige hundert Spieler reicht das gut.
- **Moderation:** Unpassende Namen oder Bilder kannst du in der Firebase-Konsole löschen oder ändern:
  **Firestore → `players` / `avatars` / `usernames`**. Konten sperren geht unter **Authentication → Nutzer**.
- **Regeln testen:** `cd tests && npm install && npm test` startet den Firestore-Emulator (Java nötig) und prüft 44 Fälle,
  z. B. doppelte Namen, fremde Punkte, einen zweiten Versuch pro Woche oder Skripte als Profilbild.
- **Regeln per Kommandozeile hochladen** (statt Schritt 6): `npx firebase-tools deploy --only firestore:rules --project <projekt-id>`.
