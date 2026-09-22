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
- **Wettbewerb & Freunde** (nur in der veröffentlichten Version auf claude.ai, denn dafür braucht es einen gemeinsamen Speicher):
  - Wochenquiz mit 15 Fragen, für alle dieselben, ein Versuch pro Woche
  - eine Saison dauert 4 Wochen (Start: Montag, 21.09.2026). Die Summe der vier Wochen entscheidet, wer gewinnt
  - Saisonrangliste (alle oder nur Freunde) mit Abstand zum nächsten Platz
  - Freunde über die Namenssuche oder mit + in der Rangliste hinzufügen, danach Gesamtpunkte aus allen Quizzen vergleichen
  - `social.js` speichert in `players/<id>` (öffentliche Punktekarte, nur vom Besitzer beschreibbar) und `data/users/<id>/social` (private Freundesliste)

Einfach `index.html` im Browser öffnen, ohne Build-Schritt.

Wo die Inhalte stehen:
- `data.js`: Inhalte aus dem Unterricht
- `buch/*.js`: Ergänzungen aus dem İlmihal. Sie hängen sich über `FIQH.addSections`, `FIQH.addTopic` und `FIQH.addQuestions` an.
