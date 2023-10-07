// server.js
const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 5000;




const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin:'*'
  }
});
const chatSpace = io.of("/chat");
chatSpace.on('connection', (socket) => {
  console.log(`A user connected to the /chat namespace`);
  // When a user joins "room1"
  socket.on('joinroom', (room) => {
    socket.join(room); // Join the specified room
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Listen for messages from clients in the /chat namespace
  socket.on('message', (message, room) => {
    // Broadcast the message to clients in the specified room
    console.log(message,  room, socket.id);
    chatSpace.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from the /chat namespace`);
  });
});





server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
