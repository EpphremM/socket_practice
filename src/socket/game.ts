import { Server, Socket } from "socket.io";

export const game=(io:Server,socket:Socket)=>{

socket.on("joinGame",(room)=>{
    socket.join(room);
    console.log(`User ${socket.id} joind game room ${room.id}`);
    socket.to(room).emit("Player Joined",`Player ${socket.id} Joined`);
})
}