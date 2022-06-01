var UsuarioSituacionService = require('../services/usuarioSituacion.services');
var UsuarioService = require('../services/usuario.services');
var SituacionService = require('../services/situacion.services');
var helperNumeric = require('../helpers/helperNumeric');

//Relacionar encuesta y pregunta
exports.relacionarUsuarioSituacion = async function (req,res,next){
    try{
        
        //Comprobar si el id de la situación es un número
        if(!helperNumeric.isNumeric(req.body.idSituacion)){
            return res.status(422).json({
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si el usuario existe
        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        if(!usuarioExiste){
            return res.status(422).json({
                message: "El usuario no existe",
            });
        }

        //Comprobar si la situacion existe
        var situacionExiste = await SituacionService.situacionExiste(req.body.idSituacion);
        if(!situacionExiste){
            return res.status(422).json({
                message: "La situación no existe",
            });
        }

        var relacionado = await UsuarioSituacionService.relacionarUsuarioSituacion(req.body.usuario,req.body.idSituacion); //Relacionar usuario y situación

        //Comprobar si se han relacionado el usuario y la situación
        if(relacionado){
            return res.status(201).json({
                message: "El usuario y la situación han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El usuario y la situación no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Actualizar UsuarioSituación para administradores
exports.actualizarUsuarioSituacionAdmin = async function (req,res,next){
    try{

        //Comprobar si el id de la situación es un número
        if(!helperNumeric.isNumeric(req.body.idSituacion)){
            return res.status(422).json({
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si es integer (0 o 1) respondida
        if(![0,1].includes(Number(req.body.respondida))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en el campo 'respondida'",
            });
        }

        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(req.body.usuario,req.body.idSituacion);
        //Comprobar si la relación entre un usuario y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(201).json({
                message: "La relacion usuario-situación que se intenta actualizar no existe",
            });
        }

        var actualizado = await UsuarioSituacionService.actualizarUsuarioSituacion(req.body.usuario,req.body.idSituacion,req.body.respondida); //Actualizar UsuarioSituación

        //Comprobar si se ha actualizado la UsuarioSituación
        if(actualizado){
            return res.status(201).json({
                message: "La relacion usuario-situación ha sido actualizada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La relacion usuario-situación no ha sido actualizada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Actualizar UsuarioSituación para el usuario que ha iniciado sesión
exports.actualizarUsuarioSituacion = async function (req,res,next){
    try{

        //Comprobar si el id de la situación es un número
        if(!helperNumeric.isNumeric(req.body.idSituacion)){
            return res.status(422).json({
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si es integer (0 o 1) respondida
        if(![0,1].includes(Number(req.body.respondida))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en el campo 'respondida'",
            });
        }


        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(req.usuario,req.body.idSituacion);
        //Comprobar si la relación entre el usuario que ha iniciado sesión y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(201).json({
                message: "La relacion usuario-situación que se intenta actualizar no existe",
            });
        }

        var actualizado = await UsuarioSituacionService.actualizarUsuarioSituacion(req.usuario,req.body.idSituacion,req.body.respondida); //Actualizar UsuarioSituación

        //Comprobar si se ha actualizado la UsuarioSituación
        if(actualizado){
            return res.status(201).json({
                message: "La relacion usuario-situación ha sido actualizada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La relacion usuario-situación no ha sido actualizada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}