const socket = io();

const form = document.getElementsByClassName('form')[0];
const input = document.getElementsByClassName('input')[0];
const messageContainer = document.getElementsByClassName('chatbox-messages')[0];


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value){
        socket.emit('new message', input.value);
        input.value = ''
    }
});

socket.on('new message', (msg) => {
    console.log('from new message');
    const item = document.createElement('li');
    item.classList.add('chatbox-message');
    item.innerHTML = msg;
    messageContainer.appendChild(item);
})