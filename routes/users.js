import express from 'express'
const router=express.Router()

import passport from 'passport'
import crypto from 'crypto'
//import async from 'async'
//import nodemailer from 'nodemailer'

//pedir el user modelo del db
import User from '../models/usersmodel.js'
import mongoose from 'mongoose'




//obtener rutas GET
router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.get('/olvide',(req,res)=>{
    res.render('users/olvide')
})

//  reveer en ejs
router.get('/logout',(req,res)=>{
    req.logOut();
    //mensaje para el usuario salio de la web
    res.redirect('/login')
})

router.get('/signup',(req,res)=>{
    res.render('users/signup')
})


router.get('/alluser',(req,res)=>{
    User.find({})
    .then(usuarios=>{

        res.render('users/alluser',{usuarios:usuarios})
    })
    .catch(error=>{
        //mensaje sobre el error
        res.render('users/alluser')
    })
})

router.get('/edit/:id',(req,res)=>{
let buscarId= {_id:req.params.id} 
User.findOne(buscarId) 
    .then(user=>{
        res.render('users/edituser',{user:user})
     
    })
    .catch(error=>{
        //mensaje error
        res.redirect('users/alluser')
    })
})
/*obtener rutas POST */

router.post('/signup',(req,res)=>{
   let{nombre,email,password}=  req.body

   let userData={
        nombre:nombre,
        email:email
   };
   console.log(userData)
   console.log(password)

   userData.save()
//    User.register(userData,password,(error,user)=>{
//         if(error){
//             //mensaje
//             res.redirect('/signup')
//         }
//         //mensaje ok
//         res.redirect('/login')
//    })
   //userData.save()
   
})

export default router


