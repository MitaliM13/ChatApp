import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'

const app = express()
const PORT = 3000

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

app.use(cors())

app.get('/', (req, res) => {
    res.send('This is the server!') 
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("message", ({room, message}) => {
        console.log({room, message})
        socket.to(room).emit("received", message)
    })

    socket.on('join_room', (room) => {
        socket.join(room)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})