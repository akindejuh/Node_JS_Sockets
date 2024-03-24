const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

io.on('connection', socket => {
  socket.on('join_room', data => {
    if (data?.room) socket.join(data.room);
  });

  socket.on('leave_room', data => {
    if (data?.room) socket.leave(data.room);
  });

  socket.on('send_message', data => {
    if (data?.room) socket.to(data.room).emit('receive_message', data);
  });
});

server.listen(3001, () => {
  console.log('Server is running!!');
});
