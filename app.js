import express from 'express'
import path from    'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import flash from 'connect-flash'
import session from 'express-session'
import  MethodOverride  from 'method-override'
import passport from 'passport'
import morgan from 'morgan'

import userRouter from './routes/users.js'


const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

// app.get('/',(req,res)=>{
//     res.render('admin/search')
// })

app.use(userRouter)
dotenv.config({path:'./config.env'})
mongoose.connect(process.env.DBMERCADO)
    .then(mensaje=>{
        console.log('mongo db se conecto')
    })



app.listen(process.env.PUERTO,()=>{
    console.log('el servidor ejecutando')
})