import { v4 } from 'uuid'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", credentials: true, methods: ['GET', 'POST'] },
    transports: ["websocket"]
})
const rooms: any = {};
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
    socket.on("createRoom", (playerName) => {
        const roomId: string = v4().slice(0, 8);
        rooms[roomId] = { players: [], numberCalled: [], gameStarted: false };
        socket.join(roomId);
        rooms[roomId].players.push({ id: socket.id, name: playerName })

        socket.emit("roomCreated", roomId);
        io.to(roomId).emit("roomUpdated", rooms[roomId]);
        console.log(`palayer name ${playerName} created room ${roomId}`);
    })

    socket.on("joinRoom", ({ roomId, playerName }) => {
        if (!rooms[roomId]) {
            socket.emit("roomNotFound", "this room does not exit!");
            return;
        }
        if (rooms[roomId].gameStarted) {
            socket.emit("gameInProgress", "Game already started");
            return;
        }
        if (rooms[roomId].players.length < 4) {
            socket.join(roomId);
            rooms[roomId].players.push({ id: socket.id, name: playerName });
            io.to(roomId).emit("roomUpdated", rooms[roomId]);
            console.log(`${playerName} joined room ${roomId}`)
        } else {
            socket.emit("roomFull", "Room is full");
        }
        socket.on("leaveRoom", (roomId) => {
            if (roomId[roomId]) {
                rooms[roomId].palayer = rooms[roomId].players.filter((p: any) => p.id !== socket.id);
                socket.leave(roomId);
                if (rooms[roomId].players.length == 0) {
                    delete rooms[roomId];
                } else {
                    io.to(roomId).emit("roomUpdate", rooms[roomId]);
                }

            }
        })

    })


    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            rooms[roomId].players = rooms[roomId].players.filter((p:any) => p.id !== socket.id);
            if (rooms[roomId].players.length === 0) {
                delete rooms[roomId];
            } else {
                io.to(roomId).emit("roomUpate", rooms[roomId]);
            }
        }
        console.log("User disconnected", socket.id);
    })

})
server.listen(3000, () => {
    console.log("Server Running on port 3000");
})