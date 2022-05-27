var express = require('express');
var router = express.Router();
const validator = require('../helpers/validator')

var RegisterController = require('../controllers/register.controllers')

//Ruta para el registro de usuario
router.post('/', validator.signupValidation, RegisterController.registrarUsuario)

module.exports = router;