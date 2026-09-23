# Ṭālibu l-ʿIlm (طَالِبُ الْعِلْمِ)

Eine Lernseite zum Fiqh-Unterricht. Grundlage sind die Folien „Fiqh Unterricht 1–16“ (Google-Drive-Ordner „Fiqh“), vertieft und erweitert mit Hamdi Döndüren, „Delilleriyle İslâm İlmihali“.

- **Fächer** (Startseite): eine Karte pro Fach mit Fortschritt – Fiqh und Arabisch, bald ʿAqīda, Tazkiya und Propheten. Die Leiste hat nur noch Fächer · Quiz · Wettbewerb · Chat; innerhalb eines Fachs führt eine eigene Leiste zurück zu allen Fächern und zwischen den Teilen (bei Fiqh: Nachschlagen | Lernen). Ein neues Fach bekommt einen Eintrag in `home.js` und eine eigene Ansicht.
- **Fiqh – Nachschlagen**: zuerst eine Übersicht aller Themen; der Text eines Themas öffnet sich erst mit einem Klick. Dazu Volltextsuche. 25 Themengebiete in sechs Sachgebieten:
  - Glaube & Grundlagen
  - Reinheit
  - Gebet (mit Adhān, Gemeinschaft, Freitag/Fest, Nawāfil, Sahw/Tilāwa, Totengebet)
  - Fasten (mit Kaffāra, Eid, Gelübde)
  - Zakāt & Ḥaǧǧ (mit Opfer und ʿAqīqa)
  - Alltag & Gesellschaft (Ehe, Handel/Riba, Speisen, Ǧihād)

  Abschnitte aus dem Buch tragen die Seitenzahl als Marke.
- **Fiqh – Lernen** (wie eine Fahrschul-App): jedes Thema Frage für Frage durcharbeiten, bis es zu 100 % sitzt.
  - eine Frage ist gelernt, wenn sie gleich richtig beantwortet wird, nach einem Fehler erst nach zwei richtigen Antworten hintereinander
  - Runden mit 10 Fragen: zuerst die falschen, dann die fast gelernten, dann neue; „Fehler wiederholen“ über alle Themen
  - Fortschritt je Thema, Sachgebiet und gesamt (auch in der Themenübersicht), gespeichert auf dem Gerät und, angemeldet, in `progress/<id>`
- **Arabisch** mit dem Madina-Buch 1 (Dr. V. Abdur Rahim), Lektionen 1–23, Erklärungen nach dem deutschen Schlüssel (Google-Drive-Ordner „Madina Books“):
  - jede Lektion mit Grammatik, Beispielsätzen, Vokabeltabelle und Iʿrāb Schritt für Schritt
  - Lernen wie im Lernmodus, getrennt nach Vokabeln (Bedeutung, Arabisch, Plural), Grammatik und Iʿrāb
  - Vokabelliste aller Lektionen mit Suche (Deutsch oder Arabisch, Vokalzeichen egal)
  - Iʿrāb-Bereich: Einführung (Fälle, Zeichen, muʿrab/mabnī, Sonderfälle), Fachbegriffe, Musteranalysen, Training und Prüfung mit 20 Sätzen
  - Daten in `arabisch/madina1-*.js`, Oberfläche in `arabic.js`; der Fortschritt teilt sich den Speicher mit dem Lernmodus (Kennungen `ar-…`)
- **Quiz**:
  - Themenquiz (einzelne Gebiete oder ganze Sachgebiete) oder gemischter Modus
  - 5/10/15 Fragen
  - Punkte mit Zeit- und Serienbonus, 50:50-Joker
  - Bestwerte und Auswertung mit Links zum Nachlesen
- **Fehlerordner** (`mistakes.js`, erreichbar über die Startseite, Lernen, Arabisch und das Quiz): jede falsch beantwortete Frage aus Quiz, Wettbewerb, Lernen und Arabisch, sortiert nach Fach und Thema bzw. Lektion, mit richtiger Antwort und Erklärung.
  - eine Frage bleibt drin, bis sie zweimal hintereinander richtig beantwortet wurde (gleicher Lernstand wie im Lernmodus); richtige Quiz-Antworten zählen nur für Fragen, die schon im Ordner sind
  - wiederholen: alles (Runden mit 10 Fragen), je Fach oder je Thema
  - am Ende jeder Sitzung – Quiz, Wettbewerb, Lernrunde, Arabisch-Runde – gibt es „Fehler wiederholen“ nur mit den Fehlern dieser Sitzung
