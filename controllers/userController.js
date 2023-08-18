const db = require('../firebaseConfig');

const UserController = {

    // User Registration
    register: async (req, res) => {
        try {
            // Extract user details from request body
            const { username, password, email } = req.body;

            // TODO: Hash the password before storing

            // Save user to Firestore
            const userRef = db.collection('users').doc(); // Create a new doc with a generated ID
            await userRef.set({
                username,
                password, // Store the hashed password
                email
            });

            // Redirect to login page or dashboard after successful registration
            res.redirect('/login');
        } catch (error) {
            console.error("Error registering user:", error);
            res.render('register', { error: "Failed to register. Please try again." });
        }
    },

    // User Login
    login: async (req, res) => {
        try {
            // Extract login details from request body
            const { username, password } = req.body;

            // TODO: Validate user credentials against Firestore

            res.render('login', { error: "Invalid username or password." });
        } catch (error) {
            console.error("Error logging in:", error);
            res.render('login', { error: "Failed to login. Please try again." });
        }
    },

    // User Logout
    logout: (req, res) => {
        // TODO: Clear user session
        res.redirect('/login');
    },

    // Modify User Profile
    modifyProfile: async (req, res) => {
        try {
            // Extract updated profile details from request body
            const { userId, username, email } = req.body;

            // Update user details in Firestore
            const userRef = db.collection('users').doc(userId);
            await userRef.update({
                username,
                email
            });

            // Redirect to profile page with a success message
            res.render('profile', { success: "Profile updated successfully." });
        } catch (error) {
            console.error("Error updating profile:", error);
            res.render('profile', { error: "Failed to update profile. Please try again." });
        }
    }
};

module.exports = UserController;
