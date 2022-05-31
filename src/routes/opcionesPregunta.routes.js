var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var opcionesPreguntaController = require('../controllers/opcionesPregunta.controllers')

//Insertar opción de pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), opcionesPreguntaController.insertarOpcionPregunta);

module.exports = router;