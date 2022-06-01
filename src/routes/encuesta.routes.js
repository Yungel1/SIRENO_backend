var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var EncuestaController = require('../controllers/encuesta.controllers')

//Insertar encuesta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaController.insertarEncuesta);

module.exports = router;