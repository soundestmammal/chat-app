const socket = io();

socket.on('chat message', (message) => {
    var node = document.createElement('LI');
    var textnode = document.createTextNode(message);
    node.appendChild(textnode);
    document.getElementById("message-list").appendChild(node);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the reload of the browser
    const message = e.target.elements.message.value;
    socket.emit('chat message', message);
    document.querySelector('#message-input').value = "";
    return false;
});




