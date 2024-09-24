import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

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

const secretKey = "ajsdkajsdbas"

app.get('/', (req, res) => {
    res.send('This is the server!') 
})

app.get('/login', (req, res) => {
    const token = jwt.sign({id: "absdkadbskdhb"}, secretKey)
    res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "none"})
    .json({
        message: "Login successful"
    })
})

const user = false

io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, (err) => {
        if(err) return next(err)

        const token = socket.request.cookies.token
        
        if(!token) return next(new Error("Not Authorized"))

        const decoded = jwt.verify(token, secretKey)
        next()
    })
})

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("message", ({room, message}) => {
        console.log({room, message})
        socket.to(room).emit("received", message)
    })

    socket.on('join_room', (room) => {
        socket.join(room)
        console.log(`User with ID: ${socket.id} joined room: ${room}`)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`)
    })
})

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})