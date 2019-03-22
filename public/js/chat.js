const socket = io();

socket.on('chat message', (text) => {
    var node = document.createElement('LI');
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("message-list").appendChild(node);
    console.log(text);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent the reload of the browser
    const message = e.target.elements.message.value;
    socket.emit('chat message', message);
    document.querySelector('#message-input').value = "";
    return false;
});

// I want to create a resusable dom element that I am going to inject the information that I need.



var render = function(template, node) {
    // Put something here
}





const twitterTemplate = {
    constructor() {
        this.photo = photo,
        this.text = text,
        this.time = time
    }
<li>
    <div class="twitterTemplate">
        <div>Photo</div>
        <div>Text</div>
        <div>Time</div>
    </div>
</li>
}
// Everytime I get a chat message, I want to pass the information to this element and render it.



