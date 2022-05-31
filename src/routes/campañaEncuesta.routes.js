var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var CampañaEncuestaController = require('../controllers/campañaEncuesta.controllers')

//Insertar encuesta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaEncuestaController.relacionarCampañaEncuesta);

module.exports = router;