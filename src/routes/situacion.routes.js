var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var SituacionController = require('../controllers/situacion.controllers')

//Insertar situación
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), SituacionController.insertarSituacion);

//Coger la campaña de la situación seleccionada
router.get('/getSituationCampaign', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), SituacionController.getCampañaSituacion);

//Borrar situación
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), SituacionController.deleteSituacion);

//Saber a que usuarios enviará el email recordatorio
router.get('/usernameToSend', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), SituacionController.enviarEmailUsuarios);

//Obtener todas las situaciones
router.get('/getAll', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), SituacionController.getAllSituacion);

module.exports = router;