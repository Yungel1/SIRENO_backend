var TextoService = require('../services/texto.services');
var PreguntaService = require('../services/pregunta.services');
var IdiomaService = require('../services/idioma.services');
var OpcionesPreguntaService = require('../services/opcionesPregunta.services');
var helperNumeric = require('../helpers/helperNumeric');

//Insertar texto
exports.insertarTexto = async function (req,res,next){
    try{
       
        //Comprobar si el id de la pregunta, el idioma y la opción de pregunta son números
        if(!helperNumeric.isNumeric(req.body.idIdioma)||!helperNumeric.isNumeric(req.body.idPregunta)||!helperNumeric.isNumeric(req.body.idOpcionesPregunta)){
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

        //Comprobar si el idioma existe
        var idiomaExiste = await IdiomaService.idiomaExiste(req.body.idIdioma);
        if(!idiomaExiste){
            return res.status(422).json({
                message: "El idioma no existe",
            });
        }

        //Comprobar si la opción de pregunta existe
        var opcionPreguntaExiste = await OpcionesPreguntaService.opcionesPreguntaExiste(req.body.idOpcionesPregunta);
        if(!opcionPreguntaExiste){
            return res.status(422).json({
                message: "La opción de pregunta no existe",
            });
        }

        var insertado = await TextoService.insertarTexto(req.body.texto,req.body.idIdioma,req.body.idPregunta,req.body.idOpcionesPregunta); //Insertar texto

        //Comprobar si se ha insertado el texto
        if(insertado){
            return res.status(201).json({
                message: "El texto ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El texto no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}