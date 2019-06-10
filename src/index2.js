const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.Port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

let count = 0;

io.on('connection', (socket) => {
    console.log("New WebSocket Connection");

    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++;
        io.emit('countUpdated', count);
    })
});

app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
})


/*
Active Recall Questions for later:

1. What is syntax for declaring a Port?
const port = process.env.Port || 3000;

2. What does io.on do?
Listen for a specific event to occur

3. What does socket.on do?
Emit the event to a particular connection.

4. What does io.emit do?
Emit the event to all connections that are available.

5. What inputs does io.on accept?
    a. name of an event
    b. callback function

6. How to load up socket.io on the client side?
In the script tag, src="/socket.io/socket.io.js"
Create our own js file in the public directory and load it below ^^^
Therefore, my own js file will have access to stuff from socket.io

7.
*/