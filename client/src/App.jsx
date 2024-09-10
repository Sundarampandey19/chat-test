import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const App = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");

  const handleJoinRoom = () => {
    if (room !== "") {
      
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== "" ) {
      let room="sdafasdf"
      socket.emit("message", { message , room });
      console.log({ message , room})
      setMessages((messages) => [...messages, { message , room}]);
      setMessage("");
    }
  };



  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.emit("join-room", "sdafasdf");
      console.log(`Joined room: sdafasdf`);

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 100 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography>


      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        {/* <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        /> */}
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
      {JSON.stringify(messages)}
{/* 
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack> */}
    </Container>
  );
};

export default App;