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

const T = new Twit({
    consumer_key:         'JDkYuuyxW16aXOPpyiiqAIF2O',
    consumer_secret:      'MHePNqpCx0Kgp8HBSkjQ6oE1lmFRAtcV9bs603EKzH6veZczLW',
    access_token:         '61657873-ngpFtj8OB0Qf0fxe6I2DritCcF1YOce67BxVlCWzU',
    access_token_secret:  '9sdvGTcgxClappJLHY80GIPoV4gsHY6zhlcOvhy3cuPUZ',
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

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

    const stream = T.stream('statuses/filter', { track: 'waymo, gm, cruise automation, nuro, nuroai' });
    stream.on('tweet', function (tweet) {
        var { create_at, text, user } = tweet;
        console.log(tweet);
        io.emit('chat message', create_at, text, user);
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