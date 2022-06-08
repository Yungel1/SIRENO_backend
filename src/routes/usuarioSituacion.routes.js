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

//Coger todas las situaciones que tiene un usuario
router.get('/getSituationsUser', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), UsuarioSituacionController.getSituacionesUsuario);

//Revisar si la situación seleccionada esta ya respondida o no
router.get('/checkSituationAnswered', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), UsuarioSituacionController.verSiLaSituacionesRespondidasUsuario);

//Borrar  relación entre usuario y situación
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioSituacionController.deleteUsuarioSituacion);

//Obtener todas las relaciones entre usuarios y situaciones
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), UsuarioSituacionController.getAllUsuarioSituacion);

module.exports = router;