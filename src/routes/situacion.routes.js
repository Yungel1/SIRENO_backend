var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var SituacionController = require('../controllers/situacion.controllers')

//Insertar situación
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), SituacionController.insertarSituacion);

module.exports = router;