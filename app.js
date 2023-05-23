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


const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('pages/index')
})

app.listen(3030,()=>{
    console.log('el servidor ejecutando')
})