//database ko mongoose ke througt connect karte hai 

import mongoose from "mongoose"

//ab connect karne ke liye function banana hoga
//.connect ek function hai ho connect karne ka kaam karta hai 
const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("database is connected")
    }catch(error){
        console.log(error);
    }
}

export default connectDB