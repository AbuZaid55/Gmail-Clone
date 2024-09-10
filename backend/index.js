import dotenv from "dotenv";
dotenv.config({});
import express from "express"; // react style
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";
import {Server} from 'socket.io'
import { Redis } from "ioredis";
import { startEmailConsumer } from "./kafka/index.js";

connectDB();
startEmailConsumer()
const PORT = process.env.PORT;
const REDIS_CLI = process.env.REDIS_CLI
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



const pub = new Redis(REDIS_CLI,{
    tls: "Enabled"
})
const sub = new Redis(REDIS_CLI,{
    tls: "Enabled"
})

const io = new Server(server,{
    pingTimeout:60000,
    cors:{
        origin:process.env.FRONTEND_URL
    }
})

sub.subscribe("newEmail")
sub.on('message',(channal,obj)=>{
    if(channal==="newEmail"){
        const email = JSON.parse(obj)
        io.in(email.to).emit('newEmailRecieved',email)
    }
})

io.on("connection",(socket)=>{
    socket.on('setup',(userId)=>{
        socket.join(userId)
    })
    socket.on('newEmail',async(email)=>{
        await pub.publish("newEmail",JSON.stringify(email))
    })
})