# Ṭālibu l-ʿIlm (طَالِبُ الْعِلْمِ)

Eine Lernseite zum Fiqh-Unterricht. Grundlage sind die Folien „Fiqh Unterricht 1–16“ (Google-Drive-Ordner „Fiqh“), vertieft und erweitert mit Hamdi Döndüren, „Delilleriyle İslâm İlmihali“.

- **Sprachen** (`i18n.js`, Umschalter oben rechts): Deutsch (Original) und Englisch (`i18n-en.js`), Türkisch folgt. Die Wahl steht in `localStorage` („fiqh:lang“); ein Wechsel lädt die Seite neu, eine laufende Runde (Quiz, Lernen, Arabisch, Fehlerordner, Lernstand, Wettbewerb und Arabisch-Liga) geht danach an derselben Stelle weiter: `app.js` legt sie vorher in `sessionStorage` („fiqh:resume“) ab – Fragen per Kennung, Reihenfolge der Antworten, Punkte, Serie, Joker, beantwortete Frage mit Rückmeldung –, und das Modul, das die Runde gestartet hat, baut über `APP.onResume(art, …)` seine Abläufe wieder auf; ohne Wahl gilt Englisch für englischsprachige Browser, sonst Deutsch. Texte in den Skripten laufen über `T("deutscher Text", { platzhalter })`, die festen Texte in `index.html` werden beim Laden anhand desselben Wörterbuchs ersetzt; fehlt eine Übersetzung, bleibt der deutsche Text stehen. Kennungen für Lernstand und Wettbewerb hängen nicht von der Sprache ab. Die 698 Fiqh-Quizfragen und die Themennamen stehen englisch in `fiqh-en.js` (Schlüssel ist die deutsche Frage; `app.js` tauscht sie beim Laden aus, `q_de` bleibt für die Lernstand-Kennung). Die Abschnittsüberschriften stehen dort ebenfalls englisch. Noch nicht übersetzt: die Fiqh-Nachschlagetexte, die Erklärungen zum Madina-Buch und die Datenschutzseite.
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
- **Arabisch** mit den Madina-Büchern 1 und 2 (Dr. V. Abdur Rahim), Buch 1 mit den Lektionen 1–23, Erklärungen nach dem deutschen Schlüssel (Google-Drive-Ordner „Madina Books“):
  - jede Lektion mit Grammatik, Beispielsätzen, Vokabeltabelle und Iʿrāb Schritt für Schritt
  - Lernen wie im Lernmodus, getrennt nach Vokabeln (Bedeutung, Arabisch, Plural), Grammatik und Iʿrāb
  - Vokabelliste aller Lektionen mit Suche (Deutsch oder Arabisch, Vokalzeichen egal)
  - Iʿrāb-Bereich: Einführung (Fälle, Zeichen, muʿrab/mabnī, Sonderfälle), Fachbegriffe, Musteranalysen, Training und Prüfung mit 20 Sätzen
  - neue Iʿrāb-Sätze (`irabgen.js`): ein Generator baut aus dem Wortschatz des Buchs Sätze nach festen Mustern (Nominalsatz, Genitivverbindung, Präposition, Verbalsatz, Adjektiv, Demonstrativ) mit deutscher Übersetzung. Sitzen alle Iʿrāb-Sätze, kommen nach 24 Stunden 10 neue dazu (Kennungen `ar-x-…`; Paket k ist immer dasselbe, auf einem anderen Gerät wird es über den Lernstand wiedergefunden)
  - Sarf (`sarf.js`), aufgebaut wie die Emsile (Google-Drive-Ordner „Madina Books“): 47 gesunde dreiradikalige Verben aus allen sechs Abwāb, je bis zu 10 Formen – Vergangenheit und Gegenwart aktiv und passiv, Befehl, Verbot, Verneinung mit lam und lan, Partizip Aktiv und Passiv. Geübt wird, indem man die Formen einer Tabelle in die richtige Reihenfolge tippt (mit falschen Formen dazwischen); eine Tabelle ist gelernt, wenn sie fehlerfrei ist (Kennungen `ar-s-<Wurzel>-<Form>`). Zu jedem Verb gibt es die ganze Tabelle zum Nachschlagen
  - Daten in `arabisch/madina1-*.js`, Oberfläche in `arabic.js`; der Fortschritt teilt sich den Speicher mit dem Lernmodus (Kennungen `ar-…`)
  - **Madina-Buch 2** (31 Lektionen, `arabisch/madina2-*.js`, Lektionen mit `book: 2`, Kennungen `b2-…`): Grammatik, Beispiele und Wörter nach dem deutschen Schlüssel zu Teil 2; die arabischen Wörter wurden von den Seitenbildern abgelesen, weil der Schlüssel sie nicht als Text enthält. Über dem Lektions-Tab wählt man Buch 1 oder Buch 2. Buch 2 ist gesperrt, bis die letzten fünf Lektionen von Buch 1 (19–23, `BOOK2_GATE` in `arabic.js`) zu 100 % ohne offene Fehler gelernt sind; danach bleibt es offen (`fiqh:book2`, oder Lernstand in Buch 2), auch wenn später in Buch 1 wieder ein Fehler passiert. „Arabisch-Fortschritt zurücksetzen“ sperrt es wieder. Die Arabisch-Liga und die neuen Iʿrāb-Sätze bleiben bei Buch 1
