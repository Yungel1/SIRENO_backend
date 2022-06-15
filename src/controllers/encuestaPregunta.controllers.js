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


//Relacionar encuesta y pregunta
exports.relacionarEncuestaPregunta = async function (req,res,next){
    try{
        
        //Comprobar si el id de la pregunta y la encuesta son números
        if(!helperNumeric.isNumeric(req.body.idPregunta)||!helperNumeric.isNumeric(req.body.idEncuesta)||!helperNumeric.isNumeric(req.body.num_preg)){
            return res.status(422).json({
                error: "encuesta-pregunta-numero",
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(req.body.idPregunta);
        if(!preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta no existe",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(req.body.idEncuesta);
        if(!encuestaExiste){
            return res.status(422).json({
                error: "encuesta-existir",
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
                error: "encuesta-pregunta-relacionar",
                message: "La encuesta y la pregunta no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Seleccionar las preguntas del la encuesta seleccionada por usuario logeado
exports.getPreguntasEncuesta = async function (req,res,next){
    try{

        var idSituacion = req.query.idSituacion;
        var idCampaña = req.query.idCampaña;
        var idEncuesta = req.query.idEncuesta;
        var idUsuario = req.usuario;

        //Seleccionar las situaciones del usuario
        var getSituacionesUsuario = await UsuarioSituacionService.getSituacionesUsuario(idUsuario); 
        if(getSituacionesUsuario.length === 0){
            return res.status(422).json({
                error: "usuario-situacion-existir",
                message: "No tienes ninguna situación relacionada",
            });
        }

        var idSituacionEsInt = helperNumeric.isNumeric(idSituacion);
        //Comprobar si el id de la situación es un numero
        if (!idSituacionEsInt){
            return res.status(422).json({
                error: "situacion-id-numero",
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
                error: "usuario-situacion-tener",
                message: "El usuario no tiene esa situación",
            });
        }

        //Ver si la situación está respondida o no
        var getSituacionesRespondidasUsuario = await UsuarioSituacionService.usuarioSituacionRespondida(idUsuario, idSituacion); 
        if(getSituacionesRespondidasUsuario){
            return res.status(422).json({
                error: "situacion-respondida",
                message: "La situación seleccionada ya esta respondida",
            });
        }
       
        //Seleccionar la campaña de la situacion
        var getCampañaSituacion = await SituacionService.getCampañaSituacion(idSituacion); 
        if(getCampañaSituacion[0].idCampaña === null){
            return res.status(422).json({
                error: "situacion-campaña-tener",
                message: "La situación seleccionada no tiene niguna campaña",
            });
        }

        var idCamapñaEsInt = helperNumeric.isNumeric(idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                error: "camapaña-id-numero",
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
                error: "campaña-concuerda-situacion",
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
                error: "campañar-encuesta-contener",
                message: "La campaña seleccionada no tiene niguna encuesta",
            });
        }

        var idEncuestaEsInt = helperNumeric.isNumeric(idEncuesta);
        //Comprobar si el id de la encuesta es un numero
        if (!idEncuestaEsInt){
            return res.status(422).json({
                error: "encuesta-id-numero",
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
                error: "usuario-encuesta-tener",
                message: "El usuario no tiene esa encuesta",
            });
        }
        

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuesta = await EncuestaPreguntaService.getPreguntasEncuesta(idEncuesta); 
        if(getPreguntasEncuesta.length === 0){
            return res.status(422).json({
                error: "encuesta-pregunta-tener",
                message: "La encuesta seleccionada no tiene niguna pregunta",
            });
        }
        else{
            return res.status(200).json(getPreguntasEncuesta);
        }



    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar la relación entre una pregunta y una encuesta
exports.deleteEncuestaPregunta = async function (req,res,next){
    try{

        let idPregunta = req.query.idPregunta;
        let idEncuesta = req.query.idEncuesta;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(idEncuesta)||!helperNumeric.isNumeric(idPregunta)){
            return res.status(422).json({
                error: "encuesta-pregunta-numero",
                message: "El id introducido no es un número",
            });
        }

        var encuestaPreguntaExiste = await EncuestaPreguntaService.encuestaPreguntaExiste(idEncuesta,idPregunta);
        //Comprobar si la relación entre la encuesta y la pregunta existe
        if(!encuestaPreguntaExiste){
            return res.status(422).json({
                error: "encuesta-pregunta-existir",
                message: "La relacion encuesta-pregunta no existe",
            });
        }

        var borrado = await EncuestaPreguntaService.deleteEncuestaPregunta(idEncuesta,idPregunta); //Borrar EncuestaPregunta

        //Comprobar si se ha borrado la relación EncuestaPregunta
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la relación EncuestaPregunta",
            });
        } else{
            return res.status(422).json({
                error: "encuesta-pregunta-borrar",
                message: "No se ha borrado la relación EncuestaPregunta",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todas las relaciones entre encuestas y preguntas (solo admin)
exports.getAllEncuestaPregunta = async function (req,res,next){
    try{

        var row = await EncuestaPreguntaService.getAllEncuestaPregunta(); //Obtener todas las relaciones entre encuestas y preguntas

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}