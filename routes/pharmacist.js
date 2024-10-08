const express = require('express');
const router = express.Router();

// Middleware to check if the user is a pharmacist
const checkAuth = require('../middleware/authMiddleware');

// Pharmacist Dashboard Route
router.get('/dashboard', checkAuth('pharmacist'), (req, res) => {
    res.send('<h1>Pharmacist Dashboard</h1>');
});

// Example: Pharmacist-specific actions
router.get('/view-prescriptions', checkAuth('pharmacist'), (req, res) => {
    res.send('View Prescriptions Page');
});

module.exports = router;
