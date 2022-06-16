var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var RespuestaController = require('../controllers/respuesta.controllers')

//Insertar respuesta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), RespuestaController.insertarRespuesta);

//Obtener las medias de las respuestas por opcPregunta
router.get('/getMedia', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador, roles.Docente]), RespuestaController.getRespuestasMediaInformes);

module.exports = router;