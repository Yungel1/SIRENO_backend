var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var EncuestaPreguntaController = require('../controllers/encuestaPregunta.controllers')

//Relacionar encuesta y pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaPreguntaController.relacionarEncuestaPregunta);

//Coger las preguntas de la encuesta seleccionada
router.get('/getPollQuestions', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), EncuestaPreguntaController.getPreguntasEncuesta);

//Borrar relación entre una encuesta y una pregunta
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaPreguntaController.deleteEncuestaPregunta);

module.exports = router;