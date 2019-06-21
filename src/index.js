const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage,
        generateLocationMessage
        } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

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

    socket.on('join', ( options, callback) => {
        // Try to use addUser. Add them to the array, by providing the options object
        // Destructure this and store in two variables
        const { error, user } = addUser({ id: socket.id, ...options});
        // Use conditional logic to check if they was an error adding the user
        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', generateMessage('Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`));

        // Call callback with no arguments, (no error)
        callback();
    })

    // Disconnect Functionality
    socket.on('disconnect', () => {

        // Either return undefined or the user as an object
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage(`A ${user.username} has left!`));
        }
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(coords));
        callback();
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


// socket.emit, io.emit, socket.broadcast.emit
// io.to.emit (emit event to everyone in a specific room), socket.broadcast.to.emit(send to everyone except the origin client)