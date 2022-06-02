var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var UsuarioController = require('../controllers/usuario.controllers')

//Dar rol de administrador
router.put('/admin', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioController.darRolAdmin);

//Editar rol de estudiante
router.put('/estudiante', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioController.editarRolEstudiante);

//Editar rol de docente
router.put('/docente', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioController.editarRolDocente);

module.exports = router;