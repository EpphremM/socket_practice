// import express from 'express'
import cors from 'cors'
import http from 'http'
import {Server}  from  'socket.io'
import { socketHandler } from './src/socket/socket.handler';

// const app=express();
// app.use(cors({origin:"*"}))
const server=http.createServer();
const io= new  Server(server);
socketHandler(io);
server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})