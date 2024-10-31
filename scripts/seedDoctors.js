// scripts/seedDoctors.js
const mongoose = require('mongoose');
const { Doctor } = require('../models/doctor');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

// Sample doctor data
const doctors = [
    { name: "Dr. John Doe", specialization: "Cardiology", contact: "123-456-7890", schedule: "Mon-Fri 9am-5pm" },
    { name: "Dr. Sarah Smith", specialization: "Neurology", contact: "987-654-3210", schedule: "Tue-Thu 10am-6pm" },
    { name: "Dr. Emily Stone", specialization: "Pediatrics", contact: "456-789-1234", schedule: "Mon-Fri 8am-4pm" },
    { name: "Dr. Michael Lee", specialization: "Orthopedics", contact: "321-654-9870", schedule: "Wed-Fri 9am-5pm" }
];

// Function to insert sample data
async function seedDoctors() {
    try {
        await Doctor.deleteMany({});  // Clear existing data if needed
        await Doctor.insertMany(doctors);
        console.log("Doctor data seeded successfully.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding doctor data:", error);
    }
}

seedDoctors();
