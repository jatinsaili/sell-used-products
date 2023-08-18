const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/adsController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Post an ad
router.post('/post', isAuthenticated, AdsController.postAd);

// Edit an ad
router.put('/edit/:adId', isAuthenticated, AdsController.editAd);

// Disable or expire an ad
router.put('/disable/:adId', isAuthenticated, AdsController.disableAd);

module.exports = router;