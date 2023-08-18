const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

// User registration
router.post('/register', UserController.register);

// User login
router.post('/login', UserController.login);

// User logout
router.get('/logout', isAuthenticated, UserController.logout);

// Modify user profile
router.put('/profile', isAuthenticated, UserController.modifyProfile);

module.exports = router;
