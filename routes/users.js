import express from 'express'
const router=express.Router()

import passport from 'passport'
import crypto from 'crypto'
//import async from 'async'
//import nodemailer from 'nodemailer'

//pedir el user modelo
import User from '../models/usersmodel.js'


//obtener rutas GET
router.get('/login',(req,res)=>{
    res.render('user/login')
})

router.get('/olvide',(req,res)=>{
    res.render('user/olvide')
})

/* reveer en ejs
router.get('/salir',(req,res)=>{
    res.redirect('/login')
})*/

router.get('/alluser',(req,res)=>{
    res.render('user/alluser')
})

/*obtener rutas POST */

router.post('/signup',(req,res)=>{
   let{name,email,password}=  req.body
   let userData={
        name:name,
        email:email
   }
   //userData.save()
   
})


