var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var DepartamentoController = require('../controllers/departamento.controllers')

//Insertar departamento
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), DepartamentoController.insertarDepartamento);

module.exports = router;