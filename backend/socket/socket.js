import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A new user connected", socket.id);

  const userId = socket.handshake.query.userId;

  userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
  });
});

export const getReveiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

export { app, io, server };
