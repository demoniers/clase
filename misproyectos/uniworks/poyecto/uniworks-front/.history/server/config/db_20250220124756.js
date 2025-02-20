const mongoose = require('mongoose');
const db = 'mongodb+srv://fortnitemodocreativo:<db_password>@uniwords.zshs9.mongodb.net/?retryWrites=true&w=majority&appName=UniWORDS';

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
