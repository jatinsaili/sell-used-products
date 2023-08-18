const express = require('express');
const router = express.Router();
const QuestionsController = require('../controllers/questionController');
const isAuthenticated = require('../middleware/isAuthenticated');

// Answer a question
router.get('/answer/:questionId/:adId', isAuthenticated, QuestionsController.answerQuestionForm); // Display answer form
router.post('/answer/:questionId/:adId', isAuthenticated, QuestionsController.postAnswer);

// Post a question to an ad
router.get('/:adId/question', isAuthenticated, QuestionsController.addQuestionForm); // Display add question form
router.post('/:adId/question', isAuthenticated, QuestionsController.postQuestion);

module.exports = router;
