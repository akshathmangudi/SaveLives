const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
}, { collection: 'collection1' });
    
const user = mongoose.model('User', userSchema);

module.exports = user;