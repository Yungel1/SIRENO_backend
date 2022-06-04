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
var helperNumeric = require('../helpers/helperNumeric');
const { body } = require('express-validator');


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

//Seleccionar las opcionesPregunta del la pregunta seleccionada por usuario logeado
exports.getOpcionesPregunta = async function (req,res,next){
    try{

        var idSituacion = req.query.idSituacion;
        var idCampaña = req.query.idCampaña;
        var idEncuesta = req.query.idEncuesta;
        var idPregunta = req.query.idPregunta;
        var idUsuario = req.usuario;

        //Seleccionar las situaciones del usuario
        var getSituacionesUsuario = await UsuarioSituacionService.getSituacionesUsuario(idUsuario); 
        if(getSituacionesUsuario.length === 0){
            return res.status(422).json({
                message: "No tienes ninguna situación relacionada",
            });
        }

        var idSituacionEsInt = helperNumeric.isNumeric(idSituacion);
        //Comprobar si el id de la situación es un numero
        if (!idSituacionEsInt){
            return res.status(422).json({
                message: "La situación seleccionada no es un número",
            });
        }

        //Comprobar que la situación existe
        var situacionExiste = await SituacionService.situacionExiste(idSituacion); 
        if(! situacionExiste){
            return res.status(422).json({
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
                message: "El usuario no tiene esa situación",
            });
        }

        //Ver si la situación está respondida o no
        var getSituacionesRespondidasUsuario = await UsuarioSituacionService.usuarioSituacionRespondida(idUsuario, idSituacion); 
        if(getSituacionesRespondidasUsuario){
            return res.status(422).json({
                message: "La situación seleccionada ya esta respondida",
            });
        }
       
        //Seleccionar la campaña de la situacion
        var getCampañaSituacion = await SituacionService.getCampañaSituacion(idSituacion); 
        if(getCampañaSituacion[0].idCampaña === null){
            return res.status(422).json({
                message: "La situación seleccionada no tiene niguna campaña",
            });
        }

        var idCamapñaEsInt = helperNumeric.isNumeric(idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                message: "La campaña seleccionada no es un número",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(idCampaña);
        //Comprobar si el id de la campaña existe
        if(! campañaExiste){
           return res.status(422).json({
               message: "La campaña seleccionada no corresponde a ninguna campaña existente",
           });
       }

        //Ver si la campaña seleccionada concuerda con la campaña de la situación
        var campañaSeleccionadaExiste = (getCampañaSituacion[0].idCampaña === parseInt(idCampaña));
        if (!campañaSeleccionadaExiste){
            return res.status(422).json({
                message: "La campaña seleccionada no concuerda con la campaña de la situación",
            });
        }

        //Seleccionar las encuestas de la campaña
        var getEncuestasCampaña = await CampañaEncuestaService.getEncuestasCampaña(idCampaña); 
        if(getEncuestasCampaña.length === 0){
            return res.status(422).json({
                message: "La campaña seleccionada no tiene niguna encuesta",
            });
        }

        var idEncuestaEsInt = helperNumeric.isNumeric(idEncuesta);
        //Comprobar si el id de la encuesta es un numero
        if (!idEncuestaEsInt){
            return res.status(422).json({
                message: "La encuesta seleccionada no es un número",
            });
        }

        //Comprobar que la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(idEncuesta); 
        if(! encuestaExiste){
            return res.status(422).json({
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
                message: "El usuario no tiene esa encuesta",
            });
        }
        

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuesta = await EncuestaPreguntaService.getPreguntasEncuesta(idEncuesta); 
        if(getPreguntasEncuesta.length === 0){
            return res.status(422).json({
                message: "La encuesta seleccionada no tiene niguna pregunta",
            });
        }
        
        var idPreguntaEsInt = helperNumeric.isNumeric(idPregunta);
        //Comprobar si el id de la pregunta es un numero
        if (!idPreguntaEsInt){
            return res.status(422).json({
                message: "La pregunta seleccionada no es un número",
            });
        }

        //Comprobar que la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(idPregunta); 
        if(! preguntaExiste){
            return res.status(422).json({
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
                message: "El usuario no tiene esa pregunta",
            });
        }

        //Seleccionar las opcionesPregunta de la pregunta
        var getOpcionesPregunta = await OpcionesPreguntaService.getOpcionesPregunta(idPregunta); 
        if(getOpcionesPregunta.length === 0){
            return res.status(422).json({
                message: "La pregunta seleccionada no tiene niguna opcionPregunta",
            });
        }
        else{
            return res.status(200).json(getOpcionesPregunta);
        }


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}