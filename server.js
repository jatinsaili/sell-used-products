// Required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./firebaseConfig');
const userRoutes = require('./routes/user');
const adRoutes = require('./routes/ads');
const questionRoutes = require('./routes/questions');
const AdController = require('./controllers/adController');

// Initialize Express
const app = express();
const PORT = 3000;

app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to set res.locals variables
app.use((req, res, next) => {
  if (req.session) {
      res.locals.userId = req.session.userId;
  }
  next();
});

// main page
app.get('/', AdController.listAds);
// About page route
app.get('/about', (req, res) => {
  res.render('about');
});


app.use('/user', userRoutes);
app.use('/ads', adRoutes);
app.use('/questions', questionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
