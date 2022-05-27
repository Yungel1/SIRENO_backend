var express = require('express');
var router = express.Router();
const validator = require('../helpers/validator')

var LoginController = require('../controllers/login.controllers')

//Ruta para el inicio de sesión de usuario
router.post('/', validator.loginValidation, LoginController.iniciarSesion)

module.exports = router;