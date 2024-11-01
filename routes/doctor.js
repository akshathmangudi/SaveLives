const express = require('express');
const router = express.Router();
const path = require('path');
// Middleware to check if the user is admin
const checkAuth = require('../middleware/authMiddleware');

// Admin Dashboard Route
router.get('/dashboard', checkAuth('doctor'), (req, res) => {
    res.send('<h1>Doctor Dashboard</h1>');
});

// Example: Add more admin-specific routes
router.get('/manage-users', checkAuth('doctor'), (req, res) => {
    res.send('Manage Users Page');
});

module.exports = router;
