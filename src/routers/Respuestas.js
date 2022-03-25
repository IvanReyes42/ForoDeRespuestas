const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/Respuestas.controller");
const controller = new IndexController();

router.get('/MisRespuestas',controller.List)


module.exports = router;