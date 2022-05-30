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
                message: "La campaña no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}