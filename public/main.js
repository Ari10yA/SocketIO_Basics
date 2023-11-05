const socket = io();
console.log(socket);
const form = document.getElementsByClassName('form1')[0];
const roomMessageForm = document.getElementsByClassName('form2')[0];
const roomForm = document.getElementsByClassName('form3')[0];

const [input, roomMessage, roomName] = document.getElementsByClassName('input');
const messageContainer = document.getElementsByClassName('chatbox-messages')[0];

//on connection broadcasting the connection message
socket.on('connect', () => {
    socket.emit('new-connection', socket.id);
    let newMessage = `You id:- ${socket.id} connected`;
    displayMessage(newMessage);
});

socket.on('new-connection', (id)=> {
    let newMessage = `User: ${id} connected`;
    displayMessage(newMessage);
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(input.value){
        displayMessage(`Me - ${input.value}`);
        socket.emit('new message', input.value, socket.id);
        input.value = '';
    }
});

socket.on('new message', (msg, id) => {
    let newMessage = `User:- ${id} - ${msg}`;
    displayMessage(newMessage);
})

function displayMessage(message) {
    const item = document.createElement('li');
    item.classList.add('chatbox-message');
    item.innerHTML = message;
    messageContainer.appendChild(item);
}