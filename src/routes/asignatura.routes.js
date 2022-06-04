var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var AsignaturaController = require('../controllers/asignatura.controllers')

//Insertar asignatura
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), AsignaturaController.insertarAsignatura);

//Eliminar asignatura
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), AsignaturaController.eliminarAsignatura);


module.exports = router;