var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var CentroDepartamentoController = require('../controllers/centroDepartamento.controllers')

//Relacionar centro y departamento
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroDepartamentoController.relacionarCentroDepartamento);

//Eliminar relacion centro y departamento
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroDepartamentoController.elimiarRelacionCentroDepartamento);

//Obtener todas las relaciones entre centros y departamentos
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroDepartamentoController.getAllCentroDepartamento);

module.exports = router;