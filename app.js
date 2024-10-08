const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form submissions
app.use(bodyParser.urlencoded({ extended: false }));

// Route for login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password, role } = req.body;

    // Perform user authentication logic here
    // Assume user authentication is successful

    if (role === 'admin') {
        res.redirect('/admin');  // Redirect to admin page
    } else if (role === 'doctor') {
        res.redirect('/doctor');  // Redirect to doctor page
    } else if (role === 'pharmacist') {
        res.redirect('/pharmacist');  // Redirect to pharmacist page
    } else {
        res.status(400).send('Invalid role selected');
    }
});

app.get('/admin', (req, res) => {
    res.send('<h1>Admin Dashboard</h1>');
});

// Doctor dashboard route
app.get('/doctor', (req, res) => {
    res.send('<h1>Doctor Dashboard</h1>');
});

// Pharmacist dashboard route
app.get('/pharmacist', (req, res) => {
    res.send('<h1>Pharmacist Dashboard</h1>');
});

// Route for the About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
