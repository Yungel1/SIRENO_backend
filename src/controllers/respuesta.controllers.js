var OpcionesPreguntaService = require('../services/opcionesPregunta.services');
var PreguntaService = require('../services/pregunta.services');
var EncuestaPreguntaService = require('../services/encuestaPregunta.services');
var EncuestaService = require('../services/encuesta.services');
var PreguntaService = require('../services/pregunta.services');
var EncuestaService = require('../services/encuesta.services');
var RespuestaService = require('../services/respuesta.services');
var CampañaService = require('../services/campaña.services');
var OpcPregRespuestaService = require('../services/opcPregRespuesta.services');
var HelperNumeric = require('../helpers/helperNumeric');
const { body } = require('express-validator');


//Insertar respuesta
exports.insertarRespuesta = async function (req,res,next){
    try{

        var idEncuesta = req.body.idEncuesta;
        var idPregunta = req.body.idPregunta;
        var idOpcionPregunta = req.body.idOpcionPregunta;
        var texto = req.body.texto;
        var idUsuario = req.usuario;

        var idEncuestaEsInt = helperNumeric.isNumeric(idEncuesta);
        //Comprobar si el id de la encuesta es un numero
        if (!idEncuestaEsInt){
            return res.status(422).json({
                error: "encuesta-int",
                message: "La encuesta seleccionada no es un número",
            });
        }

        //Comprobar que la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(idEncuesta); 
        if(! encuestaExiste){
            return res.status(422).json({
                error: "encuesta-existir",
                message: "La encuesta no existe",
            });
        }

        
        var idPreguntaEsInt = helperNumeric.isNumeric(idPregunta);
        //Comprobar si el id de la pregunta es un numero
        if (!idPreguntaEsInt){
            return res.status(422).json({
                error: "pregunta-int",
                message: "La pregunta seleccionada no es un número",
            });
        }

        //Comprobar que la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta); 
        if(! preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta no existe",
            });
        }

        var idOpcionesPreguntaEsInt = helperNumeric.isNumeric(idOpcionPregunta);
        //Comprobar si el id de la opcionPregunta es un numero
        if (!idOpcionesPreguntaEsInt){
            return res.status(422).json({
                error: "opcpregunta-int",
                message: "La opcionPregunta seleccionada no es un número",
            });
        }

        //Comprobar que la opcionPregunta existe
        var opcionPreguntaExiste = await OpcionesPreguntaService.opcionesPreguntaExiste(idOpcionPregunta); 
        if(! opcionPreguntaExiste){
            return res.status(422).json({
                error: "opcpregunta-existir",
                message: "La opcionPregunta no existe",
            });
        }

        //Seleccionar las opcionesPregunta de la pregunta
       var perteneceOpcionesPreguntaUsuario = await OpcionesPreguntaService.perteneceOpcionesPreguntaUsuario(idUsuario, idPregunta, idOpcionPregunta); 
       if(!perteneceOpcionesPreguntaUsuario){
           return res.status(422).json({
               error: "pregunta-opcpregunta-relacionar",
               message: "La pregunta seleccionada no tiene niguna opcionPregunta",
           });
       }

        var idRespuestaInsertada = await RespuestaService.insertarRespuesta(texto, idEncuesta); //Insertar respuesta

        //Comprobar que la opcPregRespuesta existe
        var opcPregRespuestaExiste = await OpcPregRespuestaService.opcPregRespuestaExiste(idOpcionPregunta, idRespuestaInsertada, idPregunta); 
        if(opcPregRespuestaExiste){
            return res.status(422).json({
                error: "opcpregunta-ya-existir",
                message: "Esa opcPregRespuesta ya existe",
            });
        }

        var opcPregRespuestaInsertada = await OpcPregRespuestaService.insertarOpcPregRespuesta(idOpcionPregunta, idRespuestaInsertada, idPregunta); //Insertar opcPregRespuesta

        //Comprobar si se ha insertado la respuesta
        if(idRespuestaInsertada && opcPregRespuestaInsertada){
            return res.status(201).json({
                message: "La respuesta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "respuesta-insertar",
                message: "La respuesta no ha sido insertada",
            });
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger medias de las opcPreguntas
exports.getRespuestasMediaInformes = async function (req,res,next){
    try{

        var idCampaña = req.query.idCampaña;
        var idEncuesta = req.query.idEncuesta;
        var idPregunta = req.query.idPregunta;
        var idUsuario = req.usuario;

        var idEncuestaEsInt = HelperNumeric.isNumeric(idEncuesta);
        //Comprobar si el id de la encuesta es un numero
        if (!idEncuestaEsInt){
            return res.status(422).json({
                error: "encuesta-int",
                message: "La encuesta seleccionada no es un número",
            });
        }

        //Comprobar que la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(idEncuesta); 
        if(! encuestaExiste){
            return res.status(422).json({
                error: "encuesta-existir",
                message: "La encuesta no existe",
            });
        }

        
        var idPreguntaEsInt = HelperNumeric.isNumeric(idPregunta);
        //Comprobar si el id de la pregunta es un numero
        if (!idPreguntaEsInt){
            return res.status(422).json({
                error: "pregunta-int",
                message: "La pregunta seleccionada no es un número",
            });
        }

        //Comprobar que la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta); 
        if(! preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta no existe",
            });
        }

        var idCamapñaEsInt = HelperNumeric.isNumeric(idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                error: "campaña-id-int",
                message: "La campaña seleccionada no es un número",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(idCampaña);
         //Comprobar si el id de la campaña existe
         if(! campañaExiste){
            return res.status(422).json({
                error: "campaña-existir",
                message: "La campaña seleccionada no corresponde a ninguna campaña existente",
            });
        }

         //Seleccionar las opcionesPregunta de la pregunta
         var getRespuestasMediaInformes = await RespuestaService.getRespuestasMediaInformes(idUsuario, idPregunta, idEncuesta, idCampaña); 
         if(getRespuestasMediaInformes.length === 0){
             return res.status(422).json({
                 error: "respuesta-informe",
                 message: "La encuesta seleccionada no tiene niguna respuesta en esa pregunta",
             });
         }
         else{
             return res.status(200).json(getRespuestasMediaInformes);
         }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}