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

//Borrar usuario
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioController.deleteUsuario);

//Obtener información de todos los usuarios (menos la contraseña)
router.get('/getAllInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioController.getAllUsuarioInfo);

//Obtener información del usuario con la sesión iniciada (menos la contraseña)
router.get('/getInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), UsuarioController.getUsuarioInfo);

module.exports = router;