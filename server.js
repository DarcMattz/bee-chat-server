const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Store users in a Map
const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a user joins
  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userJoined", { user: username, id: socket.id });
  });

  // Handle messages
  socket.on("message", (data) => {
    io.emit("message", { user: users[socket.id], text: data }); // Broadcast message
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    io.emit("userLeft", users[socket.id]);
    delete users[socket.id];
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
