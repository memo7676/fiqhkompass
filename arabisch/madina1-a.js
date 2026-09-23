/* Madina-Buch 1 (دُرُوسُ اللُّغَةِ الْعَرَبِيَّةِ لِغَيْرِ النَّاطِقِينَ بِهَا – الْجُزْءُ الْأَوَّلُ), Dr. V. Abdur Rahim.
   Aufbau und deutsche Erklärungen nach dem deutschen Schlüssel (Übers. Lina Nang), Lektionen 1–11.
   Lesson format:
     id, n (Lektion), title, ar (Arabic title), grammar: [German with inline Arabic, **bold**],
     examples: [[ar, de]], vocab: [[ar, de, plural?]],
     quiz: [{ q, ar?, a: [right, wrong...], e }],
     irab: [{ s: sentence, w: word index, a: [right, wrong...], e }]   (Iʿrāb of one marked word)
     model: [{ s, de, words: [[word, iʿrāb (ar), Erklärung (de)]] }]    (fully analysed sentences) */
window.MADINA = window.MADINA || { lessons: [] };
window.MADINA.lessons.push(

{ id: "m01", n: "1", title: "Was ist das?", ar: "مَا هَذَا؟",
  grammar: [
    "**هَذَا** (hādhā) heißt „dies, das (hier)“. Es wird هَاذَا ausgesprochen, aber ohne das erste Alif geschrieben.",
    "**مَا** fragt nach Sachen („was?“), **مَنْ** nach Personen („wer?“).",
    "Das Arabische hat **kein Wort für „ist“**: هَذَا بَيْتٌ = „Dies (ist) ein Haus.“",
    "Es gibt auch **kein Wort für „ein/eine“**. Das **-n am Wortende** (Tanwīn, z. B. بَيْتٌ baitun) entspricht dem unbestimmten Artikel.",
    "Die Fragepartikel **أَ** vor einem Aussagesatz macht eine Ja/Nein-Frage daraus: أَهَذَا بَيْتٌ؟ – Antwort: نَعَمْ (ja) oder لَا (nein)."
  ],
  examples: [
    ["مَا هَذَا؟", "Was ist das?"], ["هَذَا كِتَابٌ.", "Das ist ein Buch."],
    ["أَهَذَا بَيْتٌ؟", "Ist das ein Haus?"], ["نَعَمْ، هَذَا بَيْتٌ.", "Ja, das ist ein Haus."],
    ["لَا، هَذَا مَسْجِدٌ.", "Nein, das ist eine Moschee."], ["مَنْ هَذَا؟", "Wer ist das?"],
    ["هَذَا طَالِبٌ.", "Das ist ein Student."], ["أَهَذَا قَلَمٌ؟ لَا، هَذَا مِفْتَاحٌ.", "Ist das ein Stift? Nein, das ist ein Schlüssel."]
  ],
  vocab: [
    ["بَيْتٌ", "Haus", "بُيُوتٌ"], ["مَسْجِدٌ", "Moschee", "مَسَاجِدُ"], ["بَابٌ", "Tür", "أَبْوَابٌ"],
    ["كِتَابٌ", "Buch", "كُتُبٌ"], ["قَلَمٌ", "Stift", "أَقْلَامٌ"], ["مِفْتَاحٌ", "Schlüssel", "مَفَاتِيحُ"],
    ["مَكْتَبٌ", "Schreibtisch", "مَكَاتِبُ"], ["سَرِيرٌ", "Bett", "أَسِرَّةٌ"], ["كُرْسِيٌّ", "Stuhl", "كَرَاسِيُّ"],
    ["وَلَدٌ", "Junge", "أَوْلَادٌ"], ["طَالِبٌ", "Student", "طُلَّابٌ"], ["رَجُلٌ", "Mann", "رِجَالٌ"],
    ["تَاجِرٌ", "Händler", "تُجَّارٌ"], ["مُدَرِّسٌ", "Lehrer", "مُدَرِّسُونَ"], ["طَبِيبٌ", "Arzt", "أَطِبَّاءُ"],
    ["كَلْبٌ", "Hund", "كِلَابٌ"], ["قِطٌّ", "Katze", "قِطَطٌ"], ["حِمَارٌ", "Esel", "حَمِيرٌ"],
    ["حِصَانٌ", "Pferd", "أَحْصِنَةٌ"], ["جَمَلٌ", "Kamel", "جِمَالٌ"], ["نَجْمٌ", "Stern", "نُجُومٌ"],
    ["دِيكٌ", "Hahn", "دِيَكَةٌ"], ["قَمِيصٌ", "Hemd", "قُمْصَانٌ"], ["مِنْدِيلٌ", "Tuch, Taschentuch", "مَنَادِيلُ"],
    ["نَعَمْ", "ja"], ["لَا", "nein"], ["مَا", "was?"], ["مَنْ", "wer?"], ["وَ", "und"]
  ],
  quiz: [
    { q: "Wie fragt man „Was ist das?“", a: ["مَا هَذَا؟", "مَنْ هَذَا؟", "أَهَذَا؟", "أَيْنَ هَذَا؟"], e: "مَا fragt nach Sachen, مَنْ nach Personen." },
    { q: "Womit fragt man nach einer Person?", a: ["مَنْ", "مَا", "أَ", "لَا"], e: "مَنْ = wer? – z. B. مَنْ هَذَا؟ هَذَا طَبِيبٌ." },
    { q: "Was zeigt das Tanwīn (-un) in كِتَابٌ an?", a: ["unbestimmt: „ein Buch“", "bestimmt: „das Buch“", "Plural: „Bücher“", "Frage: „ein Buch?“"], e: "Das Tanwīn entspricht dem deutschen unbestimmten Artikel „ein/eine“." },
    { q: "Welches Wort entspricht dem deutschen „ist“ in هَذَا بَيْتٌ?", a: ["Keines – das Arabische braucht keine Kopula.", "هَذَا", "ـٌ (das Tanwīn)", "بَيْتٌ"], e: "Im Nominalsatz gibt es kein „ist“: هَذَا بَيْتٌ = „Dies (ist) ein Haus“." },
    { q: "Wie wird aus „Das ist ein Haus“ eine Ja/Nein-Frage?", a: ["أَهَذَا بَيْتٌ؟", "مَا هَذَا بَيْتٌ؟", "مَنْ هَذَا بَيْتٌ؟", "هَذَا أَبَيْتٌ؟"], e: "Die Fragepartikel أَ steht direkt vor dem Satz und wird mit dem Folgewort zusammengeschrieben." },
    { q: "Wie wird هَذَا ausgesprochen?", a: ["hādhā – mit langem ā nach dem h, das Alif wird nicht geschrieben", "hadhā – mit kurzem a", "hādhi", "hādhihi"], e: "هَذَا wird هَاذَا ausgesprochen, das erste Alif wird aber nicht geschrieben." }
  ],
  irab: [],
  model: [
    { s: "هَذَا كِتَابٌ.", de: "Das ist ein Buch.", words: [
      ["هَذَا", "اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى السُّكُونِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Demonstrativpronomen, unveränderlich (mabnī); an der Stelle eines Nominativs: Subjekt (Mubtadaʾ)"],
      ["كِتَابٌ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Prädikat (Khabar) im Nominativ, erkennbar am Ḍamma (-un)"]
    ] }
  ]
},

{ id: "m02", n: "2", title: "Dies und jenes", ar: "هَذَا وَذَلِكَ",
  grammar: [
    "**ذَلِكَ** (dhālika) heißt „das (dort), jenes“ – für Entferntes. Es wird ذَالِكَ ausgesprochen, aber ohne Alif geschrieben.",
    "**وَ** („und“) wird immer mit dem folgenden Wort zusammengeschrieben: وَذَلِكَ.",
    "Beispiel: هَذَا بَيْتٌ وَذَلِكَ مَسْجِدٌ. – „Dies ist ein Haus und jenes ist eine Moschee.“"
  ],
  examples: [
    ["هَذَا بَيْتٌ وَذَلِكَ مَسْجِدٌ.", "Dies ist ein Haus und jenes ist eine Moschee."],
    ["مَا ذَلِكَ؟ ذَلِكَ حَجَرٌ.", "Was ist jenes? Jenes ist ein Stein."],
    ["مَنْ ذَلِكَ؟ ذَلِكَ إِمَامٌ.", "Wer ist jener? Jener ist ein Imam."],
    ["هَذَا لَبَنٌ وَذَلِكَ سُكَّرٌ.", "Dies ist Milch und jenes ist Zucker."]
  ],
  vocab: [
    ["ذَلِكَ", "jenes, das (dort)"], ["إِمَامٌ", "Imam", "أَئِمَّةٌ"], ["حَجَرٌ", "Stein", "أَحْجَارٌ"],
    ["سُكَّرٌ", "Zucker"], ["لَبَنٌ", "Milch"]
  ],
  quiz: [
    { q: "Was bedeutet ذَلِكَ?", a: ["jenes (dort)", "dies (hier)", "wer?", "und"], e: "هَذَا zeigt auf Nahes, ذَلِكَ auf Entferntes." },
    { q: "Wie schreibt man „und jenes“ richtig?", a: ["وَذَلِكَ", "وَ ذَلِكَ", "ذَلِكَوَ", "وَذَالِكَ"], e: "وَ wird mit dem Folgewort zusammengeschrieben; ذَلِكَ wird ohne Alif geschrieben." },
    { q: "Wie wird ذَلِكَ ausgesprochen?", a: ["dhālika – mit langem ā", "dhalika – mit kurzem a", "dhālik ohne Endung", "dhāka"], e: "ذَلِكَ spricht man ذَالِكَ, schreibt es aber ohne Alif." }
  ],
  irab: [
    { s: "ذَلِكَ مَسْجِدٌ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "اسْمٌ مَجْرُورٌ بِالْكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ"], e: "مَسْجِدٌ ist das Prädikat (Khabar) zu ذَلِكَ und steht im Nominativ (Ḍamma)." }
  ],
  model: []
},

{ id: "m03", n: "3", title: "Der bestimmte Artikel", ar: "أَلْ",
  grammar: [
    "Der bestimmte Artikel ist **الـ** (al) – „der, die, das“. Mit al fällt das Tanwīn weg: بَيْتٌ baitun → **الْبَيْتُ** al-baitu.",
    "Von den 28 Buchstaben sind 14 **Sonnenbuchstaben** (ت ث د ذ ر ز س ش ص ض ط ظ ل ن): das l von al wird an sie angeglichen, der Buchstabe bekommt ein Shadda: الشَّمْسُ ash-shamsu, الرَّجُلُ ar-rajulu.",
    "Die 14 **Mondbuchstaben** (z. B. ب ج ح خ ع غ ف ق ك م و ه ي أ) gleichen nicht an: الْقَمَرُ al-qamaru.",
    "Das a von al ist ein **Hamzatu l-waṣl**: Steht ein Wort davor, fällt es in der Aussprache weg – وَالْبَيْتُ wird wa-l-baitu gesprochen.",
    "Ein einfacher Satz aus bestimmtem Subjekt und unbestimmtem Adjektiv: **الْبَابُ مَفْتُوحٌ** – „Die Tür ist offen.“ Adjektive mit Tanwīn heißen nicht „ein …“."
  ],
  examples: [
    ["الْبَابُ مَفْتُوحٌ.", "Die Tür ist offen."], ["الْقَلَمُ مَكْسُورٌ.", "Der Stift ist kaputt."],
    ["الْبَيْتُ نَظِيفٌ.", "Das Haus ist sauber."], ["الْمَاءُ بَارِدٌ.", "Das Wasser ist kalt."],
    ["التُّفَّاحُ حُلْوٌ.", "Der Apfel ist süß."], ["الْمُدَرِّسُ جَالِسٌ وَالطَّالِبُ وَاقِفٌ.", "Der Lehrer sitzt und der Student steht."],
    ["الرَّجُلُ غَنِيٌّ.", "Der Mann ist reich."], ["الدُّكَّانُ قَرِيبٌ.", "Das Geschäft ist nah."]
  ],
  vocab: [
    ["غَنِيٌّ", "reich", "أَغْنِيَاءُ"], ["فَقِيرٌ", "arm", "فُقَرَاءُ"], ["طَوِيلٌ", "lang, groß", "طِوَالٌ"], ["قَصِيرٌ", "kurz, klein", "قِصَارٌ"],
    ["بَارِدٌ", "kalt"], ["حَارٌّ", "heiß"], ["جَالِسٌ", "sitzend"], ["وَاقِفٌ", "stehend"],
    ["جَدِيدٌ", "neu", "جُدُدٌ"], ["قَدِيمٌ", "alt", "قُدَامَى"], ["قَرِيبٌ", "nah"], ["بَعِيدٌ", "fern"],
    ["نَظِيفٌ", "sauber"], ["وَسِخٌ", "schmutzig"], ["صَغِيرٌ", "klein", "صِغَارٌ"], ["كَبِيرٌ", "groß", "كِبَارٌ"],
    ["خَفِيفٌ", "leicht (Gewicht)"], ["ثَقِيلٌ", "schwer"], ["مَفْتُوحٌ", "offen"], ["مَكْسُورٌ", "kaputt, zerbrochen"],
    ["جَمِيلٌ", "schön"], ["حُلْوٌ", "süß"], ["مَرِيضٌ", "krank", "مَرْضَى"],
    ["الْوَرَقُ", "das Papier"], ["الْمَاءُ", "das Wasser"], ["التُّفَّاحُ", "der Apfel"], ["الدُّكَّانُ", "das Geschäft", "دَكَاكِينُ"],
    ["الشَّمْسُ", "die Sonne"], ["الْقَمَرُ", "der Mond"]
  ],
  quiz: [
    { q: "Wie lautet بَيْتٌ mit bestimmtem Artikel?", a: ["الْبَيْتُ", "الْبَيْتٌ", "أَلْبَيْتٌ", "بَيْتُ"], e: "Mit al fällt das Tanwīn weg: al-baitu." },
    { q: "Welches Wort beginnt mit einem Sonnenbuchstaben?", a: ["الرَّجُلُ", "الْقَمَرُ", "الْبَيْتُ", "الْكِتَابُ"], e: "ر ist ein Sonnenbuchstabe: ar-rajulu – das l wird angeglichen, Shadda auf dem ر." },
    { q: "Wie spricht man الشَّمْسُ?", a: ["ash-shamsu", "al-shamsu", "al-shamsun", "shamsun"], e: "ش ist ein Sonnenbuchstabe; das l von al wird nicht gesprochen." },
    { q: "Wie spricht man وَالْبَيْتُ?", a: ["wa-l-baitu", "wa al-baitu", "wal-baitun", "wa-baitu"], e: "Das a von al ist Hamzatu l-waṣl und fällt nach einem Wort weg." },
    { q: "Was ist das Gegenteil von قَرِيبٌ?", a: ["بَعِيدٌ", "كَبِيرٌ", "قَصِيرٌ", "ثَقِيلٌ"], e: "قَرِيبٌ nah – بَعِيدٌ fern." },
    { q: "Was ist das Gegenteil von نَظِيفٌ?", a: ["وَسِخٌ", "جَمِيلٌ", "خَفِيفٌ", "حَارٌّ"], e: "نَظِيفٌ sauber – وَسِخٌ schmutzig." },
    { q: "Übersetze: الْبَابُ مَفْتُوحٌ.", a: ["Die Tür ist offen.", "Eine Tür ist offen.", "Die offene Tür.", "Die Tür ist geschlossen."], e: "Kein „ist“ im Arabischen; مَفْتُوحٌ ist ein Adjektiv mit Tanwīn, aber ohne „ein“." }
  ],
  irab: [
    { s: "الْبَابُ مَفْتُوحٌ.", w: 0, a: ["مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "اسْمٌ مَجْرُورٌ بِالْكَسْرَةِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "الْبَابُ ist das Subjekt des Nominalsatzes (Mubtadaʾ), Nominativ mit Ḍamma." },
    { s: "الْبَابُ مَفْتُوحٌ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "نَعْتٌ مَرْفُوعٌ بِالضَّمَّةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ"], e: "مَفْتُوحٌ ist das Prädikat (Khabar), Nominativ mit Ḍamma (und Tanwīn)." },
    { s: "الْمَاءُ بَارِدٌ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَنْصُوبٌ بِالْفَتْحَةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "اسْمٌ مَجْرُورٌ بِالْكَسْرَةِ"], e: "Im Nominalsatz stehen Mubtadaʾ und Khabar beide im Nominativ." }
  ],
  model: [
    { s: "الْقَلَمُ مَكْسُورٌ.", de: "Der Stift ist kaputt.", words: [
      ["الْقَلَمُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Subjekt (Mubtadaʾ), Nominativ – Zeichen: Ḍamma"],
      ["مَكْسُورٌ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Prädikat (Khabar), Nominativ – Zeichen: Ḍamma"]
    ] }
  ]
},

{ id: "m04", n: "4", title: "Präpositionen, er und sie", ar: "فِي، عَلَى – هُوَ، هِيَ",
  grammar: [
    "Arabische Substantive zeigen ihre Rolle durch die **Endung**. Die normale Endung ist **-u**: der **Nominativ** (مَرْفُوعٌ).",
    "Nach einer **Präposition** wird die Endung zu **-i**: der **Genitiv** (مَجْرُورٌ). الْبَيْتُ → **فِي الْبَيْتِ** (im Haus), بَيْتٌ → فِي بَيْتٍ.",
    "فِي hat ein langes ī; vor al wird es kurz gesprochen: fi-l-baiti.",
    "**هُوَ** = „er/es“ für alles Männliche, **هِيَ** = „sie/es“ für alles Weibliche – auch für Tiere und Sachen. أَيْنَ الْكِتَابُ؟ هُوَ عَلَى الْمَكْتَبِ.",
    "Die meisten weiblichen Wörter enden auf **ة** (Tā marbūṭa), z. B. السَّاعَةُ; manche haben keine besondere Endung.",
    "Eigennamen haben kein „ein“: حَامِدٌ = Hāmid. **Weibliche Eigennamen haben kein Tanwīn**: آمِنَةُ، فَاطِمَةُ، زَيْنَبُ."
  ],
  examples: [
    ["أَيْنَ الْوَلَدُ؟ هُوَ فِي الْمَسْجِدِ.", "Wo ist der Junge? Er ist in der Moschee."],
    ["أَيْنَ الْكِتَابُ؟ هُوَ عَلَى الْمَكْتَبِ.", "Wo ist das Buch? Es ist auf dem Schreibtisch."],
    ["أَيْنَ آمِنَةُ؟ هِيَ فِي الْبَيْتِ.", "Wo ist Amina? Sie ist im Haus."],
    ["أَيْنَ السَّاعَةُ؟ هِيَ عَلَى السَّرِيرِ.", "Wo ist die Uhr? Sie ist auf dem Bett."],
    ["الْمُدَرِّسُ فِي الْفَصْلِ.", "Der Lehrer ist im Klassenzimmer."], ["الطَّبِيبُ فِي الْغُرْفَةِ.", "Der Arzt ist im Zimmer."]
  ],
  vocab: [
    ["أَيْنَ", "wo?"], ["فِي", "in"], ["عَلَى", "auf"], ["هُوَ", "er, es"], ["هِيَ", "sie, es"],
    ["غُرْفَةٌ", "Zimmer", "غُرَفٌ"], ["السَّمَاءُ", "der Himmel"], ["الْحَمَّامُ", "das Badezimmer"],
    ["الْفَصْلُ", "das Klassenzimmer", "فُصُولٌ"], ["الْمَطْبَخُ", "die Küche"], ["الْمِرْحَاضُ", "die Toilette"],
    ["سَاعَةٌ", "Uhr, Stunde", "سَاعَاتٌ"]
  ],
  quiz: [
    { q: "Wie heißt „im Haus“?", a: ["فِي الْبَيْتِ", "فِي الْبَيْتُ", "فِي الْبَيْتَ", "فِي بَيْتُ"], e: "Nach einer Präposition steht der Genitiv (Endung -i)." },
    { q: "Wie heißt „auf einem Schreibtisch“?", a: ["عَلَى مَكْتَبٍ", "عَلَى مَكْتَبٌ", "عَلَى الْمَكْتَبٌ", "عَلَى مَكْتَبًا"], e: "Unbestimmt im Genitiv: -in (مَكْتَبٍ)." },
    { q: "Welches Pronomen passt? أَيْنَ السَّاعَةُ؟ … فِي الْغُرْفَةِ.", a: ["هِيَ", "هُوَ", "أَنَا", "هَذَا"], e: "السَّاعَةُ ist weiblich (ة) → هِيَ, auch wenn es eine Sache ist." },
    { q: "Welches Pronomen passt? أَيْنَ الْكِتَابُ؟ … عَلَى الْمَكْتَبِ.", a: ["هُوَ", "هِيَ", "أَنْتَ", "هَذِهِ"], e: "الْكِتَابُ ist männlich → هُوَ." },
    { q: "Welche Form ist richtig für den Namen Āmina im Nominativ?", a: ["آمِنَةُ", "آمِنَةٌ", "آمِنَةً", "الْآمِنَةُ"], e: "Weibliche Eigennamen haben kein Tanwīn." },
    { q: "Wie heißt der Genitiv auf Arabisch?", a: ["مَجْرُورٌ", "مَرْفُوعٌ", "مَنْصُوبٌ", "مَبْنِيٌّ"], e: "مَرْفُوعٌ = Nominativ, مَنْصُوبٌ = Akkusativ, مَجْرُورٌ = Genitiv." }
  ],
  irab: [
    { s: "الْكِتَابُ عَلَى الْمَكْتَبِ.", w: 2, a: ["اسْمٌ مَجْرُورٌ بِعَلَى وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالْكَسْرَةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ"], e: "Nach der Präposition عَلَى steht der Genitiv – Zeichen: Kasra." },
    { s: "الْكِتَابُ عَلَى الْمَكْتَبِ.", w: 1, a: ["حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ", "اسْمٌ مَجْرُورٌ", "فِعْلٌ مَاضٍ", "خَبَرٌ مَرْفُوعٌ"], e: "عَلَى ist eine Präposition (Ḥarf jarr), unveränderlich (mabnī)." },
    { s: "هُوَ فِي الْمَسْجِدِ.", w: 0, a: ["ضَمِيرٌ مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "اسْمٌ مَجْرُورٌ", "حَرْفُ جَرٍّ"], e: "Pronomen sind mabnī (unveränderlich); هُوَ steht an der Stelle eines Nominativs als Subjekt." }
  ],
  model: [
    { s: "الْوَلَدُ فِي الْبَيْتِ.", de: "Der Junge ist im Haus.", words: [
      ["الْوَلَدُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt, Nominativ (Ḍamma)"],
      ["فِي", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ", "Präposition, unveränderlich"],
      ["الْبَيْتِ", "اسْمٌ مَجْرُورٌ بِفِي وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Nomen im Genitiv nach فِي (Kasra); فِي الْبَيْتِ ist zusammen das Prädikat"]
    ] }
  ]
},

{ id: "m04a", n: "4A", title: "von, nach – ich, du – er ging", ar: "مِنْ، إِلَى – أَنَا، أَنْتَ – ذَهَبَ",
  grammar: [
    "**مِنْ** = „von, aus“, **إِلَى** = „nach, zu“ – beide verlangen den Genitiv. Vor al wird مِنْ zu **مِنَ**: مِنَ الْمَسْجِدِ.",
    "**أَنَا** = „ich“ (männlich und weiblich), **أَنْتَ** = „du“ (männlich).",
    "**ذَهَبَ** = „er ging“, **خَرَجَ** = „er ging hinaus“. Steht das Subjekt dabei, fällt das „er“ weg: ذَهَبَ بِلَالٌ إِلَى الْمَسْجِدِ. – „Bilāl ging zur Moschee.“",
    "Im Verbalsatz steht das **Verb vorne**, danach das Subjekt (**فَاعِلٌ**, Nominativ)."
  ],
  examples: [
    ["مِنْ أَيْنَ أَنْتَ؟ أَنَا مِنَ الْيَابَانِ.", "Woher bist du? Ich bin aus Japan."],
    ["أَيْنَ بِلَالٌ؟ ذَهَبَ إِلَى الْمَسْجِدِ.", "Wo ist Bilāl? Er ist zur Moschee gegangen."],
    ["ذَهَبَ بِلَالٌ إِلَى الْمَسْجِدِ.", "Bilāl ist zur Moschee gegangen."],
    ["خَرَجَ الْمُدَرِّسُ مِنَ الْفَصْلِ.", "Der Lehrer ging aus dem Klassenzimmer hinaus."],
    ["ذَهَبَ الْمُدِيرُ إِلَى الْجَامِعَةِ.", "Der Direktor ging zur Universität."]
  ],
  vocab: [
    ["مِنْ", "von, aus"], ["إِلَى", "nach, zu"], ["أَنَا", "ich"], ["أَنْتَ", "du (m.)"],
    ["ذَهَبَ", "er ging"], ["خَرَجَ", "er ging hinaus"],
    ["الْمَدْرَسَةُ", "die Schule", "مَدَارِسُ"], ["الْجَامِعَةُ", "die Universität", "جَامِعَاتٌ"], ["السُّوقُ", "der Markt", "أَسْوَاقٌ"],
    ["الْمُدِيرُ", "der Direktor"], ["الْيَابَانُ", "Japan"], ["الصِّينُ", "China"], ["الْهِنْدُ", "Indien"], ["الْفِلِبِّينُ", "die Philippinen"]
  ],
  quiz: [
    { q: "Wie heißt „aus der Moschee“?", a: ["مِنَ الْمَسْجِدِ", "مِنْ الْمَسْجِدُ", "مِنِ الْمَسْجِدَ", "إِلَى الْمَسْجِدِ"], e: "Vor al wird مِنْ zu مِنَ; danach Genitiv." },
    { q: "Übersetze: ذَهَبَ بِلَالٌ إِلَى السُّوقِ.", a: ["Bilāl ging zum Markt.", "Bilāl kam vom Markt.", "Bilāl ist auf dem Markt.", "Er ging mit Bilāl zum Markt."], e: "ذَهَبَ = er ging, إِلَى = zu/nach." },
    { q: "Wie heißt „du“ (zu einem Mann)?", a: ["أَنْتَ", "أَنْتِ", "أَنَا", "هُوَ"], e: "أَنْتَ (anta) für Männer; die weibliche Form أَنْتِ kommt in Lektion 12." },
    { q: "Wie heißt das Subjekt im Verbalsatz?", a: ["فَاعِلٌ", "مُبْتَدَأٌ", "خَبَرٌ", "مُضَافٌ"], e: "Im Verbalsatz (Verb vorne) heißt das Subjekt Fāʿil und steht im Nominativ." }
  ],
  irab: [
    { s: "ذَهَبَ بِلَالٌ إِلَى الْمَسْجِدِ.", w: 0, a: ["فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "فِعْلٌ مَاضٍ مَرْفُوعٌ بِالضَّمَّةِ", "حَرْفُ جَرٍّ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "Das Perfekt (Fiʿl māḍī) ist unveränderlich und endet hier auf Fatḥa." },
    { s: "ذَهَبَ بِلَالٌ إِلَى الْمَسْجِدِ.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "اسْمٌ مَجْرُورٌ"], e: "بِلَالٌ ist das Subjekt des Verbs (Fāʿil), Nominativ mit Ḍamma." },
    { s: "خَرَجَ الْمُدَرِّسُ مِنَ الْفَصْلِ.", w: 3, a: ["اسْمٌ مَجْرُورٌ بِمِنْ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "فَاعِلٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ", "خَبَرٌ مَرْفُوعٌ"], e: "Nach مِنْ steht der Genitiv (Kasra)." }
  ],
  model: [
    { s: "ذَهَبَ بِلَالٌ إِلَى الْمَسْجِدِ.", de: "Bilāl ging zur Moschee.", words: [
      ["ذَهَبَ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "Verb im Perfekt, unveränderlich auf Fatḥa"],
      ["بِلَالٌ", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt des Verbs (Fāʿil), Nominativ"],
      ["إِلَى", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى السُّكُونِ", "Präposition"],
      ["الْمَسْجِدِ", "اسْمٌ مَجْرُورٌ بِإِلَى وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Genitiv nach إِلَى"]
    ] }
  ]
},

{ id: "m05", n: "5", title: "Die Genitivverbindung (Iḍāfa)", ar: "الْإِضَافَةُ",
  grammar: [
    "**Iḍāfa** drückt Besitz/Zugehörigkeit aus: **كِتَابُ بِلَالٍ** – „Bilāls Buch“, **بَيْتُ الْإِمَامِ** – „das Haus des Imams“.",
    "Das erste Wort (das Besessene) heißt **مُضَافٌ**: Es hat **weder al noch Tanwīn** – es ist durch seine Stellung bestimmt. Falsch sind الْكِتَابُ بِلَالٍ und كِتَابٌ بِلَالٍ.",
    "Das zweite Wort (der Besitzer) heißt **مُضَافٌ إِلَيْهِ** und steht **im Genitiv**, mit Tanwīn (بِلَالٍ) oder al (الْإِمَامِ).",
    "**تَحْتَ** = „unter“ – das folgende Nomen steht im Genitiv: تَحْتَ الْمَكْتَبِ.",
    "**يَا** ruft jemanden an (Vokativ). Das Nomen danach hat **nur ein Ḍamma, kein Tanwīn**: يَا بِلَالُ، يَا شَيْخُ.",
    "**اسْمٌ** (Name) und **ابْنٌ** (Sohn) beginnen mit Hamzatu l-waṣl: وَاسْمُ الْبِنْتِ آمِنَةُ wird wa-smu l-binti gesprochen.",
    "**مَنْ** ist unveränderlich (mabnī) und bekommt keine Genitivendung: كِتَابُ مَنْ هَذَا؟ – „Wessen Buch ist das?“"
  ],
  examples: [
    ["هَذَا كِتَابُ بِلَالٍ.", "Das ist Bilāls Buch."], ["بَيْتُ الْإِمَامِ قَرِيبٌ.", "Das Haus des Imams ist nah."],
    ["كِتَابُ مَنْ هَذَا؟", "Wessen Buch ist das?"], ["الْقِطُّ تَحْتَ الْمَكْتَبِ.", "Die Katze ist unter dem Schreibtisch."],
    ["يَا بِلَالُ، أَيْنَ الْكِتَابُ؟", "O Bilāl, wo ist das Buch?"], ["اسْمُ الْوَلَدِ بِلَالٌ وَاسْمُ الْبِنْتِ آمِنَةُ.", "Der Name des Jungen ist Bilāl und der Name des Mädchens ist Āmina."],
    ["ابْنُ الْمُدَرِّسِ طَبِيبٌ.", "Der Sohn des Lehrers ist Arzt."], ["سَيَّارَةُ الْمُدِيرِ هُنَاكَ.", "Das Auto des Direktors ist dort."]
  ],
  vocab: [
    ["تَحْتَ", "unter"], ["يَا", "o! (Anrede)"], ["هُنَا", "hier"], ["هُنَاكَ", "dort"],
    ["الرَّسُولُ", "der Gesandte", "رُسُلٌ"], ["الْعَمُّ", "der Onkel (Bruder des Vaters)", "أَعْمَامٌ"], ["الْخَالُ", "der Onkel (Bruder der Mutter)", "أَخْوَالٌ"],
    ["الِابْنُ", "der Sohn", "أَبْنَاءٌ"], ["الْبِنْتُ", "die Tochter, das Mädchen", "بَنَاتٌ"], ["الِاسْمُ", "der Name", "أَسْمَاءٌ"],
    ["الشَّارِعُ", "die Straße", "شَوَارِعُ"], ["السَّيَّارَةُ", "das Auto", "سَيَّارَاتٌ"], ["الْكَعْبَةُ", "die Kaaba"],
    ["مُغْلَقٌ", "geschlossen"], ["الْحَقِيبَةُ", "die Tasche", "حَقَائِبُ"]
  ],
  quiz: [
    { q: "Wie heißt „das Buch des Lehrers“?", a: ["كِتَابُ الْمُدَرِّسِ", "الْكِتَابُ الْمُدَرِّسِ", "كِتَابٌ الْمُدَرِّسِ", "كِتَابُ الْمُدَرِّسُ"], e: "Muḍāf ohne al und Tanwīn, Muḍāf ilaihi im Genitiv." },
    { q: "Welche Iḍāfa ist falsch?", a: ["الْبَيْتُ الْإِمَامِ", "بَيْتُ الْإِمَامِ", "بَيْتُ حَامِدٍ", "قَلَمُ الطَّالِبِ"], e: "Der Muḍāf darf keinen Artikel al haben." },
    { q: "Welche Endung hat der Muḍāf ilaihi?", a: ["-i (Genitiv)", "-u (Nominativ)", "-a (Akkusativ)", "gar keine"], e: "Der Muḍāf ilaihi steht immer im Genitiv." },
    { q: "Wie ruft man Bilāl richtig?", a: ["يَا بِلَالُ", "يَا بِلَالٌ", "يَا بِلَالِ", "يَا الْبِلَالُ"], e: "Nach يَا steht ein einfaches Ḍamma ohne Tanwīn." },
    { q: "Wie fragt man „Wessen Buch ist das?“", a: ["كِتَابُ مَنْ هَذَا؟", "مَنْ كِتَابٌ هَذَا؟", "كِتَابُ مَنٍ هَذَا؟", "مَا كِتَابُ هَذَا؟"], e: "مَنْ ist unveränderlich und steht als Muḍāf ilaihi." },
    { q: "Was bedeutet تَحْتَ?", a: ["unter", "auf", "vor", "hinter"], e: "تَحْتَ الْمَكْتَبِ – unter dem Schreibtisch (Genitiv)." }
  ],
  irab: [
    { s: "هَذَا كِتَابُ بِلَالٍ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "اسْمٌ مَجْرُورٌ بِحَرْفِ الْجَرِّ", "نَعْتٌ مَجْرُورٌ"], e: "بِلَالٍ ist der Besitzer (Muḍāf ilaihi) und steht im Genitiv (Kasra mit Tanwīn)." },
    { s: "هَذَا كِتَابُ بِلَالٍ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ وَهُوَ مُضَافٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ"], e: "كِتَابُ ist das Prädikat zu هَذَا (Nominativ) und zugleich Muḍāf – daher ohne Tanwīn." },
    { s: "يَا بِلَالُ", w: 1, a: ["مُنَادًى مَبْنِيٌّ عَلَى الضَّمِّ فِي مَحَلِّ نَصْبٍ", "فَاعِلٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ", "خَبَرٌ مَرْفُوعٌ"], e: "Der angerufene Eigenname (Munādā) ist auf Ḍamma festgelegt, grammatisch aber an Akkusativstelle." },
    { s: "الْقِطُّ تَحْتَ الْمَكْتَبِ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالْكَسْرَةِ", "اسْمٌ مَجْرُورٌ بِحَرْفِ جَرٍّ", "خَبَرٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "تَحْتَ ist ein Ortsadverb (Ẓarf), kein Ḥarf jarr: Das Folgende ist Muḍāf ilaihi im Genitiv." }
  ],
  model: [
    { s: "بَيْتُ الْإِمَامِ قَرِيبٌ.", de: "Das Haus des Imams ist nah.", words: [
      ["بَيْتُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ، وَهُوَ مُضَافٌ", "Subjekt im Nominativ und Muḍāf (daher ohne al und Tanwīn)"],
      ["الْإِمَامِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Besitzer (Muḍāf ilaihi), Genitiv"],
      ["قَرِيبٌ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Prädikat, Nominativ"]
    ] }
  ]
},

{ id: "m06", n: "6", title: "Weiblich: هَذِهِ und ة", ar: "الْمُؤَنَّثُ",
  grammar: [
    "**هَذِهِ** (hādhihi) ist die weibliche Form von هَذَا: هَذَا وَلَدٌ وَهَذِهِ بِنْتٌ.",
    "Die weibliche Form bildet man meist mit **ة** (Tā marbūṭa); davor steht ein Fatḥa: مُدَرِّسٌ → **مُدَرِّسَةٌ**.",
    "Manche Wörter haben eigene weibliche Formen: ابْنٌ – بِنْتٌ, أَخٌ – أُخْتٌ.",
    "Jedes Nomen ist männlich oder weiblich – das Geschlecht gleich mitlernen! **Paarige Körperteile sind meist weiblich** (يَدٌ Hand, رِجْلٌ Bein, عَيْنٌ Auge, أُذُنٌ Ohr), einzelne männlich (رَأْسٌ Kopf, أَنْفٌ Nase, فَمٌ Mund, وَجْهٌ Gesicht).",
    "**لِـ** = „gehört, für“: هَذَا لِبِلَالٍ. – „Das gehört Bilāl.“ الْحَمْدُ لِلَّهِ – „Alles Lob gehört Allah.“ **لِمَنْ هَذَا؟** – „Wem gehört das?“ (مَنْ wird vor al zu مَنِ).",
    "**أَيْضًا** = „auch“, **جِدًّا** = „sehr“ (steht nach dem Adjektiv): هَذَا كَبِيرٌ جِدًّا."
  ],
  examples: [
    ["هَذَا وَلَدٌ وَهَذِهِ بِنْتٌ.", "Das ist ein Junge und das ist ein Mädchen."],
    ["هَذَا مُدَرِّسٌ وَهَذِهِ مُدَرِّسَةٌ.", "Das ist ein Lehrer und das ist eine Lehrerin."],
    ["هَذَا لِبِلَالٍ وَذَلِكَ لِحَامِدٍ.", "Das gehört Bilāl und jenes gehört Ḥāmid."],
    ["لِمَنْ هَذَا؟", "Wem gehört das?"], ["الْحَمْدُ لِلَّهِ.", "Alles Lob gebührt Allah."],
    ["هَذَا جَمِيلٌ، وَذَلِكَ أَيْضًا جَمِيلٌ.", "Das ist schön, und jenes ist auch schön."],
    ["هَذَا كَبِيرٌ جِدًّا.", "Das ist sehr groß."], ["الْقَهْوَةُ حَارَّةٌ.", "Der Kaffee ist heiß."]
  ],
  vocab: [
    ["هَذِهِ", "diese, dies (w.)"], ["لِـ", "für, gehört"], ["أَيْضًا", "auch"], ["جِدًّا", "sehr"],
    ["أَخٌ", "Bruder", "إِخْوَةٌ"], ["أُخْتٌ", "Schwester", "أَخَوَاتٌ"], ["الْأَبُ", "der Vater", "آبَاءٌ"], ["الْأُمُّ", "die Mutter", "أُمَّهَاتٌ"],
    ["يَدٌ", "Hand (w.)", "أَيْدٍ"], ["رِجْلٌ", "Bein, Fuß (w.)", "أَرْجُلٌ"], ["عَيْنٌ", "Auge (w.)", "أَعْيُنٌ"], ["أُذُنٌ", "Ohr (w.)", "آذَانٌ"],
    ["رَأْسٌ", "Kopf", "رُءُوسٌ"], ["أَنْفٌ", "Nase", "أُنُوفٌ"], ["فَمٌ", "Mund", "أَفْوَاهٌ"], ["وَجْهٌ", "Gesicht", "وُجُوهٌ"],
    ["الْمِكْوَاةُ", "das Bügeleisen"], ["الْبَقَرَةُ", "die Kuh"], ["الدَّرَّاجَةُ", "das Fahrrad"], ["الْمِلْعَقَةُ", "der Löffel", "مَلَاعِقُ"],
    ["الْفَلَّاحُ", "der Bauer", "فَلَّاحُونَ"], ["الثَّلَّاجَةُ", "der Kühlschrank"], ["الشَّايُ", "der Tee"], ["الْقَهْوَةُ", "der Kaffee"],
    ["الْقِدْرُ", "der Kochtopf (w.)", "قُدُورٌ"], ["النَّافِذَةُ", "das Fenster", "نَوَافِذُ"], ["سَرِيعٌ", "schnell"],
    ["الْمَشْرِقُ", "der Osten"], ["الْمَغْرِبُ", "der Westen"]
  ],
  quiz: [
    { q: "Welches Demonstrativ passt? … بِنْتٌ.", a: ["هَذِهِ", "هَذَا", "ذَلِكَ", "هُوَ"], e: "بِنْتٌ ist weiblich → هَذِهِ." },
    { q: "Wie lautet die weibliche Form von طَالِبٌ?", a: ["طَالِبَةٌ", "طَالِبَةُ", "طَالِبَتٌ", "طَالِبَاتٌ"], e: "Mit ة und Fatḥa davor: ṭālibatun." },
    { q: "Welches Körperteil ist weiblich?", a: ["عَيْنٌ", "رَأْسٌ", "أَنْفٌ", "فَمٌ"], e: "Paarige Körperteile (Augen, Hände, Ohren, Beine) sind meist weiblich." },
    { q: "Was bedeutet لِمَنْ هَذَا؟", a: ["Wem gehört das?", "Wer ist das?", "Was ist das?", "Wo ist das?"], e: "لِـ + مَنْ = wem gehört …?" },
    { q: "Wo steht جِدًّا?", a: ["nach dem Adjektiv: كَبِيرٌ جِدًّا", "vor dem Adjektiv: جِدًّا كَبِيرٌ", "am Satzanfang", "nach هَذَا"], e: "جِدًّا steht hinter dem Wort, das es verstärkt." },
    { q: "Wie heißt „für den Lehrer“?", a: ["لِلْمُدَرِّسِ", "لِالْمُدَرِّسِ", "لِلْمُدَرِّسُ", "لَ الْمُدَرِّسِ"], e: "لِـ + الْ → لِلْ (das Alif fällt weg), danach Genitiv." }
  ],
  irab: [
    { s: "هَذَا لِبِلَالٍ.", w: 1, a: ["جَارٌّ وَمَجْرُورٌ – بِلَالٍ اسْمٌ مَجْرُورٌ بِاللَّامِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُضَافٌ إِلَيْهِ", "مَفْعُولٌ بِهِ"], e: "لِـ ist eine Präposition, بِلَالٍ steht danach im Genitiv." },
    { s: "هَذِهِ مُدَرِّسَةٌ.", w: 0, a: ["اسْمُ إِشَارَةٍ مَبْنِيٌّ عَلَى الْكَسْرِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ"], e: "هَذِهِ ist unveränderlich (endet auf Kasra) und steht an Subjektstelle." }
  ],
  model: [
    { s: "الْحَمْدُ لِلَّهِ.", de: "Alles Lob gebührt Allah.", words: [
      ["الْحَمْدُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt, Nominativ"],
      ["لِ", "حَرْفُ جَرٍّ مَبْنِيٌّ عَلَى الْكَسْرِ", "Präposition"],
      ["اللَّهِ", "لَفْظُ الْجَلَالَةِ اسْمٌ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Der Name Allahs im Genitiv; لِلَّهِ ist zusammen das Prädikat"]
    ] }
  ]
},

{ id: "m07", n: "7", title: "Jene (weiblich)", ar: "تِلْكَ",
  grammar: [
    "**تِلْكَ** ist die weibliche Form von ذَلِكَ („jene, das dort“).",
    "هَذَا بِلَالٌ وَذَلِكَ حَامِدٌ. – هَذِهِ آمِنَةُ وَتِلْكَ مَرْيَمُ.",
    "Übersicht: nah – هَذَا (m.) / هَذِهِ (w.); fern – ذَلِكَ (m.) / تِلْكَ (w.)."
  ],
  examples: [
    ["هَذِهِ آمِنَةُ وَتِلْكَ مَرْيَمُ.", "Das ist Āmina und jene ist Maryam."],
    ["مَا تِلْكَ؟ تِلْكَ نَاقَةٌ.", "Was ist jenes? Jenes ist eine Kamelstute."],
    ["هَذِهِ دَجَاجَةٌ وَتِلْكَ بَطَّةٌ.", "Das ist eine Henne und jenes ist eine Ente."],
    ["مَنْ تِلْكَ؟ تِلْكَ مُمَرِّضَةٌ.", "Wer ist jene? Jene ist eine Krankenschwester."]
  ],
  vocab: [
    ["تِلْكَ", "jene (w.)"], ["النَّاقَةُ", "die Kamelstute"], ["الْبَطَّةُ", "die Ente"], ["الْمُمَرِّضَةُ", "die Krankenschwester"],
    ["الْبَيْضَةُ", "das Ei", "بَيْضٌ"], ["الْمُؤَذِّنُ", "der Muezzin"], ["الدَّجَاجَةُ", "die Henne", "دَجَاجٌ"]
  ],
  quiz: [
    { q: "Welches Wort passt? … نَاقَةٌ (fern).", a: ["تِلْكَ", "ذَلِكَ", "هَذِهِ", "هَذَا"], e: "Weiblich und fern → تِلْكَ." },
    { q: "Welches Wort passt? … مُؤَذِّنٌ (fern).", a: ["ذَلِكَ", "تِلْكَ", "هَذِهِ", "هِيَ"], e: "Männlich und fern → ذَلِكَ." },
    { q: "Was ist تِلْكَ?", a: ["die weibliche Form von ذَلِكَ", "die weibliche Form von هَذَا", "der Plural von ذَلِكَ", "eine Präposition"], e: "ذَلِكَ (m.) – تِلْكَ (w.)." }
  ],
  irab: [
    { s: "تِلْكَ مُمَرِّضَةٌ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ", "نَعْتٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ"], e: "Das Prädikat nach dem Demonstrativ steht im Nominativ." }
  ],
  model: []
},

{ id: "m08", n: "8", title: "Dieses Buch – vor und hinter", ar: "هَذَا الْكِتَابُ",
  grammar: [
    "**هَذَا كِتَابٌ** ist ein Satz („Das ist ein Buch“). **هَذَا الْكِتَابُ** ist kein Satz, sondern „dieses Buch“ – erst mit einem Prädikat wird es ein Satz: **هَذَا الْكِتَابُ جَدِيدٌ.** – „Dieses Buch ist neu.“",
    "So mit allen Demonstrativen: ذَلِكَ الرَّجُلُ مُهَنْدِسٌ. – هَذِهِ السَّاعَةُ جَمِيلَةٌ. – تِلْكَ الْمُمَرِّضَةُ مِنَ الْيَابَانِ.",
    "Wörter, die auf langes **-ā** enden (ا oder ى), bekommen **keine Endung** – sie bleiben immer gleich: أَمْرِيكَا، الْمُسْتَشْفَى، عَلَى.",
    "**خَلْفَ** = „hinter“, **أَمَامَ** = „vor“ (örtlich) – danach Genitiv: خَلْفَ الْمَسْجِدِ، أَمَامَ الْمُدَرِّسِ.",
    "**جَلَسَ** = „er saß, setzte sich“."
  ],
  examples: [
    ["هَذَا الْكِتَابُ جَدِيدٌ.", "Dieses Buch ist neu."], ["ذَلِكَ الرَّجُلُ مُهَنْدِسٌ.", "Jener Mann ist Ingenieur."],
    ["هَذِهِ السَّاعَةُ جَمِيلَةٌ.", "Diese Uhr ist schön."], ["الْبَيْتُ خَلْفَ الْمَسْجِدِ.", "Das Haus ist hinter der Moschee."],
    ["جَلَسَ مُحَمَّدٌ أَمَامَ الْمُدَرِّسِ.", "Muḥammad setzte sich vor den Lehrer."], ["أَنَا مِنْ أَمْرِيكَا.", "Ich bin aus Amerika."],
    ["هَذَا الْكِتَابُ لِمُحَمَّدٍ.", "Dieses Buch gehört Muḥammad."]
  ],
  vocab: [
    ["خَلْفَ", "hinter"], ["أَمَامَ", "vor (örtlich)"], ["جَلَسَ", "er saß, setzte sich"],
    ["مُهَنْدِسٌ", "Ingenieur", "مُهَنْدِسُونَ"], ["رَئِيسٌ", "Präsident, Leiter", "رُؤَسَاءُ"], ["السِّكِّينُ", "das Messer", "سَكَاكِينُ"],
    ["الْمُسْتَشْفَى", "das Krankenhaus", "مُسْتَشْفَيَاتٌ"], ["أَمْرِيكَا", "Amerika"], ["أَلْمَانِيَا", "Deutschland"],
    ["إِنْجِلْتَرَا", "England"], ["الْعِرَاقُ", "der Irak"], ["سُوِيسْرَا", "die Schweiz"]
  ],
  quiz: [
    { q: "Was bedeutet هَذَا الْكِتَابُ?", a: ["dieses Buch (kein vollständiger Satz)", "Das ist ein Buch.", "Das ist das Buch.", "Wessen Buch?"], e: "Demonstrativ + Nomen mit al = „dieses …“; es fehlt noch das Prädikat." },
    { q: "Übersetze: „Diese Uhr ist schön.“", a: ["هَذِهِ السَّاعَةُ جَمِيلَةٌ.", "هَذِهِ سَاعَةٌ جَمِيلَةٌ.", "هَذَا السَّاعَةُ جَمِيلٌ.", "السَّاعَةُ هَذِهِ جَمِيلَةٌ."], e: "هَذِهِ السَّاعَةُ = diese Uhr; جَمِيلَةٌ ist das Prädikat (weiblich)." },
    { q: "Welches Wort ändert seine Endung nie?", a: ["الْمُسْتَشْفَى", "الْمَسْجِدُ", "الْبَيْتُ", "السَّاعَةُ"], e: "Wörter auf langes -ā (ا/ى) bleiben unverändert." },
    { q: "Wie heißt „hinter der Moschee“?", a: ["خَلْفَ الْمَسْجِدِ", "خَلْفَ الْمَسْجِدُ", "أَمَامَ الْمَسْجِدِ", "خَلْفُ الْمَسْجِدِ"], e: "خَلْفَ steht im Akkusativ als Ortsangabe, das Folgende im Genitiv." }
  ],
  irab: [
    { s: "هَذَا الْكِتَابُ جَدِيدٌ.", w: 1, a: ["بَدَلٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُضَافٌ إِلَيْهِ", "مَفْعُولٌ بِهِ"], e: "Nach dem Demonstrativ ist الْكِتَابُ eine Apposition (Badal) zu هَذَا – nicht das Prädikat; das Prädikat ist جَدِيدٌ." },
    { s: "هَذَا الْكِتَابُ جَدِيدٌ.", w: 2, a: ["خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "نَعْتٌ مَرْفُوعٌ", "بَدَلٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "جَدِيدٌ ist das Prädikat des Satzes." },
    { s: "جَلَسَ مُحَمَّدٌ أَمَامَ الْمُدَرِّسِ.", w: 2, a: ["ظَرْفُ مَكَانٍ مَنْصُوبٌ بِالْفَتْحَةِ وَهُوَ مُضَافٌ", "حَرْفُ جَرٍّ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "خَبَرٌ مَرْفُوعٌ"], e: "أَمَامَ ist eine Ortsangabe (Ẓarf makān) im Akkusativ und zugleich Muḍāf." }
  ],
  model: [
    { s: "الْبَيْتُ خَلْفَ الْمَسْجِدِ.", de: "Das Haus ist hinter der Moschee.", words: [
      ["الْبَيْتُ", "مُبْتَدَأٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt, Nominativ"],
      ["خَلْفَ", "ظَرْفُ مَكَانٍ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ، وَهُوَ مُضَافٌ", "Ortsangabe im Akkusativ, zugleich Muḍāf"],
      ["الْمَسْجِدِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Genitiv"]
    ] }
  ]
}
);
