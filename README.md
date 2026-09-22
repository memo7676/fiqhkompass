# Fiqh-Kompass

Eine Lernseite zum Fiqh-Unterricht. Grundlage sind die Folien „Fiqh Unterricht 1–16“ (Google-Drive-Ordner „Fiqh“), vertieft und erweitert mit Hamdi Döndüren, „Delilleriyle İslâm İlmihali“.

- **Nachschlagen**: 25 Themengebiete in sechs Sachgebieten mit Volltextsuche:
  - Glaube & Grundlagen
  - Reinheit
  - Gebet (mit Adhān, Gemeinschaft, Freitag/Fest, Nawāfil, Sahw/Tilāwa, Totengebet)
  - Fasten (mit Kaffāra, Eid, Gelübde)
  - Zakāt & Ḥaǧǧ (mit Opfer und ʿAqīqa)
  - Alltag & Gesellschaft (Ehe, Handel/Riba, Speisen, Ǧihād)

  Abschnitte aus dem Buch tragen die Seitenzahl als Marke.
- **Quiz**:
  - Themenquiz (einzelne Gebiete oder ganze Sachgebiete) oder gemischter Modus
  - 5/10/15 Fragen
  - Punkte mit Zeit- und Serienbonus, 50:50-Joker
  - Bestwerte und Auswertung mit Links zum Nachlesen
- **Konten** (Registrierung mit E-Mail und Passwort, E-Mail-Bestätigung, Passwort vergessen, Konto löschen):
  - Spielername, den es nur einmal gibt. Groß- und Kleinschreibung zählt dabei nicht, Ali und ali sind also derselbe Name
  - Geschlecht (Bruder/Schwester), Geburtsjahr; unter 16 Jahren nur mit Einverständnis der Eltern
  - Zustimmung zu Datenschutz und Regeln ([`datenschutz.html`](datenschutz.html))
  - eigenes Profilbild, das im Browser auf 128 × 128 px verkleinert wird
- **Wettbewerb & Freunde**:
  - Wochenquiz mit 15 Fragen, für alle dieselben, ein Versuch pro Woche
  - eine Saison dauert 4 Wochen (Start: Montag, 21.09.2026). Die Summe der vier Wochen entscheidet
  - Top 10 weltweit (diese Saison oder aller Zeiten, alle, nur Brüder oder nur Schwestern) und Saisonrangliste
  - Freunde über den Spielernamen finden und Gesamtpunkte vergleichen

  Ranglisten sieht jeder, mitspielen können alle mit bestätigter E-Mail-Adresse.
  Die Server-Regeln in [`firestore.rules`](firestore.rules) sichern das ab: eindeutige Namen, nur eigene Daten, Punkte können nicht sinken, kein zweiter Versuch pro Woche. Getestet wird das in `tests/`.

Einrichtung von Firebase und GitHub Pages: [`SETUP.md`](SETUP.md). Ohne Firebase funktionieren Nachschlagen und Quiz trotzdem.

Lokal: einfach `index.html` im Browser öffnen, ohne Build-Schritt.

Wo die Inhalte stehen:
- `data.js`: Inhalte aus dem Unterricht
- `buch/*.js`: Ergänzungen aus dem İlmihal. Sie hängen sich über `FIQH.addSections`, `FIQH.addTopic` und `FIQH.addQuestions` an.
- `backend.js`: Verbindung zu Firebase, `auth.js`: Anmelden und Registrieren, `social.js`: Wettbewerb und Ranglisten
