import mongoose from "mongoose";


let userScheme=new mongoose.Schema({
    nombre:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
})

module.exports=mongoose.model('User',userScheme)