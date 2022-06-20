var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var ActivacionController = require('../controllers/activacion.controllers')

//Insertar activacion
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.insertarActivacion);

//Actualizar activacion
router.put('/update', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.actualizarActivacion);

//Activas activacion admin
router.put('/activateAdmin', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.activarActivacionAdmin);

//Activar activacion docente
router.put('/activateTeacher', authentication, (req, res, next) => authorization(req,res,next,[roles.Docente]), ActivacionController.activarActivacionDocente);

//Eliminar activacion
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.eliminarActivacion);

//Comprobar si el docente a activado la campaña y enviar recordatorio al admin
router.get('/wasActivated', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.enviarRecordatorio);

//Comprobar si el docente a activado la campaña y enviar recordatorio al admin
router.get('/getActivado', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador, roles.Docente]), ActivacionController.getActivado);

//Insertar o actualizar activación
router.post('/activacion/insertaractualizar', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), ActivacionController.insertarActualizarActivacion);


module.exports = router;