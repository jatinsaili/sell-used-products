const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/adsController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Route to view a single ad
router.get('/:adId', AdsController.viewAd);

// Post an ad
router.get('/post', isAuthenticated, AdsController.postAdForm); // Display post ad form
router.post('/post', isAuthenticated, AdsController.postAd);

// Edit an ad
router.get('/edit/:adId', isAuthenticated, AdsController.editAdForm); // Display ad edit form
router.put('/edit/:adId', isAuthenticated, AdsController.editAd);

// Disable or expire an ad
router.put('/disable/:adId', isAuthenticated, AdsController.disableAd);

module.exports = router;
