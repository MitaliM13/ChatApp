import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Container, Typography, TextField, Button, Box, Stack, Paper } from "@mui/material";

function App() {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join_room", roomName);
    setRoomName("");
  };

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
    <Container maxWidth="sm" className="bg-gray-100 p-8 rounded-lg shadow-xl mt-10">
      {/* Chat Room Header */}
      <Box className="mb-8 text-center">
        <Typography variant="h3" component="div" className="text-blue-700 font-extrabold tracking-wide">
          Chat Room
        </Typography>
        <Typography variant="h6" component="div" className="text-gray-600 mt-2">
          Your ID: <span className="font-mono text-blue-500">{socketId}</span>
        </Typography>
      </Box>

      {/* Join Room Form */}
      <form onSubmit={joinRoomHandler} className="mb-8 bg-blue-50 p-4 rounded-lg shadow-inner">
        <Typography variant="h5" className="mb-2 text-blue-600">Join a Room</Typography>
        <TextField
          id="roomName"
          label="Room Name"
          variant="outlined"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          fullWidth
          className="bg-white mb-4"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700 shadow-md">
          Join Room
        </Button>
      </form>

      {/* Send Message Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          id="message"
          label="Enter your message"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          className="bg-white"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        />
        <TextField
          id="room"
          label="Enter room to send message"
          variant="outlined"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          fullWidth
          className="bg-white"
          InputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 14 } }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth className="bg-blue-600 hover:bg-blue-700 shadow-md">
          Send Message
        </Button>
      </form>

      {/* Messages Display */}
      <Stack spacing={2} className="mt-8 bg-gray-50 p-4 rounded-lg shadow-inner max-h-96 overflow-y-auto">
        {messages.length ? (
          messages.map((msg, index) => (
            <Paper key={index} className="p-3 bg-white shadow-sm rounded-lg">
              <Typography className="text-gray-700 font-medium">{msg}</Typography>
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