- **Quiz**:
  - Themenquiz (einzelne Gebiete oder ganze Sachgebiete) oder gemischter Modus
  - 5/10/15 Fragen
  - Punkte mit Zeit- und Serienbonus, 50:50-Joker
  - Bestwerte und Auswertung mit Links zum Nachlesen
- **Fehlerordner** (`mistakes.js`, erreichbar über die Startseite, Lernen, Arabisch und das Quiz): jede falsch beantwortete Frage aus Quiz, Wettbewerb, Lernen und Arabisch, sortiert nach Fach und Thema bzw. Lektion, mit richtiger Antwort und Erklärung.
  - eine Frage bleibt drin, bis sie einmal richtig beantwortet wurde (gleicher Lernstand wie im Lernmodus; ältere Einträge im Zustand „fast“ gehen mit der nächsten richtigen Antwort ebenfalls raus); richtige Quiz-Antworten zählen nur für Fragen, die schon im Ordner sind
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
  - Top 10 weltweit (diese Saison oder aller Zeiten) und Saisonrangliste. Schwestern sind nur für Schwestern sichtbar: Brüder und Gäste sehen in keiner Rangliste (Top 10, Saisonrangliste, Saisongewinner) eine Schwester, und der Filter „Alle / Brüder / Schwestern“ erscheint nur für Schwestern (`seesSisters` in `social.js`)
  - Freunde über den Spielernamen finden und Gesamtpunkte vergleichen
  - Freundschaft nur mit Anfrage: senden, annehmen oder ablehnen, zurückziehen, beenden; offene Anfragen zeigt eine Zahl am Reiter. Wie beim Chat nur unter Brüdern bzw. unter Schwestern, nicht bei Blockierung (`friendRequests`, `friendships`). Alte Freundeslisten werden einmalig zu Anfragen

