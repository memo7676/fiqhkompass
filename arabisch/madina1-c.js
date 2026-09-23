/* Madina-Buch 1, Lektionen 17–23, plus Einführung und Fachbegriffe zum Iʿrāb.
   Format: siehe madina1-a.js. */
window.MADINA = window.MADINA || { lessons: [] };
window.MADINA.lessons.push(

{ id: "m17", n: "17", title: "Wiederholung: Plural von Sachen", ar: "مُرَاجَعَةٌ",
  grammar: [
    "Diese Lektion setzt Lektion 16 fort und bringt **keine neuen Strukturen**: Der Plural von Sachen und Tieren wird wie ein **weiblicher Singular** behandelt.",
    "هَذِهِ قُمْصَانٌ رَخِيصَةٌ – „Das sind billige Hemden.“ Das Adjektiv رَخِيصَةٌ steht im weiblichen Singular.",
    "Manche Wörter haben **zwei Pluralformen**: حِمَارٌ (Esel) → **حُمُرٌ** und **حَمِيرٌ**.",
    "Wiederhole: bei Personen bleibt der Plural männlich bzw. weiblich Plural – هَؤُلَاءِ مُدِيرُونَ جُدُدٌ."
  ],
  examples: [
    ["هَذِهِ قُمْصَانٌ يَابَانِيَّةٌ.", "Das sind japanische Hemden."],
    ["الْقُمْصَانُ رَخِيصَةٌ.", "Die Hemden sind billig."],
    ["أَيْنَ مُدِيرُ الشَّرِكَةِ؟", "Wo ist der Direktor der Firma?"],
    ["هُوَ فِي مَكْتَبِهِ.", "Er ist in seinem Büro."],
    ["السَّيَّارَاتُ الْيَابَانِيَّةُ جَيِّدَةٌ.", "Die japanischen Autos sind gut."]
  ],
  vocab: [
    ["الشَّرِكَةُ", "die Firma", "شَرِكَاتٌ"], ["مُدِيرُ الشَّرِكَةِ", "der Direktor der Firma"],
    ["الْمُدِيرُ", "der Direktor, Leiter", "مُدِيرُونَ"], ["رَخِيصٌ", "billig"], ["يَابَانِيٌّ", "japanisch"],
    ["الْقَمِيصُ", "das Hemd", "قُمْصَانٌ"], ["حِمَارٌ", "Esel", "حُمُرٌ / حَمِيرٌ"]
  ],
  quiz: [
    { q: "Welches Adjektiv passt? هَذِهِ قُمْصَانٌ …", a: ["رَخِيصَةٌ", "رَخِيصٌ", "رِخَاصٌ", "رَخِيصُونَ"], e: "Sachplural → Adjektiv im weiblichen Singular." },
    { q: "Plural von قَمِيصٌ?", a: ["قُمْصَانٌ", "قَمِيصَاتٌ", "أَقْمِصَةٌ", "قُمُصٌ"], e: "قَمِيصٌ → قُمْصَانٌ." },
    { q: "Welche zwei Plurale hat حِمَارٌ?", a: ["حُمُرٌ und حَمِيرٌ", "حِمَارَاتٌ und حُمُرٌ", "أَحْمِرَةٌ und حَمِيرٌ", "حِمَارُونَ und حُمُرٌ"], e: "Beide Formen kommen im Buch vor." },
    { q: "Welches Demonstrativ passt? … سَيَّارَاتٌ يَابَانِيَّةٌ.", a: ["هَذِهِ", "هَؤُلَاءِ", "هَذَا", "هَذَانِ"], e: "Sachplural → wie weiblicher Singular: هَذِهِ." }
  ],
  irab: [
    { s: "الْقُمْصَانُ رَخِيصَةٌ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "نَعْتٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "الْقُمْصَانُ ist bestimmt, رَخِيصَةٌ unbestimmt → Aussage (Khabar), nicht Adjektiv." },
    { s: "هَذَا مُدِيرُ الشَّرِكَةِ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "خَبَرٌ مَرْفُوعٌ", "نَعْتٌ مَجْرُورٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "Zweites Glied einer Iḍāfa → Genitiv mit Kasra." }
  ],
  model: [
    { s: "هَذِهِ قُمْصَانٌ رَخِيصَةٌ.", de: "Das sind billige Hemden.", words: [
      ["هَذِهِ", "اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى الْكَسْرِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Demonstrativ, unveränderlich (mabnī) – an der Stelle eines Nominativs: Subjekt"],
      ["قُمْصَانٌ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Prädikat, Nominativ – Ḍamma"],
      ["رَخِيصَةٌ", "نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Adjektiv zu قُمْصَانٌ, folgt ihm im Nominativ"]
    ] }
  ]
},

{ id: "m18", n: "18", title: "Der Dual – wie viele?", ar: "الْمُثَنَّى – كَمْ",
  grammar: [
    "Das Arabische hat drei Numeri: **Singular, Dual und Plural**. Der **Dual** steht für genau **zwei**; ab drei beginnt der Plural.",
    "Der Dual endet im Nominativ auf **ـَانِ** (-āni): بَيْتٌ → **بَيْتَانِ**, يَدٌ → **يَدَانِ**. Bei ة wird ein ت daraus: سَيَّارَةٌ → **سَيَّارَتَانِ**.",
    "Dual von هَذَا ist **هَذَانِ**, von هَذِهِ **هَاتَانِ**. Dual von هُوَ und هِيَ ist **هُمَا** („die beiden“).",
    "Ein Adjektiv zu einem Dual steht auch im Dual: طَالِبَانِ جَدِيدَانِ.",
    "Besonderheit: Dual von أَخٌ ist **أَخَوَانِ** (nicht أَخَانِ).",
    "**كَمْ** = „wie viel, wie viele“. Danach steht ein **Singular im Akkusativ** (Tamyīz): **كَمْ كِتَابًا؟** – „Wie viele Bücher?“",
    "Das Akkusativ-Tanwīn **-an** bekommt ein zusätzliches **Alif**, das nicht gesprochen wird: كِتَابٌ – كِتَابٍ – **كِتَابًا**. Wörter auf ة bekommen **kein** Alif: **سَيَّارَةً**.",
    "Ausblick für den Iʿrāb: Im Akkusativ und Genitiv endet der Dual auf **ـَيْنِ** (-aini), z. B. رَأَيْتُ رَجُلَيْنِ. Das Zeichen des Nominativs ist beim Dual also das **Alif**, nicht die Ḍamma."
  ],
  examples: [
    ["هَذَانِ كِتَابَانِ.", "Das sind zwei Bücher."], ["هَاتَانِ سَيَّارَتَانِ.", "Das sind zwei Autos."],
    ["مَنْ هَذَانِ الْوَلَدَانِ؟", "Wer sind diese beiden Jungen?"], ["هُمَا طَالِبَانِ جَدِيدَانِ.", "Sie sind zwei neue Studenten."],
    ["أَيْنَ الْأُخْتَانِ؟", "Wo sind die beiden Schwestern?"], ["هُمَا فِي الْغُرْفَةِ.", "Sie sind im Zimmer."],
    ["كَمْ قَلَمًا عِنْدَكَ؟", "Wie viele Stifte hast du?"], ["عِنْدِي قَلَمَانِ.", "Ich habe zwei Stifte."],
    ["كَمْ سَيَّارَةً عِنْدَ الْمُدِيرِ؟", "Wie viele Autos hat der Direktor?"]
  ],
  vocab: [
    ["الْعَجَلَةُ", "das Rad", "عَجَلَاتٌ"], ["السَّبُّورَةُ", "die (Schreib-)Tafel", "سَبُّورَاتٌ"], ["الْعِيدُ", "das Fest", "أَعْيَادٌ"],
    ["الرِّيَالُ", "der Riyal", "رِيَالَاتٌ"], ["السَّنَةُ", "das Jahr", "سَنَوَاتٌ"], ["الْحَيُّ", "der Stadtteil", "أَحْيَاءٌ"],
    ["النَّافِذَةُ", "das Fenster", "نَوَافِذُ"], ["الرَّكْعَةُ", "die Rakʿa (Gebetseinheit)", "رَكَعَاتٌ"], ["الْمِسْطَرَةُ", "das Lineal", "مَسَاطِرُ"],
    ["كَمْ", "wie viel(e)?"], ["هُمَا", "sie beide"], ["هَذَانِ", "diese beiden (m.)"], ["هَاتَانِ", "diese beiden (w.)"],
    ["يَدٌ", "Hand", "أَيْدٍ"]
  ],
  quiz: [
    { q: "Dual von بَيْتٌ (Nominativ)?", a: ["بَيْتَانِ", "بُيُوتٌ", "بَيْتَيْنِ", "بَيْتُونَ"], e: "Nominativ-Dual: ـَانِ." },
    { q: "Dual von سَيَّارَةٌ?", a: ["سَيَّارَتَانِ", "سَيَّارَةَانِ", "سَيَّارَاتٌ", "سَيَّارَانِ"], e: "Aus ة wird ت, dann ـَانِ." },
    { q: "Dual von هَذِهِ?", a: ["هَاتَانِ", "هَذَانِ", "هَؤُلَاءِ", "هُمَا"], e: "هَذَا → هَذَانِ, هَذِهِ → هَاتَانِ." },
    { q: "Dual von هُوَ und هِيَ?", a: ["هُمَا", "هُمْ", "هُنَّ", "هَذَانِ"], e: "هُمَا gilt für zwei Männer und zwei Frauen." },
    { q: "Dual von أَخٌ?", a: ["أَخَوَانِ", "أَخَانِ", "إِخْوَةٌ", "أَخَيَانِ"], e: "Ausnahme: أَخَوَانِ." },
    { q: "Was steht nach كَمْ?", a: ["ein Singular im Akkusativ", "ein Plural im Genitiv", "ein Plural im Nominativ", "ein Dual"], e: "كَمْ كِتَابًا؟ – Singular, Akkusativ (Tamyīz)." },
    { q: "Richtig geschrieben: „Wie viele Bücher?“", a: ["كَمْ كِتَابًا؟", "كَمْ كُتُبًا؟", "كَمْ كِتَابٌ؟", "كَمْ كِتَابَانِ؟"], e: "Singular, Akkusativ mit Alif." },
    { q: "Welches Wort bekommt beim Akkusativ-Tanwīn **kein** Alif?", a: ["سَيَّارَةً", "قَلَمًا", "بَيْتًا", "كِتَابًا"], e: "Wörter auf ة bekommen kein zusätzliches Alif." },
    { q: "Ergänze: هَذَانِ طَالِبَانِ …", a: ["جَدِيدَانِ", "جَدِيدٌ", "جُدُدٌ", "جَدِيدَةٌ"], e: "Das Adjektiv folgt dem Dual." }
  ],
  irab: [
    { s: "هَذَانِ كِتَابَانِ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ لِأَنَّهُ مُثَنًّى", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ", "نَعْتٌ مَرْفُوعٌ بِالْأَلِفِ"], e: "Beim Dual ist das Zeichen des Nominativs das Alif (ـَانِ)." },
    { s: "هُمَا طَالِبَانِ جَدِيدَانِ.", w: 2, a: ["نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ", "خَبَرٌ ثَانٍ مَنْصُوبٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "جَدِيدَانِ beschreibt طَالِبَانِ und folgt ihm: Nominativ, Zeichen Alif." },
    { s: "كَمْ قَلَمًا عِنْدَكَ؟", w: 1, a: ["تَمْيِيزٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "خَبَرٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "Das Nomen nach كَمْ ist Tamyīz (Spezifizierung) im Akkusativ." },
    { s: "كَمْ قَلَمًا عِنْدَكَ؟", w: 0, a: ["اسْمُ اسْتِفْهَامٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "حَرْفُ اسْتِفْهَامٍ لَا مَحَلَّ لَهُ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "كَمْ ist ein unveränderliches Fragenomen; hier steht es an der Stelle des Subjekts." }
  ],
  model: [
    { s: "هَذَانِ كِتَابَانِ جَدِيدَانِ.", de: "Das sind zwei neue Bücher.", words: [
      ["هَذَانِ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ لِأَنَّهُ مُلْحَقٌ بِالْمُثَنَّى", "Subjekt; Nominativ-Zeichen Alif, da es wie ein Dual behandelt wird"],
      ["كِتَابَانِ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ لِأَنَّهُ مُثَنًّى", "Prädikat, Nominativ – Zeichen: Alif (Dual)"],
      ["جَدِيدَانِ", "نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ لِأَنَّهُ مُثَنًّى", "Adjektiv, folgt im Nominativ – Zeichen: Alif"]
    ] },
    { s: "كَمْ قَلَمًا عِنْدَكَ؟", de: "Wie viele Stifte hast du?", words: [
      ["كَمْ", "اسْمُ اسْتِفْهَامٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Fragenomen, unveränderlich – steht an der Stelle des Subjekts"],
      ["قَلَمًا", "تَمْيِيزٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ", "Tamyīz (was gezählt wird), Akkusativ – Fatḥa"],
      ["عِنْدَكَ", "ظَرْفُ مَكَانٍ مَنْصُوبٌ، وَالْكَافُ ضَمِيرٌ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ، وَشِبْهُ الْجُمْلَةِ خَبَرٌ", "Ortsadverb im Akkusativ + Suffix im Genitiv; zusammen das Prädikat („bei dir“)"]
    ] }
  ]
},

{ id: "m19", n: "19", title: "Zahlen 3–10 (männliches Gezähltes)", ar: "الْعَدَدُ مِنْ ٣ إِلَى ١٠",
  grammar: [
    "**Eins** heißt **وَاحِدٌ** und steht als Adjektiv **nach** dem Nomen: كِتَابٌ وَاحِدٌ.",
    "**Zwei** heißt **اثْنَانِ** und steht ebenfalls nach dem Nomen: كِتَابَانِ اثْنَانِ. Meist lässt man es weg, weil der Dual schon „zwei“ ausdrückt; es dient der Betonung.",
    "Die Zahlen **3 bis 10** sind **Muḍāf** (erstes Glied einer Iḍāfa). Das Gezählte (**Maʿdūd**, مَعْدُودٌ) steht im **Plural** und als Muḍāf ilaihi im **Genitiv**: ثَلَاثَةُ كُتُبٍ, أَرْبَعَةُ بُيُوتٍ, خَمْسَةُ أَقْلَامٍ, عَشَرَةُ رِجَالٍ.",
    "Ist das Gezählte **männlich**, hat die Zahl ein **ة**: ثَلَاثَةٌ، أَرْبَعَةٌ، خَمْسَةٌ، سِتَّةٌ، سَبْعَةٌ، ثَمَانِيَةٌ، تِسْعَةٌ، عَشَرَةٌ – das „umgekehrte Geschlecht“.",
    "Die Zahl selbst kann in **jedem Fall** stehen, je nach ihrer Rolle im Satz: خَرَجَ **ثَلَاثَةُ** طُلَّابٍ (Nominativ) – فِي **أَرْبَعَةِ** بُيُوتٍ (Genitiv) – رَأَيْتُ **خَمْسَةَ** رِجَالٍ (Akkusativ).",
    "In **كَمْ ثَمَنُ هَذَا؟** („Was kostet das?“) ist ein Wort ausgelassen – gemeint ist z. B. رِيَالًا.",
    "**كُلُّ** = „alle, jeder“: كُلُّهُمْ (sie alle), كُلُّكُمْ (ihr alle), كُلُّنَا (wir alle)."
  ],
  examples: [
    ["ثَلَاثَةُ كُتُبٍ", "drei Bücher"], ["أَرْبَعَةُ بُيُوتٍ", "vier Häuser"], ["خَمْسَةُ أَقْلَامٍ", "fünf Stifte"],
    ["سِتَّةُ أَوْلَادٍ", "sechs Jungen"], ["سَبْعَةُ أَيَّامٍ", "sieben Tage"], ["ثَمَانِيَةُ رِيَالَاتٍ", "acht Riyal"],
    ["تِسْعَةُ دَفَاتِرَ", "neun Hefte"], ["عَشَرَةُ رِجَالٍ", "zehn Männer"],
    ["خَرَجَ ثَلَاثَةُ طُلَّابٍ.", "Drei Studenten gingen hinaus."], ["فِي أَرْبَعَةِ بُيُوتٍ", "in vier Häusern"],
    ["رَأَيْتُ خَمْسَةَ رِجَالٍ.", "Ich sah fünf Männer."], ["كَمْ ثَمَنُ هَذَا؟", "Was kostet das?"],
    ["فِي الْحَافِلَةِ عَشَرَةُ رُكَّابٍ.", "Im Bus sind zehn Fahrgäste."]
  ],
  vocab: [
    ["وَاحِدٌ", "eins"], ["اثْنَانِ", "zwei"], ["ثَلَاثَةٌ", "drei"], ["أَرْبَعَةٌ", "vier"], ["خَمْسَةٌ", "fünf"],
    ["سِتَّةٌ", "sechs"], ["سَبْعَةٌ", "sieben"], ["ثَمَانِيَةٌ", "acht"], ["تِسْعَةٌ", "neun"], ["عَشَرَةٌ", "zehn"],
    ["كُلٌّ", "alle, jeder"], ["كُلُّهُمْ", "sie alle"], ["كُلُّكُمْ", "ihr alle"], ["كُلُّنَا", "wir alle"],
    ["شُكْرًا", "danke"], ["الْيَوْمُ", "der Tag", "أَيَّامٌ"], ["الثَّمَنُ", "der Preis", "أَثْمَانٌ"], ["النِّصْفُ", "die Hälfte"],
    ["الْبَلَدُ", "das Land", "بِلَادٌ"], ["الْقِرْشُ", "der Qirsch (kleine Münze)", "قُرُوشٌ"], ["مُخْتَلِفٌ", "unterschiedlich"],
    ["قَدِيمٌ", "alt", "قُدَامَى"], ["الْحَافِلَةُ", "der Bus", "حَافِلَاتٌ"], ["الرَّاكِبُ", "der Fahrgast", "رُكَّابٌ"],
    ["مِنْهُمْ", "von ihnen"], ["السُّؤَالُ", "die Frage", "أَسْئِلَةٌ"], ["أُورُبَّا", "Europa"], ["الْجَيْبُ", "die (Hosen-/Jacken-)Tasche", "جُيُوبٌ"],
    ["يُوغُوسْلَافِيَا", "Jugoslawien"]
  ],
  quiz: [
    { q: "„drei Bücher“ heißt …", a: ["ثَلَاثَةُ كُتُبٍ", "ثَلَاثُ كُتُبٍ", "كُتُبٌ ثَلَاثَةٌ", "ثَلَاثَةُ كِتَابٍ"], e: "كِتَابٌ ist männlich → Zahl mit ة; Gezähltes im Plural, Genitiv." },
    { q: "„ein Buch“ (betont) heißt …", a: ["كِتَابٌ وَاحِدٌ", "وَاحِدُ كِتَابٍ", "وَاحِدٌ كِتَابٌ", "كِتَابٌ وَاحِدَةٌ"], e: "وَاحِدٌ steht als Adjektiv nach dem Nomen." },
    { q: "In welchem Fall steht das Gezählte nach 3–10?", a: ["Genitiv Plural (Muḍāf ilaihi)", "Akkusativ Singular", "Nominativ Plural", "Genitiv Singular"], e: "ثَلَاثَةُ كُتُبٍ – كُتُبٍ ist Muḍāf ilaihi." },
    { q: "„Ich sah fünf Männer“:", a: ["رَأَيْتُ خَمْسَةَ رِجَالٍ.", "رَأَيْتُ خَمْسَةُ رِجَالٍ.", "رَأَيْتُ خَمْسُ رِجَالٍ.", "رَأَيْتُ خَمْسَةَ رِجَالًا."], e: "Die Zahl ist Objekt → Akkusativ (خَمْسَةَ)." },
    { q: "„in vier Häusern“:", a: ["فِي أَرْبَعَةِ بُيُوتٍ", "فِي أَرْبَعَةُ بُيُوتٍ", "فِي أَرْبَعِ بُيُوتٍ", "فِي بُيُوتٍ أَرْبَعَةٍ"], e: "Nach فِي steht die Zahl im Genitiv." },
    { q: "Was ist in كَمْ ثَمَنُ هَذَا؟ ausgelassen?", a: ["ein Wort für die Währung, z. B. رِيَالًا", "das Wort هُوَ", "das Wort كِتَابٌ", "nichts"], e: "Gemeint ist „wie viele Riyal ist sein Preis?“" },
    { q: "Plural von رَاكِبٌ?", a: ["رُكَّابٌ", "رَاكِبُونَ", "رَوَاكِبُ", "رُكُوبٌ"], e: "رَاكِبٌ → رُكَّابٌ (wie طَالِبٌ → طُلَّابٌ)." },
    { q: "Plural von قَدِيمٌ (Personen)?", a: ["قُدَامَى", "قُدَمَاءُ", "قَدِيمُونَ", "أَقْدَامٌ"], e: "Im Buch: قُدَامَى." }
  ],
  irab: [
    { s: "خَرَجَ ثَلَاثَةُ طُلَّابٍ.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ وَهُوَ مُضَافٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "Die Zahl ist hier das Subjekt des Verbs und zugleich Muḍāf." },
    { s: "خَرَجَ ثَلَاثَةُ طُلَّابٍ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "فَاعِلٌ مَرْفُوعٌ", "نَعْتٌ مَرْفُوعٌ", "تَمْيِيزٌ مَنْصُوبٌ"], e: "Das Gezählte ist Muḍāf ilaihi → Genitiv." },
    { s: "رَأَيْتُ خَمْسَةَ رِجَالٍ.", w: 1, a: ["مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "فَاعِلٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "خَبَرٌ مَرْفُوعٌ"], e: "Objekt von رَأَيْتُ → Akkusativ." },
    { s: "فِي أَرْبَعَةِ بُيُوتٍ", w: 1, a: ["اسْمٌ مَجْرُورٌ بِفِي وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "Nach einer Präposition steht der Genitiv." },
    { s: "كِتَابٌ وَاحِدٌ", w: 1, a: ["نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "خَبَرٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "وَاحِدٌ ist ein Adjektiv zum Nomen davor." }
  ],
  model: [
    { s: "خَرَجَ ثَلَاثَةُ طُلَّابٍ.", de: "Drei Studenten gingen hinaus.", words: [
      ["خَرَجَ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "Verb in der Vergangenheit, unveränderlich auf Fatḥa"],
      ["ثَلَاثَةُ", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ، وَهُوَ مُضَافٌ", "Subjekt des Verbs (Fāʿil), Nominativ – zugleich Muḍāf"],
      ["طُلَّابٍ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ", "Das Gezählte: Muḍāf ilaihi, Genitiv – Kasra"]
    ] },
    { s: "رَأَيْتُ خَمْسَةَ رِجَالٍ.", de: "Ich sah fünf Männer.", words: [
      ["رَأَيْتُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "Verb (Vergangenheit) + Endung ـتُ „ich“ = Subjekt"],
      ["خَمْسَةَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ، وَهُوَ مُضَافٌ", "Objekt, Akkusativ – Fatḥa; zugleich Muḍāf"],
      ["رِجَالٍ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ الظَّاهِرَةُ", "Muḍāf ilaihi, Genitiv – Kasra"]
    ] }
  ]
},

{ id: "m20", n: "20", title: "Zahlen 3–10 (weibliches Gezähltes)", ar: "الْعَدَدُ مَعَ الْمُؤَنَّثِ",
  grammar: [
    "Ist das Gezählte **weiblich**, **fällt das ة der Zahl weg**: ثَلَاثَةُ أَبْنَاءٍ (drei Söhne), aber **ثَلَاثُ بَنَاتٍ** (drei Töchter).",
    "Die Formen: ثَلَاثُ، أَرْبَعُ، خَمْسُ، سِتُّ، سَبْعُ، **ثَمَانِي**، تِسْعُ، **عَشْرُ**.",
    "**ثَمَانِي** hat auf dem letzten Buchstaben ein Sukūn (nach Kasra nicht geschrieben): ثَمَانِي غُرَفٍ.",
    "Achte auf **عَشَرَةُ** (Fatḥa auf dem ش, männliches Gezähltes) gegenüber **عَشْرُ** (Sukūn auf dem ش, weibliches Gezähltes).",
    "Die weibliche Form von وَاحِدٌ ist **وَاحِدَةٌ**, von اثْنَانِ **اثْنَتَانِ**: لِي أُخْتٌ وَاحِدَةٌ – لِي أُخْتَانِ اثْنَتَانِ."
  ],
  examples: [
    ["ثَلَاثُ بَنَاتٍ", "drei Töchter"], ["ثَلَاثَةُ أَبْنَاءٍ", "drei Söhne"],
    ["أَرْبَعُ أَخَوَاتٍ", "vier Schwestern"], ["أَرْبَعَةُ إِخْوَةٍ", "vier Brüder"],
    ["خَمْسُ أُمَّهَاتٍ", "fünf Mütter"], ["خَمْسَةُ آبَاءٍ", "fünf Väter"],
    ["سِتُّ نِسَاءٍ", "sechs Frauen"], ["سِتَّةُ رِجَالٍ", "sechs Männer"],
    ["سَبْعُ طَالِبَاتٍ", "sieben Studentinnen"], ["سَبْعَةُ طُلَّابٍ", "sieben Studenten"],
    ["ثَمَانِي غُرَفٍ", "acht Zimmer"], ["ثَمَانِيَةُ بُيُوتٍ", "acht Häuser"],
    ["عَشْرُ نِسَاءٍ", "zehn Frauen"], ["عَشَرَةُ رِجَالٍ", "zehn Männer"],
    ["لِي أُخْتٌ وَاحِدَةٌ.", "Ich habe eine Schwester."], ["لِي أُخْتَانِ اثْنَتَانِ.", "Ich habe zwei Schwestern."]
  ],
  vocab: [
    ["وَاحِدَةٌ", "eins (w.)"], ["اثْنَتَانِ", "zwei (w.)"], ["إِنْدُونِيسِيَا", "Indonesien"],
    ["كَلِمَةٌ", "Wort", "كَلِمَاتٌ"], ["غُرْفَةٌ", "Zimmer", "غُرَفٌ"], ["مَجَلَّةٌ", "Zeitschrift", "مَجَلَّاتٌ"],
    ["دَرْسٌ", "Lektion", "دُرُوسٌ"], ["حَرْفٌ", "Buchstabe", "حُرُوفٌ"], ["عَمٌّ", "Onkel (väterlicherseits)", "أَعْمَامٌ"],
    ["بِنْتٌ", "Tochter, Mädchen", "بَنَاتٌ"], ["ابْنٌ", "Sohn", "أَبْنَاءٌ"], ["امْرَأَةٌ", "Frau", "نِسَاءٌ"]
  ],
  quiz: [
    { q: "„drei Töchter“ heißt …", a: ["ثَلَاثُ بَنَاتٍ", "ثَلَاثَةُ بَنَاتٍ", "بَنَاتٌ ثَلَاثٌ", "ثَلَاثُ بِنْتٍ"], e: "بِنْتٌ ist weiblich → Zahl ohne ة." },
    { q: "„drei Söhne“ heißt …", a: ["ثَلَاثَةُ أَبْنَاءٍ", "ثَلَاثُ أَبْنَاءٍ", "ثَلَاثَةُ ابْنٍ", "أَبْنَاءٌ ثَلَاثٌ"], e: "Männliches Gezähltes → Zahl mit ة." },
    { q: "„acht Zimmer“ heißt …", a: ["ثَمَانِي غُرَفٍ", "ثَمَانِيَةُ غُرَفٍ", "ثَمَانُ غُرْفَةٍ", "ثَمَانِيَةُ غُرْفَةٍ"], e: "غُرْفَةٌ ist weiblich → ثَمَانِي." },
    { q: "Welche Form gehört zu weiblichem Gezählten?", a: ["عَشْرُ", "عَشَرَةُ", "عَشَرُ", "عِشْرَةُ"], e: "عَشْرُ (Sukūn) – weiblich; عَشَرَةُ (Fatḥa) – männlich." },
    { q: "„zwei Schwestern“ (betont):", a: ["أُخْتَانِ اثْنَتَانِ", "أُخْتَانِ اثْنَانِ", "اثْنَتَا أُخْتٍ", "أُخْتَانِ اثْنَتَيْنِ"], e: "Weibliches Zahlwort اثْنَتَانِ nach dem Dual." },
    { q: "„sieben Studentinnen“:", a: ["سَبْعُ طَالِبَاتٍ", "سَبْعَةُ طَالِبَاتٍ", "سَبْعُ طَالِبَةٍ", "سَبْعَةُ طُلَّابٍ"], e: "Weibliches Gezähltes → سَبْعُ." },
    { q: "Plural von غُرْفَةٌ?", a: ["غُرَفٌ", "غُرُوفٌ", "أَغْرَافٌ", "غِرَافٌ"], e: "غُرْفَةٌ → غُرَفٌ." }
  ],
  irab: [
    { s: "فِي الْبَيْتِ ثَلَاثُ غُرَفٍ.", w: 2, a: ["مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "خَبَرٌ مُقَدَّمٌ", "اسْمٌ مَجْرُورٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "Das Subjekt steht hier nach dem vorangestellten Prädikat (فِي الْبَيْتِ) → nachgestelltes Mubtadaʾ im Nominativ." },
    { s: "فِي الْبَيْتِ ثَلَاثُ غُرَفٍ.", w: 3, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "نَعْتٌ مَرْفُوعٌ", "تَمْيِيزٌ مَنْصُوبٌ", "خَبَرٌ مَرْفُوعٌ"], e: "Das Gezählte ist Muḍāf ilaihi." },
    { s: "لِي أُخْتٌ وَاحِدَةٌ.", w: 2, a: ["نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "خَبَرٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "وَاحِدَةٌ beschreibt أُخْتٌ." }
  ],
  model: [
    { s: "فِي الْبَيْتِ ثَلَاثُ غُرَفٍ.", de: "Im Haus sind drei Zimmer.", words: [
      ["فِي", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ", "Präposition, unveränderlich"],
      ["الْبَيْتِ", "اسْمٌ مَجْرُورٌ بِفِي وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ، وَشِبْهُ الْجُمْلَةِ خَبَرٌ مُقَدَّمٌ", "Genitiv nach فِي; „im Haus“ ist das vorangestellte Prädikat"],
      ["ثَلَاثُ", "مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مُضَافٌ", "Nachgestelltes Subjekt, Nominativ; zugleich Muḍāf"],
      ["غُرَفٍ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Muḍāf ilaihi, Genitiv – Kasra"]
    ] }
  ]
},

{ id: "m21", n: "21", title: "Wiederholung", ar: "دَرْسُ مُرَاجَعَةٍ",
  grammar: [
    "Eine **Testlektion** ohne neue Konstruktionen – ideal, um alles bisher Gelernte zu wiederholen: Nominalsatz, Iḍāfa, Adjektiv, Pronomen, Plural, Dual und Zahlen.",
    "Neu ist **ذَاكَ** – gleichbedeutend mit ذَلِكَ („jener“).",
    "**نُحِبُّ** = „wir lieben“, **نُحِبُّهُ** = „wir lieben ihn“."
  ],
  examples: [
    ["ذَاكَ بَيْتٌ وَاسِعٌ.", "Jenes ist ein geräumiges Haus."], ["مَا لَوْنُ سَيَّارَتِكَ؟", "Welche Farbe hat dein Auto?"],
    ["نَحْنُ نُحِبُّ الْمَدِينَةَ.", "Wir lieben Medina."], ["نُحِبُّهُ كَثِيرًا.", "Wir lieben ihn sehr."],
    ["الصِّينُ فِي آسِيَا.", "China liegt in Asien."]
  ],
  vocab: [
    ["ذَاكَ", "jener (= ذَلِكَ)"], ["اللَّوْنُ", "die Farbe", "أَلْوَانٌ"], ["وَاسِعٌ", "geräumig, weit"],
    ["نُحِبُّ", "wir lieben"], ["نُحِبُّهُ", "wir lieben ihn"], ["آسِيَا", "Asien"]
  ],
  quiz: [
    { q: "ذَاكَ bedeutet dasselbe wie …", a: ["ذَلِكَ", "هَذَا", "تِلْكَ", "هَذِهِ"], e: "ذَاكَ = ذَلِكَ (jener)." },
    { q: "Plural von لَوْنٌ?", a: ["أَلْوَانٌ", "لُوُونٌ", "لَوْنَاتٌ", "أَلْوِنَةٌ"], e: "لَوْنٌ → أَلْوَانٌ." },
    { q: "„Wir lieben ihn“:", a: ["نُحِبُّهُ", "نُحِبُّهَا", "أُحِبُّهُ", "يُحِبُّنَا"], e: "نُحِبُّ + ـهُ." },
    { q: "Welcher Satz ist richtig?", a: ["عِنْدِي ثَلَاثَةُ أَقْلَامٍ.", "عِنْدِي ثَلَاثُ أَقْلَامٍ.", "عِنْدِي ثَلَاثَةُ قَلَمٍ.", "عِنْدِي ثَلَاثَةٌ أَقْلَامٌ."], e: "قَلَمٌ ist männlich → ثَلَاثَةُ + Plural im Genitiv." },
    { q: "Welcher Satz ist richtig?", a: ["هَذِهِ سَيَّارَاتٌ جَدِيدَةٌ.", "هَؤُلَاءِ سَيَّارَاتٌ جُدُدٌ.", "هَذِهِ سَيَّارَاتٌ جُدُدٌ.", "هَذَا سَيَّارَاتٌ جَدِيدٌ."], e: "Sachplural → weiblicher Singular." }
  ],
  irab: [
    { s: "ذَاكَ بَيْتٌ وَاسِعٌ.", w: 2, a: ["نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "خَبَرٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ"], e: "وَاسِعٌ beschreibt بَيْتٌ (beide unbestimmt, Nominativ)." },
    { s: "مَا لَوْنُ سَيَّارَتِكَ؟", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "خَبَرٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "نَعْتٌ مَجْرُورٌ"], e: "سَيَّارَةِ ist zweites Glied der Iḍāfa لَوْنُ سَيَّارَةِ…; das ـكَ ist wiederum Muḍāf ilaihi von سَيَّارَة." },
    { s: "نَحْنُ نُحِبُّ الْمَدِينَةَ.", w: 2, a: ["مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "فَاعِلٌ مَرْفُوعٌ", "خَبَرٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ"], e: "Objekt von نُحِبُّ → Akkusativ." }
  ],
  model: [
    { s: "نَحْنُ نُحِبُّ الْمَدِينَةَ.", de: "Wir lieben Medina.", words: [
      ["نَحْنُ", "ضَمِيرٌ مُنْفَصِلٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Selbstständiges Pronomen, unveränderlich – steht an der Stelle des Subjekts"],
      ["نُحِبُّ", "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ نَحْنُ، وَالْجُمْلَةُ خَبَرٌ", "Verb im Präsens, Nominativ (Ḍamma); das Subjekt „wir“ steckt im Verb; der Verbalsatz ist das Prädikat"],
      ["الْمَدِينَةَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ", "Objekt, Akkusativ – Fatḥa"]
    ] }
  ]
},

{ id: "m22", n: "22", title: "Diptota – Nomen ohne Tanwīn", ar: "الْمَمْنُوعُ مِنَ الصَّرْفِ",
  grammar: [
    "Die meisten Nomen und Adjektive haben Tanwīn. Es **fällt weg**, wenn **الـ** davorsteht (الْكِتَابُ), wenn das Wort **Muḍāf** ist (كِتَابُ بِلَالٍ) oder wenn **يَا** davorsteht (يَا أُسْتَاذُ).",
    "Manche Wörter bekommen **nie Tanwīn**. Sie heißen **Diptota** – arabisch **الْمَمْنُوعُ مِنَ الصَّرْفِ**. Im Nominativ haben sie nur **eine Ḍamma**: أَحْمَدُ statt أَحْمَدٌ.",
    "Bisher gelernte Gruppen: **1.** weibliche Eigennamen (آمِنَةُ، زَيْنَبُ) – **2.** männliche Namen auf ة (حَمْزَةُ، أُسَامَةُ) – **3.** männliche Namen auf ـَانُ (عُثْمَانُ، رَمَضَانُ).",
    "**4.** Adjektive nach dem Muster **فَعْلَانُ** (كَسْلَانُ faul, مَلْآنُ voll) – **5.** männliche Namen nach **أَفْعَلُ** (أَحْمَدُ، أَنْوَرُ) – **6.** Adjektive nach **أَفْعَلُ**, v. a. **Farben**: أَحْمَرُ، أَسْوَدُ.",
    "**7.** nicht-arabische Eigennamen (وِلْيَمُ، لَنْدَنُ، بَاكِسْتَانُ) – **8.** bestimmte gebrochene Plurale: **أَفْعِلَاءُ** (أَصْدِقَاءُ، أَغْنِيَاءُ، أَقْوِيَاءُ), **فُعَلَاءُ** (وُزَرَاءُ، زُمَلَاءُ، فُقَرَاءُ), **مَفَاعِلُ** (مَسَاجِدُ، فَنَادِقُ، مَكَاتِبُ), **مَفَاعِيلُ** (مَنَادِيلُ، مَفَاتِيحُ، فَنَاجِينُ).",
    "**أَطِبَّاءُ** ist ursprünglich أَطْبِبَاءُ (Muster أَفْعِلَاءُ); die beiden b sind zusammengefallen."
  ],
  examples: [
    ["هَذَا أَحْمَدُ.", "Das ist Ahmad."], ["هَذِهِ زَيْنَبُ.", "Das ist Zainab."],
    ["الْقَلَمُ أَحْمَرُ.", "Der Stift ist rot."], ["هَذِهِ فَنَاجِينُ.", "Das sind Teetassen."],
    ["قَالَ عُثْمَانُ: السَّمَاءُ زَرْقَاءُ.", "ʿUthmān sagte: Der Himmel ist blau."], ["قَالَتْ آمِنَةُ: شُكْرًا.", "Āmina sagte: Danke."],
    ["بَغْدَادُ مَدِينَةٌ كَبِيرَةٌ.", "Bagdad ist eine große Stadt."], ["الدَّرْسُ عَشْرُ دَقَائِقَ.", "Die Lektion dauert zehn Minuten."]
  ],
  vocab: [
    ["أَحْمَرُ", "rot"], ["أَزْرَقُ", "blau"], ["أَخْضَرُ", "grün"], ["أَسْوَدُ", "schwarz"], ["أَصْفَرُ", "gelb"], ["أَبْيَضُ", "weiß"],
    ["بَغْدَادُ", "Bagdad"], ["جُدَّةُ", "Dschidda"], ["فِنْجَانٌ", "Teetasse", "فَنَاجِينُ"], ["دَقِيقَةٌ", "Minute", "دَقَائِقُ"],
    ["مِنْدِيلٌ", "Taschentuch", "مَنَادِيلُ"], ["مِفْتَاحٌ", "Schlüssel", "مَفَاتِيحُ"], ["قَالَ", "er sagte"], ["قَالَتْ", "sie sagte"],
    ["كَسْلَانُ", "faul"]
  ],
  quiz: [
    { q: "Wie heißen Wörter, die nie Tanwīn bekommen?", a: ["الْمَمْنُوعُ مِنَ الصَّرْفِ", "الْمَبْنِيُّ", "الْمُثَنَّى", "الْمُضَافُ"], e: "Diptota = al-mamnūʿ min aṣ-ṣarf." },
    { q: "Welches Wort ist ein Diptoton?", a: ["أَحْمَدُ", "مُحَمَّدٌ", "بِلَالٌ", "كِتَابٌ"], e: "Männlicher Name nach dem Muster أَفْعَلُ." },
    { q: "Welches Wort ist **kein** Diptoton?", a: ["طَالِبٌ", "زَيْنَبُ", "مَسَاجِدُ", "أَصْدِقَاءُ"], e: "طَالِبٌ ist ein normales Nomen mit Tanwīn." },
    { q: "Richtig: „Der Stift ist rot.“", a: ["الْقَلَمُ أَحْمَرُ.", "الْقَلَمُ أَحْمَرٌ.", "الْقَلَمُ الْأَحْمَرُ.", "قَلَمٌ أَحْمَرٌ."], e: "Farben nach أَفْعَلُ haben kein Tanwīn." },
    { q: "Plural von فِنْجَانٌ?", a: ["فَنَاجِينُ", "فَنَاجِينٌ", "فِنْجَانَاتٌ", "فُنُوجٌ"], e: "Muster mafāʿīl – ohne Tanwīn." },
    { q: "Plural von دَقِيقَةٌ?", a: ["دَقَائِقُ", "دَقِيقَاتٌ", "دَقَائِقٌ", "دِقَاقٌ"], e: "Diptoton, also nur eine Ḍamma." },
    { q: "Warum ist عُثْمَانُ ein Diptoton?", a: ["männlicher Name auf ـَانُ", "weiblicher Name", "Plural nach مَفَاعِلُ", "Farbadjektiv"], e: "Männliche Namen auf -ān sind Diptota." },
    { q: "Warum ist لَنْدَنُ ein Diptoton?", a: ["nicht-arabischer Eigenname", "Muster أَفْعَلُ", "Name auf ة", "Plural"], e: "Fremde Eigennamen bekommen kein Tanwīn." },
    { q: "Wann verliert ein normales Nomen sein Tanwīn?", a: ["mit الـ, als Muḍāf oder nach يَا", "nur im Plural", "nur im Genitiv", "nie"], e: "الْكِتَابُ – كِتَابُ بِلَالٍ – يَا أُسْتَاذُ." },
    { q: "„er sagte“ – „sie sagte“:", a: ["قَالَ – قَالَتْ", "قَالَتْ – قَالَ", "يَقُولُ – تَقُولُ", "قُلْتُ – قُلْتِ"], e: "Die weibliche Form bekommt ـتْ." }
  ],
  irab: [
    { s: "هَذَا أَحْمَدُ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْأَلِفُ", "مُبْتَدَأٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ"], e: "Ein Diptoton hat im Nominativ ganz normal die Ḍamma – nur ohne Tanwīn." },
    { s: "الْقَلَمُ أَحْمَرُ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "نَعْتٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ"], e: "الْقَلَمُ bestimmt, أَحْمَرُ unbestimmt → Prädikat." },
    { s: "قَالَتْ آمِنَةُ: شُكْرًا.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "خَبَرٌ مَرْفُوعٌ"], e: "Subjekt des Verbs قَالَتْ; weiblicher Name → Diptoton, daher kein Tanwīn." }
  ],
  model: [
    { s: "قَالَ عُثْمَانُ: الْبَابُ أَخْضَرُ.", de: "ʿUthmān sagte: Die Tür ist grün.", words: [
      ["قَالَ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "Verb (Vergangenheit), unveränderlich"],
      ["عُثْمَانُ", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مَمْنُوعٌ مِنَ الصَّرْفِ", "Subjekt des Verbs, Nominativ – Diptoton (Name auf -ān), daher ohne Tanwīn"],
      ["الْبَابُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt des zitierten Nominalsatzes"],
      ["أَخْضَرُ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مَمْنُوعٌ مِنَ الصَّرْفِ", "Prädikat, Nominativ – Farbadjektiv (أَفْعَلُ), daher ohne Tanwīn"]
    ] }
  ]
},

{ id: "m23", n: "23", title: "Diptota im Genitiv", ar: "جَرُّ الْمَمْنُوعِ مِنَ الصَّرْفِ",
  grammar: [
    "Ein Nomen steht im **Genitiv**: a) nach einer **Präposition** (فِي الْبَيْتِ، مِنْ بِلَالٍ), b) als **Muḍāf ilaihi** (كِتَابُ الْمُدَرِّسِ، بَيْتُ بِلَالٍ).",
    "**Diptota bekommen im Genitiv eine Fatḥa statt der Kasra**: normale Nomen enden auf -i, Diptota auf **-a**.",
    "مِنْ بِلَالٍ – aber **مِنْ أَحْمَدَ**; كِتَابُ بِلَالٍ – aber **كِتَابُ أَحْمَدَ**; كِتَابُ **إِبْرَاهِيمَ**, مِنْ **إِبْرَاهِيمَ**.",
    "Das gilt auch für Diptota nach den Zahlen: ثَلَاثَةُ **مَسَاجِدَ**، أَرْبَعَةُ **فَنَادِقَ**، خَمْسَةُ **زُمَلَاءَ**.",
    "Wichtig für den Iʿrāb: Man sagt dann **„مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ لِأَنَّهُ مَمْنُوعٌ مِنَ الصَّرْفِ“** – Genitiv, erkennbar an der Fatḥa anstelle der Kasra.",
    "Hat ein Diptoton **الـ** oder ist es **Muḍāf**, bekommt es wieder die normale **Kasra**: فِي الْمَسَاجِدِ، فِي مَسَاجِدِ الْمَدِينَةِ."
  ],
  examples: [
    ["هَذَا كِتَابُ أَحْمَدَ.", "Das ist Ahmads Buch."], ["أَخَذْتُ الْقَلَمَ مِنْ إِبْرَاهِيمَ.", "Ich nahm den Stift von Ibrāhīm."],
    ["ذَهَبْتُ إِلَى مَكَّةَ.", "Ich ging nach Mekka."], ["فِي الْمَدِينَةِ ثَلَاثَةُ مَسَاجِدَ.", "In der Stadt gibt es drei Moscheen."],
    ["فِي الشَّارِعِ أَرْبَعَةُ فَنَادِقَ.", "In der Straße sind vier Hotels."], ["لِي خَمْسَةُ زُمَلَاءَ.", "Ich habe fünf Klassenkameraden."],
    ["صَلَّيْتُ فِي الْمَسَاجِدِ الْكَبِيرَةِ.", "Ich betete in den großen Moscheen."], ["سَافَرَ عَمِّي إِلَى إِسْطَنْبُولَ.", "Mein Onkel reiste nach Istanbul."]
  ],
  vocab: [
    ["إِسْطَنْبُولُ", "Istanbul"], ["وَاشِنْطُنُ", "Washington"], ["الطَّائِفُ", "Taif (Stadt)"],
    ["زَمِيلٌ", "Klassenkamerad, Kollege", "زُمَلَاءُ"], ["مَسْجِدٌ", "Moschee", "مَسَاجِدُ"], ["فُنْدُقٌ", "Hotel", "فَنَادِقُ"]
  ],
  quiz: [
    { q: "„von Ahmad“ heißt …", a: ["مِنْ أَحْمَدَ", "مِنْ أَحْمَدِ", "مِنْ أَحْمَدٍ", "مِنْ أَحْمَدُ"], e: "Diptoton im Genitiv → Fatḥa statt Kasra." },
    { q: "„das Buch Ibrāhīms“ heißt …", a: ["كِتَابُ إِبْرَاهِيمَ", "كِتَابُ إِبْرَاهِيمِ", "كِتَابٌ إِبْرَاهِيمُ", "كِتَابُ إِبْرَاهِيمٍ"], e: "Muḍāf ilaihi, Diptoton → Fatḥa." },
    { q: "„drei Moscheen“ heißt …", a: ["ثَلَاثَةُ مَسَاجِدَ", "ثَلَاثَةُ مَسَاجِدٍ", "ثَلَاثُ مَسَاجِدَ", "ثَلَاثَةُ مَسَاجِدِ"], e: "مَسْجِدٌ ist männlich → ثَلَاثَةُ; مَسَاجِدَ ist Diptoton → Fatḥa im Genitiv." },
    { q: "„in den Moscheen“ heißt …", a: ["فِي الْمَسَاجِدِ", "فِي الْمَسَاجِدَ", "فِي مَسَاجِدٍ", "فِي الْمَسَاجِدُ"], e: "Mit الـ bekommt auch ein Diptoton die Kasra." },
    { q: "Welches Zeichen hat ein Diptoton im Genitiv (ohne الـ, nicht Muḍāf)?", a: ["Fatḥa", "Kasra", "Kasra mit Tanwīn", "Ḍamma"], e: "الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ." },
    { q: "„Ich ging nach Mekka“:", a: ["ذَهَبْتُ إِلَى مَكَّةَ.", "ذَهَبْتُ إِلَى مَكَّةِ.", "ذَهَبْتُ إِلَى مَكَّةٍ.", "ذَهَبْتُ إِلَى مَكَّةُ."], e: "مَكَّةُ ist weiblicher Eigenname → Diptoton." },
    { q: "„fünf Klassenkameraden“:", a: ["خَمْسَةُ زُمَلَاءَ", "خَمْسَةُ زُمَلَاءٍ", "خَمْسُ زُمَلَاءَ", "خَمْسَةُ زَمِيلٍ"], e: "زُمَلَاءُ (فُعَلَاءُ) ist Diptoton." }
  ],
  irab: [
    { s: "هَذَا كِتَابُ أَحْمَدَ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ لِأَنَّهُ مَمْنُوعٌ مِنَ الصَّرْفِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "نَعْتٌ مَنْصُوبٌ"], e: "Die Fatḥa ist hier kein Akkusativ, sondern das Genitivzeichen eines Diptotons." },
    { s: "أَخَذْتُ الْقَلَمَ مِنْ إِبْرَاهِيمَ.", w: 3, a: ["اسْمٌ مَجْرُورٌ بِمِنْ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "Nach مِنْ Genitiv; nicht-arabischer Name → Fatḥa statt Kasra." },
    { s: "فِي الْمَدِينَةِ ثَلَاثَةُ مَسَاجِدَ.", w: 3, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ", "تَمْيِيزٌ مَنْصُوبٌ", "نَعْتٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "Gezähltes = Muḍāf ilaihi; مَفَاعِلُ-Plural → Fatḥa." },
    { s: "صَلَّيْتُ فِي الْمَسَاجِدِ.", w: 2, a: ["اسْمٌ مَجْرُورٌ بِفِي وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "مُضَافٌ إِلَيْهِ"], e: "Mit الـ bekommt das Diptoton wieder die normale Kasra." },
    { s: "ذَهَبْتُ إِلَى مَكَّةَ.", w: 2, a: ["اسْمٌ مَجْرُورٌ بِإِلَى وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "ظَرْفُ مَكَانٍ مَنْصُوبٌ", "اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ"], e: "Weiblicher Eigenname → Diptoton." }
  ],
  model: [
    { s: "هَذَا كِتَابُ أَحْمَدَ.", de: "Das ist Ahmads Buch.", words: [
      ["هَذَا", "اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Demonstrativ, unveränderlich – an der Stelle des Subjekts"],
      ["كِتَابُ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مُضَافٌ", "Prädikat, Nominativ; als Muḍāf ohne Tanwīn"],
      ["أَحْمَدَ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ لِأَنَّهُ مَمْنُوعٌ مِنَ الصَّرْفِ", "Muḍāf ilaihi, Genitiv – aber Fatḥa statt Kasra, weil Diptoton"]
    ] },
    { s: "أَخَذْتُ الْقَلَمَ مِنْ إِبْرَاهِيمَ.", de: "Ich nahm den Stift von Ibrāhīm.", words: [
      ["أَخَذْتُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "Verb (Vergangenheit) + ـتُ „ich“ als Subjekt"],
      ["الْقَلَمَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ", "Objekt, Akkusativ – Fatḥa"],
      ["مِنْ", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ", "Präposition, unveränderlich"],
      ["إِبْرَاهِيمَ", "اسْمٌ مَجْرُورٌ بِمِنْ وَعَلَامَةُ جَرِّهِ الْفَتْحَةُ نِيَابَةً عَنِ الْكَسْرَةِ لِأَنَّهُ مَمْنُوعٌ مِنَ الصَّرْفِ", "Genitiv nach مِنْ – Fatḥa statt Kasra (fremder Eigenname)"]
    ] }
  ]
}
);

/* Einführung in den Iʿrāb und Fachbegriffe */
window.MADINA.irabIntro = [
  { t: "Was ist Iʿrāb?", p: [
    "**Iʿrāb** (الْإِعْرَابُ) bedeutet, für jedes Wort im Satz anzugeben, **welche Rolle** es spielt und **woran man seinen Fall erkennt**. Arabische Nomen verändern ihre Endung je nach Rolle – ähnlich wie der deutsche Fall (der Mann / den Mann / des Mannes).",
    "Ein vollständiger Iʿrāb hat meist drei Teile: **Rolle** (z. B. مُبْتَدَأٌ) + **Fall** (z. B. مَرْفُوعٌ) + **Zeichen** (z. B. وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ). Beispiel: الْقَلَمُ → **مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ**."
  ] },
  { t: "Die drei Fälle der Nomen", p: [
    "**رَفْعٌ** (Rafʿ, Nominativ) – das Wort ist **مَرْفُوعٌ**. Grundzeichen: **Ḍamma** (ـُ / ـٌ). Rollen: مُبْتَدَأٌ, خَبَرٌ, فَاعِلٌ.",
    "**نَصْبٌ** (Naṣb, Akkusativ) – das Wort ist **مَنْصُوبٌ**. Grundzeichen: **Fatḥa** (ـَ / ـً). Rollen: مَفْعُولٌ بِهِ, تَمْيِيزٌ, ظَرْفٌ, Wörter nach يَا als Muḍāf.",
    "**جَرٌّ** (Jarr, Genitiv) – das Wort ist **مَجْرُورٌ**. Grundzeichen: **Kasra** (ـِ / ـٍ). Rollen: nach einer Präposition (اسْمٌ مَجْرُورٌ) und als مُضَافٌ إِلَيْهِ.",
    "Das **Adjektiv** (نَعْتٌ) hat keinen eigenen Fall: es **folgt** seinem Nomen (تَابِعٌ) in Fall, Bestimmtheit, Geschlecht und Zahl."
  ] },
  { t: "Veränderlich oder unveränderlich?", p: [
    "**مُعْرَبٌ** (muʿrab): das Wort ändert seine Endung – fast alle Nomen. Man sagt dann z. B. „مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ“.",
    "**مَبْنِيٌّ** (mabnī): das Wort hat eine feste Form – Pronomen (هُوَ، أَنَا), Demonstrativa (هَذَا، ذَلِكَ), Relativpronomen (الَّذِي), Fragewörter (مَنْ، كَمْ), alle Partikeln (فِي، مِنْ، وَ) und das Verb in der Vergangenheit.",
    "Bei einem mabnī-Nomen sagt man, **worauf** es gebaut ist und **an welcher Stelle** es steht: هَذَا → **اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ** („an der Stelle eines Nominativs“).",
    "Partikeln haben **keine Stelle** im Satz: **حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ**."
  ] },
  { t: "Besondere Zeichen", p: [
    "**Dual**: Nominativ mit **Alif** (كِتَابَانِ), Akkusativ und Genitiv mit **Yāʾ** (كِتَابَيْنِ).",
    "**Männlicher gesunder Plural** (ـُونَ): Nominativ mit **Wāw** (مُدَرِّسُونَ), Akkusativ und Genitiv mit **Yāʾ** (مُدَرِّسِينَ).",
    "**Weiblicher gesunder Plural** (ـَاتٌ): im Akkusativ **Kasra statt Fatḥa**: رَأَيْتُ الطَّالِبَاتِ.",
    "**Die fünf Nomen** (أَبٌ، أَخٌ، ذُو …) als Muḍāf: **Wāw / Alif / Yāʾ** – أَبُوكَ، أَبَاكَ، أَبِيكَ.",
    "**Diptota** (الْمَمْنُوعُ مِنَ الصَّرْفِ): kein Tanwīn, und im Genitiv **Fatḥa statt Kasra** – مِنْ أَحْمَدَ.",
    "**Verdeckte Zeichen**: Endet ein Wort auf langes ā (مُوسَى، هُدًى), sieht man den Fall nicht – man sagt „**مُقَدَّرَةٌ**“ (angenommen)."
  ] },
  { t: "So gehst du vor", p: [
    "**1.** Verbalsatz oder Nominalsatz? Beginnt der Satz mit einem Verb, suche den **فَاعِلٌ** (wer tut es?) und evtl. den **مَفْعُولٌ بِهِ**.",
    "**2.** Im Nominalsatz: Wer ist das Subjekt (**مُبْتَدَأٌ**, meist bestimmt), was wird über es gesagt (**خَبَرٌ**, meist unbestimmt)?",
    "**3.** Steht ein Nomen nach einer **Präposition** → مَجْرُورٌ. Folgt ein Nomen einem anderen ohne الـ am ersten → **Iḍāfa**: das zweite ist **مُضَافٌ إِلَيْهِ**.",
    "**4.** Beschreibt ein Wort das vorherige und stimmt mit ihm überein → **نَعْتٌ**.",
    "**5.** Prüfe das Zeichen: Normalfall (ـُ ـَ ـِ) oder Sonderfall (Dual, Plural, fünf Nomen, Diptoton)?"
  ] }
];

window.MADINA.glossary = [
  ["الْإِعْرَابُ", "al-iʿrāb", "Satzanalyse: Rolle und Fallzeichen jedes Wortes"],
  ["الرَّفْعُ / مَرْفُوعٌ", "ar-rafʿ / marfūʿ", "Nominativ / im Nominativ"],
  ["النَّصْبُ / مَنْصُوبٌ", "an-naṣb / manṣūb", "Akkusativ / im Akkusativ"],
  ["الْجَرُّ / مَجْرُورٌ", "al-jarr / majrūr", "Genitiv / im Genitiv"],
  ["الضَّمَّةُ", "aḍ-ḍamma", "Vokalzeichen u – Grundzeichen des Nominativs"],
  ["الْفَتْحَةُ", "al-fatḥa", "Vokalzeichen a – Grundzeichen des Akkusativs"],
  ["الْكَسْرَةُ", "al-kasra", "Vokalzeichen i – Grundzeichen des Genitivs"],
  ["السُّكُونُ", "as-sukūn", "Vokallosigkeit"],
  ["التَّنْوِينُ", "at-tanwīn", "Nunation (-un, -an, -in) – Zeichen der Unbestimmtheit"],
  ["عَلَامَةُ الرَّفْعِ", "ʿalāmatu r-rafʿ", "Zeichen, an dem man den Nominativ erkennt"],
  ["الظَّاهِرَةُ", "aẓ-ẓāhira", "sichtbar (das Zeichen ist zu sehen)"],
  ["مُقَدَّرَةٌ", "muqaddara", "angenommen, nicht sichtbar"],
  ["مُعْرَبٌ", "muʿrab", "veränderlich (Endung wechselt)"],
  ["مَبْنِيٌّ", "mabnī", "unveränderlich (feste Form)"],
  ["فِي مَحَلِّ رَفْعٍ", "fī maḥalli rafʿ", "an der Stelle eines Nominativs"],
  ["لَا مَحَلَّ لَهُ مِنَ الْإِعْرَابِ", "lā maḥalla lahu", "hat keine Stelle im Iʿrāb (bei Partikeln)"],
  ["الْجُمْلَةُ الِاسْمِيَّةُ", "al-jumla al-ismiyya", "Nominalsatz"],
  ["الْجُمْلَةُ الْفِعْلِيَّةُ", "al-jumla al-fiʿliyya", "Verbalsatz"],
  ["الْمُبْتَدَأُ", "al-mubtadaʾ", "Subjekt des Nominalsatzes"],
  ["الْخَبَرُ", "al-khabar", "Prädikat, Aussage des Nominalsatzes"],
  ["خَبَرٌ مُقَدَّمٌ / مُبْتَدَأٌ مُؤَخَّرٌ", "khabar muqaddam / mubtadaʾ muʾakhkhar", "vorangestelltes Prädikat / nachgestelltes Subjekt (فِي الْبَيْتِ رَجُلٌ)"],
  ["شِبْهُ الْجُمْلَةِ", "shibh al-jumla", "Präpositional- oder Adverbialausdruck (فِي الْبَيْتِ، عِنْدَكَ)"],
  ["الْفِعْلُ", "al-fiʿl", "Verb"],
  ["فِعْلٌ مَاضٍ", "fiʿl māḍin", "Verb in der Vergangenheit (mabnī)"],
  ["فِعْلٌ مُضَارِعٌ", "fiʿl muḍāriʿ", "Verb im Präsens/Futur"],
  ["الْفَاعِلُ", "al-fāʿil", "Subjekt des Verbs (Handelnder)"],
  ["الْمَفْعُولُ بِهِ", "al-mafʿūl bihi", "direktes Objekt"],
  ["الْمُضَافُ", "al-muḍāf", "erstes Glied der Genitivverbindung"],
  ["الْمُضَافُ إِلَيْهِ", "al-muḍāf ilaihi", "zweites Glied der Genitivverbindung (Genitiv)"],
  ["الْإِضَافَةُ", "al-iḍāfa", "Genitivverbindung (كِتَابُ الطَّالِبِ)"],
  ["النَّعْتُ", "an-naʿt", "Adjektiv (Attribut) – folgt seinem Nomen"],
  ["الْمَنْعُوتُ", "al-manʿūt", "das beschriebene Nomen"],
  ["حَرْفُ الْجَرِّ", "ḥarf al-jarr", "Präposition (فِي، مِنْ، إِلَى، عَلَى …)"],
  ["اسْمٌ مَجْرُورٌ", "ism majrūr", "Nomen im Genitiv nach einer Präposition"],
  ["الضَّمِيرُ", "aḍ-ḍamīr", "Pronomen"],
  ["ضَمِيرٌ مُنْفَصِلٌ / مُتَّصِلٌ", "munfaṣil / muttaṣil", "selbstständiges / angehängtes Pronomen"],
  ["ضَمِيرٌ مُسْتَتِرٌ", "mustatir", "im Verb verborgenes Pronomen"],
  ["اسْمُ الْإِشَارَةِ", "ism al-ishāra", "Demonstrativpronomen (هَذَا، ذَلِكَ)"],
  ["الِاسْمُ الْمَوْصُولُ", "al-ism al-mawṣūl", "Relativpronomen (الَّذِي، الَّتِي)"],
  ["اسْمُ الِاسْتِفْهَامِ", "ism al-istifhām", "Fragenomen (مَنْ، مَا، كَمْ، أَيْنَ)"],
  ["الظَّرْفُ", "aẓ-ẓarf", "Adverb des Ortes/der Zeit (أَمَامَ، قَبْلَ، عِنْدَ)"],
  ["التَّمْيِيزُ", "at-tamyīz", "Spezifizierung im Akkusativ (كَمْ كِتَابًا)"],
  ["الْمُنَادَى", "al-munādā", "Angerufener nach يَا"],
  ["الْمُثَنَّى", "al-muthannā", "Dual"],
  ["جَمْعُ الْمُذَكَّرِ السَّالِمُ", "jamʿ al-mudhakkar as-sālim", "männlicher gesunder Plural (ـُونَ / ـِينَ)"],
  ["جَمْعُ الْمُؤَنَّثِ السَّالِمُ", "jamʿ al-muʾannath as-sālim", "weiblicher gesunder Plural (ـَاتٌ)"],
  ["جَمْعُ التَّكْسِيرِ", "jamʿ at-taksīr", "gebrochener Plural (كُتُبٌ، بُيُوتٌ)"],
  ["الْأَسْمَاءُ الْخَمْسَةُ", "al-asmāʾ al-khamsa", "die fünf Nomen (أَبٌ، أَخٌ، حَمٌ، فُو، ذُو)"],
  ["الْمَمْنُوعُ مِنَ الصَّرْفِ", "al-mamnūʿ min aṣ-ṣarf", "Diptoton – ohne Tanwīn, Genitiv mit Fatḥa"],
  ["نِيَابَةً عَنْ", "niyābatan ʿan", "stellvertretend für (ein anderes Zeichen)"],
  ["الْعَدَدُ / الْمَعْدُودُ", "al-ʿadad / al-maʿdūd", "Zahlwort / das Gezählte"]
];
