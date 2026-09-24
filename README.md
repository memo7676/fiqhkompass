# Ṭālibu l-ʿIlm (طَالِبُ الْعِلْمِ)

Eine Lernseite zum Fiqh-Unterricht. Grundlage sind die Folien „Fiqh Unterricht 1–16“ (Google-Drive-Ordner „Fiqh“), vertieft und erweitert mit Hamdi Döndüren, „Delilleriyle İslâm İlmihali“.

- **Sprachen** (`i18n.js`, Umschalter oben rechts): Deutsch (Original) und Englisch (`i18n-en.js`), Türkisch folgt. Die Wahl steht in `localStorage` („fiqh:lang“); ohne Wahl gilt Englisch für englischsprachige Browser, sonst Deutsch. Texte in den Skripten laufen über `T("deutscher Text", { platzhalter })`, die festen Texte in `index.html` werden beim Laden anhand desselben Wörterbuchs ersetzt; fehlt eine Übersetzung, bleibt der deutsche Text stehen. Kennungen für Lernstand und Wettbewerb hängen nicht von der Sprache ab. Die 698 Fiqh-Quizfragen und die Themennamen stehen englisch in `fiqh-en.js` (Schlüssel ist die deutsche Frage; `app.js` tauscht sie beim Laden aus, `q_de` bleibt für die Lernstand-Kennung). Die Abschnittsüberschriften stehen dort ebenfalls englisch. Noch nicht übersetzt: die Fiqh-Nachschlagetexte, die Erklärungen zum Madina-Buch und die Datenschutzseite.
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
  - neue Iʿrāb-Sätze (`irabgen.js`): ein Generator baut aus dem Wortschatz des Buchs Sätze nach festen Mustern (Nominalsatz, Genitivverbindung, Präposition, Verbalsatz, Adjektiv, Demonstrativ) mit deutscher Übersetzung. Sitzen alle Iʿrāb-Sätze, kommen nach 24 Stunden 10 neue dazu (Kennungen `ar-x-…`; Paket k ist immer dasselbe, auf einem anderen Gerät wird es über den Lernstand wiedergefunden)
  - Sarf (`sarf.js`), aufgebaut wie die Emsile (Google-Drive-Ordner „Madina Books“): 47 gesunde dreiradikalige Verben aus allen sechs Abwāb, je bis zu 10 Formen – Vergangenheit und Gegenwart aktiv und passiv, Befehl, Verbot, Verneinung mit lam und lan, Partizip Aktiv und Passiv. Geübt wird, indem man die Formen einer Tabelle in die richtige Reihenfolge tippt (mit falschen Formen dazwischen); eine Tabelle ist gelernt, wenn sie fehlerfrei ist (Kennungen `ar-s-<Wurzel>-<Form>`). Zu jedem Verb gibt es die ganze Tabelle zum Nachschlagen
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
  - zwei Ligen, umschaltbar: Fiqh-Liga und Arabisch-Liga
  - Fiqh-Liga: Wochenquiz mit 15 Fragen, für alle dieselben, ein Versuch pro Woche
  - Arabisch-Liga (Schlüssel `s<Saison>w<Woche>a` in `comp`): 10 Vokabeln und 10 Grammatikfragen aus den Lektionen der Woche (vier Blöcke von Lektion 1 bis 23), 10 jede Woche neu erzeugte Iʿrāb-Sätze, danach der Sarf von 2 Verben (Vergangenheit und Gegenwart, 4 Tabellen, 10 Punkte je Feld, 50 Bonus je fehlerfreier Tabelle). Eigene Ranglisten; die Punkte zählen nicht zum Quiz-Gesamtstand, daher bleiben die Firestore-Regeln unverändert
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

## Quellenangaben im Quiz

Jede Fiqh-Frage verweist mit `s` auf den Abschnitt ihres Themas (Index in `sections`). Abschnitte aus dem Unterricht tragen `u: "Unterricht N"`, Abschnitte aus dem İlmihal `src: "İlmihal S. …"`. Nach der Antwort, in der Auswertung und im Fehlerordner steht deshalb z. B. „Quelle: İlmihal (H. Döndüren), S. 143–150 · Wuḍūʾ – Gebetswaschung › Vertiefung: Mest, Socken und Verband“. Der Knopf in der Auswertung springt direkt zu diesem Abschnitt. Neue Fragen brauchen ebenfalls ein `s`.

## Gemischter Modus: 2 Stunden Pause

Im Quiz-Modus „Gemischt“ merkt sich `app.js` in `localStorage` („fiqh:mixseen“), wann eine Frage gestellt wurde. Fragen der letzten zwei Stunden kommen nicht wieder. Bleiben zu wenige übrig, wird die Runde mit den am längsten zurückliegenden aufgefüllt. Themen-Quiz, Lernen und Wettbewerb sind davon nicht betroffen.

## Arabisch-Liga: jede Woche gleich schwer

Seit Woche 1 der ersten Saison (`AR_BALANCED_FROM` in `social.js`) gilt:
- **Vokabeln**: 10 Wörter aus den Lektionen der Woche, immer 5 × Arabisch → Deutsch und 5 × Deutsch → Arabisch, jedes Wort nur einmal.
- **Grammatik**: nicht mehr an die Lektionen gebunden. Alle Grammatikfragen des Buchs werden in Buchreihenfolge in 10 Stufen geteilt (leicht → schwer), jede Woche kommt je eine Frage aus jeder Stufe. Innerhalb einer Stufe wiederholt sich eine Frage erst, wenn alle dran waren.
- **Iʿrāb**: die Satzmuster von `irabgen.js` kommen der Reihe nach dran (`make(…, balanced)`), jede Woche also dieselbe Mischung.
- **Sarf**: zwei Verben aus zwei verschiedenen Abwāb.


## Belege (Dalīl) zu den Antworten

`fiqh-belege.js` ordnet Fiqh-Fragen (Schlüssel: deutsche Frage) ihre Belege zu: `[Art, Stelle, Text de, Text en, İlmihal-Seite, Fußnote, Stelle en]`. Arten: Q Qurʾān (Sure Vers), H Hadith (Sammlung und Kitāb, Überlieferer), A Wort eines Gefährten, I Idschmāʿ, K Qiyās, S Istiḥsān, R Rechtsgrundsatz, J Begründung der Gelehrten (kein direkter Text), L Sprache. Seite und Fußnote verweisen auf das gedruckte İlmihal (die Fußnotentexte fehlen im PDF). Seite 0 heißt: Beleg nicht aus dem Buch, sondern ergänzt. Angezeigt werden die Belege nach der Antwort, in der Auswertung und im Fehlerordner. Erfasst sind alle 698 Fragen. Die Hadith-Angaben (Sammlung, Kapitel, Überlieferer) sind ergänzt, weil der Buchtext meist nur die Überlieferer nennt; Nummern werden bewusst nicht angegeben.
