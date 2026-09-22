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

Einfach `index.html` im Browser öffnen, ohne Build-Schritt.

Wo die Inhalte stehen:
- `data.js`: Inhalte aus dem Unterricht
- `buch/*.js`: Ergänzungen aus dem İlmihal. Sie hängen sich über `FIQH.addSections`, `FIQH.addTopic` und `FIQH.addQuestions` an.
