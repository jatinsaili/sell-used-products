const db = require('../firebaseConfig'); // Import the Firestore instance

const QuestionController = {

    // Display the form to post a new question
    addQuestionForm: (req, res) => {
        const adId = req.params.adId;
        res.render('askQuestionForm', { adId });
    },

    // Display the form to answer a question
    answerQuestionForm: async (req, res) => {
        const questionId = req.params.questionId;
        const questionRef = db.collection('questions').doc(questionId);
        const question = await questionRef.get();
        if (question.exists) {
            res.render('answerQuestionForm', { question: question.data() });
        } else {
            res.redirect(`/ads/${req.params.adId}`, { error: "Question not found." });
        }
    },
    
    // Post a Question to an Ad
    postQuestion: async (req, res) => {
        try {
            const adId = req.params.adId;
            const { content } = req.body;

            const questionRef = db.collection('questions').doc(); // Create a new doc with a generated ID
            await questionRef.set({
                adId,
                content
            });

            res.redirect(`/ads/${adId}`); // Redirect to the ad's page
        } catch (error) {
            console.error("Error posting question:", error);
            res.render('postQuestion', { error: "Failed to post question. Please try again." });
        }
    },

    // Answer a Question
    postAnswer: async (req, res) => {
        try {
            const adId = req.params.adId;
            const questionId = req.params.questionId;
            const { answer } = req.body;

            const questionRef = db.collection('questions').doc(questionId);
            await questionRef.update({
                answer
            });

            res.redirect(`/ads/${adId}`); // Redirect to the ad's page
        } catch (error) {
            console.error("Error posting answer:", error);
            res.redirect(`/ads/${adId}`, { error: "Failed to post answer. Please try again." });
        }    }
};

module.exports = QuestionController;