- **Konten** (Registrierung mit E-Mail und Passwort, E-Mail-Bestätigung, Passwort vergessen, Konto löschen):
  - Spielername, den es nur einmal gibt. Groß- und Kleinschreibung zählt dabei nicht, Ali und ali sind also derselbe Name
  - Namen auch mit arabischen Buchstaben, die von rechts nach links angezeigt werden (ohne Vokalzeichen; أ/إ/آ/ا und ى/ي zählen als derselbe Name)
  - Schwestern melden sich mit einer Kunya an (Umm …, Bint …, أم …, بنت …, Mutter von …, Tochter von …); diese Beinamen sind Schwestern vorbehalten
  - Geschlecht (Bruder/Schwester), Geburtsjahr; unter 16 Jahren nur mit Einverständnis der Eltern
  - Zustimmung zu Datenschutz und Regeln ([`datenschutz.html`](datenschutz.html))
  - eigenes Profilbild, das im Browser auf 128 × 128 px verkleinert wird
- **Wettbewerb & Freunde**:
  - Wochenquiz mit 15 Fragen, für alle dieselben, ein Versuch pro Woche
  - jede Woche ein anderes Sachgebiet, der Reihe nach: Glaube & Grundlagen, Reinheit, Gebet, Fasten, Zakāt & Ḥaǧǧ, Alltag & Gesellschaft
  - eine Saison dauert 4 Wochen (Start: Montag, 21.09.2026). Die Summe der vier Wochen entscheidet
  - Top 10 weltweit (diese Saison oder aller Zeiten, alle, nur Brüder oder nur Schwestern) und Saisonrangliste
  - Freunde über den Spielernamen finden und Gesamtpunkte vergleichen
  - Freundschaft nur mit Anfrage: senden, annehmen oder ablehnen, zurückziehen, beenden; offene Anfragen zeigt eine Zahl am Reiter. Wie beim Chat nur unter Brüdern bzw. unter Schwestern, nicht bei Blockierung (`friendRequests`, `friendships`). Alte Freundeslisten werden einmalig zu Anfragen

- **Chat** zwischen Spielern: Brüder mit Brüdern, Schwestern mit Schwestern, nie zwischen Bruder und Schwester. Mit Ungelesen-Anzeige, Blockieren und Melden.

  Ranglisten sieht jeder, mitspielen und chatten können alle mit bestätigter E-Mail-Adresse.
  Die Server-Regeln in [`firestore.rules`](firestore.rules) sichern das ab: eindeutige Namen, Kunya für Schwestern, nur eigene Daten, Punkte können nicht sinken, kein zweiter Versuch pro Woche, Chat nur unter Brüdern bzw. Schwestern. Getestet wird das in `tests/` (113 Fälle).

- **Als App installierbar** (Progressive Web App): eigenes Symbol auf dem Home-Bildschirm, Vollbild ohne Browserleiste, Nachschlagen und Quiz auch offline (`manifest.webmanifest`, `sw.js`, `install.js`, `icons/`).

Einrichtung von Firebase und GitHub Pages: [`SETUP.md`](SETUP.md). Ohne Firebase funktionieren Nachschlagen und Quiz trotzdem.

Lokal: einfach `index.html` im Browser öffnen, ohne Build-Schritt.

Wo die Inhalte stehen:
- `data.js`: Inhalte aus dem Unterricht
- `buch/*.js`: Ergänzungen aus dem İlmihal. Sie hängen sich über `FIQH.addSections`, `FIQH.addTopic` und `FIQH.addQuestions` an.
- `backend.js`: Verbindung zu Firebase, `auth.js`: Anmelden und Registrieren, `social.js`: Wettbewerb und Ranglisten, `chat.js`: Chat
