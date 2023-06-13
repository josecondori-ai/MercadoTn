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

import LocalStrategy from 'passport-local';

import User from './models/usersmodel.js'
import userRouter from './routes/users.js'


const app=express()
app.use(morgan('dev'))
dotenv.config({path:'./config.env'})

mongoose.connect(process.env.DBMERCADO, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true//version 3.0 de mongo
    
}).then(con => {
    console.log('MongoDB Database connected successfully.');
});

app.use(session({
    secret:'se logeo en mi aplicacion ',
    resave:true,
    saveUninitialized:true
    
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy({usernamefield:'email'},User.authenticate()))



app.use(flash())

// configuracion del middlware global
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
    next()
})

app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

app.use(express.static('public'))

//rutas  de usuarios
app.use(userRouter)

//configurar el .env para seguridad, datos sensibles

//conexion de la base de datos

//para las sesiones

// passport.use(({user:'email'},User.authenticate()))

app.listen(process.env.PUERTO,()=>{
    console.log('el servidor ejecutando')
})