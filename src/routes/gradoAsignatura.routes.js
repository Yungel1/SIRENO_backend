var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var GradoAsignaturaController = require('../controllers/gradoAsignatura.controllers')

//Relacionar grado y asignatura
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GradoAsignaturaController.relacionarGradoAsignatura);


module.exports = router;