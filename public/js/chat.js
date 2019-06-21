const socket = io();

// server (emit) -> client (receive) -- acknowledgement --> server
// client (emit) -> server (receive) -- acknowledgement --> client

// Elements
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-message-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true }); // Eliminates "?" from the string
socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        message: message.url,
        createdAt: moment(message.createdAt).format('h:mm a'),
        username: message.username
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('roomData', ({ room, users }) => {
    console.log(room);
    console.log(users);
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');
    // disable
    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        // enable
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);
        }

        console.log("Message Delivered!")
    });
})

$sendLocationButton.addEventListener('click', () => {
    // disable button here
    $sendLocationButton.setAttribute('disabled', 'disabled');
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) => {
            // enable
            $sendLocationButton.removeAttribute('disabled');
            if (error) {
                return console.log(error);
            }
            console.log("Location Shared Successfully!");
        })
    })
})

socket.on('connection', () => {
    console.log("Welcome!")
});


// If something does go wrong, we will be able to find out
// It is important to let the client know there was a problem
socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});





















// socket.on('chat message', (text) => {
//     var node = document.createElement('LI');
//     var textnode = document.createTextNode(text);
//     node.appendChild(textnode);
//     document.getElementById("message-list").appendChild(node);
//     console.log(text);
// });

// document.querySelector('#message-form').addEventListener('submit', (e) => {
//     e.preventDefault(); // prevent the reload of the browser
//     const message = e.target.elements.message.value;
//     socket.emit('chat message', message);
//     document.querySelector('#message-input').value = "";
//     return false;
// });


/*

socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked');
    socket.emit('increment');
})

*/