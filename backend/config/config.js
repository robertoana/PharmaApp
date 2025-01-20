var admin = require('firebase-admin');

var serviceAccount = require('../pharmaapp-eff6e-firebase-adminsdk-sp8h7-c78a9a16ff.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
