//import {Schema,model} from "mongoose";
import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'



let userScheme=new mongoose.Schema({
    nombre: String,
    email: String,
    password:{
        type: String,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

// module.exports=mongoose.model('User',userScheme)
userScheme.plugin(passportLocalMongoose,{usernameField:'email'})
export default mongoose.model('User',userScheme)

/*version antes del ej6
 Importar
const express=require('express')=>>import express from 'express'==> import {pepe} from 'pepe.js'
Exportar
module.exports=..... ==>> export default  pepe ==> export  {pepe}
*/