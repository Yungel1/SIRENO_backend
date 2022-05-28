var express = require('express');
var router = express.Router();
const Roles = require("../helpers/roles")

var AuthorizationController = require('../controllers/authorization.controllers')

//Ruta para la autorización
router.get('/:usuario', AuthorizationController.authorize([Roles.Todos]));

module.exports = router;