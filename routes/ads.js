const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/adController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Post an ad
router.get('/post', isAuthenticated, AdsController.postAdForm); // Display post ad form
router.post('/post', isAuthenticated, AdsController.postAd);

// Edit an ad
router.get('/edit/:adId', isAuthenticated, AdsController.editAdForm); // Display ad edit form
router.post('/edit/:adId', isAuthenticated, AdsController.editAd);

// Disable or expire an ad
router.post('/disable/:adId', isAuthenticated, AdsController.disableAd);

// List ads created by the user
router.get('/myads', isAuthenticated, AdsController.myAds);

// Route to view a single ad
router.get('/:adId', AdsController.viewAd);

module.exports = router;
