const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user')
const Medicine = require('./models/medicine')
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to database.'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.post('/login', async (req, res) => {
    const { username, password, role } = req.body;
    console.log('Login attempt:', { username, role }); 
    
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

app.get('/admin', (req, res) => {
    res.send('<h1>Admin Dashboard</h1>');
});

app.get('/doctor', (req, res) => {
    res.send('<h1>Doctor Dashboard</h1>');
});

app.get('/pharmacist', (req, res) => {
    res.send(`
        <h1>Hello! What would you like to do?</h1>
        <a href="/pharmacist/inventory">
            <button>View Inventory</button>
        </a>
    `);
});

// Route to get all inventory items
app.get('/pharmacist/inventory', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'inventory.html'));
});

// Route to add a new inventory item
app.post('/pharmacist/inventory', async (req, res) => {
    const { name, dosage, description, quantity, expiryDate } = req.body;
    const newItem = new Medicine({ name, dosage, description, quantity, expiryDate });

    try {
        const savedItem = await newItem.save();
        console.log('Saved item:', savedItem); // Log the saved item
        res.status(201).json(savedItem); // Send the saved item back
    } catch (error) {
        console.error('Error adding inventory:', error);
        res.status(500).json({ message: 'Failed to add inventory' });
    }
});



app.put('/pharmacist/inventory/:id', async (req, res) => {
    try {
        const inventoryItem = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!inventoryItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.json(inventoryItem);
    } catch (error) {
        res.status(400).json({ message: 'Error updating inventory item', error });
    }
});

app.delete('/pharmacist/inventory/:id', async (req, res) => {
    try {
        const inventoryItem = await Medicine.findByIdAndDelete(req.params.id);
        if (!inventoryItem) return res.status(404).json({ message: 'Inventory item not found' });
        res.json({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting inventory item', error });
    }
});

// Route to get all inventory items
app.get('/pharmacist/inventory/items', async (req, res) => {
    try {
        const items = await Medicine.find(); // Fetch all items from the Medicine collection
        res.json(items); // Send the items as JSON
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Failed to fetch inventory items' });
    }
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});