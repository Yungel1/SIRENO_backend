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
        if(!helperNumeric.isNumeric(req.body.idPregunta) || !helperNumeric.isNumeric(req.body.num_opc)){
            return res.status(422).json({
                error: "pregunta-int",
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

        //Comprobar si la pregunta esta relacionada con num_opc
        var preguntaNumOpcExiste = await OpcionesPreguntaService.preguntaNumOpcExiste(req.body.idPregunta, req.body.num_opc);
        if(preguntaNumOpcExiste){
            return res.status(422).json({
                error: "pregunta-num_opc-existir",
                message: "La pregunta ya está relacionada con ese num_opc",
            });
        }

        var insertado = await OpcionesPreguntaService.insertarOpcionPregunta(req.body.idPregunta,req.body.num_opc); //Insertar opción de pregunta

        //Comprobar si se ha insertado la opción de pregunta
        if(insertado){
            return res.status(201).json({
                message: "La opción de pregunta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "opcpregunta-insertar",
                message: "La opción de pregunta no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Insertar pregunta
exports.insertarOpcPregGetId = async function (req,res,next){
    try{

        var idOpcPreg = await OpcionesPreguntaService.insertarOpcPregGetId(req.body.idPregunta,req.body.num_opc); //Insertar opción

        if(!idOpcPreg){
            return res.status(422).json({
                error: "opcpreg-insertar",
                message: "La opción no ha sido insertada",
            });
        }

        return res.status(201).json(idPregunta);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

exports.getNumOpcPreg = async function (req,res,next){
    try{

        //Comprobar si el id de la pregunta es un número
        if(!helperNumeric.isNumeric(req.query.idPregunta) || !helperNumeric.isNumeric(req.query.num_opc)){
            return res.status(422).json({
                error: "pregunta-int",
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si la pregunta existe
        var preguntaExiste = await PreguntaService.preguntaExiste(req.query.idPregunta);
        if(!preguntaExiste){
            return res.status(422).json({
                error: "pregunta-existir",
                message: "La pregunta no existe",
            });
        }

        //Comprobar si la pregunta esta relacionada con num_opc
        var preguntaNumOpcExiste = await OpcionesPreguntaService.preguntaNumOpcExiste(req.query.idPregunta, req.query.num_opc);

        //Comprobar si se ha insertado la opción de pregunta
        if(!preguntaNumOpcExiste){
            return res.status(201).json({
                message: "El numero de la opción no existe en esa pregunta, por lo tanto se puede insertar",
            });
        } else{
            return res.status(422).json({
                error: "opcpregunta-insertar",
                message: "El numero de la opción ya existe en esa pregunta, por lo tanto no se puede insertar",
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

        var idPregunta = req.query.idPregunta;
        var idUsuario = req.usuario;

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

        //Seleccionar las opcionesPregunta de la pregunta
        var getOpcionesPregunta = await OpcionesPreguntaService.getOpcPreguntasUsuario(idUsuario, idPregunta); 
        if(getOpcionesPregunta.length === 0){
            return res.status(422).json({
                error: "pregunta-opcpregunta-relacionar",
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

//Seleccionar las opcionesPregunta del la pregunta seleccionada por usuario logeado para los informes
exports.getOpcionesPreguntaInformes = async function (req,res,next){
    try{

        var idPregunta = req.query.idPregunta;
        var idUsuario = req.usuario;

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

        //Seleccionar las opcionesPregunta de la pregunta
        var getOpcionesPreguntaInformes = await OpcionesPreguntaService.getOpcionesPreguntaInformes(idUsuario, idPregunta); 
        if(getOpcionesPreguntaInformes.length === 0){
            return res.status(422).json({
                error: "pregunta-opcpregunta-informe",
                message: "La pregunta seleccionada no tiene niguna opcionPregunta",
            });
        }
        else{
            return res.status(200).json(getOpcionesPreguntaInformes);
        }


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Seleccionar las opcionesPregunta del la pregunta seleccionada por usuario logeado para los informes
exports.getOpciones = async function (req,res,next){
    try{

        var idPregunta = req.query.idPregunta;

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

        //Seleccionar las opcionesPregunta de la pregunta
        var getOpcionesPreguntaInformes = await OpcionesPreguntaService.getOpcionesPregunta(idPregunta); 
        
        return res.status(200).json(getOpcionesPreguntaInformes);
        


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar activación
exports.eliminarOpcionesPregunta = async function (req,res,next){
    try{

        var idOpcionesPregunta = req.query.id;

        var opcionesPreguntaExiste = await OpcionesPreguntaService.opcionesPreguntaExiste(idOpcionesPregunta);
        //Comprobar si la opcionespregunta existe
        if(!opcionesPreguntaExiste){
            return res.status(422).json({
                error: "opcpregunta-existir",
                message: "La opciónPregunta que se intenta eliminiar no existe",
            });
        }

        var eliminado = await OpcionesPreguntaService.eliminarOpcionesPregunta(idOpcionesPregunta); //Eliminar opcionespregunta
       
        //Comprobar si se ha eliminado la opcionesPregunta
        if(eliminado){
            return res.status(201).json({
                message: "La opcionesPregunta ha sido eliminada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "opcpregunta-eliminar",
                message: "La opcionesPregunta no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


//Coger opcionespreguntas
exports.getOpcionesPreguntas = async function (req,res,next){
    try{

        var opcionespreguntas = await OpcionesPreguntaService.getOpcionesPreguntas(); //Coger todos las opcionespreguntas
       
        //Comprobar si se han cogido los opcionespreguntas
        if(opcionespreguntas){
            return res.status(201).json({opcionespreguntas});
        } else{
            return res.status(422).json({
                message: "No se han podido coger las opcionespreguntas",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}