var LoginService = require('../services/login.services') 
var UsuarioService = require('../services/usuario.services') 
const { validationResult } = require('express-validator');

//Iniciar sesión
exports.iniciarSesion = async function (req, res, next) {

    //Mirar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        //Obtener usuario y contraseña
        var row = await UsuarioService.getUsuarioContraseña(req.body.usuario);

        //Comprobar si usuario correcto
        if(!LoginService.usuarioCorrecto(row)){
            return res.status(422).json({
                message: "Nombre de usuario incorrecto",
            });
        }

        //Comprobar si contraseña correcta
        var passMatch = await LoginService.contraseñaCorrecta(req.body.contraseña,row);
        if(!passMatch){
            return res.status(422).json({
                message: "Contraseña incorrecta",
            });
        }

        //Obtener token
        var elToken = LoginService.obtenerToken(row);

        return res.json({
            token:elToken
        });

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}