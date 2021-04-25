const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
let users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on('connection', socket => {
  console.log("A user has connected!");
  io.emit('chat notification', "A user has connected");

  socket.on('disconnect', () => {
    console.log("User Disconnected");
  });
 
  socket.on('chat message', data => {
    io.emit('chat message', data);
  });

  socket.on('set username', function(username) {
    if (users.indexOf(username) === -1) {
      users.push(username);
      console.log('server users ' + users);
      console.log('username var ' + username);
      socket.emit('userSet', {username})
    } else {
      socket.emit('userExists', username + " username is taken!")
    }
  });

  socket.on('chat notification', msg => {
    io.emit('chat notification', msg);
  })
});

server.listen(8000, () => console.log("Listening on port 8000"));
