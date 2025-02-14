import { Server, Socket } from "socket.io";

export const chat=(io:Server,socket:Socket)=>{
socket.on("sendMessage",(data)=>{
    console.log("Message Received :",data);
    io.emit("newMessage",data)
})
}