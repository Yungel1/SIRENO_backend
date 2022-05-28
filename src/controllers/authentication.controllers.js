var AuthenticationService = require('../services/authentication.services');
var UsuarioService = require('../services/usuario.services');
const jwt = require('jsonwebtoken');

//Iniciar sesión
exports.authGetUsuario = async function (req, res, next) {

    try{

        let headerAuth = req.headers.authorization;
        //Comprobar si hay token
        if (!AuthenticationService.tokenExists(headerAuth)){
            return res.status(422).json({
                message: "Proporcione el token",
            });
        }
        //Decodificar el token
        let decoded = AuthenticationService.decodeToken(headerAuth);

        //Obtener usuario mediante el token descodificado
        let usuario = await UsuarioService.getUsuario(decoded.usuario);
        
        if(usuario!=null){
            req.usuario = usuario;
            next();
        }

        res.status(401).json({
            message:"Usuario no encontrado"
        });


    } catch(err){
        if(err instanceof jwt.TokenExpiredError){
            res.status(401).json({
                message:"El token ha expirado"
            });
        }
        
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


