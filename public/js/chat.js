const socket = io();

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count);
});

socket.on('message', (message) => {
    const button = document.querySelector('h1').innerHTML = message;
})

const button = document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked');
    socket.emit('increment');
});

