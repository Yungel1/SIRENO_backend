var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var GradoAsignaturaController = require('../controllers/gradoAsignatura.controllers')

//Relacionar grado y asignatura
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoAsignaturaController.relacionarGradoAsignatura);

//Eliminar relacion grado y asignatura
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoAsignaturaController.elimiarRelacionGradoAsignatura);

//Obtener todas las relaciones entre grados y asignaturas
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoAsignaturaController.getAllGradoAsignatura);

module.exports = router;