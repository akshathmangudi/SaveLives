// middleware/authMiddleware.js

const checkAuth = (role) => {
    return (req, res, next) => {
        // Simulate getting user role, e.g., from session or a request body
        // In a real app, you'd get this from a more secure place
        const userRole = req.user ? req.user.role : null; 

        if (!userRole) {
            return res.status(403).send('Forbidden');
        }

        if (userRole !== role) {
            return res.status(403).send('Forbidden');
        }

        next(); // User is authorized, proceed to the next middleware/route
    };
};

module.exports = checkAuth;
