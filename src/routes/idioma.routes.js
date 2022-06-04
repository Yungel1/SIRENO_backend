var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var IdiomaController = require('../controllers/idioma.controllers')

//Insertar idioma
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), IdiomaController.insertarIdioma);

//Borrar idioma
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), IdiomaController.deleteIdioma);

module.exports = router;