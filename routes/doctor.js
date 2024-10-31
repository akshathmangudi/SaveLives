const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor'); // Assuming you have a Doctor model set up for MongoDB

// Fetch all doctors
router.get('/', async (req, res) => { // Changed from '/api/doctor' to '/'
    console.log("Received body: ", req.body);
    try {
        const doctors = await Doctor.find();
        console.log("Retrieved Doctors: ", doctors); 
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Create a new doctor
router.post('/', async (req, res) => { // Changed from '/api/doctor' to '/'
    console.log("Received POST request to /api/doctor");
    console.log("Request body:", req.body);

    try {
        // Validate incoming data
        if (!req.body.name || !req.body.specialization) {
            return res.status(400).json({ 
                error: 'Missing required fields', 
                receivedData: req.body 
            });
        }

        const newDoctor = new Doctor(req.body);
        
        console.log("Attempting to save doctor:", newDoctor);
        
        const savedDoctor = await newDoctor.save();
        
        console.log("Doctor saved successfully:", savedDoctor);
        
        res.status(201).json(savedDoctor);
    } catch (error) {
        console.error("Detailed error creating doctor:", error);
        res.status(500).json({ 
            error: 'Failed to create doctor', 
            details: error.message,
            stack: error.stack 
        });
    }
});

// Update an existing doctor
router.put('/:id', async (req, res) => { // Changed from '/api/doctor/:id' to '/:id'
    console.log("Received data for updating doctor:", req.body);
    console.log("Updating doctor with ID:", req.params.id, "Data:", req.body); // Log this
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDoctor);
    } catch (error) {
        console.error("Error updating doctor:", error);
        res.status(500).json({ error: 'Failed to update doctor' });
    }
});

// Delete a doctor
router.delete('/:id', async (req, res) => { // Changed from '/api/doctor/:id' to '/:id'
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete doctor' });
    }
});

module.exports = router;
