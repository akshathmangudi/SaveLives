const mongoose = require('mongoose'); 

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true}, 
    dosage: { type: String, required: true}, 
    description: { type: String, required: true},
    quantity: { type: Number, required: true},
    expiryDate: { type: Date, required: true},
});

const medicine = mongoose.model('Medicine', medicineSchema, 'collection2'); 
module.exports = medicine; 