const express = require('express');
const router = express.Router();
const path = require('path');

// Middleware to check if the user is a pharmacist
const checkAuth = require('../middleware/authMiddleware');

// Pharmacist Dashboard Route
router.get('/pharmacist', checkAuth('pharmacist'), (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'pharmacist.html'));
});

// Example: Pharmacist-specific actions
router.get('/view-prescriptions', checkAuth('pharmacist'), (req, res) => {
    res.send('View Prescriptions Page');
});

module.exports = router;
