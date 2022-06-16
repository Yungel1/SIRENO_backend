var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var CampañaEncuestaController = require('../controllers/campañaEncuesta.controllers')

//Relacionar campaña y encuesta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaEncuestaController.relacionarCampañaEncuesta);

//Coger las encuestas de la campaña seleccionada
router.get('/getCampaignPolls', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), CampañaEncuestaController.getEncuestasCampaña);

//Borrar relación entre una campaña y una encuesta
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaEncuestaController.deleteCampañaEncuesta);

//Obtener todas las relaciones entre campañas y encuestas
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CampañaEncuestaController.getAllCampañaEncuesta);

//Obtener las encuestas para informes
router.get('/getPollsgReports', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador, roles.Docente]), CampañaEncuestaController.getEncuestasCampañaInformes);


module.exports = router;