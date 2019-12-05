const mongoose = require('mongoose');

const { Schema }  = mongoose;

const userSchema = new Schema({
    name: String,
    age: Number,
});

const User = new mongoose.model('User', userSchema);

module.exports = User;