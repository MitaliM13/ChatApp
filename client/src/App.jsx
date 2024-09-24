import { useEffect, useState, useMemo } from "react"
import {io} from "socket.io-client"
import { Container, Typography, TextField, Button } from "@mui/material"

function App() {

  const socket = useMemo(() => io("http://localhost:3000"), [])

  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("message", message)
    setMessage("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log('connected', socket.id)

      socket.on("message", (msg) => {
        console.log(msg )
      })
      
      socket.on('received', (data) => {
        console.log(data)
      })

      return () => {
        socket.disconnect()
      }
    })
  }, [])

  return (
      
      <Container maxWidth="sm">
        <Typography variant="h1" component="div">Chat Room</Typography>

        <form onSubmit={handleSubmit}>
          <TextField 
            id="outlined-basic" 
            label="Outlined" 
            variant="outlined" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}  
          />
          <Button variant="contained" color="primary" type="submit">Send</Button>
        </form>
      </Container>
           
  )
}

export default App
