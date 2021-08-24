const io:any = require('socket.io')(3000
    , {
    cors: {
        origin: ["http://localhost:8080"],
    },
})

io.on('connection', (socket:any) => {
    console.log(socket.id);

    socket.on('send-message', (data:any) => {
        socket.broadcast.emit('receive-message', data)
    })
})



