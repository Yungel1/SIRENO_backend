var PreguntaService = require('../services/pregunta.services');

//Insertar pregunta
exports.insertarPregunta = async function (req,res,next){
    try{

        var insertado = await PreguntaService.insertarPregunta(req.body.tipoPreg); //Insertar pregunta

        //Comprobar si se ha insertado la pregunta
        if(insertado){
            return res.status(201).json({
                message: "La pregunta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "pregunta-insertar",
                message: "La pregunta no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar activación
exports.eliminarPregunta = async function (req,res,next){
    try{

        var idPregunta = req.query.id;

        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta);
        //Comprobar si la pregunta existe
        if(!preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta que se intenta eliminiar no existe",
            });
        }

        var eliminado = await PreguntaService.eliminarPregunta(idPregunta); //Eliminar pregunta
       
        //Comprobar si se ha eliminado la pregunta
        if(eliminado){
            return res.status(201).json({
                message: "La pregunta ha sido eliminada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "pregunta-eliminar",
                message: "La pregunta no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger preguntas
exports.getPreguntaInfo = async function (req,res,next){
    try{

        var idPregunta = req.query.id;
        var idUsuario = req.usuario;

        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta);
        //Comprobar si la pregunta existe
        if(!preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta que se intenta coger no existe",
            });
        }

        //Seleccionar las opcionesPregunta de la pregunta
       var getPreguntas = await PreguntaService.pertenecePreguntaUsuario(idUsuario, idPregunta); 
       if(!getPreguntas){
           return res.status(422).json({
               error: "pregunta-permitir",
               message: "La pregunta seleccionada no tiene permiso",
           });
       }

        var preguntaInfo = await PreguntaService.getPreguntaInfo(idPregunta); //Coger pregunta info
       
        //Comprobar si se han cogido los preguntas
        if(preguntaInfo){
            return res.status(201).json(preguntaInfo);
        } else{
            return res.status(422).json({
                error: "pregunta-coger",
                message: "No se han podido coger las preguntas",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger preguntas
exports.getPreguntaInfoInformes = async function (req,res,next){
    try{

        var idPregunta = req.query.id;
        var idUsuario = req.usuario;

        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta);
        //Comprobar si la pregunta existe
        if(!preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta que se intenta coger no existe",
            });
        }

        var preguntaInfo = await PreguntaService.getPreguntaInfo(idPregunta); //Coger pregunta info
       
        //Comprobar si se han cogido los preguntas
        if(preguntaInfo){
            return res.status(201).json(preguntaInfo);
        } else{
            return res.status(422).json({
                error: "pregunta-coger",
                message: "No se han podido coger las preguntas",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


//Coger preguntas
exports.getPreguntas = async function (req,res,next){
    try{

        var preguntas = await PreguntaService.getPreguntas(); //Coger todos las preguntas
       
        //Comprobar si se han cogido los preguntas
        if(preguntas){
            return res.status(201).json({preguntas});
        } else{
            return res.status(422).json({
                error: "pregunta-coger",
                message: "No se han podido coger las preguntas",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}