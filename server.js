const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://akshath:akshathm447@savelives.iz2zh.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Database connected successfully!');
});
