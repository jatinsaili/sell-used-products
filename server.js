// Required modules
const express = require('express');
const db = require('./firebaseConfig');
const userRoutes = require('./routes/user');
const adRoutes = require('./routes/ads');
const questionRoutes = require('./routes/questions');


// Initialize Express
const app = express();
const PORT = 3000;

// Sample route (You'll set up more routes later)
app.get('/', (req, res) => {
  res.render('index'); // Serve the index view
});

app.use('/user', userRoutes);
app.use('/ads', adRoutes);
app.use('/questions', questionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
