var AuthenticationService = require('../services/authentication.services')  
var UsuarioService = require('../services/usuario.services') 
const jwt = require('jsonwebtoken');

//Autenticar mediante token
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
            return res.status(401).json({
                message:"El token ha expirado"
            });
        }
        if(err instanceof jwt.JsonWebTokenError){
            return res.status(401).json({
                message:"Error en el token proporcionado"
            });
        }
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
};



module.exports = verificarToken;