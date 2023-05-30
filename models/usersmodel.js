import {Schema,model} from "mongoose";



let userScheme=new Schema({
    nombre:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
})

// module.exports=mongoose.model('User',userScheme)
export default model('User',userScheme)

/*version antes del ej6
 Importar
const express=require('express')=>>import express from 'express'==> import {pepe} from 'pepe.js'
Exportar
module.exports=..... ==>> export default  pepe ==> export  {pepe}
*/