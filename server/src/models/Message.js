const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema (
    {
        user: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: String,
            required: true
        }
    }
)

const Message = new mongoose.model('message', messageSchema);

module.exports = Message;