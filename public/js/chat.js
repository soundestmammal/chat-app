const socket = io();

// server (emit) -> client (receive) -- acknowledgement --> server
// client (emit) -> server (receive) -- acknowledgement --> client

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error);
        }

        console.log("Message Delivered!")
    });
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (error) => {
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