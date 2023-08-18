const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questionsController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Post a question to an ad
router.post('/:adId/question', QuestionsController.postQuestion);

// Answer a question
router.post('/:adId/answer/:questionId', isAuthenticated, QuestionsController.answerQuestion);

module.exports = router;
