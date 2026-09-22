const { initializeTestEnvironment, assertFails, assertSucceeds } = require('@firebase/rules-unit-testing');
const fs = require('fs');
const firebase = require('firebase/compat/app'); require('firebase/compat/firestore');
const TS = firebase.firestore.FieldValue.serverTimestamp;
let pass = 0, fail = 0;
async function t(name, p, ok) {
  try { await (ok ? assertSucceeds(p) : assertFails(p)); pass++; console.log('  ok  ', name); }
  catch (e) { fail++; console.log('  FAIL', name, '-', e.message.split('\n')[0]); }
}
function reg(db, uid, name, g = 'm', year = 1995) {
  const key = name.normalize('NFC').toLowerCase(), b = db.batch();
  b.set(db.doc('usernames/' + key), { uid, name });
  b.set(db.doc('users/' + uid), { birthYear: year, parentalConsent: false, termsAt: TS(), createdAt: TS(), friends: [] });
  b.set(db.doc('players/' + uid), { nick: name, nickKey: key, g, total: 0, games: 0, comp: {}, at: 'x' });
  return b.commit();
}
(async () => {
  const env = await initializeTestEnvironment({ projectId: 'fiqh-test', firestore: { rules: fs.readFileSync(__dirname + '/../firestore.rules', 'utf8'), host: '127.0.0.1', port: 8085 } });
  const alice = () => env.authenticatedContext('alice', { email: 'a@x.de', email_verified: false }).firestore();
  const aliceV = () => env.authenticatedContext('alice', { email: 'a@x.de', email_verified: true }).firestore();
  const bob = () => env.authenticatedContext('bob', { email: 'b@x.de', email_verified: true }).firestore();
  const guest = () => env.unauthenticatedContext().firestore();

  console.log('Registrierung & eindeutige Namen');
  await t('Alice registriert "Aisha_1" (unbestätigt)', reg(alice(), 'alice', 'Aisha_1'), true);
  await t('Bob kann "Aisha_1" nicht nehmen', reg(bob(), 'bob', 'Aisha_1'), false);
  await t('Bob kann "AISHA_1" nicht nehmen (Groß/klein egal)', (async () => { const db = bob(), b = db.batch(); b.set(db.doc('usernames/aisha_1'), { uid: 'bob', name: 'AISHA_1' }); return b.commit(); })(), false);
  await t('Bob registriert "Bilal"', reg(bob(), 'bob', 'Bilal'), true);
  await t('Name-Schlüssel muss zum Namen passen', bob().doc('usernames/zzz').set({ uid: 'bob', name: 'Admin' }), false);
  await t('Unerlaubte Zeichen im Namen', bob().doc('usernames/a b<').set({ uid: 'bob', name: 'a b<' }), false);
  await t('Fremden Namen übernehmen (update)', bob().doc('usernames/aisha_1').set({ uid: 'bob', name: 'Aisha_1' }), false);
  await t('Fremden Namen löschen', bob().doc('usernames/aisha_1').delete(), false);
  await t('Bob sammelt Punkte', bob().doc('players/bob').update({ total: 800, games: 1, 'comp.s1w1': { score: 800, correct: 5, answered: 15, done: true, at: 'x' } }), true);
  await t('Punkte/Woche durch Neuanlegen zurücksetzen geht nicht', bob().doc('players/bob').set({ nick: 'Bilal', nickKey: 'bilal', g: 'm', total: 0, games: 0, comp: {}, at: 'x' }), false);
  await t('Registrierung mit Geburtsjahr 2024 abgelehnt', (async () => {
    const db = env.authenticatedContext('kid', { email_verified: false }).firestore();
    return reg(db, 'kid', 'Kid123', 'm', 2024);
  })(), false);
  await t('Geschlecht muss m oder f sein', (async () => {
    const db = env.authenticatedContext('x1', { email_verified: false }).firestore();
    return reg(db, 'x1', 'Xaver', 'x');
  })(), false);

  console.log('Kunya für Schwestern');
  const ctx = (uid, v = false) => env.authenticatedContext(uid, { email_verified: v }).firestore();
  await t('Schwester ohne Kunya ("Fatima") abgelehnt', reg(ctx('f1'), 'f1', 'Fatima', 'f'), false);
  await t('Bruder mit Kunya ("Umm Ali") abgelehnt', reg(ctx('m1'), 'm1', 'Umm Ali', 'm'), false);
  await t('Schwester "Umm Yusuf"', reg(ctx('sara'), 'sara', 'Umm Yusuf', 'f'), true);
  await t('Schwester "Bint Ömer" (türkische Buchstaben)', reg(ctx('zey'), 'zey', 'Bint Ömer', 'f'), true);
  await t('"BINT ÖMER" ist derselbe Name wie "Bint Ömer"', reg(ctx('f2'), 'f2', 'BINT ÖMER', 'f'), false);
  await t('Schwester "Tochter von Şükrü"', reg(ctx('ayse'), 'ayse', 'Tochter von Şükrü', 'f'), true);
  await t('Kunya später gegen Vornamen tauschen geht nicht', (async () => {
    const db = ctx('sara', true), b = db.batch();
    b.delete(db.doc('usernames/umm yusuf'));
    b.set(db.doc('usernames/fatima'), { uid: 'sara', name: 'Fatima' });
    b.update(db.doc('players/sara'), { nick: 'Fatima', nickKey: 'fatima' });
    return b.commit();
  })(), false);
  await t('Doppelte Leerzeichen im Namen abgelehnt', ctx('q').doc('usernames/umm  ali').set({ uid: 'q', name: 'Umm  Ali' }), false);

  console.log('Lesen');
  await t('Gast liest Rangliste (players)', guest().collection('players').get(), true);
  await t('Gast liest Profilbilder', guest().collection('avatars').get(), true);
  await t('Gast prüft Namensverfügbarkeit', guest().doc('usernames/aisha_1').get(), true);
  await t('Gast liest privates Profil nicht', guest().doc('users/alice').get(), false);
  await t('Bob liest Alices privates Profil nicht', bob().doc('users/alice').get(), false);
  await t('Alice liest eigenes privates Profil', alice().doc('users/alice').get(), true);

  console.log('Punkte');
  const upd = (db, uid, data) => db.doc('players/' + uid).update(data);
  await t('Unbestätigt: keine Punkte', upd(alice(), 'alice', { total: 500, games: 1 }), false);
  await t('Bestätigt: Punkte speichern', upd(aliceV(), 'alice', { total: 500, games: 1 }), true);
  await t('Bob schreibt Alices Punkte nicht', upd(bob(), 'alice', { total: 9999 }), false);
  await t('Punkte können nicht sinken', upd(aliceV(), 'alice', { total: 100 }), false);
  await t('Mehr als eine Runde auf einmal (+3251)', upd(aliceV(), 'alice', { total: 500 + 3251, games: 2 }), false);
  await t('Genau eine volle Runde (+3250)', upd(aliceV(), 'alice', { total: 3750, games: 2 }), true);
  await t('Geschlecht nachträglich ändern', upd(aliceV(), 'alice', { g: 'f' }), false);
  await t('Fremdes Feld einschleusen', upd(aliceV(), 'alice', { admin: true }), false);
  await t('Fremden Namen als Anzeigename setzen', upd(aliceV(), 'alice', { nick: 'Bilal', nickKey: 'bilal' }), false);
  await t('Wettbewerbswoche eintragen', upd(aliceV(), 'alice', { 'comp.s1w1': { score: 0, correct: 0, answered: 0, done: false, at: 'x' } }), true);
  await t('Wettbewerbswoche fortschreiben', upd(aliceV(), 'alice', { 'comp.s1w1': { score: 900, correct: 6, answered: 15, done: true, at: 'x' } }), true);
  await t('Wettbewerbswoche löschen (2. Versuch) geht nicht', upd(aliceV(), 'alice', { comp: {} }), false);
  await t('Spielerprofil einzeln löschen geht nicht', aliceV().doc('players/alice').delete(), false);

  console.log('Profilbild');
  const img = 'data:image/jpeg;base64,' + 'A'.repeat(200);
  await t('Unbestätigt: kein Profilbild', alice().doc('avatars/alice').set({ img }), false);
  await t('Bestätigt: Profilbild speichern', aliceV().doc('avatars/alice').set({ img }), true);
  await t('SVG/Script als Bild abgelehnt', aliceV().doc('avatars/alice').set({ img: 'data:image/svg+xml,<svg onload=alert(1)>' }), false);
  await t('Zu großes Bild abgelehnt', aliceV().doc('avatars/alice').set({ img: 'data:image/jpeg;base64,' + 'A'.repeat(70000) }), false);
  await t('Fremdes Profilbild setzen', bob().doc('avatars/alice').set({ img }), false);

  console.log('Freunde');
  await t('Freundesliste speichern', aliceV().doc('users/alice').update({ friends: ['bob'] }), true);
  await t('Geburtsjahr nachträglich ändern', aliceV().doc('users/alice').update({ birthYear: 1980 }), false);

  console.log('Namen ändern');
  await t('Name ändern (alt frei, neu reserviert)', (async () => {
    const db = aliceV(), b = db.batch();
    b.delete(db.doc('usernames/aisha_1'));
    b.set(db.doc('usernames/aisha'), { uid: 'alice', name: 'Aisha' });
    b.update(db.doc('players/alice'), { nick: 'Aisha', nickKey: 'aisha' });
    return b.commit();
  })(), true);
  await t('Nur Schreibweise ändern (aisha -> AISHA)', (async () => {
    const db = aliceV(), b = db.batch();
    b.set(db.doc('usernames/aisha'), { uid: 'alice', name: 'AISHA' });
    b.update(db.doc('players/alice'), { nick: 'AISHA' });
    return b.commit();
  })(), true);
  await t('Alter Name ist wieder frei', reg(env.authenticatedContext('carl', { email_verified: false }).firestore(), 'carl', 'Aisha_1'), true);

  console.log('Chat');
  const chatAB = 'alice_bob', chatAS = 'alice_sara', chatSZ = 'sara_zey';
  const newChat = (db, m) => db.doc('chats/' + m.join('_')).set({ members: m, createdAt: TS(), updatedAt: TS(), last: null, read: {} });
  const msg = (db, chat, from, text) => db.collection('chats/' + chat + '/messages').add({ from, text, at: TS() });
  await t('Unbestätigt: kein Chat', newChat(ctx('alice'), ['alice', 'bob']), false);
  await t('Bruder–Bruder: Chat anlegen', newChat(aliceV(), ['alice', 'bob']), true);
  await t('Bruder–Schwester: Chat verboten', newChat(aliceV(), ['alice', 'sara']), false);
  await t('Schwester–Bruder: Chat verboten', newChat(ctx('sara', true), ['alice', 'sara']), false);
  await t('Schwester–Schwester: Chat anlegen', newChat(ctx('sara', true), ['sara', 'zey']), true);
  await t('Chat für zwei andere anlegen', newChat(aliceV(), ['sara', 'zey']), false);
  await t('Chat mit drei Personen', aliceV().doc('chats/x').set({ members: ['alice', 'bob', 'carl'], createdAt: TS(), updatedAt: TS(), last: null, read: {} }), false);
  await t('Nachricht senden', msg(aliceV(), chatAB, 'alice', 'Salam, wie weit bist du?'), true);
  await t('Gegenüber liest Nachrichten', bob().collection('chats/' + chatAB + '/messages').get(), true);
  await t('Dritte lesen nicht mit', ctx('sara', true).collection('chats/' + chatAB + '/messages').get(), false);
  await t('Gast liest keine Chats', guest().doc('chats/' + chatAB).get(), false);
  await t('Chatliste (nur eigene)', bob().collection('chats').where('members', 'array-contains', 'bob').get(), true);
  await t('Unter fremdem Namen senden', msg(bob(), chatAB, 'alice', 'gefälscht'), false);
  await t('Leere Nachricht', msg(bob(), chatAB, 'bob', ''), false);
  await t('Zu lange Nachricht (1001 Zeichen)', msg(bob(), chatAB, 'bob', 'x'.repeat(1001)), false);
  await t('Nachricht in fremden Chat', msg(aliceV(), chatSZ, 'alice', 'hallo'), false);
  await t('Nachricht nachträglich ändern', (async () => {
    const db = aliceV(); const qs = await db.collection('chats/' + chatAB + '/messages').get();
    return qs.docs[0].ref.update({ text: 'geändert' });
  })(), false);
  await t('Mitglieder des Chats ändern', aliceV().doc('chats/' + chatAB).update({ members: ['alice', 'sara'] }), false);
  await t('Bob blockiert Alice', bob().doc('users/bob').update({ blocked: ['alice'] }), true);
  await t('Blockiert: Alice kann Bob nicht schreiben', msg(aliceV(), chatAB, 'alice', 'Hallo?'), false);
  await t('Blockiert: Bob schreibt Alice auch nicht', msg(bob(), chatAB, 'bob', 'Hallo'), false);
  await t('Nachricht melden', aliceV().collection('reports').add({ from: 'alice', about: 'bob', chatId: chatAB, text: 'unfreundlich', at: TS() }), true);
  await t('Meldungen kann niemand lesen', aliceV().collection('reports').get(), false);
  await t('Blockierung aufheben', bob().doc('users/bob').update({ blocked: [] }), true);

  console.log('Konto löschen');
  await t('Konto löschen (alles weg, Markierung bleibt)', (async () => {
    const db = aliceV(), b = db.batch();
    b.delete(db.doc('players/alice')); b.delete(db.doc('avatars/alice'));
    b.set(db.doc('users/alice'), { deletedAt: TS() });
    b.delete(db.doc('usernames/aisha'));
    return b.commit();
  })(), true);
  await t('Nach dem Löschen kein neues Spielerprofil (kein 2. Versuch)', reg(aliceV(), 'alice', 'Aisha'), false);
  await t('Markierung enthält keine persönlichen Daten mehr', (async () => {
    const d = (await aliceV().doc('users/alice').get()).data();
    if (Object.keys(d).join() !== 'deletedAt') throw new Error('Felder: ' + Object.keys(d));
  })(), true);

  await env.cleanup();
  console.log(`\n${pass} bestanden, ${fail} fehlgeschlagen`);
  process.exit(fail ? 1 : 0);
})();
