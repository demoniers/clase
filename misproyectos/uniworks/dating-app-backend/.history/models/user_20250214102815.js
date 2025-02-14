const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: { type: String, unique: true },
    name: String,
    age: Number,
    location: String,
    profilePicture: String,
    bio: String,
    interests: [String],
    isPrivate: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
