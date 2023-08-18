// Required modules
const express = require('express');
const admin = require('firebase-admin');

// Firebase configuration
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
  credential: admin.credential.applicationDefault(),
  databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`
});

// Get a reference to the Firestore database
const db = admin.firestore();

// Initialize Express
const app = express();
const PORT = 3000;

// Sample route (You'll set up more routes later)
app.get('/', (req, res) => {
  res.send('Hello, Firebase and Firestore are integrated!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
