const admin = require('firebase-admin');

const serviceAccount = require('./sell-used-project-firebase-adminsdk.json');


const firebaseConfig = {
  apiKey: "AIzaSyAl1wECMQWruKvQf4BDOibfzEKJ-tckNAg",
  authDomain: "sell-used-project.firebaseapp.com",
  projectId: "sell-used-project",
  storageBucket: "sell-used-project.appspot.com",
  messagingSenderId: "482192189030",
  appId: "1:482192189030:web:a9415aecfba0e4e03c2fa7"
};

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

// Get a reference to the Firestore database
const db = admin.firestore();

module.exports = db;
