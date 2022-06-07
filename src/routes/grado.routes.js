var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var GradoController = require('../controllers/grado.controllers')

//Insertar grado
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoController.insertarGrado);

//Eliminar grado
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoController.eliminarGrado);

//Coger grados
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoController.getGrados);


module.exports = router;