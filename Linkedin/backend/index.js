import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import dns from "node:dns";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config()
let app=express()
app.use(express.json())
app.use(cookieParser())
let port=process.env.PORT //ye access karne ka tarika hai 
app.use("/api/auth", authRouter)


app.listen(port , ()=>{
    connectDB()
    console.log("Server started at 8000");
})