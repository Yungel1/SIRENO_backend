var OpcionesPreguntaService = require('../services/opcionesPregunta.services');
var PreguntaService = require('../services/pregunta.services');
var helperNumeric = require('../helpers/helperNumeric');

//Insertar opción de pregunta
exports.insertarOpcionPregunta = async function (req,res,next){
    try{

        //Comprobar si el id de la pregunta es un número
        if(!helperNumeric.isNumeric(req.body.idPregunta)){
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

        var insertado = await OpcionesPreguntaService.insertarOpcionPregunta(req.body.idPregunta); //Insertar opción de pregunta

        //Comprobar si se ha insertado la opción de pregunta
        if(insertado){
            return res.status(201).json({
                message: "La opción de pregunta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La opción de pregunta no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}