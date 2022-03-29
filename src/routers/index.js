const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/index.controller");
const controller = new IndexController();

const {isLoggedIn} = require('../lib/auth');

router.get('/',controller.List);
router.post('/',controller.search);
router.get('/Respuestas/:IdProblema',isLoggedIn,controller.FrmRespuestas);

router.post('/Respuestas/comentar/:IdProblema',isLoggedIn,controller.AddComentario)
router.post('/Respuestas/Calificar/:IdComentario',isLoggedIn,controller.Calificar)


module.exports = router;