# 🐝 Bee-Chat Server

Bee-Chat is a real-time chat application built using **Node.js, Express, and Socket.io**. This repository contains the backend server for handling WebSocket connections and real-time messaging.

## 🚀 Features

- Real-time messaging with **Socket.io**
- User join/leave notifications
- Broadcast messages to all connected clients
- Lightweight and easy to set up

## 📌 Tech Stack

- **Node.js** (Backend Runtime)
- **Express.js** (Web Server)
- **Socket.io** (Real-time WebSockets)
- **Cors** (Cross-Origin Requests Handling)

## 🛠 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/DarcMattz/bee-chat-server.git
cd bee-chat-server
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the server

```bash
node server.js
```

The server will start on **http://localhost:5000**.

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
CLIENT_URL=http://localhost:5173  # Replace with frontend URL
```

## 📡 API & WebSocket Events

### 🔹 Server Events

| Event        | Payload        | Description                      |
| ------------ | -------------- | -------------------------------- |
| `join`       | `{ username }` | A user joins the chat            |
| `message`    | `{ text }`     | A user sends a message           |
| `disconnect` | -              | A user disconnects from the chat |

### 🔹 Client Events

| Event        | Payload          | Description                  |
| ------------ | ---------------- | ---------------------------- |
| `userJoined` | `{ user }`       | Broadcast when a user joins  |
| `message`    | `{ user, text }` | Broadcast new messages       |
| `userLeft`   | `{ user }`       | Broadcast when a user leaves |
