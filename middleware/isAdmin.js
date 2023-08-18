// middleware/isAdmin.js
const db = require('../firebaseConfig');

module.exports = async (req, res, next) => {
    try {
        const userId = req.session.userId;
        const userRef = db.collection('users').doc(userId);
        const userDoc = await userRef.get();

        if (userDoc.exists && userDoc.data().isAdmin) {
            next(); // User is an admin, proceed to the next middleware or route handler
        } else {
            res.status(403).send('Access denied. You do not have the required permissions.');
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
        res.status(500).send('Internal Server Error');
    }
};
