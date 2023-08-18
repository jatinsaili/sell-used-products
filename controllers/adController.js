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
            res.render('index', { ads });
        } catch (error) {
            console.error("Error listing ads:", error);
            res.render('index', { error: "Failed to fetch ads. Please try again." });
        }
    },

    // View a single ad
    viewAd: async (req, res) => {
        try {
            const adId = req.params.adId;
            const adRef = db.collection('ads').doc(adId);
            const ad = await adRef.get();
            if (ad.exists) {
                res.render('adView', { ad: ad.data() });
            } else {
                res.redirect('/ads', { error: "Ad not found." });
            }
        } catch (error) {
            console.error("Error viewing ad:", error);
            res.redirect('/ads', { error: "Failed to fetch ad. Please try again." });
        }
    },

    // Post an Ad
    postAd: async (req, res) => {
        try {
            const { userId, title, description, startDate, endDate } = req.body;

            const adRef = db.collection('ads').doc(); // Create a new doc with a generated ID
            await adRef.set({
                userId,
                title,
                description,
                startDate,
                endDate
            });

            res.redirect('/dashboard'); // Redirect to dashboard or ad listing page
        } catch (error) {
            console.error("Error posting ad:", error);
            res.render('postAd', { error: "Failed to post ad. Please try again." });
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

            res.redirect('/dashboard'); // Redirect to dashboard or ad listing page
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

            res.redirect('/dashboard'); // Redirect to dashboard or ad listing page
        } catch (error) {
            console.error("Error disabling ad:", error);
            res.redirect('/dashboard', { error: "Failed to disable ad. Please try again." });
        }
    }
};

module.exports = AdController;
