import express from 'express'
const router=express.Router()
import passport from 'passport'
import crypto from 'crypto'
import async from 'async'
import nodemailer from 'nodemailer'



import User from '../models/usersmodel.js'


// function atenticarUsuario (req,res,next){
//     if(req.isAuthenticated()){
//         return next()
//     }
//     req.flash('error_msg','porfavor logueate')
//     res.redirect('/login')
// }



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
    req.flash('success_msg','se salio de sesion ')
    res.redirect('/login')
})

router.get('/signup',(req,res)=>{
    res.render('users/signup')
})

router.get('/password/change',(req,res)=>{
    res.render('users/changepassword')
})


router.get('/alluser',(req,res)=>{
    User.find({})
    .then(usuarios=>{

        res.render('users/alluser',{usuarios:usuarios})
    })
    .catch(error=>{
       req.flash('error_msg','ERROR:'+error)
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
    req.flash('error_msg','ERROR:'+error)
    res.redirect('users/alluser')
})
})
/*obtener rutas POST */
// router.post('/login',passport.authenticate('local',{
//     successRedirect:'/login',
//     failureRedirect:'/login',
//     failureFlash:'email o contraseña incorrecta. Intente nuevamente'
// }))

router.post('/signup',(req,res)=>{
   let {nombre , email, password}=  req.body;

   let userData={
        nombre : nombre,
        email : email
   };
  

   User.register(userData, password,(error,user)=>{
        if(error){
            console.log(error)
            req.flash('error_msg','ERROR:'+error)
            res.redirect('/signup')
        }else{
            req.flash('sucess_msg','se creo una nueva cuenta')
            res.redirect('/signup')
        }
       
   })
   
})

router.post('/password/change',(req,res)=>{
   if(req.body.password!==req.body.confirmpassword) {
    //mensaje no son iguales
    res.redirect('/password/change')
   }
   User.findOne({email:req.user.email})
   .then(user=>{
        user.setPassword(req.body.password,error=>{
            user.save()
            .then(user=>{
                req.flash('success_msg','el password se cambio con exito:')
                res.redirect('/password/change')
            })
            .catch(error=>{
                req.flash('error_msg','ERROR:'+error)
                res.redirect('/password/change')
            })
        })
   })

 

})


//olvide contraseña
// router.post('/olvide',(req,res)=>{
//     let recoveryPassword=''
//     async.waterfall([
//         (done)=>{
//             crypto.randomBytes(20,(error,buf)=>{
//                 let token =buf.toString('hex')//0-9 y a-f
//                 //[0x48,0x6c....]==>4878451cc87f
//                 done(error,token)
//             })
//         },
//             (token,done)=>{
//                 User.findOne({email:req.body.email})
//                 .then(user=>{
//                     if(!user){
//                         //mensaje no existe el email
//                         res.redirect('/olvide')
//                     }
//                     user.resetPasswordToken=token
//                     user.resetPasswordExpires=Date.now() + 1800000// 1/2 hora
//                     user.save(error=>{
//                         done(error,token,user)
//                     })
                    
                    

//                 })
//                 .catch(error=>{
//                     //mensaje error
//                     res.redirect('/olvide')
//                 })


//             },
//                 (token,user)=>{
//                     let enviar=nodemailer.createTransport({
//                         service:'Gmail',
//                         auth:{
//                             user:'administradorempresa@gmail.com',
//                             pass:'12345'

//                         }
//                     })
//                     let mailOptions={
//                         to:user.mail,
//                         from:'administradorempresa@gmail.com',
//                         subject:'recobrar email',
//                         text:'por favor para recuperar tu contraseña ingresa a  y tenes que ingresar el siguiente password: \n',token,'recuerde que tiene menos de 30 minutos para cambiar'
//                     }//http://req.headers.host/reset/token
//                     enviar.sendMail(mailOptions,error=>{
//                         //mensaje ,se envio las intrucciones
//                         res.redirect('/olvide')
//                     })
//                 }
//         ])
// })


//user delete

router.delete('delete/user/:id',(req,res)=>{
    let buscarId={_id:req.params.id}
    User.deleteOne(buscarId)
    .then(user=>{
        req.flash('success_msg','usuario eliminado')
        res.redirect('/allusers')

    })
    .catch(error=>{
        req.flash('error_msg','ERROR:'+error)
        res.redirect('/allusers')
    })
})

export default router


