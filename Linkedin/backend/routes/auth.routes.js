import express from "express"
import {login, logOut, signup} from "../controllers/auth.controller.js"
let authRouter = express.Router()  //express ka router function authRouter se kr dia 

authRouter.post("/signup" , signup)
authRouter.post("/login", login)
authRouter.post("/logOut", logOut)

export default authRouter