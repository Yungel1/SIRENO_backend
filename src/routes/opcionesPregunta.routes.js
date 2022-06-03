var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var OpcionesPreguntaController = require('../controllers/opcionesPregunta.controllers')

//Insertar opción de pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.insertarOpcionPregunta);

//Coger las opcionesPregunta de la pregunta seleccionada
router.get('/getQuestionOptions', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), OpcionesPreguntaController.getOpcionesPregunta);

module.exports = router;