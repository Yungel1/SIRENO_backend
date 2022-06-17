var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var EncuestaController = require('../controllers/encuesta.controllers')

//Insertar encuesta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaController.insertarEncuesta);

//Borrar encuesta
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaController.deleteEncuesta);

//Obtener todas las encuestas
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), EncuestaController.getAllEncuesta);

//Obtener encuesta
router.get('/getInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), EncuestaController.getEncuestaInfo);

//Obtener encuesta
router.get('/getInfoInformes', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), EncuestaController.getEncuestaInfoInformes);

module.exports = router;