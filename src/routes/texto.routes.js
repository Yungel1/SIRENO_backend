var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var TextoController = require('../controllers/texto.controllers')

//Insertar texto
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), TextoController.insertarTexto);

module.exports = router;