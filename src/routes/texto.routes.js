var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var TextoController = require('../controllers/texto.controllers')

//Insertar texto
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), TextoController.insertarTexto);

//Borrar texto
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), TextoController.deleteTexto);

//Obtener todos los textos
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), TextoController.getAllTexto);

//Obtener texto concreto (al que el usuario que ha iniciado sesión tenga acceso)
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), TextoController.getTexto);

//Obtener texto concreto (al que el usuario que ha iniciado sesión tenga acceso)
router.get('/getInforme', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), TextoController.getTextoInformes);

module.exports = router;