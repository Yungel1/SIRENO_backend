var express = require('express');
var router = express.Router();
const validator = require('../helpers/validator');
var RegisterController = require('../controllers/register.controllers');
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

//Ruta para el registro de usuario
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]),validator.signupValidation, RegisterController.registrarUsuario)

module.exports = router;