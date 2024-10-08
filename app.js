const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://akshath:akshathm447@savelives.iz2zh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
  
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);
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

// Login POST route for user authentication
app.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Fetch the user from the database based on username
        const user = await User.findOne({ username });
        
        // If user is found
        if (user) {
            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch && user.role === role) {
                // Role-based redirection
                if (role === 'admin') {
                    res.redirect('/admin');  // Redirect to admin page
                } else if (role === 'doctor') {
                    res.redirect('/doctor');  // Redirect to doctor page
                } else if (role === 'pharmacist') {
                    res.redirect('/pharmacist');  // Redirect to pharmacist page
                } else {
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
