const express = require('express');
const router = express.Router();

// Middleware to check if the user is admin
const checkAuth = require('../middleware/authMiddleware');

// Admin Dashboard Route
router.get('/dashboard', checkAuth('admin'), (req, res) => {
    res.send('<h1>Admin Dashboard</h1>');
});

// Example: Add more admin-specific routes
router.get('/manage-users', checkAuth('admin'), (req, res) => {
    res.send('Manage Users Page');
});

module.exports = router;
