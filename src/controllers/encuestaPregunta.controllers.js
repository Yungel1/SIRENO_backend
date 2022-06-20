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

        //Comprobar si la encuesta esta relacionada con num_preg
        var encuestaNumPregExiste = await EncuestaPreguntaService.encuestaNumPregExiste(req.body.idEncuesta, req.body.num_preg);
        if(encuestaNumPregExiste){
            return res.status(422).json({
                error: "encuesta-num_preg-existir",
                message: "La encuesta ya está relacionada con ese num_preg",
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

        var idEncuesta = req.query.idEncuesta;
        var idUsuario = req.usuario;

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

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuesta = await EncuestaPreguntaService.getPreguntasUsuario(idUsuario, idEncuesta); 
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


//Seleccionar las preguntas del la encuesta seleccionada por usuario logeado
exports.getPreguntas = async function (req,res,next){
    try{

        var idEncuesta = req.query.idEncuesta;
        var idUsuario = req.usuario;

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

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuesta = await EncuestaPreguntaService.getPreguntasEncuesta( idEncuesta); 
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


//Seleccionar las preguntas del la encuesta seleccionada por usuario logeado para los informes
exports.getPreguntasEncuestaInformes = async function (req,res,next){
    try{

        var idEncuesta = req.query.idEncuesta;
        var idUsuario = req.usuario;

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

        //Seleccionar las preguntas de la encuesta
        var getPreguntasEncuestaInformes = await EncuestaPreguntaService.getPreguntasEncuestaInformes(idUsuario, idEncuesta); 
        if(getPreguntasEncuestaInformes.length === 0){
            return res.status(422).json({
                error: "encuesta-pregunta-informe",
                message: "La encuesta seleccionada no tiene niguna pregunta",
            });
        }
        else{
            return res.status(200).json(getPreguntasEncuestaInformes);
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