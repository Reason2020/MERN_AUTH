const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, { 
    timestamps: true
});

//user model
const User = mongoose.model('User', userSchema);

module.exports = User;