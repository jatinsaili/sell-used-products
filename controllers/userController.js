const db = require('../firebaseConfig'); // Import the Firestore instance
const bcrypt = require('bcrypt'); // For password hashing

const UserController = {

    // Display the registration form
    registerForm: (req, res) => {
        res.render('registerForm');
    },

    // Display the login form
    loginForm: (req, res) => {
        res.render('loginForm');
    },

    

    // Display the profile edit form
    editProfileForm: async (req, res) => {
        const userId = req.session.userId;
        const userRef = db.collection('users').doc(userId);
        const user = await userRef.get();
        if (user.exists) {
            res.render('editProfileForm', { user: user.data() });
        } else {
            res.redirect('/dashboard', { error: "User not found." });
        }
    },


    // View User Profile
    viewProfile: async (req, res) => {
        try {
            const userId = req.session.userId; // Get user ID from session
            if (!userId) {
                res.redirect('/login', { error: "Please login to view your profile." });
                return;
            }

            const userRef = db.collection('users').doc(userId);
            const user = await userRef.get();

            if (user.exists) {
                res.render('profileView', { user: user.data() });
            } else {
                res.redirect('/login', { error: "User not found." });
            }
        } catch (error) {
            console.error("Error viewing profile:", error);
            res.redirect('/dashboard', { error: "Failed to fetch profile. Please try again." });
        }
    },


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

            res.redirect('/loginForm');
        } catch (error) {
            console.error("Error registering user:", error);
            res.render('registerForm', { error: "Failed to register. Please try again." });
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
            res.render('loginForm', { error: "Invalid username or password." });
        } catch (error) {
            console.error("Error logging in:", error);
            res.render('loginForm', { error: "Failed to login. Please try again." });
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
    },

    // View a specific user's profile and their ads
    viewSpecificUserProfile: async (req, res) => {
        try {
            const userId = req.params.userId; // Get user ID from the route parameter
            const userRef = db.collection('users').doc(userId);
            const user = await userRef.get();

            if (!user.exists) {
                res.redirect('/dashboard', { error: "User not found." });
                return;
            }

            // Fetch all ads created by the user
            const adsSnapshot = await db.collection('ads').where('userId', '==', userId).get();
            const ads = [];
            adsSnapshot.forEach(doc => {
                ads.push({ id: doc.id, ...doc.data() });
            });

            res.render('specificUserProfile', { user: user.data(), ads });
        } catch (error) {
            console.error("Error viewing specific user profile:", error);
            res.redirect('/dashboard', { error: "Failed to fetch user profile. Please try again." });
        }
    }

};

module.exports = UserController;
