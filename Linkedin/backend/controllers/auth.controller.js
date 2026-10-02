import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    try {
        let { firstName, lastName, userName, email, password } = req.body
        let existEmail = await User.findOne({ email })
        if (existEmail) {
            return res.status(400).json({ message: "email already exist" })
        }
        let existuserName = await User.findOne({ userName })
        if (existuserName) {
            return res.status(400).json({ message: "userName already exist" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "userName passwrod must be 8 " })
        }


        //Ab hum aapne password ko hech karege 
        let hassedPassword = await bcrypt.hash(password, 10)      //10 salt round hai 

        //Ab hum user create karege 
        const user = await User.create({
            firstName, //jb bhi harari key or value same hoti hai tb ham simple likha dete hai (otherwise name:firstName type kuch hota hai )
            lastName,
            userName,
            email,
            password: hassedPassword //like that
        })
        let token = await genToken(user._id) //yaha mongodb bydefault user ki id user._id ki form me hota hai 
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT === "production"
        }) //cookie ke andar kis naam se save hogi too humne "token" naam se hi save kr dia or cookie se andar token daal dia --- (cookies name , cookie me jo save hoga )


        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({ message: "signup error" })
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user does not  exist" })
        }

        //Ab jo usme bcrype me save kiya hai wo compare karega 
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect passord" })
        }

        let token = await genToken(user._id) //yaha mongodb bydefault user ki id user._id ki form me hota hai 
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: process.env.NODE_ENVIRONMENT === "production"
        }) //cookie ke andar kis naam se save hogi too humne "token" naam se hi save kr dia or cookie se andar token daal dia --- (cookies name , cookie me jo save hoga )


        return res.status(201).json(user)
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "login error" })
    }
}


//log out ke liye hum cookies ke token ko clear kr dege too hum log out ho jayege 
export const logOut = async (req,res)=>{
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"log out succesfully"})

    } catch(error){
         console.log(error);
        return res.status(500).json({ message: "logOut error" })
    }
}