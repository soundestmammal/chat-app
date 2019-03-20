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

// Goal: Send a welcome message to new users

// 1. Have server emit "message when new client connects"
    // - Send "Welcome!" as the event data

const message = "Welcome!"
io.on('connection', (socket) => {
    socket.emit('message', message);
})
// 2. Have client listen for message event and print to console.
// 3. Test the works

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

// let count = 0;

// io.on('connection', (socket) => {
//     console.log('New Websocket connection');
//     socket.emit('countUpdated', count);

//     socket.on('increment', () => {
//         count++;
//         // socket.emit('countUpdated', count);
//         io.emit('countUpdated', count);
//     })
// })