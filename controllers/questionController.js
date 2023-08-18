const db = require('../firebaseConfig'); // Import the Firestore instance

const QuestionController = {

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