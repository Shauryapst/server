// server.js
require('dotenv').config();
const app = require('./src/app');
const http = require('http');
const { Server } = require('socket.io');
const mongoDBConnection = require('./src/config/db/mongo/mongodb.config');
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
 
  socket.on('joinroom', (room) => {
    socket.join(room); 
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  
  socket.on('message', (message, room) => {
    
    console.log(message,  room, socket.id);
    chatSpace.to(room).emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from the /chat namespace`);
  });
});



const startServer = async () =>{
  await mongoDBConnection();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

startServer();


