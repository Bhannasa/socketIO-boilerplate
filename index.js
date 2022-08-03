const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log('message: ' + msg);
//     });
// });

/* for everyone except the one who send this */
// io.on('connection', (socket) => {
//     console.log('hi')
//     socket.broadcast.emit('chat message','hi');
// });

/* to send everyone including the one who sent */
io.on('connection', (socket) => {
    console.log('connected')
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

/* use this for creating the server */
/*
const { Server } = require("socket.io");

const io = new Server({ /* options *\/ });

io.on("connection", (socket) => {
    // ...
  });
  
  io.listen(3000);
  */