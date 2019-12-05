const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema ({
    username: String,
    chatroom: String,
})

const Chat = new mongoose.model('chat', chatSchema);

module.exports = Chat;