// middleware/isAuthenticated.js

module.exports = (req, res, next) => {
    if (req.session && req.session.userId) {
        next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
        res.redirect('/login'); // Redirect to login page if not authenticated
    }
};
