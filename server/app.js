import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

const app = express()
const PORT = 3000

const server = createServer(app)

const io = new Server(server)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})