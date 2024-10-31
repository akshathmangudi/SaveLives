// models/doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctorId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(), // Auto-generate if empty
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    schedule: {
      type: String
    }
  });

const Doctor = mongoose.model('Doctor', doctorSchema, 'doctors');

module.exports = Doctor;
