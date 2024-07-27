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
const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:process.env.FRONTEND_URL,
    credentials: true
}
app.use(cors(corsOptions));


// routes
app.get("/test",(req,res)=>{
    res.status(200).json({success:true,message:"Server is running successfully"})
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

const server = app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});


const io = new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL
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