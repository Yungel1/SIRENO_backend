var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var UsuarioSituacionController = require('../controllers/usuarioSituacion.controllers')

//Relacionar usuario y situación
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioSituacionController.relacionarUsuarioSituacion);

//Actualizar UsuarioSituación (atributo 'respondida') para administrador
router.put('/updateadmin', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioSituacionController.actualizarUsuarioSituacionAdmin);

//Actualizar UsuarioSituación (atributo 'respondida') para el usuario que ha iniciado sesión
router.put('/update', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), UsuarioSituacionController.actualizarUsuarioSituacion);

module.exports = router;