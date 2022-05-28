var RegisterService = require('../services/register.services') 
var UsuarioService = require('../services/usuario.services') 
const { validationResult } = require('express-validator');

//Registrar usuario si no existe en la base de datos
exports.registrarUsuario = async function (req, res, next) {

    //Mirar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        //Comprobar si el usuario existe
        if(usuarioExiste){
            return res.status(201).json({
                message: "El usuario ya está en uso",
            });
        }
        
        var registrado = await RegisterService.registrar(req.body.usuario,req.body.contraseña); //Registrar usuario

        //Comprobar si se ha registrado
        if(registrado){
            return res.status(201).json({
                message: "El usuario ha sido insertado correctamente",
            });
        } else{
            return res.status(500).json({
                message: "El usuario no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}