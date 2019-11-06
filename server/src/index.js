/* Load files that I will use */

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

/* Create an instance of an express application */
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.Port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

// This is like the global scope for the web socket
/* 
What is the difference between io.on and socket.on?
*/
io.on('connection', (socket) => {
    console.log("A user connected!");

    // When a user JOIN a socket, I want to try and add the user.
    socket.on('join', (options, callback) => {
        // Try to use addUser. Add them to the array, by providing the options object
        // Destructure this and store in two variables
        const { error, user } = addUser({ id: socket.id, ...options});
        // Use conditional logic to check if they was an error adding the user
        if (error) {
            return callback(error);
        }
        // If there was no error, then we are able to successfully add a user.
        // In that case, we want to make sure we let them join the websocket
        // They will connect to the name of the room that is on their user objects.
        socket.join(user.room);

        socket.emit('message', generateMessage("Admin", 'Welcome!'));
        socket.broadcast.to(user.room).emit('message', generateMessage("Admin", `${user.username} has joined!`));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        // Call callback with no arguments, (no error)
        callback();
    })

    // Disconnect Functionality
    socket.on('disconnect', () => {

        // Either return undefined or the user as an object
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', generateMessage("Admin", `A ${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        const filter = new Filter();

        if(filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    });

    socket.on('sendLocation', (coords, callback) => {
        const { username, room } = getUser(socket.id);
        io.to(room).emit('locationMessage', generateLocationMessage(username, coords));
        callback();
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


// socket.emit, io.emit, socket.broadcast.emit
// io.to.emit (emit event to everyone in a specific room), socket.broadcast.to.emit(send to everyone except the origin client)
