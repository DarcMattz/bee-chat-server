const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://jibee-chat.vercel.app"], // Allow HTTPS
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://jibee-chat.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store users in an object
const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  io.emit("userCount", Object.keys(users).length);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userJoined", { user: username, id: socket.id });
    io.emit("userCount", Object.keys(users).length);
  });

  socket.on("message", (data) => {
    io.emit("message", { user: users[socket.id], text: data });
  });

  socket.on("leave", () => {
    if (users[socket.id]) {
      io.emit("userLeft", users[socket.id]);
      delete users[socket.id];
      io.emit("userCount", Object.keys(users).length);
    }
    console.log("User Leave the chat.");
  });

  socket.on("disconnect", () => {
    if (users[socket.id]) {
      io.emit("userLeft", users[socket.id]);
      delete users[socket.id];
      io.emit("userCount", Object.keys(users).length);
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
