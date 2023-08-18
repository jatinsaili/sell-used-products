const db = require('../firebaseConfig'); // Import the Firestore instance

const AdController = {

    // List all active ads
    listAds: async (req, res) => {
        try {
            const adsSnapshot = await db.collection('ads').where('endDate', '>', new Date().toISOString()).get();
            const ads = [];
            adsSnapshot.forEach(doc => {
                ads.push({ id: doc.id, ...doc.data() });
            });
            res.render('index', { ads, noAds: ads.length === 0 });
        } catch (error) {
            console.error("Error listing ads:", error);
            res.render('index', { error: "Failed to fetch ads. Please try again.", noAds: false, ads: [] }); // Ensure ads is always passed as an empty array in case of error
        }
    },


    viewAd: async (req, res) => {
        try {
            const adId = req.params.adId;
            const adRef = db.collection('ads').doc(adId);
            const ad = await adRef.get();
    
            if (ad.exists) {
                // Fetch related questions and answers
                const questionsSnapshot = await db.collection('questions').where('adId', '==', adId).get();
                const questions = [];
                questionsSnapshot.forEach(doc => {
                    questions.push({ id: doc.id, ...doc.data() });
                });
    
                res.render('adView', {id: adId, ad: ad.data(), questions });
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.error("Error viewing ad:", error);
            res.redirect('/');
        }
    },

    // Display post ad form
    postAdForm: (req, res) => {
        res.render('postAd', {error: null});
    },

    // Post an Ad
    postAd: async (req, res) => {
        try {
            const { title, description, startDate, endDate } = req.body;
            const userId = req.session.userId;

            const adRef = db.collection('ads').doc(); // Create a new doc with a generated ID
            await adRef.set({
                userId,
                title,
                description,
                startDate,
                endDate
            });

            res.redirect('/ads/myads');
        } catch (error) {
            console.error("Error posting ad:", error);
            res.render('postAd', { error: "Failed to post ad. Please try again." });
        }
    },

    // Display ad edit form
    editAdForm: async (req, res) => {
        const adId = req.params.adId;
        const adRef = db.collection('ads').doc(adId);
        const ad = await adRef.get();
        if (ad.exists) {
            res.render('editAd', {error:null, adId, ad: ad.data() });
        } else {
            res.redirect('/ads/myads', { error: "Ad not found." });
        }
    },

    // Edit an Ad
    editAd: async (req, res) => {
        try {
            const adId = req.params.adId;
            const { title, description, startDate, endDate } = req.body;

            const adRef = db.collection('ads').doc(adId);
            await adRef.update({
                title,
                description,
                startDate,
                endDate
            });

            res.redirect('/ads/myads'); // Redirect to user's ads page

        } catch (error) {
            console.error("Error editing ad:", error);
            res.render('editAd', { error: "Failed to edit ad. Please try again." });
        }
    },

    // Disable or Expire an Ad
    disableAd: async (req, res) => {
        try {
            const adId = req.params.adId;

            const adRef = db.collection('ads').doc(adId);
            await adRef.update({
                endDate: new Date().toISOString() // Set the end date to now to disable the ad
            });

            res.redirect('/'); // Redirect to user's ads page
        } catch (error) {
            console.error("Error disabling ad:", error);
            res.redirect('/ads/myads', { error: "Failed to disable ad. Please try again." });
        }
    },

    // List ads created by the user
    myAds: async (req, res) => {
        try {
            const userId = req.session.userId; // Assuming user ID is stored in session
            const adsSnapshot = await db.collection('ads').where('userId', '==', userId).get();
            const ads = [];
            adsSnapshot.forEach(doc => {
                ads.push({ id: doc.id, ...doc.data() });
            });
            res.render('myAds', {error:null,  ads });
        } catch (error) {
            console.error("Error listing user's ads:", error);
            res.render('myAds', { error: "Failed to fetch your ads. Please try again." });
        }
    }

};

module.exports = AdController;
