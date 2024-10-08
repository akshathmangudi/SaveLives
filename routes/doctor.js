const express = require('express');
const router = express.Router();

// Middleware to check if the user is a doctor
const checkAuth = require('../middleware/authMiddleware');

// Doctor Dashboard Route
router.get('/dashboard', checkAuth('doctor'), (req, res) => {
    res.send('<h1>Doctor Dashboard</h1>');
});

// Example: Doctor CRUD actions (e.g., manage prescriptions)
router.get('/manage-prescriptions', checkAuth('doctor'), (req, res) => {
    res.send('Manage Prescriptions Page');
});

module.exports = router;
