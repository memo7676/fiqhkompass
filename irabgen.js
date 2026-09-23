/* Iʿrāb-Satzgenerator: new sentences for the Iʿrāb training and the Arabisch-Liga.
   Sentences are built from words of Madina-Buch 1 with a few patterns of the book's grammar
   (Nominalsatz, Genitivverbindung, Präposition, Verbalsatz, Adjektiv, Demonstrativ), so every
   case ending follows from the pattern. Each sentence comes with a German and an English translation;
   the explanation is given in the language of the page (i18n.js). English never changes the random
   choices, so the same seed gives the same sentences in every language.

   FIQH_IRABGEN.make(seed, n, skip) -> n questions { q, ar, arMark, a: [right, 3 wrong], e, key }
     the same seed always gives the same sentences (everyone gets the same weekly league);
     skip: { key: 1 } sentences to leave out. */
(function () {
  "use strict";
  var FA = "َ", DA = "ُ", KA = "ِ", SH = "ّ";
  var TAN = { n: "ٌ", a: "ً", g: "ٍ" };
  var CASE = { n: DA, a: FA, g: KA };
  var SUN = "تثدذرزسشصضطظلن";

  /* ---------- words ----------
     nouns: [Arabic without ending, Arabic gender, German gender, German, weak form (acc/dat), genitive, kinds]
     kinds: t thing · o can be open/closed · p person · l text (lesson, letter) · w washable
            i place you are in · s surface you put things on */
  var NOUN_EN = {
    "كِتَاب": "book", "قَلَم": "pen", "بَاب": "door", "مَكْتَب": "desk", "سَرِير": "bed", "كُرْسِيّ": "chair", "قَمِيص": "shirt",
    "بَيْت": "house", "مِفْتَاح": "key", "دَفْتَر": "notebook", "سَيَّارَة": "car", "سَاعَة": "watch", "حَقِيبَة": "bag",
    "نَافِذَة": "window", "غُرْفَة": "room", "مَسْجِد": "mosque", "مَدْرَسَة": "school", "مِنْدِيل": "handkerchief", "مِلْعَقَة": "spoon",
    "فَصْل": "classroom", "مَطْبَخ": "kitchen", "جَامِعَة": "university", "دَرْس": "lesson", "رِسَالَة": "letter",
    "طَالِب": "student", "طَالِبَة": "student", "مُدَرِّس": "teacher", "مُدَرِّسَة": "teacher", "وَلَد": "boy", "بِنْت": "girl",
    "رَجُل": "man", "طَبِيب": "doctor", "تَاجِر": "merchant", "إِمَام": "imam"
  };
  var NOUNS = [
    ["كِتَاب", "m", "n", "Buch", "", "", "to"], ["قَلَم", "m", "m", "Stift", "", "", "t"],
    ["بَاب", "m", "f", "Tür", "", "", "to"], ["مَكْتَب", "m", "m", "Schreibtisch", "", "", "ts"],
    ["سَرِير", "m", "n", "Bett", "", "", "ts"], ["كُرْسِيّ", "m", "m", "Stuhl", "", "", "ts"],
    ["قَمِيص", "m", "n", "Hemd", "", "", "tw"], ["بَيْت", "m", "n", "Haus", "", "", "ti"],
    ["مِفْتَاح", "m", "m", "Schlüssel", "", "", "t"], ["دَفْتَر", "m", "n", "Heft", "", "", "to"],
    ["سَيَّارَة", "f", "n", "Auto", "", "", "tw"], ["سَاعَة", "f", "f", "Uhr", "", "", "t"],
    ["حَقِيبَة", "f", "f", "Tasche", "", "", "to"], ["نَافِذَة", "f", "n", "Fenster", "", "", "to"],
    ["غُرْفَة", "f", "n", "Zimmer", "", "", "ti"], ["مَسْجِد", "m", "f", "Moschee", "", "", "ti"],
    ["مَدْرَسَة", "f", "f", "Schule", "", "", "ti"], ["مِنْدِيل", "m", "n", "Taschentuch", "", "", "tw"],
    ["مِلْعَقَة", "f", "m", "Löffel", "", "", "tw"], ["فَصْل", "m", "n", "Klassenzimmer", "", "", "i"],
    ["مَطْبَخ", "m", "f", "Küche", "", "", "i"], ["جَامِعَة", "f", "f", "Universität", "", "", "i"],
    ["دَرْس", "m", "f", "Lektion", "", "", "l"], ["رِسَالَة", "f", "m", "Brief", "", "", "l"],
    ["طَالِب", "m", "m", "Student", "Studenten", "Studenten", "p"], ["طَالِبَة", "f", "f", "Studentin", "", "Studentin", "p"],
    ["مُدَرِّس", "m", "m", "Lehrer", "", "Lehrers", "p"], ["مُدَرِّسَة", "f", "f", "Lehrerin", "", "Lehrerin", "p"],
    ["وَلَد", "m", "m", "Junge", "Jungen", "Jungen", "p"], ["بِنْت", "f", "n", "Mädchen", "", "Mädchens", "p"],
    ["رَجُل", "m", "m", "Mann", "", "Mannes", "p"], ["طَبِيب", "m", "m", "Arzt", "", "Arztes", "p"],
    ["تَاجِر", "m", "m", "Händler", "", "Händlers", "p"], ["إِمَام", "m", "m", "Imam", "", "Imams", "p"]
  ].map(function (x) { return { ar: x[0], g: x[1], dg: x[2], de: x[3], weak: x[4] || x[3], gen: x[5] || x[3], k: x[6], en: NOUN_EN[x[0]] }; });
  /* things you can carry around (not doors, windows, cars, furniture or rooms) */
  var FIXED = ["بَاب", "نَافِذَة", "سَيَّارَة"];
  function movable() { return NOUNS.filter(function (x) { return /t/.test(x.k) && !/[si]/.test(x.k) && FIXED.indexOf(x.ar) === -1; }); }
  /* who or what can be "in" a room: mostly people, some small things */
  function inside(r) { return r() < 0.65 ? pick(r, nouns("p")) : pick(r, movable()); }
  function nouns(kind) { return NOUNS.filter(function (n) { return n.k.indexOf(kind) !== -1; }); }
  function byAr(ar) { return NOUNS.filter(function (n) { return n.ar === ar; })[0]; }

  /* adjectives: [Arabic (m.), German, kinds of nouns it fits] */
  var ADJ = [
    ["جَدِيد", "neu", "tl", "new"], ["قَدِيم", "alt", "t", "old"], ["كَبِير", "groß", "t", "big"], ["صَغِير", "klein", "t", "small"],
    ["جَمِيل", "schön", "t", "beautiful"], ["نَظِيف", "sauber", "tw", "clean"], ["مَفْتُوح", "offen", "o", "open"], ["مُغْلَق", "geschlossen", "o", "closed"],
    ["مَرِيض", "krank", "p", "ill"], ["مَشْغُول", "beschäftigt", "p", "busy"], ["طَوِيل", "groß", "p", "tall"], ["قَصِير", "klein", "p", "short"],
    ["جَدِيد", "neu", "p", "new"], ["طَوِيل", "lang", "l", "long"], ["قَصِير", "kurz", "l", "short"]
  ].map(function (x) { return { ar: x[0], de: x[1], k: x[2], en: x[3] }; });
  function adjFor(n) {
    return ADJ.filter(function (a) { return a.k.split("").some(function (k) { return n.k.indexOf(k) !== -1 && (k !== "t" || n.k.indexOf("p") === -1); }); });
  }

  /* transitive verbs with the objects that make sense */
  var TVERBS = [
    ["فَتَحَ", "öffnete", ["بَاب", "نَافِذَة", "كِتَاب", "حَقِيبَة", "دَفْتَر"], "opened"],
    ["أَغْلَقَ", "schloss", ["بَاب", "نَافِذَة", "حَقِيبَة"], "closed"],
    ["أَخَذَ", "nahm", ["قَلَم", "كِتَاب", "مِفْتَاح", "حَقِيبَة", "دَفْتَر", "سَاعَة"], "took"],
    ["غَسَلَ", "wusch", ["قَمِيص", "مِنْدِيل", "مِلْعَقَة", "سَيَّارَة"], "washed"],
    ["حَمَلَ", "trug", ["حَقِيبَة", "كِتَاب", "كُرْسِيّ"], "carried"],
    ["قَرَأَ", "las", ["كِتَاب", "دَرْس", "رِسَالَة"], "read"],
    ["كَتَبَ", "schrieb", ["دَرْس", "رِسَالَة"], "wrote"],
    ["فَهِمَ", "verstand", ["دَرْس"], "understood"]
  ];
  /* verbs of motion with a preposition: [verb, German, preposition, German preposition, German end] */
  var MVERBS = [
    ["ذَهَبَ", "ging", "إِلَى", "zu", "", "went to"], ["خَرَجَ", "ging", "مِنْ", "aus", " hinaus", "went out of"],
    ["رَجَعَ", "kehrte", "مِنْ", "aus", " zurück", "came back from"], ["رَجَعَ", "kehrte", "إِلَى", "zu", " zurück", "went back to"]
  ];

  /* ---------- Arabic forms ---------- */
  function def(stem) {
    var c = stem.charAt(0);
    return SUN.indexOf(c) !== -1 ? "ال" + c + SH + stem.slice(1) : "الْ" + stem;
  }
  function withCase(stem, c, definite) {
    if (definite !== false) return def(stem) + CASE[c];
    if (c === "a") return stem + TAN.a + (stem.slice(-1) === "ة" ? "" : "ا");
    return stem + TAN[c];
  }
  function fem(stem, g) { return g === "f" ? stem + FA + "ة" : stem; }
  /* before the article of the next word: مِنْ -> مِنَ, verb ending -tْ -> -ti */
  function prepAr(p) { return p === "مِنْ" ? "مِنَ" : p; }
  function verbAr(v, g) { return g === "f" ? v + "تِ" : v; }

  /* ---------- German forms ---------- */
  var ART = { n: { m: "der", f: "die", n: "das" }, a: { m: "den", f: "die", n: "das" }, d: { m: "dem", f: "der", n: "dem" }, g: { m: "des", f: "der", n: "des" } };
  function nounDe(n, c) { return c === "n" ? n.de : c === "g" ? n.gen : n.weak; }
  function np(n, c, adj) {
    var a = "";
    if (adj) a = adj.de + (c === "n" || (c === "a" && n.dg !== "m") ? "e " : "en ");
    return ART[c][n.dg] + " " + a + nounDe(n, c);
  }
  function pp(prep, n, adj) {
    var art = ART.d[n.dg];
    var head = prep === "in" && art === "dem" ? "im" : prep === "zu" && art === "dem" ? "zum" : prep === "zu" && art === "der" ? "zur" : prep + " " + art;
    return head + " " + (adj ? adj.de + "en " : "") + nounDe(n, "d");
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  /* English: "the (new) book", "a new book" / "an old book" */
  function the(n, adj) { return "the " + (adj ? adj.en + " " : "") + n.en; }
  function indef(word) { return (/^[aeiou]/i.test(word) ? "an " : "a ") + word; }

  /* ---------- analyses ---------- */
  var LAB = {
    mubtada: "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ",
    mubtadaMudaf: "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مُضَافٌ",
    khabar: "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ",
    fail: "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ",
    maful: "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ",
    mudafIlayh: "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ",
    natN: "نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ",
    natA: "نَعْتٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ",
    natG: "نَعْتٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ",
    khabarA: "خَبَرٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ",
    ishara: "اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ",
    isharaK: "اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى الْكَسْرِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ",
    isharaA: "اسْمُ إِشَارَةٍ مَبْنِيٌّ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهِ"
  };
  var BI = { "فِي": "بِفِي", "عَلَى": "بِعَلَى", "مِنْ": "بِمِنْ", "إِلَى": "بِإِلَى" };
  function majrur(p) { return "اسْمٌ مَجْرُورٌ " + BI[p] + " وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ"; }
  /* wrong answers that look alike */
  var WRONG = {
    mubtada: ["khabar", "fail", "maful", "mudafIlayh"], khabar: ["mubtada", "natN", "maful", "khabarA"],
    fail: ["mubtada", "maful", "khabar", "natN"], maful: ["fail", "khabarA", "natA", "mudafIlayh"],
    mudafIlayh: ["majrur", "natG", "fail", "maful"], natN: ["khabar", "mubtada", "natG", "fail"],
    natA: ["maful", "natN", "fail", "natG"], natG: ["majrur", "mudafIlayh", "natN", "natA"],
    majrur: ["mudafIlayh", "natG", "maful", "khabar"], mubtadaMudaf: ["khabar", "mudafIlayh", "fail", "maful"],
    ishara: ["khabar", "isharaA", "mudafIlayh", "fail"], isharaK: ["khabar", "isharaA", "mudafIlayh", "fail"]
  };
  var EXPLAIN = {
    mubtada: "ist das Subjekt des Nominalsatzes (Mubtadaʾ) und steht im Nominativ, erkennbar an der Ḍamma.",
    mubtadaMudaf: "ist das Subjekt (Mubtadaʾ) und zugleich das erste Glied einer Genitivverbindung (Muḍāf) – deshalb ohne Artikel und ohne Tanwīn, im Nominativ mit Ḍamma.",
    khabar: "ist das Prädikat (Khabar) des Nominalsatzes und steht wie das Subjekt im Nominativ (Ḍamma).",
    fail: "tut die Handlung: Subjekt des Verbalsatzes (Fāʿil), im Nominativ mit Ḍamma.",
    maful: "ist das Objekt (Mafʿūl bihi), auf das die Handlung fällt, und steht im Akkusativ mit Fatḥa.",
    mudafIlayh: "ist das zweite Glied der Genitivverbindung (Muḍāf ilaihi) und steht im Genitiv mit Kasra.",
    natN: "ist ein Adjektiv (Naʿt) und richtet sich nach seinem Bezugswort – hier Nominativ (Ḍamma).",
    natA: "ist ein Adjektiv (Naʿt) zum Objekt und steht wie dieses im Akkusativ (Fatḥa).",
    natG: "ist ein Adjektiv (Naʿt) zu einem Wort im Genitiv und steht deshalb auch im Genitiv (Kasra).",
    majrur: "steht nach einer Präposition und ist deshalb im Genitiv (Kasra).",
    ishara: "ist ein Demonstrativpronomen: unveränderlich (mabnī auf Sukūn), an der Stelle eines Nominativs – Mubtadaʾ.",
    isharaK: "ist ein Demonstrativpronomen: unveränderlich (mabnī auf Kasra), an der Stelle eines Nominativs – Mubtadaʾ."
  };

  var EXPLAIN_EN = {
    mubtada: "is the subject of the nominal sentence (mubtadaʾ) and is in the nominative, marked by the ḍamma.",
    mubtadaMudaf: "is the subject (mubtadaʾ) and at the same time the first part of a genitive construction (muḍāf) – so it has no article and no tanwīn; nominative with ḍamma.",
    khabar: "is the predicate (khabar) of the nominal sentence and, like the subject, is in the nominative (ḍamma).",
    fail: "does the action: the subject of the verbal sentence (fāʿil), nominative with ḍamma.",
    maful: "is the object (mafʿūl bihi) that receives the action and is in the accusative with fatḥa.",
    mudafIlayh: "is the second part of the genitive construction (muḍāf ilaihi) and is in the genitive with kasra.",
    natN: "is an adjective (naʿt) and follows the word it describes – here nominative (ḍamma).",
    natA: "is an adjective (naʿt) describing the object and, like it, is in the accusative (fatḥa).",
    natG: "is an adjective (naʿt) describing a word in the genitive, so it is in the genitive too (kasra).",
    majrur: "comes after a preposition and is therefore in the genitive (kasra).",
    ishara: "is a demonstrative pronoun: indeclinable (mabnī on sukūn), in the position of a nominative – mubtadaʾ.",
    isharaK: "is a demonstrative pronoun: indeclinable (mabnī on kasra), in the position of a nominative – mubtadaʾ."
  };

  /* ---------- random ---------- */
  function rng(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    var a = h >>> 0;
    return function () {
      a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function pick(r, list) { return list[Math.floor(r() * list.length)]; }
  function shuffle(r, list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  /* ---------- patterns: each returns { w: [words], de, roles: [[index, role, prep?]] } ---------- */
  var PATTERNS = [
    function nominal(r) {                       // الْكِتَابُ جَدِيدٌ
      var n = pick(r, NOUNS.filter(function (x) { return adjFor(x).length; })), a = pick(r, adjFor(n));
      return { w: [withCase(n.ar, "n"), withCase(fem(a.ar, n.g), "n", false)], de: cap(np(n, "n")) + " ist " + a.de + ".",
        en: cap(the(n)) + " is " + a.en + ".",
        roles: [[0, "mubtada"], [1, "khabar"]] };
    },
    function place(r) {                         // الْكِتَابُ عَلَى الْمَكْتَبِ / الطَّالِبُ فِي الْفَصْلِ
      var on = r() < 0.4, p = pick(r, nouns(on ? "s" : "i"));
      var n = on ? pick(r, movable()) : inside(r);
      var prep = on ? "عَلَى" : "فِي";
      return { w: [withCase(n.ar, "n"), prep, withCase(p.ar, "g")], de: cap(np(n, "n")) + " ist " + pp(on ? "auf" : "in", p) + ".",
        en: cap(the(n)) + " is " + (on ? "on " : "in ") + the(p) + ".",
        roles: [[0, "mubtada"], [2, "majrur", prep]] };
    },
    function idafa(r) {                         // كِتَابُ الطَّالِبِ جَدِيدٌ
      var n = pick(r, nouns("t").filter(function (x) { return !/i/.test(x.k); })), o = pick(r, nouns("p")), a = pick(r, adjFor(n));
      return { w: [n.ar + DA, withCase(o.ar, "g"), withCase(fem(a.ar, n.g), "n", false)],
        de: cap(np(n, "n")) + " " + np(o, "g") + " ist " + a.de + ".",
        en: "The " + o.en + "'s " + n.en + " is " + a.en + ".",
        roles: [[0, "mubtadaMudaf"], [1, "mudafIlayh"], [2, "khabar"]] };
    },
    function verbal(r) {                        // فَتَحَ الْوَلَدُ الْبَابَ
      var v = pick(r, TVERBS), s = pick(r, nouns("p")), o = byAr(pick(r, v[2]));
      return { w: [verbAr(v[0], s.g), withCase(s.ar, "n"), withCase(o.ar, "a")], de: cap(np(s, "n")) + " " + v[1] + " " + np(o, "a") + ".",
        en: cap(the(s)) + " " + v[3] + " " + the(o) + ".",
        roles: [[1, "fail"], [2, "maful"]] };
    },
    function motion(r) {                        // ذَهَبَ الطَّالِبُ إِلَى الْمَسْجِدِ
      var v = pick(r, MVERBS), s = pick(r, nouns("p")), p = pick(r, nouns("i"));
      return { w: [verbAr(v[0], s.g), withCase(s.ar, "n"), prepAr(v[2]), withCase(p.ar, "g")],
        de: cap(np(s, "n")) + " " + v[1] + " " + pp(v[3], p) + v[4] + ".", en: cap(the(s)) + " " + v[5] + " " + the(p) + ".",
        roles: [[1, "fail"], [3, "majrur", v[2]]] };
    },
    function naatSubject(r) {                   // الطَّالِبُ الْجَدِيدُ فِي الْفَصْلِ
      var p = pick(r, nouns("i")), n = inside(r);
      var a = pick(r, adjFor(n));
      return { w: [withCase(n.ar, "n"), withCase(fem(a.ar, n.g), "n"), "فِي", withCase(p.ar, "g")],
        de: cap(np(n, "n", a)) + " ist " + pp("in", p) + ".", en: cap(the(n, a)) + " is in " + the(p) + ".",
        roles: [[1, "natN"], [3, "majrur", "فِي"], [0, "mubtada"]] };
    },
    function naatObject(r) {                    // فَتَحَ الْوَلَدُ الْبَابَ الْكَبِيرَ
      var v = pick(r, TVERBS), s = pick(r, nouns("p")), o = byAr(pick(r, v[2])), a = pick(r, adjFor(o));
      return { w: [verbAr(v[0], s.g), withCase(s.ar, "n"), withCase(o.ar, "a"), withCase(fem(a.ar, o.g), "a")],
        de: cap(np(s, "n")) + " " + v[1] + " " + np(o, "a", a) + ".", en: cap(the(s)) + " " + v[3] + " " + the(o, a) + ".",
        roles: [[3, "natA"], [2, "maful"], [1, "fail"]] };
    },
    function naatGen(r) {                       // الْكِتَابُ عَلَى الْمَكْتَبِ الْجَدِيدِ
      var p = pick(r, nouns("s")), n = pick(r, movable()), a = pick(r, adjFor(p));
      return { w: [withCase(n.ar, "n"), "عَلَى", withCase(p.ar, "g"), withCase(fem(a.ar, p.g), "g")],
        de: cap(np(n, "n")) + " ist " + pp("auf", p, a) + ".", en: cap(the(n)) + " is on " + the(p, a) + ".",
        roles: [[3, "natG"], [2, "majrur", "عَلَى"]] };
    },
    function demonstrative(r) {                 // هَذَا كِتَابٌ جَدِيدٌ
      var n = pick(r, NOUNS.filter(function (x) { return adjFor(x).length; })), a = pick(r, adjFor(n));
      var ind = { m: "ein", f: "eine", n: "ein" }[n.dg], end = n.dg === "m" ? "er" : n.dg === "n" ? "es" : "e";
      return { w: [n.g === "f" ? "هَذِهِ" : "هَذَا", withCase(n.ar, "n", false), withCase(fem(a.ar, n.g), "n", false)],
        de: "Das ist " + ind + " " + a.de + end + " " + n.de + ".", en: "This is " + indef(a.en) + " " + n.en + ".",
        roles: [[0, n.g === "f" ? "isharaK" : "ishara"], [1, "khabar"], [2, "natN"]] };
    }
  ];

  function question(r, s, role) {
    var idx = role[0], kind = role[1], right = kind === "majrur" ? majrur(role[2]) : LAB[kind];
    var wrong = shuffle(r, WRONG[kind]).map(function (k) { return k === "majrur" ? majrur(role[2] === "فِي" ? "عَلَى" : "فِي") : LAB[k]; })
      .filter(function (x, i, all) { return x !== right && all.indexOf(x) === i; }).slice(0, 3);
    var sentence = s.w.join(" ") + ".", en = window.I18N && window.I18N.lang === "en";
    return {
      q: en ? "Iʿrāb of the marked word:" : "Iʿrāb des markierten Wortes:", ar: sentence, arMark: idx, a: [right].concat(wrong),
      e: en ? "“" + s.en + "” – " + s.w[idx] + " " + EXPLAIN_EN[kind] : "„" + s.de + "“ – " + s.w[idx] + " " + EXPLAIN[kind],
      key: sentence + "|" + idx
    };
  }

  /* n different sentences for one seed; a sentence is used only once per seed.
     balanced: the patterns take turns in a seeded order, so every set has the same
     mix of easy and harder sentence types (used by the Arabisch-Liga). */
  function make(seed, n, skip, balanced) {
    var r = rng("irab:" + seed), out = [], seen = {}, used = {}, tries = 0;
    skip = skip || {};
    var order = PATTERNS.map(function (p, i) { return i; });
    if (balanced) for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), x = order[i]; order[i] = order[j]; order[j] = x; }
    while (out.length < n && tries < n * 60) {
      tries++;
      var s = PATTERNS[balanced ? order[out.length % order.length] : Math.floor(r() * PATTERNS.length)](r);
      var sentence = s.w.join(" ");
      if (used[sentence]) continue;
      var role = s.roles[Math.floor(r() * s.roles.length)];
      var q = question(r, s, role);
      if (seen[q.key] || skip[q.key]) continue;
      seen[q.key] = 1; used[sentence] = 1;
      out.push(q);
    }
    return out;
  }

  window.FIQH_IRABGEN = { make: make };
})();
