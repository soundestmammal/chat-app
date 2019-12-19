const mongoose = require('mongoose');

const { Schema } = mongoose;

const chatSchema = new Schema (
    {   
        username: {
            type: String,
            required: true
        }, 
        chatRoomName: {
            type: String,
            required: true
        }    
    }
)

const Chat = new mongoose.model('chat', chatSchema);

module.exports = Chat;