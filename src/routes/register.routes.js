var express = require('express');
var router = express.Router();
const validator = require('../helpers/validator')

var RegisterController = require('../controllers/register.controllers')

router.post('/', validator.signupValidation, RegisterController.registrarUsuario)

module.exports = router;