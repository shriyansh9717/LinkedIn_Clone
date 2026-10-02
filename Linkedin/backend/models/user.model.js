//pehale hum user ka model banayege 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    },
     coverImage:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:""
    },
    skills:[{type:String}],  //kyu ki skill too multiple ho sakti hai isliye array me kia hai 
    education:[{
        college:{type:String},
        degree:{type:String},
        fieldOfStudy:{type:String}
    }],
    location:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]  //jab hame option pata hota hai too enum ka use karte hai 

    },
    experience:[{
        title:{type:String},
        company:{type:String},
        description:{type:String}
    }],
    connection:[
       { type:mongoose.Schema.Types.ObjectId,     //connection me ek particular user aata hai too hum use string me nhi likha sakte so this is a way 
        ref:"User"
       }
    ]
    
},{timestamps:true})

const User=mongoose.model("User" , userSchema) //User me sara data save kr dia hai jisase ye aaye use kr sake 

export default User