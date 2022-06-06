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

module.exports = router;