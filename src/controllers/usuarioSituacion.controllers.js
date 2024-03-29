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
                error: "situacion-id-numero",
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si el usuario existe
        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        if(!usuarioExiste){
            return res.status(422).json({
                error: "usuario-existir",
                message: "El usuario no existe",
            });
        }

        //Comprobar si la situacion existe
        var situacionExiste = await SituacionService.situacionExiste(req.body.idSituacion);
        if(!situacionExiste){
            return res.status(422).json({
                error: "situacion-existir",
                message: "La situación no existe",
            });
        }

        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(req.body.usuario,req.body.idSituacion);
        //Comprobar si la relación entre un usuario y una situación concretos existe
        if(usuarioSituacionExiste){
            return res.status(422).json({
                error: "usuario-situacion-existe",
                message: "La relacion usuario-situación ya existe",
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
                error: "usuario-situacion-relacionar",
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
                error: "situacion-id-numero",
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si es integer (0 o 1) respondida
        if(![0,1].includes(Number(req.body.respondida))){
            return res.status(422).json({
                error: "usuario-situacion-0-1",
                message: "No ha insertado un valor entre 0 y 1 en el campo 'respondida'",
            });
        }

        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(req.body.usuario,req.body.idSituacion);
        //Comprobar si la relación entre un usuario y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(422).json({
                error: "usuario-situacion-existir",
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
                error: "usuario-situacion-actualizar",
                message: "La relacion usuario-situación no ha sido actualizada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Actualizar el atributo 'respondida' a 1 (true) en UsuarioSituación para el usuario que ha iniciado sesión
exports.actualizarUsuarioSituacion = async function (req,res,next){
    try{

        //Comprobar si el id de la situación es un número
        if(!helperNumeric.isNumeric(req.body.idSituacion)){
            return res.status(422).json({
                error: "situacion-id-numero",
                message: "El id de la situación no es un número",
            });
        }

        //Comprobar si es integer (0 o 1) respondida
        /*if(![0,1].includes(Number(req.body.respondida))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en el campo 'respondida'",
            });
        }*/


        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(req.usuario,req.body.idSituacion);
        //Comprobar si la relación entre el usuario que ha iniciado sesión y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(422).json({
                error: "usuario-situacion-existir",
                message: "La relacion usuario-situación que se intenta actualizar no existe",
            });
        }

        var actualizado = await UsuarioSituacionService.actualizarUsuarioSituacion(req.usuario,req.body.idSituacion,1); //Actualizar UsuarioSituación

        //Comprobar si se ha actualizado la UsuarioSituación
        if(actualizado){
            return res.status(201).json({
                message: "La relacion usuario-situación ha sido actualizada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "usuario-situacion-actualizar",
                message: "La relacion usuario-situación no ha sido actualizada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


//Seleccionar las situaciones del usuario
exports.getSituacionesUsuario = async function (req,res,next){
    try{

        var idUsuario = req.usuario;

        //Seleccionar las situaciones del usuario
        var getSituacionesUsuario = await UsuarioSituacionService.getSituacionesUsuario(idUsuario); 
        if(getSituacionesUsuario.length === 0){
            return res.status(422).json({
                error: "situacion-usuario",
                message: "No tienes ninguna situación relacionada",
            });
        }
        else{
            return res.status(200).json(getSituacionesUsuario);
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Ver si la situación seleccionada ha sido respondida
exports.verSiLaSituacionesRespondidasUsuario = async function (req,res,next){
    try{

        var idUsuario = req.usuario;
        var idSituacion = req.query.idSituacion;

        var idSituacionEsInt = helperNumeric.isNumeric(idSituacion);
        //Comprobar si el id de la situación es un numero
        if (!idSituacionEsInt){
            return res.status(422).json({
                error: "situacion-id-numero",
                message: "La situación seleccionada no es un número",
            });
        }

        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(idUsuario,idSituacion);
        //Comprobar si la relación entre el usuario que ha iniciado sesión y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(422).json({
                error: "usuario-situacion-existir",
                message: "La relacion usuario-situación no existe",
            });
        }

        //Ver si la situación está respondida o no
        var getSituacionesRespondidasUsuario = await UsuarioSituacionService.usuarioSituacionRespondida(idUsuario, idSituacion); 
        if(getSituacionesRespondidasUsuario){
            return res.status(422).json({
                error: "situacion-responder",
                message: "La situación seleccionada ya esta respondida",
            });
        }
        else{
            return res.status(201).json({
                message: "La situación seleccionada no esta respondida"
            });
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar la relación entre un usuario y una situación
exports.deleteUsuarioSituacion = async function (req,res,next){
    try{

        let idSituacion = req.query.idSituacion;
        let usuario = req.query.usuario;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(idSituacion)){
            return res.status(422).json({
                error: "situacion-id-numero",
                message: "El id introducido no es un número",
            });
        }

        var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(usuario,idSituacion);
        //Comprobar si la relación entre un usuario y una situación concretos existe
        if(!usuarioSituacionExiste){
            return res.status(422).json({
                error: "usuario-situacion-existir",
                message: "La relacion usuario-situación no existe",
            });
        }

        var borrado = await UsuarioSituacionService.deleteUsuarioSituacion(usuario,idSituacion); //Borrar UsuarioSituación

        //Comprobar si se ha borrado la relación UsuarioSituación
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la relación UsuarioSituación",
            });
        } else{
            return res.status(422).json({
                error: "usuario-situacion-borrar",
                message: "No se ha borrado la relación UsuarioSituación",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todas las relaciones entre usuarios y situaciones (solo admin)
exports.getAllUsuarioSituacion = async function (req,res,next){
    try{

        var row = await UsuarioSituacionService.getAllUsuarioSituacion(); //Obtener todas las relaciones entre usuarios y situaciones

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}