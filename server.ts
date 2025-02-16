import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);


const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket'], 
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (message) => {
        io.emit("sendMessage", message);  
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
