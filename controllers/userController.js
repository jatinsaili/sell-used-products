const db = require('../firebaseConfig'); // Import the Firestore instance
const bcrypt = require('bcrypt'); // For password hashing

const UserController = {

    // User Registration
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Hash the password before storing
            const hashedPassword = await bcrypt.hash(password, 10);

            // Save user to Firestore
            const userRef = db.collection('users').doc(); 
            await userRef.set({
                username,
                password: hashedPassword,
                email
            });

            res.redirect('/login');
        } catch (error) {
            console.error("Error registering user:", error);
            res.render('register', { error: "Failed to register. Please try again." });
        }
    },

    // User Login
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate user credentials against Firestore
            const users = await db.collection('users').where('username', '==', username).get();
            if (!users.empty) {
                const user = users.docs[0].data();
                const isValidPassword = await bcrypt.compare(password, user.password);
                if (isValidPassword) {
                    req.session.userId = users.docs[0].id; // Store user ID in session
                    res.redirect('/dashboard');
                    return;
                }
            }
            res.render('login', { error: "Invalid username or password." });
        } catch (error) {
            console.error("Error logging in:", error);
            res.render('login', { error: "Failed to login. Please try again." });
        }
    },

    // User Logout
    logout: (req, res) => {
        req.session.destroy(); // Clear user session
        res.redirect('/login');
    },

    // Modify User Profile
    modifyProfile: async (req, res) => {
        try {
            const userId = req.session.userId; // Get user ID from session
            const { username, email } = req.body;

            const userRef = db.collection('users').doc(userId);
            await userRef.update({
                username,
                email
            });

            res.render('profile', { success: "Profile updated successfully." });
        } catch (error) {
            console.error("Error updating profile:", error);
            res.render('profile', { error: "Failed to update profile. Please try again." });
        }
    }
};

module.exports = UserController;
