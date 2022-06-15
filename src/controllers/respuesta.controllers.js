var OpcionesPreguntaService = require('../services/opcionesPregunta.services');
var PreguntaService = require('../services/pregunta.services');
var EncuestaPreguntaService = require('../services/encuestaPregunta.services');
var EncuestaService = require('../services/encuesta.services');
var PreguntaService = require('../services/pregunta.services');
var CampañaEncuestaService = require('../services/campañaEncuesta.services');
var UsuarioSituacionService = require('../services/usuarioSituacion.services');
var SituacionService = require('../services/situacion.services');
var EncuestaService = require('../services/encuesta.services');
var CampañaService = require('../services/campaña.services');
var RespuestaService = require('../services/respuesta.services');
var OpcPregRespuestaService = require('../services/opcPregRespuesta.services');
var helperNumeric = require('../helpers/helperNumeric');
const { body } = require('express-validator');


//Insertar respuesta
exports.insertarRespuesta = async function (req,res,next){
    try{

        var idSituacion = req.body.idSituacion;
        var idCampaña = req.body.idCampaña;
        var idEncuesta = req.body.idEncuesta;
        var idPregunta = req.body.idPregunta;
        var idOpcionPregunta = req.body.idOpcionPregunta;
        var texto = req.body.texto;
        var idUsuario = req.usuario;

        //Seleccionar las situaciones del usuario
        var getSituacionesUsuario = await UsuarioSituacionService.getSituacionesUsuario(idUsuario); 
        if(getSituacionesUsuario.length === 0){
            return res.status(422).json({
                error: "usuario-situacion-relacionar",
                message: "No tienes ninguna situación relacionada",
            });
        }

        var idSituacionEsInt = helperNumeric.isNumeric(idSituacion);
        //Comprobar si el id de la situación es un numero
        if (!idSituacionEsInt){
            return res.status(422).json({
                error: "situacion-int",
                message: "La situación seleccionada no es un número",
            });
        }

        //Comprobar que la situación existe
        var situacionExiste = await SituacionService.situacionExiste(idSituacion); 
        if(! situacionExiste){
            return res.status(422).json({
                error: "situacion-existir",
                message: "La situación no existe",
            });
        }

        //Comprobar que la situación es del usuario logeado
        var situacionEcnontrada = false;
        getSituacionesUsuario.forEach(situacion => {
            var tieneSituacion = (situacion.idSituacion === parseInt(idSituacion));
            if(tieneSituacion){
                situacionEcnontrada = true;
            }
        });
        if (! situacionEcnontrada){
            return res.status(422).json({
                error: "usuario-situacion-relacionar",
                message: "El usuario no tiene esa situación",
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
       
        //Seleccionar la campaña de la situacion
        var getCampañaSituacion = await SituacionService.getCampañaSituacion(idSituacion); 
        if(getCampañaSituacion[0].idCampaña === null){
            return res.status(422).json({
                error: "situacion-campaña-relacionar",
                message: "La situación seleccionada no tiene niguna campaña",
            });
        }

        var idCamapñaEsInt = helperNumeric.isNumeric(idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                error: "campaña-int",
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

        //Ver si la campaña seleccionada concuerda con la campaña de la situación
        var campañaSeleccionadaExiste = (getCampañaSituacion[0].idCampaña === parseInt(idCampaña));
        if (!campañaSeleccionadaExiste){
            return res.status(422).json({
                error: "campaña-situacion-relacionar",
                message: "La campaña seleccionada no concuerda con la campaña de la situación",
            });
        }

         //Coger info de la situacion desde la campaña
         var infoSituacionCampaña = await SituacionService.getInfoSituacionDesdeCampaña(idCampaña);
         var idDocente = infoSituacionCampaña[0].idDocente;
         var idGrupo = infoSituacionCampaña[0].idGrupo;
         var idAsignatura = infoSituacionCampaña[0].idAsignatura;
         var idGrado = infoSituacionCampaña[0].idGrado;
 
         //Ver si la campaña esta activada
         var campañaActivada = await ActivacionService.campañaActivada(idDocente, idGrupo, idGrado, idAsignatura, idCampaña);
         if (!campañaActivada){
             return res.status(422).json({
                 error: "campaña-activar",
                 message: "La campaña seleccionada no esta activada",
             });
         } 

        //Seleccionar las encuestas de la campaña
        var getEncuestasCampaña = await CampañaEncuestaService.getEncuestasCampaña(idCampaña); 
        if(getEncuestasCampaña.length === 0){
            return res.status(422).json({
                error: "campaña-encuesta-relacionar",
                message: "La campaña seleccionada no tiene niguna encuesta",
            });
        }

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

        //Comprobar que la encuesta es del usuario logeado
        var encuestaEcnontrada = false;
        getEncuestasCampaña.forEach(encuesta => {
            var tieneEncuesta = (encuesta.idEncuesta === parseInt(idEncuesta));
            if(tieneEncuesta){
                encuestaEcnontrada = true;
            }
        });
        if (! encuestaEcnontrada){
            return res.status(422).json({
                error: "usuario-encuesta-relacionar",
                message: "El usuario no tiene esa encuesta",
            });
        }
        

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuesta = await EncuestaPreguntaService.getPreguntasEncuesta(idEncuesta); 
        if(getPreguntasEncuesta.length === 0){
            return res.status(422).json({
                error: "encuesta-pregunta-relacionar",
                message: "La encuesta seleccionada no tiene niguna pregunta",
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

        //Comprobar que la pregunta es del usuario logeado
        var preguntaEcnontrada = false;
        getPreguntasEncuesta.forEach(pregunta => {
            var tienePregunta = (pregunta.idPregunta === parseInt(idPregunta));
            if(tienePregunta){
                preguntaEcnontrada = true;
            }
        });
        if (! preguntaEcnontrada){
            return res.status(422).json({
                error: "usuario-pregunta-relacionar",
                message: "El usuario no tiene esa pregunta",
            });
        }

        //Seleccionar las opcionesPregunta de la pregunta
        var getOpcionesPregunta = await OpcionesPreguntaService.getOpcionesPregunta(idPregunta); 
        if(getOpcionesPregunta.length === 0){
            return res.status(422).json({
                error: "pregunta-opcpregunta-relacionar",
                message: "La pregunta seleccionada no tiene niguna opcionPregunta",
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

        //Comprobar que la opcionPregunta es del usuario logeado
        var opcionPreguntaEncontrada = false;
        getOpcionesPregunta.forEach(opcionPregunta => {
            var tieneOpcionPregunta = (opcionPregunta.id === parseInt(idOpcionPregunta));
            if(tieneOpcionPregunta){
                opcionPreguntaEncontrada = true;
            }
        });
        if (! opcionPreguntaEncontrada){
            return res.status(422).json({
                error: "usuario-opcpregunta-relacionar",
                message: "El usuario no tiene esa opcionPregunta",
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