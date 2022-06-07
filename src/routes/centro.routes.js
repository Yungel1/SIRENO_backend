var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var CentroController = require('../controllers/centro.controllers')

//Insertar centro
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroController.insertarCentro);

//Eliminar centro
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroController.eliminarCentro);

//Coger centros
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), CentroController.getCentros);

module.exports = router;