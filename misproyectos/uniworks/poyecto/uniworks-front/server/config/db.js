const mongoose = require('mongoose');
const db = 'mongodb+srv://db_connections_user:mongodbcontrase%C3%B1a2025@uniwords.zshs9.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
