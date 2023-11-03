const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = createServer(app);
const io = new socketio.Server(server,{
    connectionStateRecovery: {}
});

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    if(!req.user){
        req.user = "New User";
    }
    next();
})

app.get('/', (req, res, next) => {
    console.log(req.user);
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.post('/user', (req, res, next) => {
    const user = req.body.name;
    req.user = user;
    console.log(req.user);
    res.redirect('/');
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('new message', (msg) => {
        io.emit('new message', msg);
    })
})

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});