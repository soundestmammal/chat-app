const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.Port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// This is like the global scope for the web socket
io.on('connection', (socket) => {
    // Disconnect Functionality
    socket.on('disconnect', () => {
        console.log("A user disconnected.")
    });

    socket.on('chat message', (message) => {
        console.log(`Message: ${message}`);
        io.emit('chat message', message);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// I need to be more structured. What is the plan? Think 1. 2. 3. 

/* 
The server needs to handle:

1) When a user connects/disconnects from the server we want to log that.
2) When a user sends a message to the server ->
    Listen for the event
    io.emit the event to all connections





Connection
    Disconnection
    chat message

*/