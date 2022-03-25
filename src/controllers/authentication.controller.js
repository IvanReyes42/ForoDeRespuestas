const pool = require('../lib/database');
const passport = require('passport')

class IndexController {
    
    //Formulario Login
    FrmLogin(req, res) {
        res.render('auth/Login')
    }

    //Evento de logearse
    Login(req, res,next) {
        passport.authenticate('local.signin',{
            successRedirect:'/',
            failureRedirect:'/Login',
            failureFlash: true
        })(req,res,next);
    }

    //Abrir vista perfil
    Profile(req, res) {

        res.render('Perfil')
    }
    //Terminar Seccion 
    LogOut(req,res){
        req.logOut();
        res.redirect('/Login')
    }

    //Formulario para Registrar Usuarios 
    async FrmRegister(req, res) {
        res.render('auth/Register');
    }

    //Agregar Usuarios
    Register(req, res,next) {
        passport.authenticate('local.Register',{
            successRedirect: '/Perfil',
            failuredRedirect: '/Registrar',
            failureFlash:true
        })(req,res,next);
    }


  }
  
  module.exports = IndexController;