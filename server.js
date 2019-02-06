const express = require('express');
const socketIO = require('socket.io')
const http = require('http');

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const messages = [];

io.on('connection', (socket) => {
    console.log('New User connected!');

    socket.emit('hello', messages)

    socket.on('createMessage', ({from, message}, callback) => {
        callback("Message received!")
        messages.push({from, message})
        io.emit('newMessage', messages);
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
