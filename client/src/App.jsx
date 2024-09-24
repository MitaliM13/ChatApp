import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Container, Typography, TextField, Button, Box, Stack, Paper } from "@mui/material";

function App() {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  console.log("messages", messages);

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join_room", room);
    setRoomName("");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);

      socket.on("message", (msg) => {
        console.log(msg);
      });

      socket.on("received", (data) => {
        console.log(data);
        setMessages((messages) => [...messages, data]);
      });

      return () => {
        socket.disconnect();
      };
    });
  }, []);

  return (
    <Container maxWidth="sm" className="bg-gray-100 p-8 rounded-lg shadow-lg mt-10">
      <Box className="mb-8 text-center">
        <Typography variant="h3" component="div" className="text-blue-700 font-extrabold">
          Chat Room
        </Typography>
        <Typography variant="h6" component="div" className="text-gray-600 mt-2">
          Your ID: {socketId}
        </Typography>
      </Box>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          id="message"
          label="Enter room name"
          variant="outlined"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          fullWidth
          className="bg-white"
          InputProps={{ style: { fontSize: 16 } }} // Enhance text size
          InputLabelProps={{ style: { fontSize: 14 } }} // Enhance label size
        />
        <Button variant="contained" color="primary" type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </form>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          id="message"
          label="Enter your message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          className="bg-white"
          InputProps={{ style: { fontSize: 16 } }} // Enhance text size
          InputLabelProps={{ style: { fontSize: 14 } }} // Enhance label size
        />
        <TextField
          id="room"
          label="Enter room"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          fullWidth
          className="bg-white"
          InputProps={{ style: { fontSize: 16 } }} // Enhance text size
          InputLabelProps={{ style: { fontSize: 14 } }} // Enhance label size
        />
        <Button variant="contained" color="primary" type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700">
          Send
        </Button>
      </form>

      <Stack spacing={2} className="mt-6">
        {messages.length ? (
          messages.map((msg, index) => (
            <Paper key={index} className="p-3 bg-white shadow-sm rounded-lg">
              <Typography className="text-gray-700">{msg}</Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" className="text-gray-500 text-center mt-4">
            No messages yet...
          </Typography>
        )}
      </Stack>
    </Container>
  );
}

export default App;
