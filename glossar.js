/* Begriffe: after a question is answered, the foreign technical terms that occur in it
   (question, answers, explanation) are explained below the feedback.
   - Each entry: [scope, patterns, shown name, German meaning, English meaning]
     scope "f" = Fiqh questions, "a" = Arabic questions, "" = both.
   - Latin patterns are matched against a folded text: lower case, without diacritics and
     without ʿ ʾ, š → sch, ġ → gh, ḏ → dh, ṯ → th (so Wuḍūʾ, Wudu and wuḍū all read "wudu").
     A pattern must start at a word start; common endings (-s, -e, -en, -n, -h) may follow.
   - Arabic patterns (window.FIQH_GLOSSAR_AR) are matched without vowel signs; they are only
     used for Iʿrāb answers, where the answers are Arabic grammar terms.
   window.FIQH_TERMS(texts, scope, arabic) -> [[name, meaning], …] in order of appearance. */
(function () {
  "use strict";
  var G = [
    /* ---- Reinheit ---- */
    ["f", "wudu", "Wuḍūʾ", "rituelle Gebetswaschung (Gesicht, Arme, Kopf bestreichen, Füße)", "ritual ablution before prayer (face, arms, wiping the head, feet)"],
    ["f", "ghusl|gusl", "Ġusl", "rituelle Ganzkörperwaschung", "ritual washing of the whole body"],
    ["f", "tayammum", "Tayammum", "Trockenreinigung mit reiner Erde, wenn kein Wasser nutzbar ist", "dry purification with clean earth when water cannot be used"],
    ["f", "janaba|ganaba|dschanaba", "Ǧanāba", "große rituelle Unreinheit (z. B. nach Geschlechtsverkehr oder Samenerguss); erfordert Ġusl", "major ritual impurity (e.g. after intercourse or ejaculation); requires ghusl"],
    ["f", "hadath|hadat", "Ḥadaṯ", "Zustand ritueller Unreinheit (klein: Wuḍūʾ nötig, groß: Ġusl nötig)", "state of ritual impurity (minor: needs wuḍūʾ, major: needs ghusl)"],
    ["f", "hayd", "Ḥayḍ", "Menstruation", "menstruation"],
    ["f", "nifas", "Nifās", "Wochenbettblutung nach der Geburt", "post-natal bleeding"],
    ["f", "istihada", "Istiḥāḍa", "Blutung außerhalb von Ḥayḍ und Nifās (Zwischenblutung); hindert Gebet und Fasten nicht", "bleeding outside menstruation and post-natal bleeding; does not prevent prayer or fasting"],
    ["f", "nagasa|najasa|nadschasa", "Naǧāsa", "Unreinheit, unreine Substanz (z. B. Urin, Blut)", "impurity, an impure substance (e.g. urine, blood)"],
    ["f", "nagis|najis|nadschis", "naǧis", "unrein", "impure"],
    ["f", "istinga|istinja|istindscha", "Istinǧāʾ", "Reinigung nach dem Toilettengang", "cleaning oneself after using the toilet"],
    ["f", "ihtilam", "Iḥtilām", "Samenerguss im Schlaf", "wet dream"],
    ["f", "mash", "Masḥ", "Bestreichen mit nasser Hand (Kopf, Ledersocken)", "wiping with a wet hand (head, leather socks)"],
    ["f", "khuff|chuff|khuf|chuf", "Ḫuff", "Ledersocke, über die man beim Wuḍūʾ streichen darf", "leather sock that may be wiped over in wuḍūʾ"],
    ["f", "miswak", "Miswāk", "Zahnputzholz", "tooth-cleaning stick"],
    ["f", "madhur", "Maʿḏūr", "Entschuldigter mit Dauerleiden (z. B. ständiger Harnfluss); eigene Wuḍūʾ-Regeln", "excused person with a constant condition (e.g. incontinence); special wuḍūʾ rules"],
    ["f", "mani", "Manī", "Samenflüssigkeit", "semen"],
    /* ---- Gebet ---- */
    ["f", "salah|salat|salawat", "Ṣalāh", "das rituelle Gebet", "the ritual prayer"],
    ["", "raka|rakat|rakah|rakaat", "Rakʿa", "Gebetseinheit (Stehen, Verbeugung, zwei Niederwerfungen); Plural Rakʿāt", "prayer unit (standing, bowing, two prostrations); plural rakʿāt"],
    ["f", "adhan|azan", "Adhān", "Gebetsruf", "call to prayer"],
    ["f", "iqama", "Iqāma", "zweiter Ruf direkt vor Beginn des Gemeinschaftsgebets", "second call just before the congregational prayer begins"],
    ["f", "muadhdhin|muezzin", "Muʾaḏḏin", "Gebetsrufer", "the one who calls the adhān"],
    ["f", "takbir|takbire", "Takbīr", "„Allāhu akbar“ sagen", "saying “Allāhu akbar”"],
    ["f", "tahrima", "Taḥrīma", "Eröffnungstakbīr, mit dem das Gebet beginnt", "the opening takbīr that starts the prayer"],
    ["f", "fatiha", "Fātiḥa", "erste Sure des Qurʾān, in jeder Rakʿa gelesen", "first sūra of the Qurʾān, recited in every rakʿa"],
    ["f", "ruku", "Rukūʿ", "Verbeugung im Gebet", "bowing in prayer"],
    ["f", "sugud|sujud|sudschud", "Suǧūd", "Niederwerfung (Stirn auf dem Boden)", "prostration (forehead on the ground)"],
    ["f", "sagda|sajda|sajdah|sadschda", "Saǧda", "eine Niederwerfung", "a prostration"],
    ["f", "sahw", "Sahw", "Vergesslichkeit im Gebet; die Saǧdat as-Sahw gleicht Fehler aus", "forgetfulness in prayer; the sajdat as-sahw makes up for mistakes"],
    ["f", "tilawa", "Tilāwa", "Qurʾān-Rezitation; Tilāwa-Niederwerfung bei bestimmten Versen", "recitation of the Qurʾān; prostration of recitation at certain verses"],
    ["f", "qiyam", "Qiyām", "das Stehen im Gebet", "standing in prayer"],
    ["f", "tashahhud|taschahhud|at-tahiyyat", "Tašahhud", "Glaubensbezeugung im Sitzen („at-Taḥiyyātu lillāh …“)", "testimony recited while sitting (“at-taḥiyyātu lillāh …”)"],
    ["f", "tahiyyat(?:ul?)?[ -]+(?:al-|l-)?mas[gj]id", "Taḥiyyat al-Masǧid", "Begrüßungsgebet beim Betreten der Moschee (2 Rakʿāt)", "greeting prayer on entering the mosque (2 rakʿāt)"],
    ["f", "qunut", "Qunūt", "Bittgebet im Stehen (im Witr-Gebet)", "supplication while standing (in the witr prayer)"],
    ["f", "witr", "Witr", "ungerades Nachtgebet nach dem ʿIšāʾ (bei den Ḥanafiten wāǧib)", "odd-numbered night prayer after ʿishāʾ (wājib for the Ḥanafīs)"],
    ["f", "tarawih", "Tarāwīḥ", "Nachtgebet im Ramaḍān nach dem ʿIšāʾ", "night prayer in Ramaḍān after ʿishāʾ"],
    ["f", "tahaggud|tahajjud|tahadschdschud", "Tahaǧǧud", "freiwilliges Nachtgebet nach dem Schlafen", "voluntary night prayer after sleeping"],
    ["f", "duha", "Ḍuḥā", "freiwilliges Vormittagsgebet", "voluntary mid-morning prayer"],
    ["f", "awwabin", "Awwābīn", "freiwilliges Gebet nach dem Maġrib", "voluntary prayer after maghrib"],
    ["f", "fagr|fajr|fadschr", "Faǧr", "Morgengebet (vor Sonnenaufgang)", "dawn prayer (before sunrise)"],
    ["f", "zuhr", "Ẓuhr", "Mittagsgebet", "midday prayer"],
    ["f", "asr", "ʿAṣr", "Nachmittagsgebet", "afternoon prayer"],
    ["f", "maghrib|magrib", "Maġrib", "Abendgebet (nach Sonnenuntergang)", "sunset prayer"],
    ["f", "ischa|isha", "ʿIšāʾ", "Nachtgebet", "night prayer"],
    ["f", "jumua|gumua|dschumua|jumuah|dschuma", "Ǧumuʿa", "Freitagsgebet", "Friday prayer"],
    ["f", "chutba|khutba|chutbas", "Chuṭba", "Predigt (beim Freitagsgebet, an den Festtagen)", "sermon (at the Friday prayer and the two ʿĪds)"],
    ["f", "chatib|khatib", "Chaṭīb", "Prediger", "preacher"],
    ["f", "qibla", "Qibla", "Gebetsrichtung zur Kaʿba", "prayer direction towards the Kaʿba"],
    ["f", "awra", "ʿAwra", "Körperteile, die bedeckt sein müssen", "parts of the body that must be covered"],
    ["f", "imam|imamat|imama", "Imām", "Vorbeter; auch Titel großer Gelehrter", "prayer leader; also a title of great scholars"],
    ["f", "masbuq", "Masbūq", "wer erst nach Beginn des Gemeinschaftsgebets dazukommt", "someone who joins the congregation after the prayer has begun"],
    ["f", "lahiq", "Lāḥiq", "wer von Anfang an dabei war, aber Teile verpasst hat (z. B. durch Einschlafen)", "someone present from the start who missed parts (e.g. by dozing off)"],
    ["f", "musafir", "Musāfir", "Reisender (ab ca. 77 km); verkürzt die Vierer-Gebete", "traveller (from about 77 km); shortens the four-rakʿa prayers"],
    ["f", "qasr", "Qaṣr", "Verkürzung der Vierer-Gebete auf 2 Rakʿāt auf Reisen", "shortening the four-rakʿa prayers to 2 on a journey"],
    ["f", "watan", "Waṭan", "Heimatort; bestimmt, ob man Reisender ist", "home town; decides whether one counts as a traveller"],
    ["f", "dua", "Duʿāʾ", "Bittgebet", "supplication"],
    ["f", "dhikr|zikr", "Ḏikr", "Gedenken Allahs", "remembrance of Allah"],
    ["f", "tasbih", "Tasbīḥ", "„Subḥānallāh“ sagen (Lobpreis)", "saying “subḥānallāh” (glorification)"],
    ["f", "salam", "Salām", "Friedensgruß; beendet das Gebet", "greeting of peace; ends the prayer"],
    ["f", "niyya|niyyah", "Niyya", "Absicht", "intention"],
    ["f", "basmala", "Basmala", "„Bismillāhi r-Raḥmāni r-Raḥīm“ sagen", "saying “bismillāhi r-raḥmāni r-raḥīm”"],
    ["f", "masgid|masjid", "Masǧid", "Moschee", "mosque"],
    ["f", "(?:al-)?mas[gj]id al-haram", "al-Masǧid al-Ḥarām", "die heilige Moschee in Mekka um die Kaʿba", "the Sacred Mosque in Makka around the Kaʿba"],
    ["f", "(?:al-)?mas[gj]id an-nabawi", "al-Masǧid an-Nabawī", "die Moschee des Propheten ﷺ in Medina", "the Prophet’s ﷺ mosque in Madina"],
    /* ---- Urteile ---- */
    ["f", "fard|fardh", "Farḍ", "Pflicht, durch eindeutigen Beleg festgelegt; wer sie leugnet, ist kein Muslim", "obligation established by definitive proof; denying it takes one out of Islam"],
    ["f", "fard(?:h)? (?:al-)?ayn|fard(?:h)?-ayn", "Farḍ ʿAin", "Pflicht für jeden Einzelnen", "obligation on every individual"],
    ["f", "fard(?:h)? (?:al-)?kifaya|kifaya", "Farḍ Kifāya", "Gemeinschaftspflicht: erfüllen es einige, entfällt sie für die übrigen", "communal obligation: once some fulfil it, the rest are free of it"],
    ["f", "wagib|wajib|wadschib|wadschibat|wagibat", "Wāǧib", "Pflicht unterhalb von Farḍ (Beleg nicht ganz eindeutig); Weglassen ist Sünde", "obligation below farḍ (proof not fully definitive); leaving it is a sin"],
    ["f", "sunna|sunnah|sunnat", "Sunna", "Weg und Praxis des Propheten ﷺ; als Urteil: empfohlen", "the way and practice of the Prophet ﷺ; as a ruling: recommended"],
    ["f", "muakkada", "muʾakkada", "„bekräftigt“: Sunna, die der Prophet ﷺ fast immer tat", "“emphasised”: a sunna the Prophet ﷺ did almost always"],
    ["f", "mustahabb|mustahab", "Mustaḥabb", "erwünscht, belohnt; Weglassen ist nicht tadelnswert", "desirable and rewarded; leaving it is not blameworthy"],
    ["f", "mandub", "Mandūb", "empfohlen (wie Mustaḥabb)", "recommended (like mustaḥabb)"],
    ["f", "nafl|nafila|nawafil", "Nafl", "freiwillige, zusätzliche Handlung", "voluntary, extra act"],
    ["f", "mubah", "Mubāḥ", "erlaubt, weder belohnt noch bestraft", "permissible, neither rewarded nor punished"],
    ["f", "makruh|mekruh", "Makrūh", "verpönt, missbilligt", "disliked, disapproved"],
    ["f", "tahriman|tahrimen", "taḥrīman", "(makrūh taḥrīman) stark verpönt, nahe am Verbot; Sünde", "(makrūh taḥrīman) strongly disliked, close to forbidden; sinful"],
    ["f", "tanzihan|tenzihen", "tanzīhan", "(makrūh tanzīhan) leicht verpönt; besser lassen, aber keine Sünde", "(makrūh tanzīhan) mildly disliked; better avoided but not sinful"],
    ["f", "karaha", "Karāha", "Verpöntheit (das Makrūh-Sein)", "being disliked (makrūh)"],
    ["f", "haram", "Ḥarām", "verboten", "forbidden"],
    ["f", "halal", "Ḥalāl", "erlaubt", "permitted"],
    ["f", "batil", "Bāṭil", "ungültig, nichtig", "invalid, void"],
    ["f", "fasid", "Fāsid", "fehlerhaft, ungültig (in Verträgen: mangelhaft)", "defective, invalid (in contracts: flawed)"],
    ["f", "azima", "ʿAzīma", "die Grundregel ohne Erleichterung", "the basic rule without concession"],
    ["f", "ruchsa|rukhsa|ruhsa", "Ruḫṣa", "Erleichterung (z. B. für Reisende oder Kranke)", "concession (e.g. for travellers or the sick)"],
    ["f", "hukm", "Ḥukm", "Rechtsurteil", "legal ruling"],
    ["f", "schart|shart|schurut|shurut", "Šarṭ", "Bedingung (muss vor und während der Handlung erfüllt sein)", "condition (must be met before and during the act)"],
    ["f", "rukn|arkan", "Rukn", "Säule, fester Bestandteil einer Handlung", "pillar, essential part of an act"],
    /* ---- Quellen und Rechtsschulen ---- */
    ["", "quran", "Qurʾān", "das Wort Allahs, dem Propheten ﷺ offenbart", "the word of Allah revealed to the Prophet ﷺ"],
    ["f", "hadith|hadit|hadis", "Ḥadīṯ", "Überlieferung von Worten, Taten oder Billigungen des Propheten ﷺ", "report of the Prophet’s ﷺ words, deeds or approvals"],
    ["f", "idschma|ijma|igma", "Iǧmāʿ", "Konsens der Gelehrten", "consensus of the scholars"],
    ["f", "qiyas", "Qiyās", "Analogieschluss: Urteil eines Falls auf einen ähnlichen mit gleicher ʿIlla übertragen", "analogy: extending a ruling to a similar case with the same ʿilla"],
    ["f", "illah", "ʿIlla", "Rechtsgrund, an dem ein Urteil hängt", "the effective cause on which a ruling depends"],
    ["f", "asl", "Aṣl", "Grundfall (beim Qiyās) bzw. Grundlage", "original case (in qiyās) or foundation"],
    ["f", "istihsan", "Istiḥsān", "juristische Präferenz: Abweichen vom Analogieschluss aus stärkerem Grund", "juristic preference: departing from analogy for a stronger reason"],
    ["f", "maslaha|masalih", "Maṣlaḥa", "Gemeinwohl, Nutzen", "public interest, benefit"],
    ["f", "urf", "ʿUrf", "Gewohnheit, Brauch", "custom, common practice"],
    ["f", "istishab", "Istiṣḥāb", "Fortbestand: Ein Zustand gilt, bis das Gegenteil erwiesen ist", "presumption of continuity: a state holds until the opposite is proven"],
    ["f", "tawatur|mutawatir", "Tawātur", "Überlieferung durch so viele, dass ein Irrtum ausgeschlossen ist", "transmission by so many that error is ruled out"],
    ["f", "idschtihad|ijtihad|igtihad", "Iǧtihād", "eigenständiges Ableiten von Urteilen aus den Quellen", "deriving rulings independently from the sources"],
    ["f", "mujtahid|mugtahid|mudschtahid", "Muǧtahid", "Gelehrter, der Iǧtihād betreiben kann", "scholar able to do ijtihād"],
    ["f", "taqlid", "Taqlīd", "Befolgen eines Muǧtahid bzw. einer Rechtsschule", "following a mujtahid or a school of law"],
    ["f", "muqallid", "Muqallid", "wer einem Muǧtahid folgt", "someone who follows a mujtahid"],
    ["f", "madhhab|madhab|madhahib", "Maḏhab", "Rechtsschule", "school of law"],
    ["f", "fiqh", "Fiqh", "islamische Rechtswissenschaft: Kenntnis der praktischen Urteile", "Islamic jurisprudence: knowledge of the practical rulings"],
    ["f", "faqih|fuqaha", "Faqīh", "Rechtsgelehrter", "jurist"],
    ["f", "usul", "Uṣūl", "Grundlagen (Uṣūl al-Fiqh: Methodik der Urteilsfindung)", "foundations (uṣūl al-fiqh: methodology of deriving rulings)"],
    ["f", "mukallaf", "Mukallaf", "wer zu den Pflichten verpflichtet ist (mündig und bei Verstand)", "someone held responsible for the duties (adult and sane)"],
    ["f", "scharia|sharia|shari?a", "Šarīʿa", "das von Allah gegebene Gesetz", "the law given by Allah"],
    ["f", "hanafit(?:isch)?|hanafi", "Ḥanafiten|Ḥanafīs", "Rechtsschule nach Imām Abū Ḥanīfa", "school of law of Imām Abū Ḥanīfa"],
    ["f", "malikit|maliki", "Mālikiten|Mālikīs", "Rechtsschule nach Imām Mālik", "school of law of Imām Mālik"],
    ["f", "schafiit|shafiit", "Šāfiʿiten|Shāfiʿīs", "Rechtsschule nach Imām asch-Šāfiʿī", "school of law of Imām ash-Shāfiʿī"],
    ["f", "hanbalit|hanbali", "Ḥanbaliten|Ḥanbalīs", "Rechtsschule nach Imām Aḥmad ibn Ḥanbal", "school of law of Imām Aḥmad ibn Ḥanbal"],
    ["f", "abu hanifa", "Abū Ḥanīfa", "Imām (gest. 150 n. H.), Begründer der ḥanafitischen Rechtsschule", "Imām (d. 150 AH), founder of the Ḥanafī school"],
    ["f", "abu yusuf", "Abū Yūsuf", "Schüler Abū Ḥanīfas, Oberrichter (gest. 182 n. H.)", "student of Abū Ḥanīfa, chief judge (d. 182 AH)"],
    ["f", "(?:imam )?malik ibn anas|imam malik", "Imām Mālik", "Imām von Medina (gest. 179 n. H.), Begründer der mālikitischen Schule", "Imām of Madina (d. 179 AH), founder of the Mālikī school"],
    ["f", "(?:asch-|ash-|as-|imam )?(?:schafii|shafii)", "asch-Šāfiʿī", "Imām (gest. 204 n. H.), Begründer der šāfiʿitischen Schule", "Imām (d. 204 AH), founder of the Shāfiʿī school"],
    ["f", "(?:al-)?maturidi", "al-Māturīdī", "Gelehrter der Glaubenslehre (gest. 333 n. H.); die Ḥanafiten folgen meist ihm", "scholar of creed (d. 333 AH); the Ḥanafīs mostly follow him"],
    ["f", "(?:al-)?aschari|(?:al-)?ashari", "al-Ašʿarī", "Gelehrter der Glaubenslehre (gest. 324 n. H.)", "scholar of creed (d. 324 AH)"],
    ["f", "mutazila", "Muʿtazila", "frühe rationalistische Strömung, von Ahl as-Sunna abgelehnt", "early rationalist sect, rejected by Ahl as-Sunna"],
    ["f", "(?:al-)?muwatta", "al-Muwaṭṭaʾ", "Ḥadīṯ- und Fiqh-Werk von Imām Mālik", "ḥadīth and fiqh work of Imām Mālik"],
    /* ---- Glaube ---- */
    ["f", "iman", "Īmān", "Glaube", "faith"],
    ["f", "ihsan", "Iḥsān", "Allah dienen, als ob man Ihn sähe", "worshipping Allah as though one sees Him"],
    ["f", "tawhid", "Tawḥīd", "Einheit Allahs; Ihm nichts beigesellen", "the oneness of Allah; associating nothing with Him"],
    ["f", "schirk|shirk", "Širk", "Allah etwas beigesellen", "associating partners with Allah"],
    ["f", "kufr", "Kufr", "Unglaube", "disbelief"],
    ["f", "kafir|kuffar", "Kāfir", "Ungläubiger", "disbeliever"],
    ["f", "munafiq", "Munāfiq", "Heuchler", "hypocrite"],
    ["f", "fasiq", "Fāsiq", "offenkundiger Sünder", "open sinner"],
    ["f", "bida", "Bidʿa", "unzulässige Neuerung in der Religion", "blameworthy innovation in religion"],
    ["f", "aqida", "ʿAqīda", "Glaubenslehre", "creed"],
    ["f", "mugiza|mujiza|muciza|mudschiza", "Muʿǧiza", "Wunder eines Propheten", "miracle of a prophet"],
    ["f", "karama", "Karāma", "Wunder eines Gottesfreundes (Walī)", "miracle granted to a friend of Allah (walī)"],
    ["f", "istidrag|istidraj|istidrasch", "Istidrāǧ", "scheinbares Wunder bei einem Sünder, das ihn tiefer ins Verderben führt", "apparent wonder given to a sinner that leads him further astray"],
    ["f", "isma", "ʿIṣma", "Sündlosigkeit der Propheten", "the sinlessness of the prophets"],
    ["f", "wali", "Walī", "Gottesfreund; im Eherecht: Vormund", "friend of Allah; in marriage law: guardian"],
    ["f", "nabi", "Nabī", "Prophet", "prophet"],
    ["f", "rasul", "Rasūl", "Gesandter (Prophet mit Botschaft)", "messenger (a prophet sent with a message)"],
    ["f", "taqwa", "Taqwā", "Gottesfurcht, Achtsamkeit vor Allah", "God-consciousness"],
    ["f", "qadar", "Qadar", "göttliche Vorherbestimmung", "divine decree"],
    ["f", "gibril|jibril|dschibril", "Ǧibrīl", "Erzengel Gabriel", "the archangel Gabriel"],
    ["f", "israfil", "Isrāfīl", "Engel, der ins Horn bläst", "angel who blows the Trumpet"],
    ["f", "munkar|nakir", "Munkar und Nakīr|Munkar and Nakīr", "die zwei Engel der Grabbefragung", "the two angels who question in the grave"],
    ["f", "barzach|barzakh", "Barzach", "Zwischenwelt zwischen Tod und Auferstehung", "interval between death and resurrection"],
    ["f", "mirag|miraj|miradsch", "Miʿrāǧ", "Himmelfahrt des Propheten ﷺ", "the Prophet’s ﷺ ascension"],
    ["f", "ibada|ibadat|ibadah", "ʿIbāda", "Gottesdienst, gottesdienstliche Handlung (Plural ʿIbādāt)", "worship, act of worship (plural ʿibādāt)"],
    ["f", "schahada|shahada", "Šahāda", "Glaubensbekenntnis; auch Zeugenaussage", "testimony of faith; also testimony as a witness"],
    ["f", "sahabi|sahaba", "Ṣaḥābī", "Gefährte des Propheten ﷺ (Plural Ṣaḥāba)", "companion of the Prophet ﷺ (plural ṣaḥāba)"],
    ["f", "tabiun|tabiin", "Tābiʿūn", "Nachfolger: die Generation nach den Gefährten", "successors: the generation after the companions"],
    ["f", "tasawwuf", "Taṣawwuf", "Läuterung des Herzens (Sufismus)", "purification of the heart (Sufism)"],
    ["f", "mushaf", "Muṣḥaf", "geschriebenes Exemplar des Qurʾān", "written copy of the Qurʾān"],
    ["f", "sura|surat|suren", "Sūra", "Kapitel des Qurʾān", "chapter of the Qurʾān"],
    ["f", "gihad|jihad|dschihad", "Ǧihād", "Anstrengung auf dem Weg Allahs, auch Kampf zur Verteidigung", "striving in the way of Allah, including defensive fighting"],
    /* ---- Fasten ---- */
    ["", "ramadan", "Ramaḍān", "Fastenmonat, 9. Monat des islamischen Kalenders", "month of fasting, 9th month of the Islamic calendar"],
    ["f", "sawm|siyam", "Ṣawm", "Fasten", "fasting"],
    ["f", "sahur|suhur", "Saḥūr", "Mahlzeit vor der Morgendämmerung", "pre-dawn meal"],
    ["f", "iftar", "Iftār", "Fastenbrechen bei Sonnenuntergang", "breaking the fast at sunset"],
    ["f", "qada", "Qaḍāʾ", "Nachholen einer versäumten Pflicht (Gebet, Fasten)", "making up a missed duty (prayer, fast)"],
    ["f", "kaffara|kaffaras", "Kaffāra", "Sühne (z. B. 60 Tage fasten nach absichtlichem Fastenbrechen)", "expiation (e.g. fasting 60 days after deliberately breaking a fast)"],
    ["f", "fidya", "Fidya", "Ersatzleistung: Speisen eines Armen für jeden nicht fastbaren Tag", "compensation: feeding a poor person for each day one cannot fast"],
    ["f", "itikaf", "Iʿtikāf", "Verweilen in der Moschee zur Andacht (bes. letzte 10 Tage des Ramaḍān)", "staying in the mosque for worship (esp. the last 10 days of Ramaḍān)"],
    ["f", "laylat al-qadr|lailat al-qadr|laylatul-qadr", "Laylat al-Qadr", "Nacht der Bestimmung, besser als tausend Monate", "the Night of Decree, better than a thousand months"],
    ["f", "hilal", "Hilāl", "Neumondsichel, bestimmt den Monatsbeginn", "new crescent moon that marks the start of a month"],
    ["f", "schawwal|shawwal", "Šawwāl", "10. Monat; am 1. ist ʿĪd al-Fiṭr", "10th month; ʿĪd al-Fiṭr is on its 1st day"],
    ["f", "aschura|ashura", "ʿĀšūrāʾ", "10. Muḥarram, empfohlener Fastentag", "10th of Muḥarram, recommended day of fasting"],
    ["f", "muharram", "Muḥarram", "1. Monat des islamischen Kalenders", "1st month of the Islamic calendar"],
    /* ---- Zakāt ---- */
    ["f", "zakat|zakah|zakatpflichtig", "Zakāt", "Pflichtabgabe (meist 2,5 %) auf Vermögen über dem Niṣāb nach einem Jahr", "obligatory alms (usually 2.5 %) on wealth above the niṣāb after a year"],
    ["f", "nisab", "Niṣāb", "Mindestvermögen, ab dem Zakāt Pflicht wird", "minimum wealth from which zakāt is due"],
    ["f", "hawl", "Ḥawl", "ein volles Mondjahr Besitz, Bedingung der Zakāt", "a full lunar year of ownership, a condition for zakāt"],
    ["f", "uschr|ushr", "ʿUšr", "Zehnt: Zakāt auf Ernte (10 % oder 5 % bei Bewässerung)", "tithe: zakāt on harvests (10 % or 5 % if irrigated)"],
    ["f", "sadaqa|sadaqat", "Ṣadaqa", "Spende, Almosen", "charity"],
    ["f", "fitra|fitr", "Fiṭra", "Ṣadaqat al-Fiṭr: Pflichtspende vor dem Fest nach Ramaḍān; ʿĪd al-Fiṭr: Fest des Fastenbrechens", "ṣadaqat al-fiṭr: obligatory charity before the ʿĪd after Ramaḍān; ʿĪd al-Fiṭr: feast of breaking the fast"],
    ["f", "masakin|miskin", "Miskīn", "Bedürftiger (Plural Masākīn)", "needy person (plural masākīn)"],
    ["f", "muallafat", "al-Muʾallafat qulūbuhum", "diejenigen, deren Herzen gewonnen werden sollen (Zakāt-Empfänger)", "those whose hearts are to be reconciled (zakāt recipients)"],
    ["f", "qirat", "Qīrāṭ", "Maßeinheit; im Ḥadīṯ: Lohn so groß wie ein Berg", "unit of measure; in ḥadīth: a reward as big as a mountain"],
    /* ---- Ḥaǧǧ ---- */
    ["f", "hagg|hajj|haddsch|hadsch", "Ḥaǧǧ", "Pilgerfahrt nach Mekka (einmal im Leben Pflicht, wenn man kann)", "pilgrimage to Makka (obligatory once in a lifetime if able)"],
    ["", "umra|umrah", "ʿUmra", "die „kleine Pilgerfahrt“ (jederzeit möglich)", "the “lesser pilgrimage” (possible at any time)"],
    ["f", "ihram", "Iḥrām", "Weihezustand der Pilger (mit Absicht und Talbiya)", "the pilgrim’s state of consecration (with intention and talbiya)"],
    ["f", "muhrim", "Muḥrim", "wer im Iḥrām ist", "someone in iḥrām"],
    ["f", "miqat|mawaqit", "Mīqāt", "Grenzort, an dem man den Iḥrām anlegen muss", "boundary point where iḥrām must be entered"],
    ["", "tawaf", "Ṭawāf", "siebenmaliges Umrunden der Kaʿba", "circling the Kaʿba seven times"],
    ["f", "=saʿy", "Saʿy", "siebenmaliges Gehen zwischen aṣ-Ṣafā und al-Marwa", "walking seven times between aṣ-Ṣafā and al-Marwa"],
    ["f", "wuquf", "Wuqūf", "Verweilen (in ʿArafa – Hauptsäule des Ḥaǧǧ)", "standing (at ʿArafa – the main pillar of ḥajj)"],
    ["f", "arafa|arafat", "ʿArafa", "Ebene bei Mekka; der Wuqūf dort am 9. Ḏū l-Ḥiǧǧa", "plain near Makka; the wuqūf there on 9 Dhū l-Ḥijja"],
    ["f", "muzdalifa", "Muzdalifa", "Ort zwischen ʿArafa und Minā, Übernachtung in der Festnacht", "place between ʿArafa and Minā, stay on the night of the ʿĪd"],
    ["f", "mina", "Minā", "Ort bei Mekka: Steinigung, Opfer, Übernachtungen", "place near Makka: stoning, sacrifice, nights"],
    ["f", "gamarat|jamarat|dschamarat", "Ǧamarāt", "die drei Säulen in Minā, die gesteinigt werden", "the three pillars in Minā that are stoned"],
    ["f", "tamattu", "Tamattuʿ", "Ḥaǧǧ-Art: erst ʿUmra, dann neuer Iḥrām für den Ḥaǧǧ", "type of ḥajj: ʿumra first, then a new iḥrām for ḥajj"],
    ["f", "qiran", "Qirān", "Ḥaǧǧ-Art: ʿUmra und Ḥaǧǧ in einem Iḥrām", "type of ḥajj: ʿumra and ḥajj in one iḥrām"],
    ["f", "ifrad", "Ifrād", "Ḥaǧǧ-Art: nur Ḥaǧǧ", "type of ḥajj: ḥajj only"],
    ["f", "talbiya", "Talbiya", "„Labbaika llāhumma labbaik …“ – Ruf der Pilger", "“labbayka llāhumma labbayk …” – the pilgrims’ call"],
    ["f", "kaba|kaaba", "Kaʿba", "das Haus Allahs in Mekka", "the House of Allah in Makka"],
    ["f", "hady", "Hady", "Opfertier der Pilger", "sacrificial animal of the pilgrims"],
    ["f", "udhiya|qurban", "Uḍḥiya", "Opfertier am Opferfest (Qurbān)", "sacrifice at ʿĪd al-Aḍḥā (qurbān)"],
    ["f", "aqiqa", "ʿAqīqa", "Opfer zur Geburt eines Kindes", "sacrifice for a newborn child"],
    ["f", "ziyara", "Ziyāra", "Besuch (z. B. Ṭawāf az-Ziyāra, Besuch des Grabes des Propheten ﷺ)", "visit (e.g. ṭawāf az-ziyāra, visiting the Prophet’s ﷺ grave)"],
    ["f", "ihsar", "Iḥṣār", "Verhinderung des Pilgers, die Riten zu vollenden", "the pilgrim being prevented from completing the rites"],
    ["f", "mahram", "Maḥram", "naher Verwandter, den man nie heiraten darf (Begleiter auf Reisen)", "close relative one may never marry (travel companion)"],
    /* ---- Familie und Handel ---- */
    ["f", "nikah", "Nikāḥ", "Eheschließung", "marriage contract"],
    ["f", "mahr", "Mahr", "Brautgabe an die Frau", "bridal gift owed to the wife"],
    ["f", "talaq", "Ṭalāq", "Scheidung durch den Mann", "divorce pronounced by the husband"],
    ["f", "idda", "ʿIdda", "Wartezeit der Frau nach Scheidung oder Tod des Mannes", "waiting period of a woman after divorce or her husband’s death"],
    ["f", "zihar", "Ẓihār", "Vergleich der Ehefrau mit dem Rücken der Mutter; verlangt Kaffāra", "comparing one’s wife to one’s mother’s back; requires kaffāra"],
    ["f", "muamalat", "Muʿāmalāt", "zwischenmenschliche Rechtsgeschäfte (Handel, Ehe …)", "dealings between people (trade, marriage …)"],
    ["f", "riba", "Ribā", "Zins, Wucher (verboten)", "interest, usury (forbidden)"],
    ["f", "mudaraba", "Muḍāraba", "Gewinnbeteiligung: einer gibt Kapital, der andere arbeitet", "profit sharing: one gives capital, the other works"],
    ["f", "istisna", "Istiṣnāʿ", "Werkvertrag: Auftrag zur Herstellung einer Ware", "manufacturing contract"],
    ["f", "kafala", "Kafāla", "Bürgschaft", "surety, guarantee"],
    ["f", "waqf", "Waqf", "Stiftung für einen guten Zweck", "endowment for a good cause"],
    ["f", "faraid", "Farāʾiḍ", "Pflichten (Plural von Farḍ); auch: Erbrecht mit festgelegten Anteilen", "obligations (plural of farḍ); also: inheritance law with fixed shares"],
    ["f", "zina", "Zinā", "Unzucht", "fornication"],
    ["f", "tazir", "Taʿzīr", "Ermessensstrafe des Richters", "discretionary punishment by the judge"],
    ["f", "hudud|hadd", "Ḥadd", "festgelegte Strafe (Plural Ḥudūd)", "fixed punishment (plural ḥudūd)"],
    /* ---- Arabische Grammatik ---- */
    ["a", "irab", "Iʿrāb", "Satzanalyse: Rolle und Fallendung jedes Wortes", "sentence analysis: the role and case ending of each word"],
    ["a", "mudaf ilaih?i|mudaf ilayhi", "Muḍāf ilaihi", "zweites Glied der Genitivverbindung, steht im Genitiv", "second part of a genitive construction, in the genitive"],
    ["a", "mudaf", "Muḍāf", "erstes Glied der Genitivverbindung (ohne al- und Tanwīn)", "first part of a genitive construction (without al- and tanwīn)"],
    ["a", "idafa", "Iḍāfa", "Genitivverbindung (كِتَابُ الطَّالِبِ)", "genitive construction (كِتَابُ الطَّالِبِ)"],
    ["a", "mudari", "Muḍāriʿ", "Präsens-/Futurform des Verbs (يَكْتُبُ)", "present/future verb form (يَكْتُبُ)"],
    ["a", "madi", "Māḍī", "Vergangenheitsform des Verbs (كَتَبَ)", "past tense verb (كَتَبَ)"],
    ["a", "tanwin", "Tanwīn", "Nunation (-un, -an, -in): Zeichen der Unbestimmtheit", "nunation (-un, -an, -in): sign of indefiniteness"],
    ["a", "damma", "Ḍamma", "Vokalzeichen u (ـُ)", "vowel sign u (ـُ)"],
    ["a", "fatha", "Fatḥa", "Vokalzeichen a (ـَ)", "vowel sign a (ـَ)"],
    ["a", "kasra", "Kasra", "Vokalzeichen i (ـِ)", "vowel sign i (ـِ)"],
    ["a", "sukun", "Sukūn", "Zeichen für Vokallosigkeit (ـْ)", "sign for no vowel (ـْ)"],
    ["a", "schadda|shadda", "Šadda", "Verdopplungszeichen (ـّ)", "doubling sign (ـّ)"],
    ["a", "marfu", "marfūʿ", "im Nominativ (Grundzeichen Ḍamma)", "in the nominative (basic sign ḍamma)"],
    ["a", "mansub", "manṣūb", "im Akkusativ bzw. Subjunktiv (Grundzeichen Fatḥa)", "in the accusative or subjunctive (basic sign fatḥa)"],
    ["a", "majrur|magrur", "majrūr", "im Genitiv (Grundzeichen Kasra)", "in the genitive (basic sign kasra)"],
    ["a", "majzum|magzum", "majzūm", "im Jussiv (Grundzeichen Sukūn)", "in the jussive (basic sign sukūn)"],
    ["a", "mabni", "mabnī", "unveränderlich: die Endung wechselt nicht", "indeclinable: the ending never changes"],
    ["a", "murab", "muʿrab", "veränderlich: die Endung wechselt je nach Rolle", "declinable: the ending changes with the role"],
    ["a", "=fāʿil|=faʿil", "Fāʿil", "Subjekt des Verbs (der Handelnde), marfūʿ", "subject of the verb (the doer), marfūʿ"],
    ["a", "maful|mafulun", "Mafʿūl bihi", "direktes Objekt, manṣūb", "direct object, manṣūb"],
    ["a", "mubtada", "Mubtadaʾ", "Subjekt des Nominalsatzes, marfūʿ", "subject of a nominal sentence, marfūʿ"],
    ["a", "khabar|chabar", "Ḫabar", "Prädikat des Nominalsatzes, marfūʿ", "predicate of a nominal sentence, marfūʿ"],
    ["a", "=naʿt", "Naʿt", "Adjektiv (Attribut); folgt seinem Nomen in Fall, Genus, Zahl und Bestimmtheit", "adjective (attribute); follows its noun in case, gender, number and definiteness"],
    ["a", "tamyiz", "Tamyīz", "Spezifizierung im Akkusativ (كَمْ كِتَابًا؟)", "specification in the accusative (كَمْ كِتَابًا؟)"],
    ["a", "zarf", "Ẓarf", "Adverb des Ortes oder der Zeit, manṣūb", "adverb of place or time, manṣūb"],
    ["a", "masdar", "Maṣdar", "Verbalnomen (Infinitiv), z. B. كِتَابَةٌ „das Schreiben“", "verbal noun, e.g. كِتَابَةٌ “writing”"],
    ["a", "harf|huruf", "Ḥarf", "Partikel bzw. Buchstabe", "particle or letter"],
    ["a", "munada", "Munādā", "der Angerufene (nach يَا)", "the one addressed (after يَا)"],
    ["a", "hamzat al-wasl|hamzatu l-wasl", "Hamzat al-waṣl", "Verbindungs-Hamza: wird nur am Satzanfang gesprochen", "connecting hamza: pronounced only at the start of speech"],
    ["a", "hamzat al-qat|hamzatu l-qat", "Hamzat al-qaṭʿ", "Trenn-Hamza: wird immer gesprochen", "cutting hamza: always pronounced"],
    ["a", "takid", "Taʾkīd", "Bekräftigung", "emphasis"],
    ["a", "muthanna", "Muṯannā", "Dual (zwei)", "dual (two)"],
    ["a", "damir", "Ḍamīr", "Pronomen", "pronoun"],
    ["a", "mustatir", "mustatir", "verborgen: im Verb enthaltenes, nicht geschriebenes Pronomen", "hidden: a pronoun contained in the verb but not written"],
    ["a", "sarf", "Ṣarf", "Formenlehre (Wortbildung und Konjugation)", "morphology (word patterns and conjugation)"],
    ["a", "mamnu min as-sarf|diptot(?:on)?", "Mamnūʿ min aṣ-ṣarf", "Diptoton: ohne Tanwīn, Genitiv mit Fatḥa", "diptote: no tanwīn, genitive with fatḥa"],
    ["a", "kana", "kāna", "„sein, war“: macht das Subjekt zum Ism (marfūʿ) und das Prädikat manṣūb", "“to be, was”: its subject stays marfūʿ, its predicate becomes manṣūb"],
    ["a", "inna", "inna", "„wahrlich“: macht das Subjekt manṣūb, das Prädikat bleibt marfūʿ", "“indeed”: makes the subject manṣūb, the predicate stays marfūʿ"],
    ["a", "tafsir", "Tafsīr", "Qurʾān-Erklärung", "Qurʾān exegesis"]
  ];

  /* Arabic grammar terms (without vowel signs, أ/إ/آ written as ا) */
  var A = [
    ["نائب فاعل", "نَائِبُ فَاعِلٍ", "Stellvertreter des Subjekts (beim Passiv), marfūʿ", "deputy subject (in the passive), marfūʿ"],
    ["فاعل", "فَاعِلٌ", "Subjekt des Verbs (der Handelnde)", "subject of the verb (the doer)", "Fāʿil"],
    ["مفعول به", "مَفْعُولٌ بِهِ", "direktes Objekt", "direct object", "Mafʿūl bihi"],
    ["مفعول فيه", "مَفْعُولٌ فِيهِ", "Adverbialbestimmung von Ort oder Zeit", "adverbial of place or time"],
    ["مفعول مطلق", "مَفْعُولٌ مُطْلَقٌ", "inneres Objekt: Maṣdar desselben Verbs", "absolute object: the maṣdar of the same verb"],
    ["مفعول لاجله", "مَفْعُولٌ لِأَجْلِهِ", "Objekt des Grundes („weil, um … zu“)", "object of reason (“because, in order to”)"],
    ["مبتدا مؤخر", "مُبْتَدَأٌ مُؤَخَّرٌ", "nachgestelltes Subjekt", "delayed subject"],
    ["خبر مقدم", "خَبَرٌ مُقَدَّمٌ", "vorangestelltes Prädikat", "fronted predicate"],
    ["مبتدا", "مُبْتَدَأٌ", "Subjekt des Nominalsatzes", "subject of a nominal sentence", "Mubtadaʾ"],
    ["اسم كان", "اسْمُ كَانَ", "Subjekt von كَانَ, marfūʿ", "subject of كَانَ, marfūʿ"],
    ["خبر كان", "خَبَرُ كَانَ", "Prädikat von كَانَ, manṣūb", "predicate of كَانَ, manṣūb"],
    ["اسم ان", "اسْمُ إِنَّ", "Subjekt von إِنَّ, manṣūb", "subject of إِنَّ, manṣūb"],
    ["خبر ان", "خَبَرُ إِنَّ", "Prädikat von إِنَّ, marfūʿ", "predicate of إِنَّ, marfūʿ"],
    ["خبر", "خَبَرٌ", "Prädikat des Nominalsatzes", "predicate of a nominal sentence", "Ḫabar"],
    ["مضاف اليه", "مُضَافٌ إِلَيْهِ", "zweites Glied der Genitivverbindung (Genitiv)", "second part of a genitive construction (genitive)", "Muḍāf ilaihi"],
    ["مضاف", "مُضَافٌ", "erstes Glied der Genitivverbindung", "first part of a genitive construction", "Muḍāf"],
    ["نعت", "نَعْتٌ", "Adjektiv (Attribut)", "adjective (attribute)", "Naʿt"],
    ["جار ومجرور", "جَارٌّ وَمَجْرُورٌ", "Präposition mit Nomen im Genitiv", "preposition with a noun in the genitive"],
    ["حرف جر", "حَرْفُ جَرٍّ", "Präposition", "preposition", "Ḥarf"],
    ["اسم مجرور", "اسْمٌ مَجْرُورٌ", "Nomen im Genitiv", "noun in the genitive"],
    ["ظرف زمان", "ظَرْفُ زَمَانٍ", "Zeitadverb", "adverb of time", "Ẓarf"],
    ["ظرف مكان", "ظَرْفُ مَكَانٍ", "Ortsadverb", "adverb of place", "Ẓarf"],
    ["تمييز", "تَمْيِيزٌ", "Spezifizierung (Akkusativ)", "specification (accusative)", "Tamyīz"],
    ["حال", "حَالٌ", "Zustandsangabe: wie jemand ist, während etwas geschieht (Akkusativ)", "circumstantial: the state of someone while something happens (accusative)"],
    ["منادى", "مُنَادًى", "der Angerufene (nach يَا)", "the one addressed (after يَا)", "Munādā"],
    ["بدل", "بَدَلٌ", "Apposition: ersetzt bzw. erläutert das vorige Wort", "apposition: replaces or explains the word before"],
    ["معطوف", "مَعْطُوفٌ", "durch „und“ usw. angeschlossenes Wort; folgt dem Fall des vorigen", "word joined by “and” etc.; takes the case of the one before"],
    ["حرف عطف", "حَرْفُ عَطْفٍ", "Konjunktion (وَ، فَ، ثُمَّ، أَوْ)", "conjunction (وَ، فَ، ثُمَّ، أَوْ)"],
    ["توكيد", "تَوْكِيدٌ", "Bekräftigung", "emphasis", "Taʾkīd"],
    ["فعل ماض", "فِعْلٌ مَاضٍ", "Verb der Vergangenheit (mabnī)", "past tense verb (mabnī)", "Māḍī"],
    ["فعل مضارع", "فِعْلٌ مُضَارِعٌ", "Verb im Präsens/Futur", "present/future verb", "Muḍāriʿ"],
    ["فعل امر", "فِعْلُ أَمْرٍ", "Befehlsform", "imperative"],
    ["مرفوع", "مَرْفُوعٌ", "im Nominativ (bzw. Indikativ); Grundzeichen Ḍamma", "in the nominative (or indicative); basic sign ḍamma", "marfūʿ"],
    ["منصوب", "مَنْصُوبٌ", "im Akkusativ (bzw. Subjunktiv); Grundzeichen Fatḥa", "in the accusative (or subjunctive); basic sign fatḥa", "manṣūb"],
    ["مجرور", "مَجْرُورٌ", "im Genitiv; Grundzeichen Kasra", "in the genitive; basic sign kasra", "majrūr"],
    ["مجزوم", "مَجْزُومٌ", "im Jussiv; Grundzeichen Sukūn", "in the jussive; basic sign sukūn", "majzūm"],
    ["مبني", "مَبْنِيٌّ", "unveränderlich (feste Endung)", "indeclinable (fixed ending)", "mabnī"],
    ["في محل", "فِي مَحَلِّ …", "„an der Stelle von …“: unveränderliches Wort in dieser Rolle", "“in the position of …”: an indeclinable word in that role"],
    ["لا محل له من الاعراب", "لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ", "hat keine Rolle im Iʿrāb (bei Partikeln)", "has no place in iʿrāb (particles)"],
    ["علامة", "عَلَامَةُ …", "Zeichen, an dem man den Fall erkennt", "the sign that shows the case"],
    ["الظاهرة", "الظَّاهِرَةُ", "sichtbar", "visible"],
    ["مقدرة", "مُقَدَّرَةٌ", "angenommen, nicht sichtbar (z. B. bei Wörtern auf ـى)", "assumed, not visible (e.g. words ending in ـى)"],
    ["ضمير مستتر", "ضَمِيرٌ مُسْتَتِرٌ", "im Verb verborgenes Pronomen", "pronoun hidden in the verb", "mustatir"],
    ["ضمير متصل", "ضَمِيرٌ مُتَّصِلٌ", "angehängtes Pronomen", "attached pronoun"],
    ["ضمير منفصل", "ضَمِيرٌ مُنْفَصِلٌ", "selbstständiges Pronomen", "separate pronoun"],
    ["تقديره", "تَقْدِيرُهُ", "„ergänzt als …“: das gemeinte, nicht geschriebene Wort", "“understood as …”: the implied, unwritten word"],
    ["اسم اشارة", "اسْمُ إِشَارَةٍ", "Demonstrativpronomen", "demonstrative pronoun"],
    ["اسم موصول", "اسْمٌ مَوْصُولٌ", "Relativpronomen", "relative pronoun"],
    ["اسم استفهام", "اسْمُ اسْتِفْهَامٍ", "Fragewort (Nomen)", "interrogative noun"],
    ["حرف استفهام", "حَرْفُ اسْتِفْهَامٍ", "Fragepartikel", "interrogative particle"],
    ["حرف نفي", "حَرْفُ نَفْيٍ", "Verneinungspartikel", "particle of negation"],
    ["حرف نهي", "حَرْفُ نَهْيٍ", "Partikel des Verbots (لَا + Jussiv)", "particle of prohibition (لَا + jussive)"],
    ["حرف نداء", "حَرْفُ نِدَاءٍ", "Partikel des Anrufs (يَا)", "vocative particle (يَا)"],
    ["حرف توكيد", "حَرْفُ تَوْكِيدٍ", "Partikel der Bekräftigung", "particle of emphasis"],
    ["حرف مصدري", "حَرْفٌ مَصْدَرِيٌّ", "Partikel, die mit dem Verb einen Maṣdar ergibt (أَنْ)", "particle that forms a maṣdar with the verb (أَنْ)"],
    ["استقبال", "اسْتِقْبَالٌ", "Bezug auf die Zukunft", "reference to the future"],
    ["حذف النون", "حَذْفُ النُّونِ", "Wegfall des nūn (Zeichen von Subjunktiv/Jussiv bei den „fünf Verben“)", "dropping the nūn (subjunctive/jussive sign of the “five verbs”)"],
    ["ثبوت النون", "ثُبُوتُ النُّونِ", "Beibehalten des nūn (Indikativzeichen der „fünf Verben“)", "keeping the nūn (indicative sign of the “five verbs”)"],
    ["نيابة عن", "نِيَابَةً عَنْ", "stellvertretend für (ein anderes Zeichen)", "standing in for (another sign)"],
    ["مثنى", "مُثَنًّى", "Dual", "dual", "Muṯannā"],
    ["جمع مذكر سالم", "جَمْعُ مُذَكَّرٍ سَالِمٌ", "männlicher gesunder Plural (ـُونَ / ـِينَ)", "sound masculine plural (ـُونَ / ـِينَ)"],
    ["جمع مؤنث سالم", "جَمْعُ مُؤَنَّثٍ سَالِمٌ", "weiblicher gesunder Plural (ـَاتٌ)", "sound feminine plural (ـَاتٌ)"],
    ["جمع تكسير", "جَمْعُ تَكْسِيرٍ", "gebrochener Plural", "broken plural"],
    ["الاسماء الخمسة", "الْأَسْمَاءُ الْخَمْسَةُ", "die fünf Nomen (أَبٌ، أَخٌ …): Fall durch و / ا / ي", "the five nouns (أَبٌ، أَخٌ …): case by و / ا / ي"],
    ["ممنوع من الصرف", "مَمْنُوعٌ مِنَ الصَّرْفِ", "Diptoton: ohne Tanwīn, Genitiv mit Fatḥa", "diptote: no tanwīn, genitive with fatḥa", "Mamnūʿ min aṣ-ṣarf"]
  ];

  var EN = window.I18N && window.I18N.lang === "en";

  function fold(s) {
    return String(s).replace(/[šŠ]/g, "sch").replace(/[ġĠ]/g, "gh").replace(/[ḏḎ]/g, "dh").replace(/[ṯṮ]/g, "th")
      .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʿʾ'’`ʼ‘]/g, "").toLowerCase();
  }
  function foldKeepAyn(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʾ'’`ʼ‘]/g, "").toLowerCase();
  }
  function arNorm(s) {
    return String(s).replace(/[ً-ٰٟـ]/g, "").replace(/[أإآٱ]/g, "ا");
  }

  var END = "(?:e|en|es|s|n|h)?(?![a-zß])";
  var TR = { "Ǧ": "J", "ǧ": "j", "Š": "Sh", "š": "sh", "Ḫ": "Kh", "ḫ": "kh", "Ġ": "Gh", "ġ": "gh", "Ḏ": "Dh", "ḏ": "dh", "Ṯ": "Th", "ṯ": "th" };
  function shown(name) {
    var n = name.split("|");
    return EN ? (n[1] || n[0]).replace(/[ǦǧŠšḪḫĠġḎḏṮṯ]/g, function (c) { return TR[c]; }) : n[0];
  }
  var latin = G.map(function (g) {
    var raw = [], plain = [];
    g[1].split("|").forEach(function (p) { if (p.charAt(0) === "=") raw.push(foldKeepAyn(p.slice(1))); else plain.push(p); });
    return {
      scope: g[0], key: g[2], name: shown(g[2]), mean: EN ? g[4] : g[3],
      re: plain.length ? new RegExp("(^|[^a-zß])(?:" + plain.join("|") + ")" + END, "g") : null,
      raw: raw.length ? new RegExp("(^|[^a-zß])(?:" + raw.join("|") + ")" + END, "g") : null
    };
  });
  var AR_PRE = "(^|[^\\u0621-\\u064A])(?:[وف])?(?:[بلك])?(?:ال|لل)?";
  var arabic = A.map(function (a) {
    return { key: a[1], also: a[4], name: a[1], mean: EN ? a[3] : a[2],
      re: new RegExp(AR_PRE + "(?:" + a[0].replace(/ /g, "\\s+(?:ال)?") + ")(?:ة|ه|ا)?(?![\\u0621-\\u064A])", "g") };
  });

  /* collect hits [pos, len, entry] in one text, longest first, no overlaps */
  function hits(text, list, prep) {
    var out = [];
    list.forEach(function (e) {
      [[e.re, prep(text)], [e.raw, foldKeepAyn(text)]].forEach(function (pair) {
        var re = pair[0], s = pair[1], m;
        if (!re) return;
        re.lastIndex = 0;
        while ((m = re.exec(s))) {
          var start = m.index + (m[1] ? m[1].length : 0);
          out.push([start, m.index + m[0].length - start, e]);
          if (re.lastIndex === m.index) re.lastIndex++;
        }
      });
    });
    out.sort(function (a, b) { return b[1] - a[1] || a[0] - b[0]; });
    var kept = [];
    out.forEach(function (h) {
      if (!kept.some(function (k) { return h[0] < k[0] + k[1] && k[0] < h[0] + h[1]; })) kept.push(h);
    });
    return kept.sort(function (a, b) { return a[0] - b[0]; });
  }

  /* texts: strings in reading order; scope: "f" or "a"; arabic: also look for Arabic grammar terms */
  window.FIQH_TERMS = function (texts, scope, withArabic) {
    var seen = {}, out = [];
    var list = latin.filter(function (e) { return !e.scope || e.scope === scope; });
    function take(e) {
      if (seen[e.key]) return;
      seen[e.key] = 1;
      if (e.also) seen[e.also] = 1;   // مَرْفُوعٌ already explains marfūʿ
      out.push([e.name, e.mean]);
    }
    texts.forEach(function (t) {
      if (!t) return;
      if (withArabic) hits(arNorm(t), arabic, function (s) { return s; }).forEach(function (h) { take(h[2]); });
      hits(t, list, fold).forEach(function (h) { take(h[2]); });
    });
    return out;
  };
})();
