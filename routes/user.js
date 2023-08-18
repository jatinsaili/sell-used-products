const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');

// User registration
router.get('/register', UserController.registerForm); // Display registration form
router.post('/register', UserController.register);

// User login
router.get('/login', UserController.loginForm); // Display login form
router.post('/login', UserController.login);

// User logout
router.get('/logout', isAuthenticated, UserController.logout);

// Modify user profile
router.get('/profile', isAuthenticated, UserController.viewProfile);
router.get('/profile/edit', isAuthenticated, UserController.editProfileForm); // Display profile edit form
router.put('/profile', isAuthenticated, UserController.modifyProfile);

module.exports = router;
