const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on('connection', socket => {
  console.log("A user has connected!");
  io.emit('chat notification', "A user has connected")
  socket.on('disconnect', () => {
    console.log("User Disconnected");
  });
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
    console.log(`message: ${msg}`)
  });
  socket.on('chat notification', msg => {
    io.emit('chat notification', msg)
  })
});

server.listen(8000, () => console.log("Listening on port 8000"));
