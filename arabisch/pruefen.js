/* Prüft eine deutsche Übersetzung gegen die Musterlösung.
   Verglichen werden die Inhaltswörter der Lösung (ohne Artikel, Hilfsverben, Pronomen)
   mit Stammformen, unregelmäßigen Verbformen, Synonymen, Zahlwörtern und Verneinung.
   window.TR_CHECK(eingabe, [[arabisch, deutsch], …]) → { score, verdict: "ok"|"close"|"no", neg, parts } */
(function () {
  "use strict";
  var STOP = ("der die das den dem des ein eine einen einem einer eines und oder aber doch ist sind war waren bin bist seid sei " +
    "hat habe hast haben hatte hatten hattest wird werde werden wirst wurde wurden es er sie ich du wir ihr man mich mir dich dir " +
    "ihn ihm uns euch sich zu zum zur in im ins an am auf aus von vom mit bei beim nach fur um als wie so da dort dorthin hier " +
    "auch noch nur sehr dann denn weil dass ob gibt gab beträgt betragt etwas diese dieser dieses diesem diesen jene jener " +
    "jenes jenem jenen was wer wo wann").split(" ");
  var STOPSET = {}; STOP.forEach(function (w) { STOPSET[fold(w)] = 1; });
  var NUM = { zwei: 2, drei: 3, vier: 4, funf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10, elf: 11, zwolf: 12,
    dreizehn: 13, vierzehn: 14, funfzehn: 15, zwanzig: 20, funfundzwanzig: 25, dreissig: 30, hundert: 100, einhundert: 100,
    zweihundert: 200, dreihundert: 300, tausend: 1000, eintausend: 1000, zweitausend: 2000, dreitausend: 3000, siebenmal: 7 };
  // unregelmäßige Formen → gemeinsamer Stamm
  var FORMS = {
    geh: "ging gingen gingst gegangen gehst geht gehe gehen", fahr: "fuhr fuhren gefahren fahrt fahrst fahren",
    komm: "kam kamen kamst gekommen kommt kommst kommen", kehr: "kehrte kehrten gekehrt kehren kehrt",
    seh: "sah sahen sahst gesehen sieht siehst sehen", ess: "ass assen gegessen isst essen", trink: "trank tranken getrunken trinkt trinken",
    schreib: "schrieb schrieben geschrieben schreibt schreiben", les: "las lasen gelesen liest lesen lies",
    sitz: "sass sassen gesessen sitzt sitzen setzte setzten gesetzt setzt setzen setz", nehm: "nahm nahmen genommen nimmt nehmen nimm",
    geb: "gab gaben gegeben gibst geben gib", find: "fand fanden gefunden findet finden", versteh: "verstand verstanden verstehst versteht verstehen",
    sprech: "sprach sprachen gesprochen spricht sprechen", sag: "sagte sagten gesagt sagt sagen", tret: "trat traten betrat betraten betreten eintreten getreten",
    kauf: "kaufte kauften gekauft kauft kaufen", lern: "lernte lernten gelernt lernt lernen", wohn: "wohnte gewohnt wohnt wohnen",
    schlaf: "schlief schliefen geschlafen schlaft schlafen", bet: "betete beteten gebetet betet beten", vergess: "vergass vergassen vergessen vergisst",
    brech: "brach zerbrach zerbrochen gebrochen bricht", steh: "stand standen gestanden steht stehen aufstehen", ruf: "rief riefen gerufen",
    bring: "brachte gebracht bringt", denk: "dachte gedacht denkt glaube glaubt geglaubt glauben halte halt", hor: "horte gehort hort horen",
    frag: "fragte gefragt fragt fragen", antwort: "antwortete beantwortete beantwortet geantwortet antwortet beantworten",
    spiel: "spielte gespielt spielt spielen", bestand: "bestanden besteht bestehen bestand", zahl: "zahlte gezahlt bezahlte bezahlt bezahlen zahlen"
  };
  // Synonyme → gemeinsamer Stamm
  var SYN = {
    geh: "fahr lauf begeb", kehr: "komm", schuler: "student studierend", lehr: "dozent", universitat: "uni hochschul", stift: "kuli kugelschreib bleistift full",
    laden: "geschaft", haus: "hause zuhaus heim", gott: "allah", wohn: "leb", lern: "studier", klug: "intelligent schlau",
    bill: "gunstig", schon: "hubsch", viel: "zahlreich", sag: "sprech", auto: "wag", bus: "autobus", tasch: "beutel",
    direktor: "leit chef", firma: "unternehm", arbeit: "angestellt", gebetsruf: "adhan azan", pilgerfahrt: "hadsch hajj haddsch",
    zimm: "raum", mud: "schlafrig", anwes: "da", fleiss: "eifrig", geld: "munz", gross: "riesig", wirklich: "tatsachlich wahrlich gewiss",
    antwort: "erwid", vielleicht: "moglicherweis", tret: "eintret", nutz: "hilfreich", gut: "schon"
  };
  var CANON = {};
  Object.keys(FORMS).forEach(function (k) { FORMS[k].split(" ").forEach(function (f) { CANON["=" + f] = k; }); });
  var SYNMAP = {};
  var NEG = { nicht: 1, kein: 1, keine: 1, keinen: 1, keinem: 1, keiner: 1, keines: 1, nie: 1, niemals: 1, weder: 1, noch_nie: 1 };

  function fold(s) {
    return String(s).toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss")
      .replace(/ae/g, "a").replace(/oe/g, "o").replace(/ue/g, "u")
      .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[ʿʾ'’`]/g, "");
  }
  function words(s) { return fold(s).match(/[a-z0-9]+/g) || []; }
  function stem(w) { var s = rawStem(w); return SYNMAP[s] || s; }
  function rawStem(w) {
    if (CANON["=" + w]) return CANON["=" + w];
    if (/^\d+$/.test(w)) return w;
    if (NUM[w]) return String(NUM[w]);
    var s = w;
    if (s.length > 6 && /^ge/.test(s) && /(t|en)$/.test(s)) s = s.slice(2);
    var ends = ["innen", "ern", "em", "en", "er", "es", "st", "e", "n", "s", "t"];
    for (var i = 0; i < ends.length; i++) {
      var e = ends[i];
      if (s.length - e.length >= 3 && s.slice(-e.length) === e) { s = s.slice(0, -e.length); break; }
    }
    return CANON["=" + s] || s;
  }
  Object.keys(SYN).forEach(function (k) { var c = rawStem(k); SYN[k].split(" ").forEach(function (w) { SYNMAP[rawStem(w)] = c; SYNMAP[w] = c; }); });
  // zusammengesetzte trennbare Verben: „zurückgekehrt“ ↔ „kehrte … zurück“
  function split(w) {
    var m = /^(zuruck|hinein|herein|hinaus|heraus|teil)(.{3,})$/.exec(w);
    return m ? [m[1], m[2]] : [w];
  }
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) d[i] = [i];
    for (j = 0; j <= b.length; j++) d[0][j] = j;
    for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function same(k, u) {
    if (k === u) return true;
    var sk = SYNMAP[k] || k, su = SYNMAP[u] || u;
    if (sk === su) return true;
    if (k.length >= 4 && u.length >= 4 && (k.indexOf(u) === 0 || u.indexOf(k) === 0)) return true;
    return k.length >= 5 && lev(k, u) <= 1;
  }
  function isNeg(w) { return !!NEG[w]; }

  function check(input, pairs) {
    var utoks = [];
    words(input).forEach(function (w) { split(w).forEach(function (p) { utoks.push(isNeg(p) ? "¬" : stem(p)); }); });
    var uneg = utoks.indexOf("¬") >= 0, rneg = false, total = 0, hit = 0;
    var parts = pairs.map(function (p) {
      var de = p[1], segs = [], re = /([A-Za-zÀ-ɏḀ-ỿʿʾ0-9]+)|([^A-Za-zÀ-ɏḀ-ỿʿʾ0-9]+)/g, m;
      while ((m = re.exec(de))) {
        if (m[2]) { segs.push({ t: m[2], k: 0 }); continue; }
        var raw = m[1], f = fold(raw), name = /[āīūḥṣṭḍẓġʿʾĀĪŪḤṢṬḌẒ]/.test(raw);
        if (isNeg(f)) { rneg = true; segs.push({ t: raw, k: uneg ? 1 : 2 }); total++; if (uneg) hit++; continue; }
        if (STOPSET[f] || f === "ein" || f === "eins") { segs.push({ t: raw, k: 0 }); continue; }
        var ks = split(f).map(stem), found = ks.every(function (k) { return utoks.some(function (u) { return same(k, u) || (name && lev(k, u) <= 2); }); });
        if (name) { segs.push({ t: raw, k: found ? 1 : 0 }); continue; }   // Namen: frei in der Schreibung, zählen nicht mit
        total++; if (found) hit++;
        segs.push({ t: raw, k: found ? 1 : 2 });
      }
      return segs;
    });
    var score = total ? hit / total : (words(input).length ? 1 : 0);
    var negBad = uneg !== rneg;
    var verdict = negBad ? (score >= 0.5 ? "close" : "no") : score >= 0.9 ? "ok" : score >= 0.5 ? "close" : "no";
    return { score: score, hit: hit, total: total, verdict: verdict, neg: negBad, parts: parts };
  }
  window.TR_CHECK = check;
})();
