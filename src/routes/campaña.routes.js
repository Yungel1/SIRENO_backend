var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var CampañaController = require('../controllers/campaña.controllers')

//Insertar campaña
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaController.insertarCampaña);

//Borrar campaña
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaController.deleteCampaña);

//Obtener todas las campañas
router.get('/getAllInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaController.getAllCampaña);

//Obtener campaña concreta (al que el usuario que ha iniciado sesión tenga acceso)
router.get('/getInfo', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), CampañaController.getCampañaInfo);

//Obtener campaña concreta (al que el usuario que ha iniciado sesión tenga acceso)
router.get('/getInfoInformes', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), CampañaController.getCampañaInfoInformes);

//Obtener campaña concreta (el usuario que ha iniciado sesión deberá ser docente). Verá las campañas que le corresponde como docente (no para responder)
router.get('/getInfoDocente', authentication, (req, res, next) => authorization(req,res,next,[roles.Docente]), CampañaController.getCampañaInfoDocente);

module.exports = router;