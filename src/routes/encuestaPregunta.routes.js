var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var EncuestaPreguntaController = require('../controllers/encuestaPregunta.controllers')

//Relacionar encuesta y pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaPreguntaController.relacionarEncuestaPregunta);

module.exports = router;