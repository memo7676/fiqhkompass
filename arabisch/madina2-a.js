/* Madina-Buch 2 (دُرُوسُ اللُّغَةِ الْعَرَبِيَّةِ لِغَيْرِ النَّاطِقِينَ بِهَا – الْجُزْءُ الثَّانِي), Dr. V. Abdur Rahim.
   Aufbau und deutsche Erklärungen nach dem deutschen Schlüssel zu Teil 2 (Google-Drive-Ordner „Madina Books“).
   Same lesson format as madina1-*.js; book: 2 keeps the lessons apart from book 1 (ids b2-…).
   Book 2 opens once the last lessons of book 1 are learned (arabic.js, BOOK2_GATE). */
window.MADINA = window.MADINA || { lessons: [] };
window.MADINA.lessons.push(

{ id: "b2-01", book: 2, n: "1", title: "inna, laʿalla, dhū und am", ar: "إِنَّ وَلَعَلَّ",
  grammar: [
    "Es gibt zwei Satzarten: den **Nominalsatz** الْجُمْلَةُ الِاسْمِيَّةُ, der mit einem Nomen beginnt (الْكِتَابُ سَهْلٌ – „Das Buch ist leicht.“), und den **Verbalsatz** الْجُمْلَةُ الْفِعْلِيَّةُ, der mit einem Verb beginnt (خَرَجَ بِلَالٌ – „Bilāl ging hinaus.“). Im Nominalsatz heißt der erste Teil **Mubtadaʾ** الْمُبْتَدَأُ, der zweite **Khabar** الْخَبَرُ.",
    "**إِنَّ** steht am Anfang eines Nominalsatzes und bedeutet Nachdruck („wahrlich, sicher, zweifellos“). Das Nomen danach wird **manṣūb** (Akkusativ): الْكِتَابُ سَهْلٌ → إِنَّ الْكِتَابَ سَهْلٌ. Die Mubtadaʾ heißt dann **ismu inna** اسْمُ إِنَّ, die Khabar **khabaru inna** خَبَرُ إِنَّ – sie bleibt im Nominativ.",
    "Nach إِنَّ wird aus einem Ḍamma ein Fatḥa (إِنَّ الْمُدَرِّسَ جَدِيدٌ), aus zwei Ḍammas zwei Fatḥas (إِنَّ حَامِدًا مَرِيضٌ). Ein Pronomen wird zur angehängten Akkusativform: أَنْتَ غَنِيٌّ → إِنَّكَ غَنِيٌّ. Für „ich“ und „wir“ gibt es je zwei Formen: إِنِّي / إِنَّنِي und إِنَّا / إِنَّنَا.",
    "**لَعَلَّ** ist eine „Schwester von إِنَّ“ und verhält sich grammatisch genauso. Es drückt Hoffnung oder Befürchtung aus: لَعَلَّ الْجَوَّ جَمِيلٌ – „Ich hoffe, das Wetter ist (wird) schön.“",
    "**ذُو** bedeutet „besitzend, habend“: ذُو مَالٍ „reich“, ذُو خُلُقٍ „höflich“, ذُو عِلْمٍ „gebildet“. Es ist immer **Muḍāf**, das folgende Wort ist Muḍāf ilaihi und daher **majrūr**. Feminin: **ذَاتُ**, Plural: **ذَوُو** (m.) und **ذَوَاتُ** (f.).",
    "**أَمْ** heißt „oder“, aber nur in einer Frage mit أَ: أَطَبِيبٌ أَنْتَ أَمْ مُهَنْدِسٌ؟ Das أَ steht direkt vor dem einen Ding, nach dem gefragt wird, أَمْ vor dem anderen: أَإِلَى مَكَّةَ ذَهَبْتَ أَمْ إِلَى جُدَّةَ؟ In einem Satz, der keine Frage ist, heißt „oder“ **أَوْ**: خُذْ هَذَا أَوْ ذَاكَ.",
    "**مِائَةٌ** „hundert“ (das Alif wird nicht gesprochen: mi-ah) und **أَلْفٌ** „tausend“. Das Gezählte danach steht im **Singular und majrūr**: مِائَةُ كِتَابٍ, أَلْفُ رِيَالٍ. Beide Zahlen haben mit weiblichem Gezählten dieselbe Form: أَلْفُ مُسْلِمَةٍ وَمِائَةُ طَالِبَةٍ.",
    "**غَالٍ** „teuer“ steht für غَالِيٌ: Das yāʾ mit seinem Ḍamma fällt weg, das Tanwīn wandert zum vorigen Buchstaben (ghāli-yu-n → ghāli-n). Ebenso **مُحَامٍ** (Anwalt), **قَاضٍ** (Richter), **وَادٍ** (Tal): هَذَا الْكِتَابُ غَالٍ – hier ist غَالٍ marfūʿ, nicht majrūr."
  ],
  examples: [
    ["إِنَّ الْكِتَابَ سَهْلٌ.", "Das Buch ist wirklich leicht."],
    ["إِنَّكَ غَنِيٌّ.", "Du bist wahrlich reich."],
    ["لَعَلَّ الْجَوَّ جَمِيلٌ.", "Ich hoffe, das Wetter ist schön."],
    ["بِلَالٌ ذُو عِلْمٍ، وَأُخْتُهُ ذَاتُ خُلُقٍ.", "Bilāl ist gebildet, und seine Schwester ist höflich."],
    ["هَؤُلَاءِ الطُّلَّابُ ذَوُو خُلُقٍ.", "Diese Studenten sind höflich."],
    ["أَطَبِيبٌ أَنْتَ أَمْ مُهَنْدِسٌ؟", "Bist du Arzt oder Ingenieur?"],
    ["أَبِلَالًا رَأَيْتَ أَمْ حَامِدًا؟", "Hast du Bilāl oder Ḥāmid gesehen?"],
    ["رَأَيْتُ ثَلَاثَةً أَوْ أَرْبَعَةً.", "Ich sah drei oder vier."],
    ["هَذَا التِّلْفَازُ بِأَلْفِ رِيَالٍ.", "Dieser Fernseher kostet tausend Riyal."],
    ["أَبِي قَاضٍ.", "Mein Vater ist Richter."]
  ],
  vocab: [
    ["ذَكِيٌّ", "intelligent", "أَذْكِيَاءُ"], ["غَبِيٌّ", "dumm", "أَغْبِيَاءُ"], ["خُلُقٌ", "Anstand, Charakter", "أَخْلَاقٌ"],
    ["مُتَزَوِّجٌ", "verheiratet"], ["عَزَبٌ", "unverheiratet"], ["يَهُودِيٌّ", "Jude", "يَهُودٌ"],
    ["مُعْجَمٌ", "Wörterbuch"], ["دُولَارٌ", "Dollar"], ["مِائَةٌ", "hundert"], ["أَلْفٌ", "tausend"],
    ["رُوبِيَّةٌ", "Rupie"], ["صَفْحَةٌ", "Seite (eines Buches)"], ["نَاجِحٌ", "einer, der die Prüfung bestanden hat"],
    ["غَالٍ", "teuer"], ["كُمٌّ", "Ärmel", "أَكْمَامٌ"],
    ["مُحَامٍ", "Anwalt"], ["قَاضٍ", "Richter"], ["وَادٍ", "Tal"]
  ],
  quiz: [
    { q: "Welcher Satz ist richtig?", a: ["إِنَّ الْكِتَابَ سَهْلٌ.", "إِنَّ الْكِتَابُ سَهْلٌ.", "إِنَّ الْكِتَابَ سَهْلًا.", "إِنَّ الْكِتَابِ سَهْلٌ."], e: "Nach إِنَّ steht die Mubtadaʾ im Akkusativ (ismu inna), die Khabar bleibt im Nominativ." },
    { q: "Wie heißt „Du bist reich“ mit إِنَّ?", a: ["إِنَّكَ غَنِيٌّ.", "إِنَّ أَنْتَ غَنِيٌّ.", "إِنَّكَ غَنِيًّا.", "إِنَّ أَنْتَ غَنِيًّا."], e: "Das Pronomen wird als Akkusativform an إِنَّ angehängt: أَنْتَ → إِنَّكَ." },
    { q: "Wie heißt die Khabar in einem Satz mit إِنَّ?", a: ["خَبَرُ إِنَّ – sie bleibt marfūʿ", "اسْمُ إِنَّ – sie wird manṣūb", "مُبْتَدَأٌ – sie bleibt marfūʿ", "مَفْعُولٌ بِهِ – sie wird manṣūb"], e: "Mubtadaʾ → ismu inna (manṣūb), Khabar → khabaru inna (marfūʿ)." },
    { q: "Was drückt لَعَلَّ aus?", a: ["Hoffnung oder Befürchtung", "Nachdruck („wahrlich“)", "eine Frage", "eine Verneinung"], e: "لَعَلَّ الْجَوَّ جَمِيلٌ = „Ich hoffe, das Wetter ist schön.“ Grammatisch wirkt es wie إِنَّ." },
    { q: "In welchem Fall steht das Wort nach ذُو?", a: ["majrūr – es ist Muḍāf ilaihi", "manṣūb – es ist Objekt", "marfūʿ – es ist Khabar", "wie das Wort davor"], e: "ذُو ist immer Muḍāf: ذُو مَالٍ, ذُو عِلْمٍ." },
    { q: "Was ist die weibliche Form von ذُو?", a: ["ذَاتُ", "ذَوُو", "ذَوَاتُ", "ذِي"], e: "ذُو (m.), ذَاتُ (f.); Plural ذَوُو (m.) und ذَوَاتُ (f.)." },
    { q: "Welche Frage ist richtig gebildet?", a: ["أَمُدَرِّسٌ أَنْتَ أَمْ طَالِبٌ؟", "أَأَنْتَ مُدَرِّسٌ أَمْ طَالِبٌ؟", "أَنْتَ مُدَرِّسٌ أَوْ طَالِبٌ؟", "أَمْ مُدَرِّسٌ أَنْتَ أَمْ طَالِبٌ؟"], e: "أَ steht direkt vor dem einen erfragten Ding, أَمْ vor dem anderen." },
    { q: "Welches Wort heißt „oder“ in einem Satz, der keine Frage ist?", a: ["أَوْ", "أَمْ", "أَ", "لَعَلَّ"], e: "خُذْ هَذَا أَوْ ذَاكَ – „Nimm dies oder das.“ أَمْ gibt es nur in Fragen." },
    { q: "Wie heißt „hundert Bücher“?", a: ["مِائَةُ كِتَابٍ", "مِائَةُ كُتُبٍ", "مِائَةُ كِتَابًا", "مِائَةُ الْكُتُبِ"], e: "Nach مِائَةٌ und أَلْفٌ steht das Gezählte im Singular und im Genitiv." },
    { q: "Warum hat غَالٍ in هَذَا الْكِتَابُ غَالٍ ein Kasra-Tanwīn?", a: ["Es steht für غَالِيٌ: das yāʾ fällt weg, das Tanwīn geht auf das lām über.", "Es ist majrūr.", "Es ist Muḍāf ilaihi.", "Es steht nach einer Präposition."], e: "Wie مُحَامٍ, قَاضٍ, وَادٍ: Das Wort ist marfūʿ, nur die Form ist verkürzt." }
  ],
  irab: [
    { s: "إِنَّ الْمُدَرِّسَ جَدِيدٌ.", w: 1, a: ["اسْمُ إِنَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "خَبَرُ إِنَّ مَرْفُوعٌ"], e: "Nach إِنَّ wird die Mubtadaʾ zum Ism von inna und steht im Akkusativ." },
    { s: "إِنَّ الْمُدَرِّسَ جَدِيدٌ.", w: 2, a: ["خَبَرُ إِنَّ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "اسْمُ إِنَّ مَنْصُوبٌ", "نَعْتٌ مَرْفُوعٌ", "خَبَرٌ مَنْصُوبٌ"], e: "Die Khabar von إِنَّ bleibt im Nominativ." },
    { s: "لَعَلَّ الْجَوَّ جَمِيلٌ.", w: 1, a: ["اسْمُ لَعَلَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "فَاعِلٌ مَرْفُوعٌ", "خَبَرُ لَعَلَّ مَرْفُوعٌ"], e: "لَعَلَّ wirkt wie إِنَّ: ihr Ism steht im Akkusativ." },
    { s: "بِلَالٌ ذُو عِلْمٍ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "خَبَرٌ مَرْفُوعٌ", "نَعْتٌ مَجْرُورٌ", "اسْمٌ مَجْرُورٌ بِحَرْفِ الْجَرِّ"], e: "ذُو ist Muḍāf, das Wort danach Muḍāf ilaihi im Genitiv." },
    { s: "بِلَالٌ ذُو عِلْمٍ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْوَاوُ لِأَنَّهُ مِنَ الْأَسْمَاءِ الْخَمْسَةِ، وَهُوَ مُضَافٌ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّةِ", "مُبْتَدَأٌ مَرْفُوعٌ بِالْوَاوِ", "نَعْتٌ مَرْفُوعٌ"], e: "ذُو gehört zu den „fünf Nomen“: Nominativ mit و, Akkusativ ذَا, Genitiv ذِي." }
  ],
  model: [
    { s: "إِنَّ الْكِتَابَ سَهْلٌ.", de: "Das Buch ist wirklich leicht.", words: [
      ["إِنَّ", "حَرْفُ تَوْكِيدٍ وَنَصْبٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "Partikel der Bekräftigung, setzt ihr Ism in den Akkusativ; unveränderlich"],
      ["الْكِتَابَ", "اسْمُ إِنَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ", "Ism von inna im Akkusativ, erkennbar am Fatḥa"],
      ["سَهْلٌ", "خَبَرُ إِنَّ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Khabar von inna im Nominativ, erkennbar am Ḍamma"]
    ] }
  ]
},

{ id: "b2-02", book: 2, n: "2", title: "laisa – „ist nicht“", ar: "لَيْسَ",
  grammar: [
    "**لَيْسَ** bedeutet „ist nicht“ und steht vor einem Nominalsatz: الْبَيْتُ جَدِيدٌ → لَيْسَ الْبَيْتُ بِجَدِيدٍ – „Das Haus ist nicht neu.“ Vor die Khabar kommt meist **بِـ**, deshalb ist sie **majrūr**. (Ohne بِـ steht sie im Akkusativ: لَيْسَ الْبَيْتُ جَدِيدًا – das kommt später.)",
    "Nach لَيْسَ heißt die Mubtadaʾ **ismu laisa** اسْمُ لَيْسَ, die Khabar **khabaru laisa** خَبَرُ لَيْسَ.",
    "Die feminine Form ist **لَيْسَتْ**: لَيْسَتْ زَيْنَبُ بِمَرِيضَةٍ. Vor dem Artikel wird das Sukūn zum Kasra: لَيْسَتِ السَّيَّارَةُ بِقَدِيمَةٍ (laisat-i-s-sayyāratu).",
    "لَيْسَ wird wie ein Verb im Perfekt mit den Pronomen verbunden: **لَسْتُ** (ich bin nicht), لَسْتَ, لَسْتِ, لَسْنَا … In لَسْتُ بِمُهَنْدِسٍ ist das تُ der ismu laisa und بِمُهَنْدِسٍ die khabaru laisa. Man kann auch sagen: أَنَا لَسْتُ بِمُهَنْدِسٍ.",
    "Ist die khabaru laisa eine **Präpositionalgruppe**, bekommt sie kein بِـ: أَنَا مِنَ الْهِنْدِ → لَسْتُ مِنَ الْهِنْدِ (nicht: لَسْتُ بِمِنَ الْهِنْدِ).",
    "Ist die Mubtadaʾ unbestimmt und die Khabar eine Präpositionalgruppe, steht die Khabar vorne: لِي إِخْوَةٌ „Ich habe Brüder“ → لَيْسَ لِي إِخْوَةٌ „Ich habe keine Brüder“. Hier ist إِخْوَةٌ ismu laisa, لِي khabaru laisa. Mit إِنَّ: إِنَّ لِي إِخْوَةً – إِخْوَةً ist ismu inna und deshalb manṣūb.",
    "**بِلَالُ بْنُ حَامِدٍ** „Bilāl, Sohn von Ḥāmid“: In dieser Verbindung fällt das Alif von ابْنٌ in der Schrift weg, und das Wort davor verliert sein Tanwīn.",
    "**مَنِ الْأَخُ؟** heißt wörtlich „Wer ist der Bruder?“ – eine höfliche Art, einen Fremden zu fragen, wer er ist."
  ],
  examples: [
    ["لَيْسَ الْبَيْتُ بِجَدِيدٍ.", "Das Haus ist nicht neu."],
    ["لَيْسَتْ زَيْنَبُ بِمَرِيضَةٍ.", "Zainab ist nicht krank."],
    ["لَيْسَتِ السَّيَّارَةُ بِقَدِيمَةٍ.", "Das Auto ist nicht alt."],
    ["لَسْتُ بِمُهَنْدِسٍ.", "Ich bin kein Ingenieur."],
    ["لَسْتُ مِنَ الْهِنْدِ.", "Ich bin nicht aus Indien."],
    ["لَيْسَ لِي إِخْوَةٌ.", "Ich habe keine Brüder."],
    ["إِنَّ لِي إِخْوَةً.", "Ich habe wirklich Brüder."],
    ["بِلَالُ بْنُ حَامِدٍ", "Bilāl, Sohn von Ḥāmid"],
    ["مَنِ الْأَخُ؟", "Wer sind Sie? (wörtl.: Wer ist der Bruder?)"],
    ["أَنَا مَسْرُورٌ بِلِقَائِكَ.", "Ich freue mich, dich zu treffen."]
  ],
  vocab: [
    ["لِقَاءٌ", "Treffen"], ["مَسْرُورٌ", "froh, erfreut"], ["جَيِّدٌ", "gut"], ["جَيْبٌ", "(Hosen-, Jacken-)Tasche", "جُيُوبٌ"],
    ["نَهْرٌ", "Fluss", "أَنْهَارٌ"], ["بَرْقِيَّةٌ", "Telegramm"], ["مَصْرِفٌ", "Bank (Geldinstitut)", "مَصَارِفُ"],
    ["مَكْتَبُ الْبَرِيدِ", "Postamt"], ["لَيْسَ", "ist nicht"], ["إِخْوَةٌ", "Brüder"]
  ],
  quiz: [
    { q: "Was bedeutet لَيْسَ?", a: ["ist nicht", "ist wirklich", "vielleicht", "hat nicht"], e: "لَيْسَ verneint einen Nominalsatz: لَيْسَ الْبَيْتُ بِجَدِيدٍ." },
    { q: "Welcher Satz ist richtig?", a: ["لَيْسَ الْبَيْتُ بِجَدِيدٍ.", "لَيْسَ الْبَيْتَ بِجَدِيدٍ.", "لَيْسَ الْبَيْتُ بِجَدِيدٌ.", "لَيْسَ بِالْبَيْتُ جَدِيدٌ."], e: "Ismu laisa bleibt im Nominativ; die Khabar mit بِـ steht im Genitiv." },
    { q: "Wie heißt die feminine Form von لَيْسَ?", a: ["لَيْسَتْ", "لَسْتِ", "لَيْسَا", "لَسْنَ"], e: "لَيْسَتْ زَيْنَبُ بِمَرِيضَةٍ – „Zainab ist nicht krank.“" },
    { q: "Warum heißt es لَيْسَتِ السَّيَّارَةُ mit Kasra?", a: ["Das Sukūn wird vor dem Artikel al- zum Kasra.", "Weil السَّيَّارَةُ majrūr ist.", "Weil لَيْسَتْ feminin ist.", "Das ist ein Fehler."], e: "Zwei Sukūn treffen aufeinander; deshalb laisat-i-s-sayyāratu (wie in Buch 1, Lektion 12)." },
    { q: "Wie sagt man „Ich bin nicht aus Indien“?", a: ["لَسْتُ مِنَ الْهِنْدِ.", "لَسْتُ بِمِنَ الْهِنْدِ.", "لَيْسَ أَنَا مِنَ الْهِنْدِ.", "لَسْتُ بِالْهِنْدِ."], e: "Ist die Khabar eine Präpositionalgruppe, bekommt sie kein بِـ." },
    { q: "Was ist in لَسْتُ بِمُهَنْدِسٍ der ismu laisa?", a: ["das Pronomen تُ", "مُهَنْدِسٍ", "بِـ", "es gibt keinen"], e: "Das angehängte تُ ist ismu laisa, بِمُهَنْدِسٍ ist khabaru laisa." },
    { q: "Wie heißt „Ich habe keine Brüder“?", a: ["لَيْسَ لِي إِخْوَةٌ.", "لَيْسَ لِي إِخْوَةً.", "لَسْتُ لِي إِخْوَةٌ.", "لَيْسَتْ إِخْوَةٌ لِي."], e: "إِخْوَةٌ ist ismu laisa (Nominativ), لِي ist khabaru laisa." },
    { q: "Welche Form hat إِخْوَةٌ in إِنَّ لِي إِخْوَةً?", a: ["manṣūb – es ist ismu inna", "marfūʿ – es ist khabaru inna", "majrūr – wegen لِـ", "marfūʿ – es ist Mubtadaʾ"], e: "Die vorangestellte Khabar لِي ändert nichts: إِخْوَةً ist ismu inna und steht im Akkusativ." },
    { q: "Was passiert in بِلَالُ بْنُ حَامِدٍ?", a: ["Das Alif von ابْن fällt in der Schrift weg, بِلَال verliert sein Tanwīn.", "ابْن bekommt ein Tanwīn.", "بِلَال wird majrūr.", "Nichts – so schreibt man immer."], e: "In der Form „X, Sohn von Y“ schreibt man بْن ohne Alif und X ohne Tanwīn." }
  ],
  irab: [
    { s: "لَيْسَ الْبَيْتُ بِجَدِيدٍ.", w: 1, a: ["اسْمُ لَيْسَ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "خَبَرُ لَيْسَ مَنْصُوبٌ", "فَاعِلٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ"], e: "Nach لَيْسَ heißt die Mubtadaʾ ismu laisa und bleibt im Nominativ." },
    { s: "لَيْسَ الْبَيْتُ بِجَدِيدٍ.", w: 2, a: ["الْبَاءُ حَرْفُ جَرٍّ زَائِدٌ، وَجَدِيدٍ مَجْرُورٌ لَفْظًا مَنْصُوبٌ مَحَلًّا خَبَرُ لَيْسَ", "نَعْتٌ مَجْرُورٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "خَبَرُ لَيْسَ مَرْفُوعٌ"], e: "Das بِـ ist ein Zusatz: Das Wort ist in der Form Genitiv, an seiner Stelle aber die Khabar von laisa (eigentlich Akkusativ)." },
    { s: "لَسْتُ مِنَ الْهِنْدِ.", w: 0, a: ["فِعْلٌ مَاضٍ نَاقِصٌ، وَالتَّاءُ ضَمِيرٌ فِي مَحَلِّ رَفْعٍ اسْمُ لَيْسَ", "فِعْلٌ مَاضٍ، وَالتَّاءُ فَاعِلٌ", "حَرْفُ نَفْيٍ", "مُبْتَدَأٌ"], e: "لَيْسَ ist ein „unvollständiges“ Verb; das تُ ist sein Ism." },
    { s: "إِنَّ لِي إِخْوَةً.", w: 2, a: ["اسْمُ إِنَّ مُؤَخَّرٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "خَبَرُ إِنَّ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ"], e: "Der Ism von inna steht hier hinten (muʾakhkhar), bleibt aber im Akkusativ." }
  ],
  model: [
    { s: "لَيْسَتْ زَيْنَبُ بِمَرِيضَةٍ.", de: "Zainab ist nicht krank.", words: [
      ["لَيْسَتْ", "فِعْلٌ مَاضٍ نَاقِصٌ مَبْنِيٌّ عَلَى الْفَتْحِ، وَالتَّاءُ لِلتَّأْنِيثِ", "„Unvollständiges“ Verb (verneint den Nominalsatz); das تْ zeigt das Femininum"],
      ["زَيْنَبُ", "اسْمُ لَيْسَ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Ism von laisa im Nominativ (Eigenname ohne Tanwīn)"],
      ["بِمَرِيضَةٍ", "الْبَاءُ حَرْفُ جَرٍّ زَائِدٌ، مَرِيضَةٍ خَبَرُ لَيْسَ مَجْرُورٌ لَفْظًا مَنْصُوبٌ مَحَلًّا", "Khabar von laisa: durch das zusätzliche بِـ in Genitivform"]
    ] }
  ]
},

{ id: "b2-03", book: 2, n: "3", title: "Steigerung, lākinna, kaʾanna, Zahlen 11–20", ar: "أَفْعَلُ التَّفْضِيلِ",
  grammar: [
    "**Komparativ** („größer als“) hat das Schema **أَفْعَلُ**: أَجْمَلُ schöner, أَحْسَنُ besser, أَصْغَرُ kleiner, أَقْدَمُ älter. Es ist **diptot** (مَمْنُوعٌ مِنَ الصَّرْفِ), hat also kein Tanwīn. „Als“ heißt **مِنْ**: حَامِدٌ أَطْوَلُ مِنْ بِلَالٍ.",
    "أَفْعَلُ bleibt für maskulin, feminin, Singular und Plural gleich: آمِنَةُ أَطْوَلُ مِنْ بِلَالٍ, الْبَنَاتُ أَطْوَلُ مِنَ الْأَبْنَاءِ. Mit Pronomen: أَنْتَ أَحْسَنُ مِنِّي, أَنَا أَقْصَرُ مِنْكَ, هُمْ أَكْبَرُ مِنَّا سِنًّا („älter als wir“, wörtl. „größer an Alter“). Nur مِنِّي und مِنَّا haben ein Shadda.",
    "**Superlativ**: Folgt auf أَفْعَلُ ein Nomen im Genitiv, heißt es „der/die …ste“: إِبْرَاهِيمُ أَحْسَنُ طَالِبٍ فِي الْمَدْرَسَةِ, الْأَزْهَرُ أَقْدَمُ جَامِعَةٍ فِي الْعَالَمِ. Der arabische Name für beide Formen ist **أَفْعَلُ التَّفْضِيلِ**.",
    "**وَلَكِنَّ** „aber“ ist eine Schwester von إِنَّ (Nomen danach manṣūb): بِلَالٌ مُجْتَهِدٌ وَلَكِنَّ حَامِدًا كَسْلَانُ, أَخِي مُتَزَوِّجٌ وَلَكِنِّي عَزَبٌ.",
    "**كَأَنَّ** „es sieht so aus, als ob“ ist ebenfalls eine Schwester von إِنَّ: كَأَنَّ الْإِمَامَ مَرِيضٌ, كَأَنَّكَ مِنَ الْهِنْدِ.",
    "**Zahlen 11–20** (mit männlichem Gezählten): Das Gezählte steht im **Singular, manṣūb**: أَحَدَ عَشَرَ كَوْكَبًا, تِسْعَةَ عَشَرَ كِتَابًا. Bei **11 und 12** stimmen beide Teile mit dem Gezählten überein: أَحَدَ عَشَرَ طَالِبًا, إِحْدَى عَشْرَةَ طَالِبَةً, اثْنَا عَشَرَ طَالِبًا, اثْنَتَا عَشْرَةَ طَالِبَةً. Bei **13–19** stimmt nur der zweite Teil überein, der erste hat das Gegenteil: ثَلَاثَةَ عَشَرَ طَالِبًا, ثَلَاثَ عَشْرَةَ طَالِبَةً.",
    "Die Zahlen 11–19 sind **mabnī** (unveränderlich): عِنْدِي ثَلَاثَةَ عَشَرَ رِيَالًا, أُرِيدُ ثَلَاثَةَ عَشَرَ رِيَالًا, بِثَلَاثَةَ عَشَرَ رِيَالًا. Nur اثْنَا/اثْنَتَا werden im Genitiv und Akkusativ zu اثْنَيْ/اثْنَتَيْ. **20** heißt **عِشْرُونَ** – gleich für m. und f., das Gezählte im Singular manṣūb: عِشْرُونَ طَالِبًا.",
    "**Ordnungszahlen**: „erster“ ist **أَوَّلُ** (f. أُولَى), 2–10 nach dem Schema **فَاعِلٌ**: ثَالِثٌ dritter, رَابِعٌ vierter, خَامِسٌ fünfter, سَادِسٌ sechster. „Zweiter“ ist **ثَانٍ** (aus ثَانِيٌ, wie غَالٍ), mit Artikel الثَّانِي.",
    "**أَلَيْسَ كَذَلِكَ؟** „Nicht wahr?“ – bejahende Antwort darauf ist **بَلَى**. **أَيُّهُمَا** „welcher von beiden?“: أَيُّهُمَا أَخُوكَ؟ Die Pluralformen **مَفَاعِلُ** und **مَفَاعِيلُ** (فَنَادِقُ, فَنَاجِينُ) heißen **مُنْتَهَى الْجُمُوعِ**."
  ],
  examples: [
    ["حَامِدٌ أَطْوَلُ مِنْ بِلَالٍ.", "Ḥāmid ist größer als Bilāl."],
    ["آمِنَةُ أَطْوَلُ مِنْ بِلَالٍ.", "Āmina ist größer als Bilāl."],
    ["أَنْتَ أَحْسَنُ مِنِّي.", "Du bist besser als ich."],
    ["إِبْرَاهِيمُ أَحْسَنُ طَالِبٍ فِي الْمَدْرَسَةِ.", "Ibrāhīm ist der beste Schüler der Schule."],
    ["فَاطِمَةُ أَكْبَرُ طَالِبَةٍ فِي فَصْلِنَا.", "Fāṭima ist die älteste Schülerin unserer Klasse."],
    ["سَيَّارَتِي قَدِيمَةٌ وَلَكِنَّهَا قَوِيَّةٌ.", "Mein Auto ist alt, aber es ist stark."],
    ["كَأَنَّ هَذِهِ السَّيَّارَةَ لَهُ.", "Es sieht so aus, als gehöre dieses Auto ihm."],
    ["أَحَدَ عَشَرَ كَوْكَبًا", "elf Sterne"],
    ["اثْنَتَا عَشْرَةَ طَالِبَةً", "zwölf Studentinnen"],
    ["ثَلَاثَةَ عَشَرَ طَالِبًا", "dreizehn Studenten"],
    ["أَنْتَ طَالِبٌ، أَلَيْسَ كَذَلِكَ؟ – بَلَى.", "Du bist Student, nicht wahr? – Doch."],
    ["فِي الْفَصْلِ طَالِبَانِ مِنْ فَرَنْسَا، أَيُّهُمَا أَخُوكَ؟", "In der Klasse sind zwei Schüler aus Frankreich – welcher von beiden ist dein Bruder?"]
  ],
  vocab: [
    ["مَهْجَعٌ", "Unterkunft, Schlafraum", "مَهَاجِعُ"], ["فَرِيقٌ", "Team, Mannschaft", "فُرَقَاءُ"], ["فِي الْمَنَامِ", "im Traum"],
    ["سِنٌّ", "Alter; Zahn", "أَسْنَانٌ"], ["لَاعِبٌ", "Spieler"], ["شَهِيرٌ", "berühmt"], ["كَسْلَانُ", "faul (m.; f. كَسْلَى)"],
    ["كَوْكَبٌ", "Stern", "كَوَاكِبُ"], ["شَقِيقٌ", "Vollbruder (gleicher Vater und gleiche Mutter)", "أَشِقَّاءُ"],
    ["نَافِذَةٌ", "Fenster", "نَوَافِذُ"], ["شَهْرٌ", "Monat", "أَشْهُرٌ / شُهُورٌ"], ["وَاسِعٌ", "geräumig, weit"], ["ثَمَنٌ", "Preis", "أَثْمَانٌ"],
    ["أَوَّلُ", "erster (f. أُولَى)"], ["بَلَى", "doch (bejahende Antwort auf eine verneinte Frage)"], ["أَيُّهُمَا", "welcher von beiden?"]
  ],
  quiz: [
    { q: "Wie heißt „Ḥāmid ist größer als Bilāl“?", a: ["حَامِدٌ أَطْوَلُ مِنْ بِلَالٍ.", "حَامِدٌ أَطْوَلٌ مِنْ بِلَالٍ.", "حَامِدٌ طَوِيلٌ مِنْ بِلَالٍ.", "حَامِدٌ أَطْوَلُ بِلَالٍ."], e: "Komparativ nach أَفْعَلُ (ohne Tanwīn) + مِنْ „als“." },
    { q: "Welche Form hat „Āmina ist größer als Bilāl“?", a: ["آمِنَةُ أَطْوَلُ مِنْ بِلَالٍ.", "آمِنَةُ طُولَى مِنْ بِلَالٍ.", "آمِنَةُ أَطْوَلَةُ مِنْ بِلَالٍ.", "آمِنَةُ أَطْوَلَتْ مِنْ بِلَالٍ."], e: "أَفْعَلُ mit مِنْ bleibt für Feminin und Plural gleich." },
    { q: "Was bedeutet أَحْسَنُ طَالِبٍ?", a: ["der beste Schüler", "ein besserer Schüler", "ein guter Schüler", "besser als ein Schüler"], e: "أَفْعَلُ + Nomen im Genitiv = Superlativ." },
    { q: "Warum heißt es مِنِّي mit Shadda?", a: ["مِنْ + ـنِي: zwei nūn verschmelzen", "weil es Superlativ ist", "weil es feminin ist", "das ist Dialekt"], e: "Ebenso مِنَّا (مِنْ + نَا); bei مِنْكَ, مِنْهُ usw. gibt es kein Shadda." },
    { q: "Welcher Satz ist richtig?", a: ["بِلَالٌ مُجْتَهِدٌ وَلَكِنَّ حَامِدًا كَسْلَانُ.", "بِلَالٌ مُجْتَهِدٌ وَلَكِنَّ حَامِدٌ كَسْلَانُ.", "بِلَالٌ مُجْتَهِدٌ وَلَكِنَّ حَامِدًا كَسْلَانًا.", "بِلَالٌ مُجْتَهِدٌ لَكِنْ حَامِدًا كَسْلَانُ."], e: "لَكِنَّ ist eine Schwester von إِنَّ: das Nomen danach steht im Akkusativ." },
    { q: "Was bedeutet كَأَنَّ?", a: ["es sieht so aus, als ob", "aber", "vielleicht, hoffentlich", "wahrlich"], e: "كَأَنَّ الْإِمَامَ مَرِيضٌ – „Es sieht so aus, als sei der Imam krank.“" },
    { q: "Wie heißt „dreizehn Studenten“?", a: ["ثَلَاثَةَ عَشَرَ طَالِبًا", "ثَلَاثَ عَشَرَ طَالِبًا", "ثَلَاثَةَ عَشْرَةَ طَالِبًا", "ثَلَاثَةَ عَشَرَ طُلَّابٍ"], e: "13–19: der zweite Teil stimmt mit dem Gezählten überein, der erste nicht; Gezähltes im Singular, manṣūb." },
    { q: "Wie heißt „zwölf Studentinnen“?", a: ["اثْنَتَا عَشْرَةَ طَالِبَةً", "اثْنَا عَشَرَ طَالِبَةً", "اثْنَتَا عَشَرَ طَالِبَةً", "اثْنَا عَشْرَةَ طَالِبَاتٍ"], e: "Bei 11 und 12 stimmen beide Teile mit dem Gezählten überein." },
    { q: "In welcher Form steht das Gezählte nach 11–20?", a: ["Singular, manṣūb", "Plural, majrūr", "Singular, majrūr", "Plural, manṣūb"], e: "أَحَدَ عَشَرَ كَوْكَبًا, عِشْرُونَ طَالِبًا." },
    { q: "Wie antwortet man bejahend auf أَنْتَ طَالِبٌ، أَلَيْسَ كَذَلِكَ؟", a: ["بَلَى", "نَعَمْ", "لَا", "كَلَّا"], e: "Nach einer verneinten Frage („nicht wahr?“) bestätigt man mit بَلَى." },
    { q: "Was heißt „dritter“?", a: ["ثَالِثٌ", "ثَلَاثَةٌ", "ثُلُثٌ", "ثَالِثَةَ عَشَرَ"], e: "Ordnungszahlen 2–10 nach dem Schema فَاعِلٌ: ثَالِثٌ, رَابِعٌ, خَامِسٌ." }
  ],
  irab: [
    { s: "حَامِدٌ أَطْوَلُ مِنْ بِلَالٍ.", w: 1, a: ["خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ (مَمْنُوعٌ مِنَ الصَّرْفِ)", "نَعْتٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "خَبَرٌ مَرْفُوعٌ بِالضَّمَّتَيْنِ"], e: "أَطْوَلُ ist die Khabar; als أَفْعَلُ ohne Tanwīn." },
    { s: "بِلَالٌ مُجْتَهِدٌ وَلَكِنَّ حَامِدًا كَسْلَانُ.", w: 3, a: ["اسْمُ لَكِنَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "خَبَرُ لَكِنَّ"], e: "لَكِنَّ wirkt wie إِنَّ: ihr Ism steht im Akkusativ." },
    { s: "عِنْدِي ثَلَاثَةَ عَشَرَ رِيَالًا.", w: 3, a: ["تَمْيِيزٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مَفْعُولٌ بِهِ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ", "نَعْتٌ مَنْصُوبٌ"], e: "Das Gezählte nach 11–99 ist Tamyīz (Spezifizierung) im Akkusativ." },
    { s: "إِبْرَاهِيمُ أَحْسَنُ طَالِبٍ فِي الْمَدْرَسَةِ.", w: 2, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "تَمْيِيزٌ مَنْصُوبٌ", "خَبَرٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ بِمِنْ"], e: "Im Superlativ ist das Nomen nach أَفْعَلُ Muḍāf ilaihi." }
  ],
  model: [
    { s: "أَنْتَ أَحْسَنُ مِنِّي.", de: "Du bist besser als ich.", words: [
      ["أَنْتَ", "ضَمِيرٌ مُنْفَصِلٌ مَبْنِيٌّ عَلَى الْفَتْحِ فِي مَحَلِّ رَفْعٍ مُبْتَدَأٌ", "Freistehendes Pronomen, unveränderlich; an der Stelle eines Nominativs: Mubtadaʾ"],
      ["أَحْسَنُ", "خَبَرٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Khabar im Nominativ (أَفْعَلُ, ohne Tanwīn)"],
      ["مِنِّي", "مِنْ حَرْفُ جَرٍّ، وَالْيَاءُ ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ جَرٍّ", "مِنْ „als“ + angehängtes Pronomen „mich“ an der Stelle eines Genitivs"]
    ] }
  ]
},

{ id: "b2-04", book: 2, n: "4", title: "Das Perfekt (māḍī) und seine Formen", ar: "الْفِعْلُ الْمَاضِي",
  grammar: [
    "Die meisten arabischen Verben haben **drei Radikale** (Wurzelbuchstaben). Die Grundform ist das **Perfekt (māḍī)**: ذَهَبَ „er ging“, رَجَعَ „er kehrte zurück“. Folgt ein Subjekt, fällt das „er“ weg: ذَهَبَ بِلَالٌ „Bilāl ging“; ebenso ذَهَبَتْ آمِنَةُ „Āmina ging“.",
    "In ذَهَبَ und ذَهَبَتْ ist das Subjekt ein **unsichtbares Pronomen** (ضَمِيرٌ مُسْتَتِرٌ). Das تْ in ذَهَبَتْ ist nur das Zeichen des Femininums, kein Pronomen.",
    "Das Anhängen der Endungen für die Personen heißt **isnād** (الْإِسْنَادُ): ذَهَبُوا „sie (m. Pl.) gingen“ – Subjekt ist das wāw (das Alif danach wird nicht gesprochen); ذَهَبْنَ „sie (f. Pl.) gingen“ – Subjekt ist das nūn; ذَهَبْتَ „du (m.) gingst“ – Subjekt ist tā; ذَهَبْتُ „ich ging“ – Subjekt ist tu.",
    "Männlich und weiblich unterscheiden sich: أَيْنَ بِلَالٌ وَحَامِدٌ وَخَالِدٌ؟ – ذَهَبُوا إِلَى السُّوقِ. أَيْنَ آمِنَةُ وَفَاطِمَةُ وَزَيْنَبُ؟ – ذَهَبْنَ إِلَى الْمَدْرَسَةِ.",
    "Das Perfekt wird mit **مَا** verneint: ذَهَبْتُ إِلَى السُّوقِ → مَا ذَهَبْتُ إِلَى السُّوقِ „Ich ging nicht zum Markt.“ دَخَلَ بِلَالٌ وَلَكِنَّهُ مَا جَلَسَ.",
    "**نَعَمْ oder بَلَى?** بَلَى antwortet auf eine **verneinte** Frage und heißt „doch“: أَلَسْتَ بِمُسْلِمٍ؟ – بَلَى، أَنَا مُسْلِمٌ. Mit نَعَمْ bestätigt man die Verneinung: نَعَمْ، لَسْتُ بِمُسْلِمٍ „Ja (richtig), ich bin kein Muslim.“",
    "**لِأَنَّ** „weil“ besteht aus لِـ „für“ und أَنَّ, einer Schwester von إِنَّ – das Nomen danach ist deshalb **manṣūb**: مَا خَرَجْتُ مِنَ الْبَيْتِ لِأَنَّ الْجَوَّ بَارِدٌ. ذَهَبَ إِبْرَاهِيمُ إِلَى الْمُسْتَشْفَى لِأَنَّهُ مَرِيضٌ."
  ],
  examples: [
    ["ذَهَبَ بِلَالٌ.", "Bilāl ging."],
    ["ذَهَبَتْ آمِنَةُ.", "Āmina ging."],
    ["ذَهَبُوا إِلَى السُّوقِ.", "Sie (m.) gingen zum Markt."],
    ["ذَهَبْنَ إِلَى الْمَدْرَسَةِ.", "Sie (f.) gingen zur Schule."],
    ["ذَهَبْتَ", "du (m.) gingst"],
    ["ذَهَبْتُ", "ich ging"],
    ["مَا ذَهَبْتُ إِلَى السُّوقِ.", "Ich ging nicht zum Markt."],
    ["مَا خَرَجَ الْإِمَامُ مِنَ الْمَسْجِدِ.", "Der Imam verließ die Moschee nicht."],
    ["أَلَسْتَ بِمُسْلِمٍ؟ – بَلَى، أَنَا مُسْلِمٌ.", "Bist du kein Muslim? – Doch, ich bin Muslim."],
    ["مَا خَرَجْتُ مِنَ الْبَيْتِ لِأَنَّ الْجَوَّ بَارِدٌ.", "Ich ging nicht aus dem Haus, weil es kalt war."]
  ],
  vocab: [
    ["لَا بَأْسَ", "Möge dich kein Unheil treffen! / Keine Sorge!"], ["شَايٌ", "Tee"],
    ["لِأَنَّ", "weil"], ["مُسْتَشْفًى", "Krankenhaus"], ["رَجَعَ", "er kehrte zurück"], ["بَارِدٌ", "kalt"]
  ],
  quiz: [
    { q: "Was ist in ذَهَبَتْ آمِنَةُ das تْ?", a: ["das Zeichen des Femininums", "das Subjekt „sie“", "das Subjekt „du“", "ein Objekt"], e: "Das تْ zeigt nur, dass das Subjekt weiblich ist; das Subjekt ist آمِنَةُ." },
    { q: "Wie heißt „sie (m. Pl.) gingen“?", a: ["ذَهَبُوا", "ذَهَبْنَ", "ذَهَبْتُمْ", "ذَهَبَتْ"], e: "Das wāw ist das Subjekt; das Alif danach wird nicht gesprochen." },
    { q: "Wie heißt „sie (f. Pl.) gingen“?", a: ["ذَهَبْنَ", "ذَهَبُوا", "ذَهَبَتْ", "ذَهَبْتُنَّ"], e: "Das nūn ist das Subjekt: dhahab-na." },
    { q: "Was heißt ذَهَبْتُ?", a: ["ich ging", "du (m.) gingst", "sie ging", "wir gingen"], e: "Endung ـْتُ = ich; ـْتَ = du (m.)." },
    { q: "Wie heißt das Anhängen der Personalendungen an das Verb?", a: ["isnād (الْإِسْنَادُ)", "iʿrāb (الْإِعْرَابُ)", "tanwīn", "iḍāfa"], e: "Isnād = Verbindung des Verbs mit dem Pronomen (Subjekt)." },
    { q: "Wie verneint man das Perfekt?", a: ["mit مَا: مَا ذَهَبْتُ", "mit لَيْسَ: لَيْسَ ذَهَبْتُ", "mit لَا: لَا ذَهَبْتُ", "mit لَنْ: لَنْ ذَهَبْتُ"], e: "مَا + Perfekt: مَا ذَهَبْتُ إِلَى السُّوقِ." },
    { q: "Ein Muslim wird gefragt: أَلَسْتَ بِمُسْلِمٍ؟ Was antwortet er?", a: ["بَلَى، أَنَا مُسْلِمٌ.", "نَعَمْ، أَنَا مُسْلِمٌ.", "لَا، أَنَا مُسْلِمٌ.", "نَعَمْ، لَسْتُ بِمُسْلِمٍ."], e: "بَلَى („doch“) widerspricht der verneinten Frage." },
    { q: "Warum heißt es لِأَنَّ الْجَوَّ بَارِدٌ (mit Fatḥa)?", a: ["لِأَنَّ enthält أَنَّ, eine Schwester von إِنَّ", "weil الْجَوّ Objekt ist", "weil لِـ den Genitiv verlangt", "weil es eine Frage ist"], e: "لِأَنَّ = لِـ + أَنَّ; das Nomen danach ist manṣūb." },
    { q: "Wie heißt das Subjekt in ذَهَبَ, wenn kein Nomen folgt?", a: ["ضَمِيرٌ مُسْتَتِرٌ (unsichtbares Pronomen)", "ضَمِيرٌ مُتَّصِلٌ (angehängtes Pronomen)", "مَفْعُولٌ بِهِ", "مُبْتَدَأٌ"], e: "Das „er“ steckt unsichtbar im Verb." }
  ],
  irab: [
    { s: "ذَهَبُوا إِلَى السُّوقِ.", w: 0, a: ["فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الضَّمِّ، وَالْوَاوُ ضَمِيرٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ مُسْتَتِرٌ", "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ", "فِعْلٌ مَاضٍ، وَالْوَاوُ حَرْفُ عَطْفٍ"], e: "Das wāw der Gruppe ist das Subjekt (Fāʿil)." },
    { s: "ذَهَبَتْ آمِنَةُ.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "خَبَرٌ مَرْفُوعٌ"], e: "آمِنَةُ ist das Subjekt des Verbs (weiblicher Eigenname ohne Tanwīn)." },
    { s: "مَا ذَهَبْتُ إِلَى السُّوقِ.", w: 0, a: ["حَرْفُ نَفْيٍ مَبْنِيٌّ عَلَى السُّكُونِ", "اسْمُ اسْتِفْهَامٍ", "اسْمٌ مَوْصُولٌ", "مُبْتَدَأٌ"], e: "Hier ist مَا eine Verneinungspartikel, kein Fragewort." },
    { s: "ذَهَبَ إِبْرَاهِيمُ إِلَى الْمُسْتَشْفَى لِأَنَّهُ مَرِيضٌ.", w: 5, a: ["خَبَرُ أَنَّ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "اسْمُ أَنَّ مَنْصُوبٌ", "نَعْتٌ مَرْفُوعٌ", "فَاعِلٌ مَرْفُوعٌ"], e: "In لِأَنَّهُ ist ـهُ der Ism von anna; مَرِيضٌ ist die Khabar im Nominativ." }
  ],
  model: [
    { s: "ذَهَبْتُ إِلَى السُّوقِ.", de: "Ich ging zum Markt.", words: [
      ["ذَهَبْتُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "Perfekt, endet vor dem تُ auf Sukūn; das تُ ist das Subjekt"],
      ["إِلَى", "حَرْفُ جَرٍّ", "Präposition"],
      ["السُّوقِ", "اسْمٌ مَجْرُورٌ بِإِلَى وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "Genitiv nach إِلَى, erkennbar am Kasra"]
    ] }
  ]
},

{ id: "b2-05", book: 2, n: "5", title: "Fāʿil und Mafʿūl bihi", ar: "الْفَاعِلُ وَالْمَفْعُولُ بِهِ",
  grammar: [
    "Das Subjekt eines Verbalsatzes heißt **Fāʿil** (الْفَاعِلُ) und ist **marfūʿ**: ذَهَبَ بِلَالٌ. Der Fāʿil kann auch ein Pronomen sein: ذَهَبُوا (Fāʿil ist das wāw), ذَهَبْتَ (tā), ذَهَبْنَا (nā).",
    "Folgt ein Fāʿil im Plural, bleibt das Verb im **Singular**: ذَهَبَ الطُّلَّابُ „die Studenten gingen“ – nicht ذَهَبُوا الطُّلَّابُ, denn ein Verb kann keine zwei Fāʿil haben. Richtig ist aber auch der Nominalsatz الطُّلَّابُ ذَهَبُوا: الطُّلَّابُ ist Mubtadaʾ, ذَهَبُوا die Khabar. Ebenso feminin: ذَهَبَتِ الْبَنَاتُ oder الْبَنَاتُ ذَهَبْنَ.",
    "Das Objekt heißt **Mafʿūl bihi** (الْمَفْعُولُ بِهِ) und ist **manṣūb**: فَتَحَ الْوَلَدُ الْبَابَ, رَأَيْتُ حَامِدًا, سَأَلَتِ الْمُدِيرَةُ زَيْنَبَ, شَرِبَ الرَّجُلُ الْمَاءَ.",
    "Hat das Objekt ein angehängtes Pronomen, bekommt das Wort selbst die a-Endung: سَأَلَ الْوَلَدُ أُمَّهُ (umm-a-hū), رَأَيْتُ بَيْتَكَ (bait-a-ka), فَتَحَ الطَّالِبُ كِتَابَهُ. Das Objekt kann auch ein Pronomen sein: رَأَيْتُ بِلَالًا وَسَأَلْتُهُ „… und fragte ihn“.",
    "Folgt auf das nūn des Tanwīn ein Wort mit **Hamzat al-waṣl**, wird ein **Kasra** eingeschoben: شَرِبَ حَامِدٌ الْمَاءَ (ḥāmidu-n-i-l-māʾa), سَأَلَ بِلَالٌ ابْنَهُ, سَمِعَ فَيْصَلٌ الْأَذَانَ. Das Zusammentreffen zweier vokalloser Buchstaben heißt **الْتِقَاءُ السَّاكِنَيْنِ**.",
    "Die drei Buchstaben des Verbs heißen **erster, zweiter und dritter Radikal** (ك-ت-ب). Im Perfekt haben der erste und der dritte Radikal ein Fatḥa; der zweite kann Fatḥa (ذَهَبَ، دَخَلَ، خَرَجَ), Kasra (شَرِبَ، حَفِظَ، فَهِمَ) oder Ḍamma (كَرُمَ، كَبُرَ، بَعُدَ) haben."
  ],
  examples: [
    ["ذَهَبَ الطُّلَّابُ.", "Die Studenten gingen."],
    ["الطُّلَّابُ ذَهَبُوا.", "Die Studenten, sie gingen."],
    ["ذَهَبَتِ الْبَنَاتُ.", "Die Mädchen gingen."],
    ["فَتَحَ الْوَلَدُ الْبَابَ.", "Der Junge öffnete die Tür."],
    ["سَأَلَتِ الْمُدِيرَةُ زَيْنَبَ.", "Die Direktorin fragte Zainab."],
    ["سَأَلَ الْوَلَدُ أُمَّهُ.", "Der Junge fragte seine Mutter."],
    ["رَأَيْتُ بِلَالًا وَسَأَلْتُهُ.", "Ich sah Bilāl und fragte ihn."],
    ["شَرِبَ حَامِدٌ الْمَاءَ.", "Ḥāmid trank das Wasser."],
    ["سَمِعَ فَيْصَلٌ الْأَذَانَ.", "Faiṣal hörte den Gebetsruf."]
  ],
  vocab: [
    ["عِنَبٌ", "Weintrauben"], ["مَوْزٌ", "Bananen"], ["تِينٌ", "Feigen"], ["فَجْرٌ", "Morgendämmerung"],
    ["جَوَابٌ", "Antwort", "أَجْوِبَةٌ"], ["سُؤَالٌ", "Frage", "أَسْئِلَةٌ"], ["حَيَّةٌ", "Schlange"], ["بَقَّالٌ", "Lebensmittelhändler"],
    ["عَصًا", "Stock", "عِصِيٌّ / عُصِيٌّ"], ["قَهْوَةٌ", "Kaffee"], ["دُكَّانٌ", "Geschäft, Laden", "دَكَاكِينُ"], ["سَبُّورَةٌ", "Tafel"],
    ["كَسَرَ يَكْسِرُ", "zerbrechen"], ["سَمِعَ يَسْمَعُ", "hören"], ["فَهِمَ يَفْهَمُ", "verstehen"], ["شَرِبَ يَشْرَبُ", "trinken"],
    ["حَفِظَ يَحْفَظُ", "auswendig lernen"], ["ضَرَبَ يَضْرِبُ", "schlagen"], ["دَخَلَ يَدْخُلُ", "eintreten"], ["أَكَلَ يَأْكُلُ", "essen"],
    ["غَسَلَ يَغْسِلُ", "waschen"], ["قَتَلَ يَقْتُلُ", "töten"], ["خُبْزٌ", "Brot"], ["جَيِّدًا", "gut (Adverb)"]
  ],
  quiz: [
    { q: "Wie heißt das Subjekt eines Verbalsatzes und in welchem Fall steht es?", a: ["Fāʿil – marfūʿ", "Mubtadaʾ – marfūʿ", "Mafʿūl bihi – manṣūb", "Fāʿil – manṣūb"], e: "ذَهَبَ بِلَالٌ: بِلَالٌ ist Fāʿil im Nominativ." },
    { q: "Welcher Satz ist richtig?", a: ["ذَهَبَ الطُّلَّابُ.", "ذَهَبُوا الطُّلَّابُ.", "ذَهَبَ الطُّلَّابَ.", "ذَهَبْنَ الطُّلَّابُ."], e: "Vor einem Fāʿil im Plural steht das Verb im Singular – sonst hätte es zwei Fāʿil." },
    { q: "Was ist in الطُّلَّابُ ذَهَبُوا das Wort الطُّلَّابُ?", a: ["Mubtadaʾ", "Fāʿil", "Mafʿūl bihi", "Khabar"], e: "Der Satz beginnt mit einem Nomen: Nominalsatz. ذَهَبُوا ist die Khabar." },
    { q: "In welchem Fall steht das Mafʿūl bihi?", a: ["manṣūb", "marfūʿ", "majrūr", "unveränderlich"], e: "فَتَحَ الْوَلَدُ الْبَابَ – الْبَابَ ist Objekt im Akkusativ." },
    { q: "Welcher Satz ist richtig?", a: ["سَأَلَ الْوَلَدُ أُمَّهُ.", "سَأَلَ الْوَلَدُ أُمُّهُ.", "سَأَلَ الْوَلَدَ أُمَّهُ.", "سَأَلَ الْوَلَدُ أُمِّهِ."], e: "Das Objekt أُمّ bekommt die a-Endung; das Pronomen ـهُ gehört nicht dazu." },
    { q: "Warum spricht man شَرِبَ حَامِدٌ الْمَاءَ „ḥāmidu-n-i-l-māʾa“?", a: ["Um zwei vokallose Buchstaben (n + l) zu trennen, wird ein Kasra eingeschoben.", "Weil الْمَاءَ majrūr ist.", "Weil حَامِد ein Eigenname ist.", "Wegen des Verbs شَرِبَ."], e: "الْتِقَاءُ السَّاكِنَيْنِ wird mit einem Kasra aufgelöst." },
    { q: "Welcher Radikal kann im Perfekt Fatḥa, Kasra oder Ḍamma haben?", a: ["der zweite", "der erste", "der dritte", "keiner"], e: "ذَهَبَ, شَرِبَ, كَرُمَ – der erste und dritte Radikal haben im Perfekt immer Fatḥa." },
    { q: "Wie heißt „Ich sah Bilāl und fragte ihn“?", a: ["رَأَيْتُ بِلَالًا وَسَأَلْتُهُ.", "رَأَيْتُ بِلَالٌ وَسَأَلْتُهُ.", "رَأَيْتُ بِلَالًا وَسَأَلْتُ هُوَ.", "رَأَيْتُ بِلَالٍ وَسَأَلْتُهُ."], e: "Objekt بِلَالًا im Akkusativ; „ihn“ als angehängtes Pronomen ـهُ." }
  ],
  irab: [
    { s: "فَتَحَ الْوَلَدُ الْبَابَ.", w: 2, a: ["مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "فَاعِلٌ مَرْفُوعٌ", "خَبَرٌ مَرْفُوعٌ", "نَعْتٌ مَنْصُوبٌ"], e: "الْبَابَ ist das Objekt → Akkusativ." },
    { s: "فَتَحَ الْوَلَدُ الْبَابَ.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "خَبَرٌ"], e: "Wer öffnet? der Junge → Fāʿil im Nominativ." },
    { s: "ذَهَبَ الطُّلَّابُ.", w: 1, a: ["فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "مُبْتَدَأٌ مَرْفُوعٌ", "خَبَرٌ مَرْفُوعٌ", "بَدَلٌ مِنَ الْوَاوِ"], e: "Das Verb steht im Singular, الطُّلَّابُ ist der Fāʿil." },
    { s: "سَأَلَ الْوَلَدُ أُمَّهُ.", w: 2, a: ["مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ، وَهُوَ مُضَافٌ، وَالْهَاءُ ضَمِيرٌ فِي مَحَلِّ جَرٍّ مُضَافٌ إِلَيْهِ", "فَاعِلٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ، وَالْهَاءُ فَاعِلٌ", "مُضَافٌ إِلَيْهِ مَجْرُورٌ"], e: "أُمَّ ist Objekt (Akkusativ) und Muḍāf; ـهُ ist Muḍāf ilaihi." }
  ],
  model: [
    { s: "شَرِبَ الرَّجُلُ الْمَاءَ.", de: "Der Mann trank das Wasser.", words: [
      ["شَرِبَ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "Perfekt, unveränderlich auf Fatḥa"],
      ["الرَّجُلُ", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Subjekt (Fāʿil) im Nominativ"],
      ["الْمَاءَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ الظَّاهِرَةُ", "Objekt (Mafʿūl bihi) im Akkusativ"]
    ] }
  ]
},

{ id: "b2-06", book: 2, n: "6", title: "Zahlen 11–20 (weiblich), ayyu, aẓunnu anna", ar: "أَظُنُّ أَنَّ",
  grammar: [
    "**ذَهَبْتِ** „du (f.) gingst“ (dhahab-ti). Damit kann ذهبت vier Dinge bedeuten: ذَهَبَتْ sie ging, ذَهَبْتَ du (m.) gingst, ذَهَبْتِ du (f.) gingst, ذَهَبْتُ ich ging.",
    "**Zahlen 11–20 mit weiblichem Gezählten**: 11 und 12 – beide Teile stimmen überein: إِحْدَى عَشْرَةَ طَالِبَةً, اثْنَتَا عَشْرَةَ طَالِبَةً. Das شِين hat bei عَشَرَ (m.) ein Fatḥa, bei عَشْرَةَ (f.) ein Sukūn. 13–19 – nur der Zehner stimmt überein: ثَلَاثَ عَشْرَةَ طَالِبَةً, ثَمَانِيَ عَشْرَةَ طَالِبَةً (ثَمَانِي mit Sukūn am Ende).",
    "**أَيُّ** „welcher?“ ist immer Muḍāf, das Nomen danach majrūr. أَيُّ selbst bekommt den Fall seiner Stellung im Satz: أَيُّ طَالِبٍ خَرَجَ؟ (Mubtadaʾ, marfūʿ), أَيَّ كِتَابٍ قَرَأْتَ؟ (Objekt, manṣūb), بِأَيِّ قَلَمٍ كَتَبْتَ؟ (nach بِـ, majrūr).",
    "**أَظُنُّ أَنَّ** „ich glaube, dass“: **أَنَّ** ist eine Schwester von إِنَّ – ihr Ism ist manṣūb, ihre Khabar marfūʿ: أَظُنُّ أَنَّ حَامِدًا مَرِيضٌ, أَظُنُّ أَنَّكَ مُتْعَبٌ, أَظُنُّ أَنَّهَا ذَهَبَتْ إِلَى مَكَّةَ.",
    "Nach **قَالَ** „er sagte“ steht **إِنَّ**, nicht أَنَّ: قَالَ: إِنَّكَ أَحْسَنُ طَالِبٍ فِي الْفَصْلِ.",
    "**لِمَ** „warum?“ – allein stehend bekommt es ein h: **لِمَهْ؟** Dieses h heißt **هَاءُ السَّكْتِ**.",
    "Adjektive auf **-ān** (جَوْعَانُ، عَطْشَانُ، غَضْبَانُ) bilden das Femininum nach **فَعْلَى** (جَوْعَى) und den Plural (m. und f.) nach **فِعَالٌ** (جِيَاعٌ): الرِّجَالُ جِيَاعٌ, النِّسَاءُ جِيَاعٌ. Der Plural von كَسْلَانُ/كَسْلَى ist **كُسَالَى**: ﴿وَإِذَا قَامُوا إِلَى الصَّلَاةِ قَامُوا كُسَالَى﴾ (an-Nisāʾ 142).",
    "**هَاتِ** „gib, bring!“: يَا أَحْمَدُ هَاتِ, يَا زَيْنَبُ هَاتِي, يَا إِخْوَانُ هَاتُوا, يَا أَخَوَاتُ هَاتِينَ. **خُذْ** „nimm!“ (Befehlsform, Lektion 14). **فَفَرِحَ بِي الْمُدَرِّسُ كَثِيرًا** „So freute sich der Lehrer sehr über mich“ – فَـ „so, da“, فَرِحَ بِـ „sich freuen über“."
  ],
  examples: [
    ["ذَهَبْتِ", "du (f.) gingst"],
    ["إِحْدَى عَشْرَةَ طَالِبَةً", "elf Studentinnen"],
    ["ثَمَانِيَ عَشْرَةَ طَالِبَةً", "achtzehn Studentinnen"],
    ["أَيُّ طَالِبٍ خَرَجَ؟", "Welcher Student ging hinaus?"],
    ["أَيَّ كِتَابٍ قَرَأْتَ؟", "Welches Buch hast du gelesen?"],
    ["بِأَيِّ قَلَمٍ كَتَبْتَ؟", "Mit welchem Stift hast du geschrieben?"],
    ["أَظُنُّ أَنَّ فَاطِمَةَ غَائِبَةٌ.", "Ich glaube, Fāṭima ist abwesend."],
    ["قَالَ: إِنَّكَ أَحْسَنُ طَالِبٍ فِي الْفَصْلِ.", "Er sagte: Du bist der beste Schüler der Klasse."],
    ["آمِنَةُ جَوْعَى. النِّسَاءُ جِيَاعٌ.", "Āmina ist hungrig. Die Frauen sind hungrig."],
    ["فَرِحْتُ بِكَ.", "Ich habe mich über dich gefreut."]
  ],
  vocab: [
    ["مَجَلَّةٌ", "Zeitschrift"], ["عِمَارَةٌ", "Gebäude"], ["سُورَةٌ", "Sure"], ["شَقَّةٌ", "Wohnung"], ["كَلِمَةٌ", "Wort"],
    ["يَا بُنَيَّ", "O mein Söhnchen!"], ["فَقَطْ", "nur"], ["كَوَى يَكْوِي", "bügeln"], ["فَهِمْتُهُ جَيِّدًا", "Ich habe es gut verstanden."],
    ["زَادَكَ اللَّهُ عِلْمًا", "Möge Allah dein Wissen vermehren."], ["خَادِمٌ", "Diener"], ["مَا شَاءَ اللَّهُ", "„Was Allah will“ – Ausruf des Staunens"],
    ["رَاكِبٌ", "Fahrgast (Bus, Zug, Flugzeug)"], ["فَرِحَ يَفْرَحُ", "sich freuen, zufrieden sein"], ["جَاءَ يَجِيءُ", "kommen"],
    ["أَظُنُّ", "ich glaube, ich nehme an"], ["لِمَ", "warum?"], ["جَوْعَى", "hungrig (f.)", "جِيَاعٌ"], ["مُتْعَبٌ", "müde"], ["هَاتِ", "gib! bring!"]
  ],
  quiz: [
    { q: "Was heißt ذَهَبْتِ?", a: ["du (f.) gingst", "sie ging", "du (m.) gingst", "ich ging"], e: "ذَهَبْتِ (-ti) = du (f.); ذَهَبَتْ (-at) = sie; ذَهَبْتَ (-ta) = du (m.); ذَهَبْتُ (-tu) = ich." },
    { q: "Wie heißt „elf Studentinnen“?", a: ["إِحْدَى عَشْرَةَ طَالِبَةً", "أَحَدَ عَشَرَ طَالِبَةً", "إِحْدَى عَشَرَ طَالِبَةً", "أَحَدَ عَشْرَةَ طَالِبَةً"], e: "Bei 11 und 12 stimmen beide Teile mit dem Gezählten überein." },
    { q: "Wie heißt „fünfzehn Studentinnen“?", a: ["خَمْسَ عَشْرَةَ طَالِبَةً", "خَمْسَةَ عَشْرَةَ طَالِبَةً", "خَمْسَ عَشَرَ طَالِبَةً", "خَمْسَةَ عَشَرَ طَالِبَةً"], e: "13–19: Zehner stimmt überein (عَشْرَةَ), Einer hat das Gegenteil (خَمْسَ)." },
    { q: "In welchem Fall steht das Nomen nach أَيُّ?", a: ["majrūr – Muḍāf ilaihi", "manṣūb – Tamyīz", "marfūʿ – Fāʿil", "wie أَيُّ selbst"], e: "أَيُّ طَالِبٍ, أَيَّ كِتَابٍ, بِأَيِّ قَلَمٍ – das Nomen danach ist immer Genitiv." },
    { q: "Warum heißt es أَيَّ كِتَابٍ قَرَأْتَ؟ mit Fatḥa?", a: ["أَيَّ ist Objekt (mafʿūl bihi)", "wegen des Fragezeichens", "weil كِتَاب maskulin ist", "weil أَيّ immer manṣūb ist"], e: "أَيُّ bekommt den Fall seiner Stellung: hier Objekt von قَرَأْتَ." },
    { q: "Welcher Satz ist richtig?", a: ["أَظُنُّ أَنَّ حَامِدًا مَرِيضٌ.", "أَظُنُّ أَنَّ حَامِدٌ مَرِيضٌ.", "أَظُنُّ إِنَّ حَامِدًا مَرِيضٌ.", "أَظُنُّ أَنَّ حَامِدًا مَرِيضًا."], e: "أَنَّ ist eine Schwester von إِنَّ: Ism manṣūb, Khabar marfūʿ." },
    { q: "Welche Partikel steht nach قَالَ?", a: ["إِنَّ", "أَنَّ", "لَعَلَّ", "كَأَنَّ"], e: "قَالَ: إِنَّكَ أَحْسَنُ طَالِبٍ – nach „sagen“ steht إِنَّ." },
    { q: "Was ist das h in لِمَهْ؟", a: ["هَاءُ السَّكْتِ – ein Pausen-h", "ein Pronomen „ihn“", "das Femininzeichen", "Teil der Wurzel"], e: "لِمَ „warum?“ allein gesprochen: لِمَهْ." },
    { q: "Was ist das Femininum von جَوْعَانُ?", a: ["جَوْعَى", "جَوْعَانَةٌ", "جِيَاعٌ", "جَائِعَةٌ"], e: "Adjektive auf -ān: Femininum nach فَعْلَى, Plural nach فِعَالٌ (جِيَاعٌ)." },
    { q: "Wie heißt „gib!“ zu mehreren Frauen?", a: ["هَاتِينَ", "هَاتُوا", "هَاتِي", "هَاتِ"], e: "هَاتِ (m.), هَاتِي (f.), هَاتُوا (m. Pl.), هَاتِينَ (f. Pl.)." }
  ],
  irab: [
    { s: "أَظُنُّ أَنَّ حَامِدًا مَرِيضٌ.", w: 2, a: ["اسْمُ أَنَّ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "خَبَرُ أَنَّ"], e: "أَنَّ ist eine Schwester von إِنَّ; حَامِدًا ist ihr Ism." },
    { s: "أَيُّ طَالِبٍ خَرَجَ؟", w: 0, a: ["اسْمُ اسْتِفْهَامٍ مُبْتَدَأٌ مَرْفُوعٌ، وَهُوَ مُضَافٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "فَاعِلٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ"], e: "Das Fragewort steht am Satzanfang als Mubtadaʾ; خَرَجَ ist die Khabar." },
    { s: "أَيَّ كِتَابٍ قَرَأْتَ؟", w: 0, a: ["اسْمُ اسْتِفْهَامٍ مَفْعُولٌ بِهِ مُقَدَّمٌ مَنْصُوبٌ، وَهُوَ مُضَافٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "فَاعِلٌ", "ظَرْفٌ"], e: "أَيَّ ist das vorangestellte Objekt von قَرَأْتَ." },
    { s: "بِأَيِّ قَلَمٍ كَتَبْتَ؟", w: 1, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "اسْمٌ مَجْرُورٌ بِالْبَاءِ", "مَفْعُولٌ بِهِ", "نَعْتٌ"], e: "قَلَمٍ folgt auf das Muḍāf أَيِّ → Muḍāf ilaihi." }
  ],
  model: [
    { s: "أَظُنُّ أَنَّكَ مُتْعَبٌ.", de: "Ich glaube, du bist müde.", words: [
      ["أَظُنُّ", "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ بِالضَّمَّةِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ أَنَا", "Präsens im Indikativ; das Subjekt „ich“ steckt im Verb"],
      ["أَنَّكَ", "أَنَّ حَرْفُ تَوْكِيدٍ وَنَصْبٍ، وَالْكَافُ ضَمِيرٌ فِي مَحَلِّ نَصْبٍ اسْمُ أَنَّ", "أَنَّ „dass“ + ـكَ als ihr Ism an der Stelle eines Akkusativs"],
      ["مُتْعَبٌ", "خَبَرُ أَنَّ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Khabar von anna im Nominativ"]
    ] }
  ]
},

{ id: "b2-07", book: 2, n: "7", title: "Ihr- und Wir-Formen, kāna, dhū mit Artikel", ar: "كَانَ",
  grammar: [
    "Weitere Formen des Perfekts: **ذَهَبْتُمْ** (dhahab-tum) „ihr (m.) gingt“: مَاذَا أَكَلْتُمْ يَا إِخْوَانُ؟ – **ذَهَبْتُنَّ** (dhahab-tunna) „ihr (f.) gingt“: أَقَرَأْتُنَّ هَذِهِ الْمَجَلَّةَ يَا أَخَوَاتُ؟ – **ذَهَبْنَا** (dhahab-nā) „wir gingen“: مَا سَمِعْنَا الْأَذَانَ.",
    "Objekt-Pronomen werden direkt an das Verb gehängt: رَأَيْتُهُ „ich sah ihn“, رَأَيْتَهُ „du (m.) sahst ihn“, رَأَيْتِهِ „du (f.) sahst ihn“. Nach i wird ـهُ zu **ـهِ** (Vokalharmonie): بَيْتُهُ aber فِي بَيْتِهِ; مِنْهُ aber فِيهِ.",
    "Nach der Endung **ـتُمْ** wird ein **wāw** eingefügt, bevor ein Objekt-Pronomen folgt: رَأَيْتُمُوهُ „ihr saht ihn“, رَأَيْتُمُوهُمْ „ihr saht sie (m. Pl.)“, رَأَيْتُمُوهَا, رَأَيْتُمُوهُنَّ; غَسَلْتُمُوهُ, قَتَلْتُمُوهُمْ, سَأَلْتُمُوهَا.",
    "**كَانَ** „er war“ steht vor einem Nominalsatz: بِلَالٌ فِي الْفَصْلِ → كَانَ بِلَالٌ فِي الْفَصْلِ; zainab: كَانَتْ زَيْنَبُ فِي الْمَطْبَخِ. Ist die Khabar eine Präpositionalgruppe (فِي الْمَكْتَبَةِ، تَحْتَ الْكِتَابِ), ändert sie sich nicht. Ist sie ein einzelnes Wort, wird sie **manṣūb**: بِلَالٌ مَرِيضٌ → كَانَ بِلَالٌ مَرِيضًا (mehr in Lektion 25).",
    "**ذُو** mit bestimmtem Nomen: رَجُلٌ ذُو لِحْيَةٍ „ein bärtiger Mann“, aber الرَّجُلُ ذُو اللِّحْيَةِ „der bärtige Mann“. ذُو ist Muḍāf und kann keinen Artikel bekommen – deshalb bekommt das Muḍāf ilaihi den Artikel: الْكِتَابُ ذُو الْغِلَافِ الْجَمِيلِ غَالٍ, الْمَسْجِدُ ذُو الْمَنَارَةِ الْوَاحِدَةِ قَدِيمٌ.",
    "Das Sukūn des **mīm** in أَنْتُمْ, هُمْ, كِتَابُكُمْ, ذَهَبْتُمْ wird vor Hamzat al-waṣl zum **Ḍamma**: بَيْتُكُمُ الْجَدِيدُ, أَرَأَيْتُمُ الْإِمَامَ؟, كِتَابُهُمُ الْقَدِيمُ, أَسَأَلْتُمُ ابْنَهُ؟",
    "**أَبْشِرْ** „Freu dich über die gute Nachricht“ – Antwort auf eine Bitte: „Keine Sorge, du bekommst, was du möchtest.“",
    "**Brüche** von ⅓ bis ⅒ nach dem Schema **فُعْلٌ**: ثُلُثٌ ein Drittel, رُبْعٌ ein Viertel, خُمْسٌ ein Fünftel … Meist fällt das Ḍamma des zweiten Buchstabens weg; ثُلُثٌ und سُدُسٌ behalten es. نِصْفٌ heißt „halb“."
  ],
  examples: [
    ["مَاذَا أَكَلْتُمْ يَا إِخْوَانُ؟", "Was habt ihr gegessen, Brüder?"],
    ["أَقَرَأْتُنَّ هَذِهِ الْمَجَلَّةَ يَا أَخَوَاتُ؟", "Habt ihr diese Zeitschrift gelesen, Schwestern?"],
    ["مَا سَمِعْنَا الْأَذَانَ.", "Wir haben den Gebetsruf nicht gehört."],
    ["رَأَيْتِهِ", "du (f.) sahst ihn"],
    ["رَأَيْتُمُوهُ", "ihr saht ihn"],
    ["كَانَ الْمُدَرِّسُ فِي الْمَكْتَبَةِ.", "Der Lehrer war in der Bibliothek."],
    ["كَانَتْ زَيْنَبُ فِي الْمَطْبَخِ.", "Zainab war in der Küche."],
    ["كَانَ بِلَالٌ مَرِيضًا.", "Bilāl war krank."],
    ["الرَّجُلُ ذُو اللِّحْيَةِ", "der bärtige Mann"],
    ["فِي قَرْيَتِنَا مَسْجِدٌ ذُو مَنَارَةٍ وَاحِدَةٍ.", "In unserem Dorf ist eine Moschee mit einem Minarett."],
    ["بَيْتُكُمُ الْجَدِيدُ", "euer neues Haus"]
  ],
  vocab: [
    ["مِكْنَسَةٌ", "Besen (auch Staubsauger)", "مَكَانِسُ"], ["نَظَّارَةٌ", "Brille"], ["صُورَةٌ", "Bild", "صُوَرٌ"], ["صَابُونٌ", "Seife"],
    ["عَصِيرٌ", "Saft"], ["كُرَةُ الْقَدَمِ", "Fußball"], ["سُلَّمٌ", "Treppe"], ["عَجَلَةٌ", "Rad (vom Auto o. Ä.)"], ["إِذَاعَةٌ", "Rundfunk, Radio"],
    ["الْبَارِحَةَ", "gestern Abend"], ["بُرْتُقَالٌ", "Orange"], ["كُرَةُ السَّلَّةِ", "Basketball"], ["الْأُسْبُوعُ الْمَاضِي", "letzte Woche"],
    ["مَنَارَةٌ", "Minarett", "مَنَائِرُ"], ["لِحْيَةٌ", "Bart", "لِحًى / لُحًى"], ["عَالٍ", "hoch, laut (f. عَالِيَةٌ)"], ["مُلَوَّنٌ", "farbig"],
    ["صَبَاحٌ", "Morgen"], ["نِصْفٌ", "halb, Hälfte"], ["مَشَى", "er ging (zu Fuß)"], ["أَخَذَ يَأْخُذُ", "nehmen"],
    ["وَضَعَ يَضَعُ", "setzen, stellen, legen"], ["وَجَدَ يَجِدُ", "finden"], ["بَحَثَ عَنْ يَبْحَثُ", "suchen"], ["ثُلُثٌ", "ein Drittel"], ["أَبْشِرْ", "Freu dich über die gute Nachricht!"]
  ],
  quiz: [
    { q: "Was heißt ذَهَبْتُمْ?", a: ["ihr (m.) gingt", "ihr (f.) gingt", "wir gingen", "sie (m.) gingen"], e: "-tum = ihr (m.), -tunna = ihr (f.), -nā = wir." },
    { q: "Wie heißt „wir hörten den Gebetsruf nicht“?", a: ["مَا سَمِعْنَا الْأَذَانَ.", "مَا سَمِعُوا الْأَذَانَ.", "مَا سَمِعْتُمُ الْأَذَانَ.", "لَيْسَ سَمِعْنَا الْأَذَانَ."], e: "سَمِعْنَا = wir hörten; verneint mit مَا." },
    { q: "Warum heißt es رَأَيْتِهِ und nicht رَأَيْتِهُ?", a: ["Nach i wird ـهُ zu ـهِ (Vokalharmonie).", "Weil das Objekt feminin ist.", "Weil es majrūr ist.", "Beides ist falsch."], e: "Ebenso فِي بَيْتِهِ, فِيهِ, بِهِ." },
    { q: "Wie heißt „ihr saht ihn“?", a: ["رَأَيْتُمُوهُ", "رَأَيْتُمْهُ", "رَأَيْتُمُهُ", "رَأَيْتُوهُ"], e: "Zwischen ـتُمْ und ein Objekt-Pronomen kommt ein wāw." },
    { q: "Welcher Satz ist richtig?", a: ["كَانَ بِلَالٌ مَرِيضًا.", "كَانَ بِلَالًا مَرِيضٌ.", "كَانَ بِلَالٌ مَرِيضٌ.", "كَانَ بِلَالًا مَرِيضًا."], e: "Nach كَانَ bleibt der Ism im Nominativ, eine Khabar aus einem Wort wird manṣūb." },
    { q: "Was geschieht mit فِي الْفَصْلِ in كَانَ بِلَالٌ فِي الْفَصْلِ?", a: ["nichts – eine Präpositionalgruppe ändert sich nicht", "es wird manṣūb", "es wird marfūʿ", "فِي fällt weg"], e: "Nur eine Khabar aus einem Wort wird nach كَانَ manṣūb." },
    { q: "Wie heißt „der bärtige Mann“?", a: ["الرَّجُلُ ذُو اللِّحْيَةِ", "الرَّجُلُ الذُّو لِحْيَةٍ", "الرَّجُلُ ذُو لِحْيَةٍ", "رَجُلٌ ذُو اللِّحْيَةِ"], e: "ذُو kann keinen Artikel bekommen; das Muḍāf ilaihi bekommt ihn." },
    { q: "Wie spricht man بَيْتُكُمْ vor الْجَدِيدُ?", a: ["baitukumu-l-jadīdu – das mīm bekommt Ḍamma", "baitukumi-l-jadīdu – Kasra", "baitukum-l-jadīdu – ohne Vokal", "baitukuma-l-jadīdu – Fatḥa"], e: "Das Sukūn des mīm wird vor Hamzat al-waṣl zu Ḍamma." },
    { q: "Was heißt رُبْعٌ?", a: ["ein Viertel", "vier", "vierter", "vierzig"], e: "Brüche nach فُعْلٌ: ثُلُثٌ, رُبْعٌ, خُمْسٌ, سُدُسٌ …" }
  ],
  irab: [
    { s: "كَانَ بِلَالٌ مَرِيضًا.", w: 1, a: ["اسْمُ كَانَ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "فَاعِلٌ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "خَبَرُ كَانَ"], e: "Die Mubtadaʾ heißt nach كَانَ ismu kāna und bleibt im Nominativ." },
    { s: "كَانَ بِلَالٌ مَرِيضًا.", w: 2, a: ["خَبَرُ كَانَ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "حَالٌ مَنْصُوبٌ", "نَعْتٌ مَنْصُوبٌ"], e: "Die Khabar von kāna steht im Akkusativ." },
    { s: "رَأَيْتُمُوهُ فِي الْمَسْجِدِ.", w: 0, a: ["فِعْلٌ مَاضٍ، وَالتَّاءُ فَاعِلٌ، وَالْمِيمُ لِلْجَمْعِ، وَالْوَاوُ لِلْإِشْبَاعِ، وَالْهَاءُ مَفْعُولٌ بِهِ", "فِعْلٌ مَاضٍ، وَالْوَاوُ فَاعِلٌ، وَالْهَاءُ مَفْعُولٌ بِهِ", "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ", "فِعْلُ أَمْرٍ"], e: "Subjekt ist das تُ(مْ); das wāw ist nur ein Bindelaut, ـهُ das Objekt." },
    { s: "الرَّجُلُ ذُو اللِّحْيَةِ إِمَامٌ.", w: 1, a: ["نَعْتٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الْوَاوُ، وَهُوَ مُضَافٌ", "خَبَرٌ مَرْفُوعٌ", "مُبْتَدَأٌ ثَانٍ", "مُضَافٌ إِلَيْهِ"], e: "ذُو beschreibt الرَّجُلُ (Naʿt) und hat als eines der „fünf Nomen“ ein wāw im Nominativ." }
  ],
  model: [
    { s: "كَانَتْ زَيْنَبُ فِي الْمَطْبَخِ.", de: "Zainab war in der Küche.", words: [
      ["كَانَتْ", "فِعْلٌ مَاضٍ نَاقِصٌ مَبْنِيٌّ عَلَى الْفَتْحِ، وَالتَّاءُ لِلتَّأْنِيثِ", "„Unvollständiges“ Verb im Perfekt; تْ = Femininzeichen"],
      ["زَيْنَبُ", "اسْمُ كَانَ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Ism von kāna im Nominativ"],
      ["فِي الْمَطْبَخِ", "جَارٌّ وَمَجْرُورٌ فِي مَحَلِّ نَصْبٍ خَبَرُ كَانَ", "Präpositionalgruppe an der Stelle eines Akkusativs: Khabar von kāna"]
    ] }
  ]
},

{ id: "b2-08", book: 2, n: "8", title: "Wiederholung: das Perfekt mit allen Personen", ar: "دَرْسُ مُرَاجَعَةٍ",
  grammar: [
    "Diese Lektion wiederholt das **Perfekt (māḍī) mit dem isnād** für alle Pronomen außer dem Dual (der Dual folgt in Lektion 30).",
    "3. Person: **ذَهَبَ** er ging (Subjekt: unsichtbares Pronomen هُوَ), **ذَهَبَتْ** sie ging (unsichtbar هِيَ; تْ = Femininzeichen), **ذَهَبُوا** sie (m.) gingen (Subjekt: wāw), **ذَهَبْنَ** sie (f.) gingen (Subjekt: nūn).",
    "2. Person: **ذَهَبْتَ** du (m.), **ذَهَبْتِ** du (f.), **ذَهَبْتُمْ** ihr (m.), **ذَهَبْتُنَّ** ihr (f.) – Subjekt ist jeweils das angehängte tāʾ.",
    "1. Person: **ذَهَبْتُ** ich ging (Subjekt: tu), **ذَهَبْنَا** wir gingen (Subjekt: nā).",
    "Vor den Endungen mit Konsonant (ـتُ، ـتَ، ـتِ، ـتُمْ، ـتُنَّ، ـنَا، ـنَ) bekommt der dritte Radikal ein **Sukūn**: ذَهَبْتُ. Vor ـُوا bekommt er ein **Ḍamma**: ذَهَبُوا. Sonst bleibt das **Fatḥa**: ذَهَبَ، ذَهَبَتْ.",
    "In der Grammatikanalyse sagt man z. B.: ذَهَبْتُ – فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ. Und bei ذَهَبَ ohne Nomen: وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هُوَ."
  ],
  examples: [
    ["ذَهَبَ – ذَهَبَتْ – ذَهَبُوا – ذَهَبْنَ", "er ging – sie ging – sie (m.) gingen – sie (f.) gingen"],
    ["ذَهَبْتَ – ذَهَبْتِ – ذَهَبْتُمْ – ذَهَبْتُنَّ", "du (m.) – du (f.) – ihr (m.) – ihr (f.) gingt"],
    ["ذَهَبْتُ – ذَهَبْنَا", "ich ging – wir gingen"],
    ["خَرَجْنَا مِنَ الْمَسْجِدِ.", "Wir gingen aus der Moschee hinaus."],
    ["أَيْنَ جَلَسْتُنَّ يَا أَخَوَاتُ؟", "Wo habt ihr gesessen, Schwestern?"]
  ],
  vocab: [],
  quiz: [
    { q: "Was ist in ذَهَبْنَا der Fāʿil?", a: ["das angehängte نَا", "ein unsichtbares Pronomen", "das بَ", "es gibt keinen"], e: "ـنَا = wir; es ist selbst das Subjekt." },
    { q: "Welche Form heißt „sie (f. Pl.) gingen“?", a: ["ذَهَبْنَ", "ذَهَبْنَا", "ذَهَبْتُنَّ", "ذَهَبَتْ"], e: "ذَهَبْنَ (nūn der Frauen) – nicht zu verwechseln mit ذَهَبْنَا (wir)." },
    { q: "Welche Form heißt „ihr (f.) gingt“?", a: ["ذَهَبْتُنَّ", "ذَهَبْتُمْ", "ذَهَبْنَ", "ذَهَبْتِ"], e: "-tunna = ihr (f.), -tum = ihr (m.)." },
    { q: "Welches Subjekt hat ذَهَبَتْ ohne folgendes Nomen?", a: ["ein unsichtbares Pronomen (هِيَ)", "das تْ", "das Nomen davor", "keines"], e: "Das تْ ist nur Femininzeichen; das Subjekt ist ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هِيَ." },
    { q: "Welchen Vokal hat der dritte Radikal in ذَهَبُوا?", a: ["Ḍamma", "Sukūn", "Fatḥa", "Kasra"], e: "Vor dem wāw der Gruppe steht Ḍamma." },
    { q: "Welchen Vokal hat der dritte Radikal in ذَهَبْتُ?", a: ["Sukūn", "Fatḥa", "Ḍamma", "Kasra"], e: "Vor Endungen, die mit einem Konsonanten beginnen, steht Sukūn." },
    { q: "Wie heißt „ihr (m.) habt gegessen“?", a: ["أَكَلْتُمْ", "أَكَلُوا", "أَكَلْتُنَّ", "أَكَلْنَا"], e: "أَكَلْتُمْ – Endung ـتُمْ." },
    { q: "Wie heißt „du (f.) hast verstanden“?", a: ["فَهِمْتِ", "فَهِمَتْ", "فَهِمْتَ", "فَهِمْتُ"], e: "ـتِ = du (f.)." }
  ],
  irab: [
    { s: "ذَهَبْنَا إِلَى الْمَسْجِدِ.", w: 0, a: ["فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَنَا ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَنَا مَفْعُولٌ بِهِ", "فِعْلٌ مُضَارِعٌ", "فِعْلٌ مَاضٍ، وَالنُّونُ نُونُ النِّسْوَةِ"], e: "ـنَا ist hier Subjekt (wir gingen)." },
    { s: "ذَهَبْنَ إِلَى الْمَدْرَسَةِ.", w: 0, a: ["فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَنُونُ النِّسْوَةِ ضَمِيرٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "فِعْلٌ مَاضٍ، وَنَا فَاعِلٌ", "فِعْلٌ مَاضٍ، وَالْفَاعِلُ مُسْتَتِرٌ", "فِعْلُ أَمْرٍ"], e: "Das nūn der Frauen ist das Subjekt." },
    { s: "خَرَجَ مِنَ الْبَيْتِ.", w: 0, a: ["فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ، وَالْفَاعِلُ ضَمِيرٌ مُسْتَتِرٌ تَقْدِيرُهُ هُوَ", "فِعْلٌ مَاضٍ، وَالْفَاعِلُ الْبَيْتِ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ", "مُبْتَدَأٌ"], e: "Ohne folgendes Nomen ist das Subjekt unsichtbar: „er“." }
  ],
  model: [
    { s: "أَكَلْتُمُ الْخُبْزَ.", de: "Ihr habt das Brot gegessen.", words: [
      ["أَكَلْتُمُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ، وَالْمِيمُ عَلَامَةُ الْجَمْعِ", "Perfekt; تُ(مْ) ist das Subjekt „ihr“, das mīm zeigt den Plural (vor al- mit Ḍamma)"],
      ["الْخُبْزَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "Objekt im Akkusativ"]
    ] }
  ]
},

{ id: "b2-09", book: 2, n: "9", title: "Femininer Plural im Akkusativ, Staunen, alladhīna", ar: "مَا أَجْمَلَ!",
  grammar: [
    "Der **gesunde feminine Plural** (-āt) hat im Akkusativ **-i** statt -a: رَأَيْتُ الْأَبْنَاءَ وَالْبَنَاتِ, خَلَقَ اللَّهُ السَّمَاوَاتِ وَالْأَرْضَ, إِنَّ الْإِخْوَةَ وَالْأَخَوَاتِ فِي الْبَيْتِ. Akkusativ und Genitiv sind hier gleich: إِنَّ الطَّالِبَاتِ فِي الْحَافِلَاتِ.",
    "„mich“ heißt am Verb **ـنِي**: رَأَيْتَنِي „du sahst mich“, خَلَقَنِي اللَّهُ, سَأَلَنِي الْمُدَرِّسُ. Das eingeschobene n heißt **نُونُ الْوِقَايَةِ** („nūn des Schutzes“) – es schützt den letzten Vokal des Verbs (raʾaita-n-ī, raʾaiti-n-ī).",
    "**Verb des Staunens** (فِعْلُ التَّعَجُّبِ) nach dem Muster **مَا أَفْعَلَهُ!**: مَا أَجْمَلَ هَذِهِ السَّيَّارَةَ! „Wie schön ist dieses Auto!“, مَا أَطْيَبَكَ!, مَا أَفْقَرَهَا!, مَا أَكْثَرَ النُّجُومَ!, مَا أَسْهَلَ هَذَا الدَّرْسَ! Das Nomen danach ist manṣūb.",
    "Nach **يَا** hat ein einfaches Nomen nur ein Ḍamma (يَا حَامِدُ). Ist es **Muḍāf**, wird es **manṣūb**: يَا بِنْتَ بِلَالٍ!, يَا عَبْدَ اللَّهِ!, يَا رَبَّ الْكَعْبَةِ!, يَا رَبَّنَا!, يَا أَبَا بَكْرٍ! (أَبُو → أَبَا).",
    "Nach **كَمْ** steht das Nomen im Singular manṣūb (كَمْ رِيَالًا عِنْدَكَ؟). Steht eine Präposition vor كَمْ, darf es auch **majrūr** sein: بِكَمْ رِيَالًا / رِيَالٍ هَذَا؟, فِي كَمْ يَوْمًا / يَوْمٍ؟",
    "Vor **مَا** mit Präposition fällt das Alif weg: بِمَ womit?, لِمَ warum?, مِمَّ wovon? (min + mā), عَمَّ worüber? (ʿan + mā).",
    "Relativpronomen im Plural: **الَّذِينَ** (m.) und **اللَّاتِي** (f.): الرِّجَالُ الَّذِينَ خَرَجُوا مِنْ مَكْتَبِ الْمُدِيرِ مُدَرِّسُونَ جُدُدٌ, الطَّالِبَاتُ اللَّاتِي جَلَسْنَ أَمَامَ الْمُدَرِّسَةِ بَنَاتُ الْمُدِيرَةِ.",
    "Die Fragepartikel **أَ** vor الـ wird zu **آ**: آلْمُدَرِّسُ قَالَ لَكَ؟, آلْيَوْمَ رَأَيْتَهُ? Das End-ى (gesprochen ā) wird vor einem angehängten Pronomen zu ا: مَعْنًى → مَعْنَاهُ, كَوَى → كَوَاهُ.",
    "Eine Zahl als **Adjektiv** steht nach dem Gezählten: الطُّلَّابُ الْجُدُدُ الْخَمْسَةُ, الْكُتُبُ الْأَرْبَعَةُ, الصِّحَاحُ السِّتَّةُ. **Vorangestelltes Objekt** betont: بِلَالًا رَأَيْتُ „Bilāl war es, den ich sah“; أَإِلَى الْمُدِيرِ ذَهَبْتُمْ؟"
  ],
  examples: [
    ["رَأَيْتُ الْأَبْنَاءَ وَالْبَنَاتِ.", "Ich sah die Söhne und die Töchter."],
    ["خَلَقَ اللَّهُ السَّمَاوَاتِ وَالْأَرْضَ.", "Allah erschuf die Himmel und die Erde."],
    ["سَأَلَنِي الْمُدَرِّسُ.", "Der Lehrer fragte mich."],
    ["مَا أَجْمَلَ هَذِهِ السَّيَّارَةَ!", "Wie schön ist dieses Auto!"],
    ["مَا أَسْهَلَ هَذَا الدَّرْسَ!", "Wie leicht ist diese Lektion!"],
    ["يَا عَبْدَ اللَّهِ!", "O Diener Allahs!"],
    ["يَا أَبَا بَكْرٍ!", "O Abū Bakr!"],
    ["بِكَمْ رِيَالًا هَذَا؟", "Wie viel Riyal kostet das?"],
    ["الرِّجَالُ الَّذِينَ خَرَجُوا مُدَرِّسُونَ جُدُدٌ.", "Die Männer, die hinausgingen, sind neue Lehrer."],
    ["آلْمُدَرِّسُ قَالَ لَكَ؟", "Hat es dir der Lehrer gesagt?"],
    ["الْكُتُبُ الْأَرْبَعَةُ", "die vier Bücher"],
    ["بِلَالًا رَأَيْتُ.", "Bilāl war es, den ich sah."]
  ],
  vocab: [
    ["قَائِمَةٌ", "Liste"], ["عَلَاقَةٌ", "Verbindung, Beziehung"], ["مَعْنًى", "Bedeutung"], ["لَحْظَةٌ", "Moment"],
    ["عِدَّةُ أَسْئِلَةٍ", "eine Anzahl von Fragen"], ["حَضَرَ", "anwesend sein, teilnehmen"], ["رَنَّ يَرِنُّ", "klingeln"],
    ["خَلَقَ يَخْلُقُ", "erschaffen"], ["رَفَعَ يَرْفَعُ", "erheben, hochheben"], ["أَحْسَنْتَ", "Gut gemacht!"],
    ["طِينٌ", "Schlamm, Lehm"], ["جَرَسٌ", "Glocke"], ["نَارٌ", "Feuer (f.)"], ["عَاصِمَةٌ", "Hauptstadt"], ["مُخْتَلِطٌ", "vermischt"],
    ["كَذَلِكَ", "so, auf diese Weise"], ["جَانٌّ", "Dschinn"], ["حَدِيدٌ", "Eisen"], ["هَكَذَا", "so, so wie dies"],
    ["الَّذِينَ", "die (m. Pl., Relativpronomen)"], ["اللَّاتِي", "die (f. Pl., Relativpronomen)"]
  ],
  quiz: [
    { q: "Welcher Satz ist richtig?", a: ["رَأَيْتُ الْبَنَاتِ.", "رَأَيْتُ الْبَنَاتَ.", "رَأَيْتُ الْبَنَاتُ.", "رَأَيْتُ الْبَنَاتًا."], e: "Der gesunde feminine Plural hat im Akkusativ -i." },
    { q: "Wie heißt „Der Lehrer fragte mich“?", a: ["سَأَلَنِي الْمُدَرِّسُ.", "سَأَلَي الْمُدَرِّسُ.", "سَأَلَ أَنَا الْمُدَرِّسُ.", "سَأَلْتُ الْمُدَرِّسَ."], e: "„mich“ = ـنِي mit nūn al-wiqāya." },
    { q: "Wozu dient das n in رَأَيْتَنِي?", a: ["Es schützt den letzten Vokal des Verbs (nūn al-wiqāya).", "Es ist das Subjekt.", "Es zeigt den Plural.", "Es ist das Objekt „uns“."], e: "Ohne das n würden raʾaita und raʾaiti gleich klingen." },
    { q: "Wie heißt „Wie leicht ist diese Lektion!“?", a: ["مَا أَسْهَلَ هَذَا الدَّرْسَ!", "مَا أَسْهَلُ هَذَا الدَّرْسُ!", "مَا سَهْلٌ هَذَا الدَّرْسُ!", "كَمْ أَسْهَلَ هَذَا الدَّرْسَ!"], e: "مَا أَفْعَلَ + Nomen im Akkusativ." },
    { q: "Welche Anrede ist richtig?", a: ["يَا عَبْدَ اللَّهِ!", "يَا عَبْدُ اللَّهِ!", "يَا عَبْدِ اللَّهِ!", "يَا عَبْدًا اللَّهِ!"], e: "Ein Muḍāf nach يَا steht im Akkusativ." },
    { q: "Welche Form hat أَبُو nach يَا?", a: ["أَبَا", "أَبُو", "أَبِي", "أَبَ"], e: "يَا أَبَا بَكْرٍ – manṣūb mit Alif (eines der „fünf Nomen“)." },
    { q: "Was heißt عَمَّ؟", a: ["worüber?", "womit?", "wovon?", "warum?"], e: "عَنْ + مَا → عَمَّ." },
    { q: "Wie heißt der Plural von الَّتِي?", a: ["اللَّاتِي", "الَّذِينَ", "اللَّتَانِ", "الَّذِي"], e: "الَّذِي → الَّذِينَ, الَّتِي → اللَّاتِي." },
    { q: "Wie wird أَ + الْمُدَرِّسُ geschrieben?", a: ["آلْمُدَرِّسُ", "أَالْمُدَرِّسُ", "أَلْمُدَرِّسُ", "أَمُدَرِّسُ"], e: "Das Frage-أ vor al- wird zu آ." },
    { q: "Wie heißt „seine Bedeutung“?", a: ["مَعْنَاهُ", "مَعْنَيهُ", "مَعْنًاهُ", "مَعْنِيهِ"], e: "End-ى wird vor einem Pronomen zu ا." },
    { q: "Wie heißt „die vier Bücher“?", a: ["الْكُتُبُ الْأَرْبَعَةُ", "الْأَرْبَعَةُ الْكُتُبُ", "أَرْبَعَةُ الْكُتُبِ", "الْكُتُبُ الْأَرْبَعُ"], e: "Als Adjektiv steht die Zahl nach dem Gezählten; bei m. Gezähltem mit ة." }
  ],
  irab: [
    { s: "خَلَقَ اللَّهُ السَّمَاوَاتِ وَالْأَرْضَ.", w: 2, a: ["مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْكَسْرَةُ لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْفَتْحَةِ", "اسْمٌ مَجْرُورٌ", "مُضَافٌ إِلَيْهِ"], e: "Beim femininen Plural ist das Zeichen des Akkusativs das Kasra." },
    { s: "مَا أَجْمَلَ السَّمَاءَ!", w: 1, a: ["فِعْلٌ مَاضٍ جَامِدٌ لِلتَّعَجُّبِ مَبْنِيٌّ عَلَى الْفَتْحِ", "خَبَرٌ مَرْفُوعٌ", "أَفْعَلُ التَّفْضِيلِ", "اسْمٌ مَنْصُوبٌ"], e: "أَجْمَلَ ist hier ein (starres) Verb des Staunens." },
    { s: "يَا عَبْدَ اللَّهِ!", w: 1, a: ["مُنَادًى مَنْصُوبٌ لِأَنَّهُ مُضَافٌ", "مُنَادًى مَبْنِيٌّ عَلَى الضَّمِّ", "مَفْعُولٌ بِهِ", "مُبْتَدَأٌ"], e: "Das angerufene Nomen (Munādā) ist Muḍāf → Akkusativ." },
    { s: "سَأَلَنِي الْمُدَرِّسُ.", w: 0, a: ["فِعْلٌ مَاضٍ، وَالنُّونُ لِلْوِقَايَةِ، وَالْيَاءُ ضَمِيرٌ فِي مَحَلِّ نَصْبٍ مَفْعُولٌ بِهِ", "فِعْلٌ مَاضٍ، وَالْيَاءُ فَاعِلٌ", "فِعْلٌ مَاضٍ، وَنِي فَاعِلٌ", "فِعْلٌ مُضَارِعٌ"], e: "Subjekt ist الْمُدَرِّسُ; ـنِي enthält das Schutz-n und das Objekt „mich“." }
  ],
  model: [
    { s: "رَأَيْتُ الطَّالِبَاتِ.", de: "Ich sah die Studentinnen.", words: [
      ["رَأَيْتُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى السُّكُونِ، وَالتَّاءُ ضَمِيرٌ فِي مَحَلِّ رَفْعٍ فَاعِلٌ", "Perfekt; تُ ist das Subjekt"],
      ["الطَّالِبَاتِ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْكَسْرَةُ نِيَابَةً عَنِ الْفَتْحَةِ لِأَنَّهُ جَمْعُ مُؤَنَّثٍ سَالِمٌ", "Objekt; Akkusativzeichen ist beim femininen Plural das Kasra (statt Fatḥa)"]
    ] }
  ]
},

{ id: "b2-10", book: 2, n: "10", title: "Das Präsens (muḍāriʿ), Zahlen 21–30", ar: "الْفِعْلُ الْمُضَارِعُ",
  grammar: [
    "Das arabische Verb hat nur drei Formen: **Perfekt** الْمَاضِي, **Präsens/Futur** الْمُضَارِعُ und **Befehl** الْأَمْرُ (Lektion 14). Im Muḍāriʿ steht einer der vier Buchstaben **أ، ت، ي، ن** vor dem Verb: كَتَبَ „er schrieb“ → **يَكْتُبُ** „er schreibt / schreibt gerade / wird schreiben“.",
    "Im Muḍāriʿ hat der **erste Radikal ein Sukūn** (يَكْتُبُ), der **dritte ein Ḍamma**. Der zweite Radikal kann in beiden Formen jeden der drei Vokale haben. Danach teilt man die Verben in Gruppen ein; vier davon lernen wir hier:",
    "**a–u**: كَتَبَ يَكْتُبُ, قَتَلَ يَقْتُلُ, سَجَدَ يَسْجُدُ. – **a–i**: جَلَسَ يَجْلِسُ, ضَرَبَ يَضْرِبُ, غَسَلَ يَغْسِلُ. – **a–a**: ذَهَبَ يَذْهَبُ, فَتَحَ يَفْتَحُ, قَرَأَ يَقْرَأُ. – **i–a**: فَهِمَ يَفْهَمُ, شَرِبَ يَشْرَبُ, حَفِظَ يَحْفَظُ.",
    "Eine feste Regel für die Gruppe gibt es nicht – man lernt sie mit jedem Verb. Deshalb nennt man ein Verb immer mit beiden Formen: **كَتَبَ يَكْتُبُ**.",
    "**Zahlen 21–30**: Die Teile werden mit **وَ** verbunden: وَاحِدٌ وَعِشْرُونَ طَالِبًا. Der Einer hat Tanwīn (ثَلَاثَةٌ وَعِشْرُونَ), außer **اثْنَانِ**. وَاحِدٌ und اثْنَانِ sind bei männlichem Gezählten maskulin, 3–9 dagegen feminin: ثَلَاثَةٌ وَعِشْرُونَ رَجُلًا. Das Gezählte steht im Singular manṣūb.",
    "**إِلَّا** „außer“ – das Nomen danach ist manṣūb: التَّاسِعَةُ إِلَّا رُبْعًا „Viertel vor neun“, السَّاعَةُ الْوَاحِدَةُ إِلَّا عَشْرَ دَقَائِقَ „zehn vor eins“, السَّاعَةُ الْخَامِسَةُ إِلَّا دَقِيقَةً وَاحِدَةً.",
    "**لَعَلَّ** hat zwei Bedeutungen: „ich hoffe“ (**التَّرَجِّي**) und „ich fürchte“ (**الْإِشْفَاقُ**): لَعَلَّهُ يَرْجِعُ الْيَوْمَ مُتَأَخِّرًا „Ich fürchte, er kommt heute spät zurück.“",
    "**بَيْنَ** „zwischen“ ist Muḍāf, das Nomen danach majrūr: جَلَسَ حَامِدٌ بَيْنَ بِلَالٍ وَفَيْصَلٍ. Bei Pronomen wird بَيْنَ wiederholt: هَذَا بَيْنِي وَبَيْنَكَ."
  ],
  examples: [
    ["كَتَبَ – يَكْتُبُ", "er schrieb – er schreibt"],
    ["جَلَسَ – يَجْلِسُ", "er saß – er sitzt"],
    ["فَتَحَ – يَفْتَحُ", "er öffnete – er öffnet"],
    ["شَرِبَ – يَشْرَبُ", "er trank – er trinkt"],
    ["وَاحِدٌ وَعِشْرُونَ طَالِبًا", "einundzwanzig Studenten"],
    ["ثَلَاثَةٌ وَعِشْرُونَ رَجُلًا", "dreiundzwanzig Männer"],
    ["التَّاسِعَةُ إِلَّا رُبْعًا", "Viertel vor neun"],
    ["السَّاعَةُ الثَّانِيَةُ إِلَّا خَمْسَ دَقَائِقَ", "fünf vor zwei"],
    ["جَلَسَ حَامِدٌ بَيْنَ بِلَالٍ وَفَيْصَلٍ.", "Ḥāmid saß zwischen Bilāl und Faiṣal."],
    ["هَذَا بَيْنِي وَبَيْنَكَ.", "Das bleibt zwischen dir und mir."]
  ],
  vocab: [
    ["دَائِمًا", "immer"], ["أَحْيَانًا", "manchmal"], ["مَرَّةً أُخْرَى", "noch einmal"], ["عَرْضٌ", "Breite"], ["مَسَافَةٌ", "Entfernung"],
    ["كِيلُومِتْرٌ", "Kilometer"], ["سَنْتِيمِتْرٌ", "Zentimeter"], ["مِتْرٌ", "Meter"], ["عَمِلَ يَعْمَلُ", "arbeiten"], ["مَكْتَبٌ", "Büro"],
    ["عَامِلٌ", "Arbeiter"], ["طُولٌ", "Länge"], ["سَجَدَ يَسْجُدُ", "sich im Gebet niederwerfen"], ["فَعَلَ يَفْعَلُ", "tun, machen"],
    ["رَكِبَ يَرْكَبُ", "reiten, (ein Fahrzeug) besteigen"], ["بَيْنَ", "zwischen"], ["بَيْنَهُمَا", "zwischen ihnen beiden"],
    ["رَكَعَ يَرْكَعُ", "sich im Gebet verbeugen"], ["إِلَّا", "außer; (Uhrzeit) vor"]
  ],
  quiz: [
    { q: "Welche Buchstaben stehen im Muḍāriʿ vor dem Verb?", a: ["أ، ت، ي، ن", "ا، و، ي", "م، ت، س", "ب، ك، ل"], e: "يَكْتُبُ, تَكْتُبُ, أَكْتُبُ, نَكْتُبُ." },
    { q: "Was kann يَكْتُبُ bedeuten?", a: ["er schreibt, schreibt gerade oder wird schreiben", "nur „er schreibt“", "er schrieb", "schreib!"], e: "Der Muḍāriʿ umfasst Gegenwart und Zukunft." },
    { q: "Welchen Vokal hat der erste Radikal im Muḍāriʿ?", a: ["Sukūn", "Fatḥa", "Ḍamma", "Kasra"], e: "ya-ktubu: das k hat Sukūn." },
    { q: "Welches Verb gehört zur Gruppe a–i?", a: ["جَلَسَ يَجْلِسُ", "كَتَبَ يَكْتُبُ", "فَتَحَ يَفْتَحُ", "فَهِمَ يَفْهَمُ"], e: "jalasa / ya-jlisu: a im Perfekt, i im Präsens." },
    { q: "Wie heißt das Präsens von شَرِبَ?", a: ["يَشْرَبُ", "يَشْرِبُ", "يَشْرُبُ", "يَشَارِبُ"], e: "i–a-Gruppe: شَرِبَ يَشْرَبُ." },
    { q: "Wie heißt das Präsens von فَتَحَ?", a: ["يَفْتَحُ", "يَفْتُحُ", "يَفْتِحُ", "يُفَتِّحُ"], e: "a–a-Gruppe (oft bei Kehllauten wie ح)." },
    { q: "Wie heißt „23 Männer“?", a: ["ثَلَاثَةٌ وَعِشْرُونَ رَجُلًا", "ثَلَاثٌ وَعِشْرُونَ رَجُلًا", "ثَلَاثَةَ عِشْرُونَ رَجُلًا", "ثَلَاثَةٌ وَعِشْرُونَ رِجَالًا"], e: "Einer mit وَ und Tanwīn; 3–9 bei männlichem Gezähltem feminin; Gezähltes Singular manṣūb." },
    { q: "Welcher Einer hat bei 21–29 kein Tanwīn?", a: ["اثْنَانِ", "وَاحِدٌ", "ثَلَاثَةٌ", "تِسْعَةٌ"], e: "اثْنَانِ وَعِشْرُونَ – Dualform ohne Tanwīn." },
    { q: "Was heißt التَّاسِعَةُ إِلَّا رُبْعًا?", a: ["Viertel vor neun", "Viertel nach neun", "halb neun", "neun Uhr"], e: "إِلَّا „außer“; das Nomen danach ist manṣūb." },
    { q: "Wie heißt „zwischen dir und mir“?", a: ["بَيْنِي وَبَيْنَكَ", "بَيْنِي وَكَ", "بَيْنَ أَنَا وَأَنْتَ", "بَيْنَنَا وَكَ"], e: "Bei Pronomen wird بَيْنَ wiederholt." }
  ],
  irab: [
    { s: "يَكْتُبُ الطَّالِبُ الدَّرْسَ.", w: 0, a: ["فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ", "فِعْلُ أَمْرٍ", "اسْمٌ مَرْفُوعٌ"], e: "Der Muḍāriʿ ist deklinierbar und steht hier im Indikativ (Ḍamma)." },
    { s: "عِنْدِي وَاحِدٌ وَعِشْرُونَ رِيَالًا.", w: 3, a: ["تَمْيِيزٌ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "مَفْعُولٌ بِهِ", "مُضَافٌ إِلَيْهِ", "خَبَرٌ"], e: "Das Gezählte nach 21–99 ist Tamyīz im Akkusativ." },
    { s: "جَلَسَ حَامِدٌ بَيْنَ بِلَالٍ وَفَيْصَلٍ.", w: 2, a: ["ظَرْفُ مَكَانٍ مَنْصُوبٌ وَهُوَ مُضَافٌ", "حَرْفُ جَرٍّ", "مَفْعُولٌ بِهِ", "حَالٌ"], e: "بَيْنَ ist ein Ortsadverb (Ẓarf) im Akkusativ und Muḍāf." },
    { s: "جَلَسَ حَامِدٌ بَيْنَ بِلَالٍ وَفَيْصَلٍ.", w: 3, a: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ وَعَلَامَةُ جَرِّهِ الْكَسْرَةُ", "اسْمٌ مَجْرُورٌ بِحَرْفِ الْجَرِّ", "فَاعِلٌ", "مَفْعُولٌ بِهِ"], e: "Nach dem Muḍāf بَيْنَ folgt das Muḍāf ilaihi im Genitiv." }
  ],
  model: [
    { s: "يَفْهَمُ الطَّالِبُ الدَّرْسَ.", de: "Der Student versteht die Lektion.", words: [
      ["يَفْهَمُ", "فِعْلٌ مُضَارِعٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ", "Präsens im Indikativ, erkennbar am Ḍamma"],
      ["الطَّالِبُ", "فَاعِلٌ مَرْفُوعٌ وَعَلَامَةُ رَفْعِهِ الضَّمَّةُ", "Subjekt im Nominativ"],
      ["الدَّرْسَ", "مَفْعُولٌ بِهِ مَنْصُوبٌ وَعَلَامَةُ نَصْبِهِ الْفَتْحَةُ", "Objekt im Akkusativ"]
    ] }
  ]
}

);
