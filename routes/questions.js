const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questionController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Post a question to an ad
router.get('/:adId/question', QuestionsController.addQuestionForm); // Display add question form
router.post('/:adId/question', QuestionsController.postQuestion);

// Answer a question
router.get('/:adId/answer/:questionId', isAuthenticated, QuestionsController.answerQuestionForm); // Display answer form
router.post('/:adId/answer/:questionId', isAuthenticated, QuestionsController.postQuestion);

module.exports = router;
