var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var GradoController = require('../controllers/grado.controllers')

//Insertar grado
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoController.insertarGrado);

module.exports = router;