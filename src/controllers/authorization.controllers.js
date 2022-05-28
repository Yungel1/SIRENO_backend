var AuthorizationService = require('../services/authorization.services') 
var UsuarioService = require('../services/usuario.services') 

//Iniciar sesión
exports.authorize = async function (req, res, next, rolesConAcceso) {

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
}