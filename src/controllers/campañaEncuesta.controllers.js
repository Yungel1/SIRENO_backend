var CampañaEncuestaService = require('../services/campañaEncuesta.services');
var UsuarioSituacionService = require('../services/usuarioSituacion.services');
var SituacionService = require('../services/situacion.services');
var EncuestaService = require('../services/encuesta.services');
var CampañaService = require('../services/campaña.services');
var helperNumeric = require('../helpers/helperNumeric');
const { body } = require('express-validator');

//Relacionar campaña y encuesta
exports.relacionarCampañaEncuesta = async function (req,res,next){
    try{
        
        //Comprobar si el id de la campaña y la encuesta son números
        if(!helperNumeric.isNumeric(req.body.idCampaña)||!helperNumeric.isNumeric(req.body.idEncuesta)){
            return res.status(422).json({
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si la campaña existe
        var campañaExiste = await CampañaService.campañaExiste(req.body.idCampaña);
        if(!campañaExiste){
            return res.status(422).json({
                message: "La campaña no existe",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(req.body.idEncuesta);
        if(!encuestaExiste){
            return res.status(422).json({
                message: "La encuesta no existe",
            });
        }

        var relacionado = await CampañaEncuestaService.relacionarCampañaEncuesta(req.body.idCampaña,req.body.idEncuesta); //Relacionar campaña y encuesta


        //Comprobar si se han relacionado la campaña y la encuesta
        if(relacionado){
            return res.status(201).json({
                message: "La campaña y la encuesta han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La campaña y la encuesta no han sido relacionadas correctamente",
            });
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Seleccionar las encuestas del la campaña seleccionada por usuario logeado
exports.getEncuestasCampaña = async function (req,res,next){
    try{

        var idSituacion = req.query.idSituacion;
        var idCampaña = req.query.idCampaña;
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
        var ecnontrado = false;
        getSituacionesUsuario.forEach(situacion => {
            var tieneSituacion = (situacion.idSituacion === parseInt(idSituacion));
            if(tieneSituacion){
                ecnontrado = true;
            }
        });
        if (! ecnontrado){
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
        else{
            return res.status(200).json(getEncuestasCampaña);
        }


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar la relación entre una campaña y una encuesta
exports.deleteCampañaEncuesta = async function (req,res,next){
    try{

        let idCampaña = req.query.idCampaña;
        let idEncuesta = req.query.idEncuesta;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(idCampaña)||!helperNumeric.isNumeric(idEncuesta)){
            return res.status(422).json({
                message: "El id introducido no es un número",
            });
        }

        var campañaEncuestaExiste = await CampañaEncuestaService.campañaEncuestaExiste(idCampaña,idEncuesta);
        //Comprobar si la relación entre la campaña y la encuesta existe
        if(!campañaEncuestaExiste){
            return res.status(422).json({
                message: "La relacion campaña-encuesta no existe",
            });
        }

        var borrado = await CampañaEncuestaService.deleteCampañaEncuesta(idCampaña,idEncuesta); //Borrar CampañaEncuesta

        //Comprobar si se ha borrado la relación CampañaEncuesta
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la relación CampañaEncuesta",
            });
        } else{
            return res.status(422).json({
                message: "No se ha borrado la relación CampañaEncuesta",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}