const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/Preguntas.controller");
const controller = new IndexController();

const {isLoggedIn} = require('../lib/auth');

const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./src/public/images')
    },
    filename: (req,file,cb) =>{
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer({storage});

router.get('/MisPreguntas',isLoggedIn,controller.List)
router.get('/MisPreguntas/Add',isLoggedIn,controller.FrmAdd)
router.post('/MisPreguntas/Add',upload.single('file'),isLoggedIn,controller.Add);
router.get('/MisPreguntas/edit/:IdProblema',isLoggedIn,controller.FrmEdit);
router.post('/MisPreguntas/edit/:IdProblema',isLoggedIn,controller.Edit);
router.get('/MisPreguntas/delete/:IdProblema',isLoggedIn,controller.Delete);
router.post('/MisPreguntas',isLoggedIn,controller.search);


module.exports = router;