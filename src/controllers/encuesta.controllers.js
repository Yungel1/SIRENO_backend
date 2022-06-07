var EncuestaService = require('../services/encuesta.services');
var helperNumeric = require('../helpers/helperNumeric');

//Insertar encuesta
exports.insertarEncuesta = async function (req,res,next){
    try{

        var insertado = await EncuestaService.insertarEncuesta(); //Insertar idioma
       
        //Comprobar si se ha insertado la encuesta
        if(insertado){
            return res.status(201).json({
                message: "La encuesta ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
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
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(id);
        if(!encuestaExiste){
            return res.status(422).json({
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