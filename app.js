const express = require('express');
const { createServer } = require('node:http');
const path = require('path');
const socketio = require('socket.io');
const session = require('express-session');

const app = express();
const server = createServer(app);
const io = new socketio.Server(server,{
    connectionStateRecovery: {}
});

app.use(express.static(path.join(__dirname , 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'my-super-secret',
    resave: false,
    saveUninitialized: true
  }))

app.use((req, res, next) => {
    if(!req.session.user){
        req.session.user = "New User"
    }
    req.user = req.session.user;
    next();
})

app.get('/', (req, res, next) => {
    console.log(req.user);
    res.sendFile(path.join(__dirname, 'public/home.html'));
});

app.post('/user', (req, res, next) => {
    const user = req.body.name;
    req.session.user = user
    console.log(req.user);
    res.redirect('/');
})

io.on('connection', async(socket) => {
    

    socket.on('new message', (msg, id) => {
        socket.broadcast.emit('new message', msg, id);
    })

    socket.on('new-connection', (id)=> {
        socket.broadcast.emit('new-connection', id);
    })
})

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});