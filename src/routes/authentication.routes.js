var express = require('express');
var router = express.Router();
const Roles = require("../helpers/roles")

const auth = require('../middlewares/auth');
//var AuthenticationController = require('../controllers/authentication.controllers');
//var AuthorizationController = require('../controllers/authorization.controllers');

//Ruta para la autenticación
router.get('/', auth.verificarToken, (req, res, next) => auth.authorize(req,res,next,[Roles.Administrador,Roles.Todos]),(req, res) => {
    res.send('Hello World!')
})

module.exports = router;