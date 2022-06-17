var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var PreguntaController = require('../controllers/pregunta.controllers')

//Insertar pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), PreguntaController.insertarPregunta);

//Eliminar pregunta
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), PreguntaController.eliminarPregunta);

//Coger preguntas
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), PreguntaController.getPreguntas);

//Coger pregunta info
router.get('/getInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), PreguntaController.getPreguntaInfo);

//Coger pregunta info
router.get('/getInfoInforme', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), PreguntaController.getPreguntaInfoInformes);


module.exports = router;