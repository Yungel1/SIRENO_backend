var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var PreguntaController = require('../controllers/pregunta.controllers')

//Insertar pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), PreguntaController.insertarPregunta);

module.exports = router;