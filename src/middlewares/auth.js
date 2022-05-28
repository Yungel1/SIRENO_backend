var AuthenticationService = require('../services/authentication.services') 
var AuthorizationService = require('../services/authorization.services') 
var UsuarioService = require('../services/usuario.services') 
const jwt = require('jsonwebtoken');

const verificarToken = async(req, res, next) => {

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
            return next();
        } 
        return res.status(401).json({
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
};

const authorize = async(req, res, next, rolesConAcceso) => {

    try{
        if(req.usuario == null){
            return res.status(401).json({
                message:"Usuario no encontrado"
            });
        }

        let rolesActuales = await UsuarioService.getRoles(req.usuario);

        let autorizado = AuthorizationService.tienePermisos(rolesConAcceso,rolesActuales);

        if(!autorizado){
            return res.status(403).json({
                message:"Usuario no autorizado"
            });
        }

        return res.json({
            message:"Usuario autorizado"
        });


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
};

module.exports = {verificarToken,authorize};