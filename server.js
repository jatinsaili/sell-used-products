// Required modules
const express = require('express');
const db = require('./firebaseConfig');
const userRoutes = require('./routes/user');
const adRoutes = require('./routes/ads');
const questionRoutes = require('./routes/questions');
const AdController = require('./controllers/adController');

// Initialize Express
const app = express();
const PORT = 3000;

// main page
app.get('/', AdController.listAds);

app.use('/user', userRoutes);
app.use('/ads', adRoutes);
app.use('/questions', questionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
