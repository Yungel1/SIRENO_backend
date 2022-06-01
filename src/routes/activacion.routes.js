var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var ActivacionController = require('../controllers/activacion.controllers')

//Insertar activacion
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.insertarActivacion);

//Actualizar activacion
router.put('/update', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.actualizarActivacion);

router.put('/activateAdmin', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.activarActivacionAdmin);

router.put('/activateTeacher', authentication, (req, res, next) => authorization(req,res,next,[roles.Docente]), ActivacionController.activarActivacionDocente);

module.exports = router;