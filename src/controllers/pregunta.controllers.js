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

        var idPregunta = req.query.idPregunta;

        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta);
        //Comprobar si la pregunta existe
        if(!preguntaExiste){
            return res.status(422).json({
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
                message: "La pregunta no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}