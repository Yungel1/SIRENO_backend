var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var GrupoController = require('../controllers/grupo.controllers')

//Insertar grupo
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GrupoController.insertarGrupo);

//Eliminar grupo
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GrupoController.eliminarGrupo);

//Coger grupos
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), GrupoController.getGrupos);

module.exports = router;