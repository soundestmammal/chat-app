const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Twit = require('twit');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.Port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// const T = new Twit({
//     consumer_key:         'JDkYuuyxW16aXOPpyiiqAIF2O',
//     consumer_secret:      'MHePNqpCx0Kgp8HBSkjQ6oE1lmFRAtcV9bs603EKzH6veZczLW',
//     access_token:         '61657873-ngpFtj8OB0Qf0fxe6I2DritCcF1YOce67BxVlCWzU',
//     access_token_secret:  '9sdvGTcgxClappJLHY80GIPoV4gsHY6zhlcOvhy3cuPUZ',
//     timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//     strictSSL:            true,     // optional - requires SSL certificates to be valid.
// });

// This is like the global scope for the web socket
io.on('connection', (socket) => {
    console.log("A user connected!");

    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'A new user has joined!');

    // Disconnect Functionality
    socket.on('disconnect', () => {
        io.emit('message', "A user has left the chat!");
    });

    socket.on('sendMessage', (message) => {
        io.emit('message', message);
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `Location: ${coords.latitude}, ${coords.longitude}`);
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