- **Mehr Grammatikaufgaben** (`arabisch/grammatik-plus.js`): 199 zusätzliche Verständnisfragen zum Madina-Buch (Buch 1 und 2, 3–4 je Lektion) – „Warum …?“, „Finde den Fehler“, „Welche Rolle hat …?“, jeweils mit Erklärung und den Gründen, warum die falschen Antworten nicht passen. `arabic.js` hängt sie an die Grammatik der Lektion an (Kennung `ar-g-…`, Merkmal `plus`); sie zählen im Lernstand und in den Lektionen mit, die Arabisch-Liga lässt sie weg, damit ihre Wochenfragen gleich bleiben.
- **Übersetzen** (`arabisch/texte.js`, `arabic.js`): Ab Buch 1, Lektion 12 und in ganz Buch 2 hat jede Lektion den Abschnitt „Übersetzen“ (Arabisch → Deutsch): ein kurzer zusammenhängender Text zum Stoff der Lektion (`window.MADINA_TEXTE[lektion] = { t: Titel, s: [[arabisch, deutsch], …] }`) und die Beispielsätze der Lektion. Man schreibt die eigene Übersetzung, zeigt die Lösung und bewertet sich selbst („Richtig übersetzt“ / „Noch üben“); das zählt im Lernstand (Kennung `ar-t-…`) und wird synchronisiert.
- **Warum falsch?** (`arabisch/warum.js`, `irabgen.js`, `arabic.js`): Nach jeder Arabisch-Frage steht unter der Erklärung, warum die anderen Antworten nicht passen; die eigene falsche Antwort ist markiert. Für die 610 Grammatik- und Iʿrāb-Fragen des Madina-Buchs stehen die Gründe in `arabisch/warum.js` (je Lektion `q` für die Grammatikfragen, `i` für Iʿrāb, je Frage drei Gründe zu `a[1]`–`a[3]`); Vokabelfragen nennen die Bedeutung der falschen Wörter aus dem Wortschatz; die neuen Iʿrāb-Sätze und die Arabisch-Liga erklären die falsche Satzrolle (`WHY_NOT` in `irabgen.js`). Auch im Fehlerordner. Die Gründe sind deutsch; Wörter und Satzrollen erscheinen auf Englisch, wenn Englisch gewählt ist.
- **Begriffe erklärt** (`glossar.js`): Nach jeder Antwort (Quiz, Lernmodus, Wettbewerb) stehen unter der Erklärung die Fremdwörter aus Frage, Antworten und Erklärung mit kurzer Bedeutung (Deutsch oder Englisch), ebenso im Fehlerordner. Fiqh-Fragen nutzen die Fiqh-Begriffe (Reinheit, Gebet, Urteile, Quellen, Glaube, Fasten, Zakāt, Ḥaǧǧ, Familie), Arabisch-Fragen die Grammatikbegriffe; bei Iʿrāb-Fragen werden auch die arabischen Fachwörter der Antworten (مَرْفُوعٌ، مُبْتَدَأٌ …) erklärt. Die Schreibweisen werden ohne Umschriftzeichen verglichen (Wuḍūʾ = Wudu = wuḍū); neue Begriffe trägt man in `glossar.js` ein.
- **Mein Lernstand** (`progress.js`, Ansicht `#lernstand`): zeigt pro Fach (Arabisch / Fiqh), worin man stark ist und wo man noch Probleme hat.
  - Kennzahlen: gelernt, offene Fehler, Trefferquote; Balken der letzten 14 Tage (richtig/falsch pro Tag)
  - „Hier hast du noch Probleme“: die dringendsten Bereiche (offene Fehler zählen am meisten, dann kürzlich falsch beantwortete Fragen, dann eine niedrige Trefferquote); bei Lektionen steht dabei, welcher Teil hakt (Vokabeln, Grammatik, Iʿrāb)
  - Arabisch zusätzlich nach Fähigkeiten: Vokabeln, Plural, Grammatik, Iʿrāb, Sarf; dazu „Darin bist du stark“ und alle Lektionen bzw. Themen im Überblick
  - „Gezielt üben“ startet eine Runde nur aus diesem Bereich: offene Fehler, dann früher falsch beantwortete, dann neue Fragen
  - Zu finden als Karte oben auf der Fächer-Seite, als Knopf „📈 Mein Lernstand“ in Arabisch und Fiqh-Lernen und als Hinweis „Größte Baustelle“ unter deren Fortschritt
  - Daten: die Lernstufen von `learn.js` (mit dem Konto synchronisiert) und die Antwortzählung auf dem Gerät (`fiqh:tries` = Antworten/Fehler/letzter Fehler pro Frage, `fiqh:days` = Antworten pro Tag und Fach, 120 Tage)
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

`fiqh-belege.js` ordnet Fiqh-Fragen (Schlüssel: deutsche Frage) ihre Belege zu: `[Art, Stelle, Text de, Text en, İlmihal-Seite, Fußnote, Stelle en]`. Arten: Q Qurʾān (Sure Vers), H Hadith (Sammlung und Kitāb, Überlieferer), A Wort eines Gefährten, I Idschmāʿ, K Qiyās, S Istiḥsān, R Rechtsgrundsatz, J Begründung der Gelehrten (kein direkter Text), L Sprache. Seite und Fußnote verweisen auf das gedruckte İlmihal (die Fußnotentexte fehlen im PDF). Seite 0 heißt: Beleg nicht aus dem Buch, sondern ergänzt. Angezeigt werden die Belege nach der Antwort, in der Auswertung und im Fehlerordner. Erfasst sind alle 698 Fragen. Die Hadith-Angaben (Sammlung, Kapitel, Überlieferer) sind ergänzt, weil der Buchtext meist nur die Überlieferer nennt. Bei rund 250 Belegen stehen Hadithnummern dabei (Zählung wie auf sunnah.com: Buḫārī und Muslim nach Fuʾād ʿAbd al-Bāqī bzw. Fatḥ al-Bārī, die Sunan in der üblichen Zählung); wo eine Nummer nicht sicher war, fehlt sie. Statt Sammelangaben wie „Uṣūl-Gelehrte“ werden, wo möglich, die Gelehrten und Werke genannt.
