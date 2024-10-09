const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user')
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
}, { collection: 'collection1' });

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});


// Login POST route for user authentication
app.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    console.log('Login attempt:', { username, role });  // Log login attempt details (exclude password)
    
    try {
        const user = await User.findOne({ username });
        console.log('User found:', user ? 'Yes' : 'No');

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Password match:', isMatch);

            if (isMatch && user.role === role) {
                console.log('Role matched:', role);
                switch(role) {
                    case 'admin':
                        res.redirect('/admin');
                        break;
                    case 'doctor':
                        res.redirect('/doctor');
                        break;
                    case 'pharmacist':
                        res.redirect('/pharmacist');
                        break;
                    default:
                        res.status(400).send('Invalid role selected');
                }
            } else {
                res.status(401).send('Invalid username, password, or role');
            }
        } else {
            res.status(401).send('Invalid username, password, or role');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
});

// Admin dashboard route
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