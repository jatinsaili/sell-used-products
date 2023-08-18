const express = require('express');
const router = express.Router();

// Post a question to an ad
router.post('/:adId/question', (req, res) => {
    // Handle question posting logic
});

// Answer a question
router.post('/:adId/answer/:questionId', (req, res) => {
    // Handle answer posting logic
});

module.exports = router;
