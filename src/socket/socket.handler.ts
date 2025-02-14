import { Server } from "socket.io";
import { game } from "./game";
import { notificaton } from "./notification";
import { chat } from "./chat";


export const socketHandler=(io:Server)=>{
    io.on('connection',(socket)=>{
        console.log(" A user connected :",socket.id);
       game(io,socket);
       notificaton(io,socket);
       chat(io,socket);
        socket.on("disconnect",()=>{
            console.log("User disconnected:",socket.id);
        })
    })
}