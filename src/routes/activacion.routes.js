var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var ActivacionController = require('../controllers/activacion.controllers')

//Insertar activacion
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.insertarActivacion);

// //Actualizar activacion
// router.post('/update', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.actualizarActivacion);

module.exports = router;