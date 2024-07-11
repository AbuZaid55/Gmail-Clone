import express from "express"; // react style
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";
import {Server} from 'socket.io'

dotenv.config({});
connectDB();
const PORT = 8080;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

const server = app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});


const io = new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
    socket.on('setup',(userId)=>{
        socket.join(userId)
    })
    socket.on('newEmail',(email)=>{
        socket.in(email.to).emit('newEmailRecieved',email)
    })
})