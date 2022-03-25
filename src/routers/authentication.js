const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/authentication.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin} = require('../lib/auth');


router.get('/Login',isNotLoggedin,controller.FrmLogin);
router.post('/Login',isNotLoggedin,controller.Login);
router.get('/Perfil',isLoggedIn,controller.Profile);
router.get('/Salir',isLoggedIn,controller.LogOut);
router.get('/Registar',isNotLoggedin,controller.FrmRegister);
router.post('/Registrar',isNotLoggedin,controller.Register);

module.exports = router;