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

module.exports = router;