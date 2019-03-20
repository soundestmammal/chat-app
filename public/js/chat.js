const socket = io();

socket.on('countUpdated', (count) => {
    console.log('The count has been updated!', count);
});

const button = document.querySelector('#increment').addEventListener('click', () => {
    console.log('Clicked');
    socket.emit('increment');
});

