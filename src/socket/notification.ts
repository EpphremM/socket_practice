import { Server, Socket } from "socket.io";

export const notificaton=(io:Server,socket:Socket)=>{
    socket.on("sendNotification",(data)=>{
        io.emit("notification",data);
    })

}