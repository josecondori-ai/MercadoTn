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

//mostraria resultado de las peticiones en la consola o terminal
app.use(morgan('dev'))

//sirve para los formularios envio de informacion al node js
app.use(bodyParser.urlencoded({extended:true}))

//motor de plantilla
app.set('view engine','ejs')


app.use(express.static('public'))


// app.use(flash())

//configuracion del middlware global
// app.use((req,res)=>{
//     res.locals.success_msg=req.flash(('success_msg'))
//     res.locals.error_msg=req.flash(('error_msg'))
//     res.locals.error=req.flash(('error'))
//     res.locals.currentUser=req.user
// })


//rutas  de usuarios
app.use(userRouter)

//configurar el .env para seguridad, datos sensibles
dotenv.config({path:'./config.env'})

//conexion de la base de datos
mongoose.connect('mongodb://localhost:27017/supermercadotn', {
   
    
}).then(con => {
    console.log('MongoDB Database connected successfully.');
});

//para las sesiones
app.use(session({
    secret:'se logeo en mi aplicacion ',
    resave:true,
    saveUninitialized:true

}))

app.use(passport.initialize())
app.use(passport.session())
// passport.use(({user:'email'},User.authenticate()))




app.listen(process.env.PUERTO,()=>{
    console.log('el servidor ejecutando')
})