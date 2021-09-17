const app = require("express")()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
})

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('coneting')
    socket.on('send-content', (data) => {
        socket.broadcast.emit('get-content', data)
    })
})

server.listen(3000, () => {
    console.log('listening on localhost:3000');
})
