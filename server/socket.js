import { Server } from "socket.io";
import ChatData from './models/Chat.js';

export function configureSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [process.env.BASE_URL],
    },
  });

  io.on("connection", (socket) => {
    socket.on('chat_message', async ({ message, roomId, senderId }) => {
      try {
        const [chatData] = await ChatData.findOrCreate({
          where: { roomId },
        });

        const messages = chatData.messages || [];

        // Push the new message to db
        messages.push({ text: message, senderId });

        // Update and save the messages
        chatData.messages = messages;
        await chatData.save();

        let socketConn = socket.broadcast;
        socketConn = roomId ? socketConn.to(roomId) : socketConn;
        console.log(`Message received`, message, roomId);
        socketConn.emit('server_message', { message, roomId, senderId });
        console.log(`Message passed to client`, message);
      } catch (error) {
        console.error('Error saving chat message:', error);
      }
    });

    // Handle typing events
    socket.on("typing", ({ roomId }) => {
      let socketConn = socket.broadcast;
      socketConn = roomId ? socketConn.to(roomId) : socketConn;
      socketConn.emit('typing-started-from-server', { roomId });
    });

    socket.on("stop_typing", ({ roomId }) => {
      let socketConn = socket.broadcast;
      socketConn = roomId ? socketConn.to(roomId) : socketConn;
      socketConn.emit('typing-stopped-from-server', { roomId });
    });

    socket.on("join-room", ({ roomId ,role}) => {
      console.log(`join-room ${roomId} role is: ${role}`);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined", { userId: socket.id });
    });

    socket.on("disconnect", () => {
      // Get the rooms that the user is in
      const rooms = Object.keys(socket.rooms);

      rooms.forEach((room) => {
        console.log(`User left room: ${room}`);
        socket.to(room).emit("user-left", { userId: socket.id });
      });
    });
    



    // Handle video call events
    socket.on('offer', (data) => {
      // Handle offer and send it to the target peer
      io.to(data.targetSocketId).emit('offer', data.offer);
    });

    socket.on('answer', (data) => {
      // Handle answer and send it to the target peer
      io.to(data.targetSocketId).emit('answer', data.answer);
    });

    socket.on('ice-candidate', (data) => {
      // Handle ICE candidate and send it to the target peer
      io.to(data.targetSocketId).emit('ice-candidate', data.candidate);
    });
  });
}
