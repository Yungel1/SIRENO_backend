var express = require('express');
var router = express.Router();
const validator = require('../helpers/validator');
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var RegisterController = require('../controllers/register.controllers');

//Ruta para el registro de usuario
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]),validator.signupValidation, RegisterController.registrarUsuario)

module.exports = router;