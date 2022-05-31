var EncuestaPreguntaService = require('../services/encuestaPregunta.services');
var EncuestaService = require('../services/encuesta.services');
var PreguntaService = require('../services/pregunta.services');
var helperNumeric = require('../helpers/helperNumeric');

//Relacionar encuesta y pregunta
exports.relacionarEncuestaPregunta = async function (req,res,next){
    try{
        
        //Comprobar si el id de la pregunta y la encuesta son números
        if(!helperNumeric.isNumeric(req.body.idPregunta)||!helperNumeric.isNumeric(req.body.idEncuesta)||!helperNumeric.isNumeric(req.body.num_preg)){
            return res.status(422).json({
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(req.body.idPregunta);
        if(!preguntaExiste){
            return res.status(422).json({
                message: "La pregunta no existe",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(req.body.idEncuesta);
        if(!encuestaExiste){
            return res.status(422).json({
                message: "La encuesta no existe",
            });
        }

        var relacionado = await EncuestaPreguntaService.relacionarEncuestaPregunta(req.body.idEncuesta,req.body.idPregunta,req.body.num_preg); //Relacionar encuesta y pregunta

        //Comprobar si se han relacionado la encuesta y la pregunta
        if(relacionado){
            return res.status(201).json({
                message: "La encuesta y la pregunta han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La encuesta y la pregunta no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}