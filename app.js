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

import userRouter from './routes/users.js'


const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))


app.use(flash())

//configuracion del middlware global
app.use((req,res)=>{
    res.locals.success_msg=req.flash(('success_msg'))
    res.locals.error_msg=req.flash(('error_msg'))
    res.locals.error=req.flash(('error'))
    res.locals.currentUser=req.user
})
// app.get('/',(req,res)=>{
//     res.render('admin/search')
// })

mongoose.connect('mongodb://localhost:27017/supermercadotn', {
    
}).then(con => {
    console.log('MongoDB Database connected successfully.');
});
app.use(userRouter)
dotenv.config({path:'./config.env'})

app.use(session({
    secret:'se logeo en mi aplicacion ',
    resave:true,
    saveUninitialized:true

}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(({user:'email'},User.authenticate()))
//req.user

// mongoose.connect(process.env.DBMERCADO)
//     .then(mensaje=>{
//         console.log('mongo db se conecto')
//     })



app.listen(process.env.PUERTO,()=>{
    console.log('el servidor ejecutando')
})