//token ko bahut bar use kr tha isliye ek function banake token.js file bna di 
import jwt from "jsonwebtoken"
const genToken = async (userId) =>{
    try{
       let token = await jwt.sign({userId} , process.env.JWT_SECRET ,{expiresIn:"1d"} ) 
       return token
    }catch(error){
        console.log(error);

    }
}

export default genToken