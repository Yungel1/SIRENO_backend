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

        //Comprobar si el texto existe
        var textoExiste = await TextoService.textoExiste(req.body.idIdioma,req.body.idPregunta,req.body.idOpcionesPregunta);
        if(textoExiste){
            return res.status(422).json({
                message: "El texto ya existe",
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

//Borrar texto
exports.deleteTexto = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si el texto existe
        var textoExiste = await TextoService.textoExiste(id);
        if(!textoExiste){
            return res.status(422).json({
                message: "El texto no existe",
            });
        }

        var borrado = await TextoService.deleteTexto(id); //Borrar texto

        //Comprobar si se ha borrado el texto
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado el texto",
            });
        } else{
            return res.status(422).json({
                message: "No se ha borrado el texto",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todos los textos (solo admin)
exports.getAllTexto = async function (req,res,next){
    try{

        var row = await TextoService.getAllTexto(); //Obtener todos los textos

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir texto concreto
exports.getTexto = async function (req,res,next){
    try{

        let idIdioma = req.query.idIdioma;
        let idPregunta = req.query.idPregunta;
        let idOpcionesPregunta = req.query.idOpcionesPregunta;

        //Comprobar si el id de la pregunta, el idioma y la opción de pregunta son números
        if(!helperNumeric.isNumeric(idIdioma)||!helperNumeric.isNumeric(idPregunta)||(!helperNumeric.isNumeric(idOpcionesPregunta)&&idOpcionesPregunta!=null)){
            return res.status(422).json({
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si el idioma existe
        var idiomaExiste = await IdiomaService.idiomaExiste(idIdioma);
        if(!idiomaExiste){
            return res.status(422).json({
                message: "El idioma no existe",
            });
        }

        let pertenece = false;
        //Comprobar si el usuario tiene acceso a esta pregunta y si existe
        if(idOpcionesPregunta==null){
            pertenece = await PreguntaService.pertenecePreguntaUsuario(req.usuario,idPregunta);
            if(!pertenece){
                return res.status(422).json({
                    message: "El usuario no tiene acceso a este texto porque no tiene acceso a la pregunta o no existe",
                });
            }
        } else{
            //Comprobar si el usuario tiene acceso a esta opción pregunta y si existe
            pertenece = await OpcionesPreguntaService.perteneceOpcionesPreguntaUsuario(req.usuario,idPregunta,idOpcionesPregunta)
            if(!pertenece){
                return res.status(422).json({
                    message: "El usuario no tiene acceso a este texto porque no tiene acceso a la opción de pregunta o no existe",
                });
            }
        }

        var row = await TextoService.getTexto(idIdioma,idPregunta,idOpcionesPregunta); //Obtener texto

        if(row == null){
            return res.status(422).json({
                message: "El texto no existe",
            });
        }

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}