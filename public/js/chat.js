const socket = io();

socket.on('countUpdated', (count) => {
    console.log('The count has been updated', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked');
    socket.emit('increment');
})


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

// var tweetInfo = {
//     name: "Robert Checco",
//     date: new Date(),
//     age: 23
// }

// var template = function (tweetInfo) {
//     const {name, date, age} = tweetInfo;
//     temp = (name, date, age) => {
//     return (`
//         <div class="twitterList">
//             <div>${name}</div>
//             <div>${date}</div>
//             <div>${age}</div>
//         </div>`);
//     }
// };

// var render = function(node, template) {
//     if (!node) return;
//     node.innerHTML = template;
// }

// render(document.querySelector('.chat-window'), content);

// var template = `
// <div class="twitterList">
//     <div>${name}</div>
//     <div>${date}</div>
//     <div>${age}</div>
// </div>`;