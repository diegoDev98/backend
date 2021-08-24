'use strict';

var io = require('socket.io')(3000, {
    cors: {
        origin: ["http://localhost:8080"]
    }
});

io.on('connection', function (socket) {
    console.log(socket.id);

    socket.on('send-message', function (data) {
        socket.broadcast.emit('receive-message', data);
    });
});
