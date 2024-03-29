var EncuestaService = require('../services/encuesta.services');
var helperNumeric = require('../helpers/helperNumeric');

//Insertar encuesta
exports.insertarEncuesta = async function (req,res,next){
    try{

        var insertado = await EncuestaService.insertarEncuesta(req.body.nombre); //Insertar encuesta
       
        //Comprobar si se ha insertado la encuesta
        if(insertado){
            return res.status(201).json({
                message: "La encuesta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "encuesta-insertar",
                message: "La encuesta no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar encuesta
exports.deleteEncuesta = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                error: "encuesta-id-numero",
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(id);
        if(!encuestaExiste){
            return res.status(422).json({
                error: "encuesta-existir",
                message: "La encuesta no existe",
            });
        }

        var borrado = await EncuestaService.deleteEncuesta(id); //Borrar encuesta

        //Comprobar si se ha borrado la encuesta
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la encuesta",
            });
        } else{
            return res.status(422).json({
                error: "encuesta-borrar",
                message: "No se ha borrado la encuesta",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todas las encuestas (solo admin)
exports.getAllEncuesta = async function (req,res,next){
    try{

        var row = await EncuestaService.getAllEncuesta(); //Obtener todas las encuestas

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir encuesta concreta
exports.getEncuestaInfo = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                error: "encuesta-id-numero",
                message: "El id de la encuesta no es un número",
            });
        }

        //Comprobar si el usuario tiene acceso a esta encuesta y si existe
        let pertenece = await EncuestaService.perteneceEncuestaUsuario(req.usuario,id);
        if(!pertenece){
            return res.status(422).json({
                error: "usuario-encuesta-acceder",
                message: "El usuario no tiene acceso a esta encuesta o no existe",
            });
        }

        var row = await EncuestaService.getEncuestaInfo(id); //Obtener encuesta

        if(row == null){
            return res.status(422).json({
                error: "encuesta-existir",
                message: "La encuesta no existe",
            });
        }

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir encuesta concreta
exports.getEncuestaInfoInformes = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                error: "encuesta-id-numero",
                message: "El id de la encuesta no es un número",
            });
        }

        var row = await EncuestaService.getEncuestaInfo(id); //Obtener encuesta

        if(row == null){
            return res.status(422).json({
                error: "encuesta-existir",
                message: "La encuesta no existe",
            });
        }

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}