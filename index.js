import express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser";
import cors from "cors"

//import
const app = express()
dotenv.config()

//
//onst cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
//

//close of some const
const connect =  async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to Mongo")
      } catch (error) {
        handleError(error);
      }
}
//this ends here

//checking if mongo is connected or not starts here
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connectedd")
})
//checking if mongo is connected or not ends here
//allowing sending of json
app.use(express.json())
app.use(cookieParser())


//api in action
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
//api in action ends jhere

//middleware
app.use((err,req,res,next)=>{
    return res.status(500).json("Hello error from handler")
})


//midlewareendshere



app.listen(8800, ()=>{
    connect()
    console.log("connected to back  end!.")
})