var IdiomaService = require('../services/idioma.services');
var helperNumeric = require('../helpers/helperNumeric.js');

//Insertar idioma
exports.insertarIdioma = async function (req,res,next){
    try{

        var insertado = await IdiomaService.insertarIdioma(req.body.nombre); //Insertar idioma
       
        //Comprobar si se ha insertado el idioma
        if(insertado){
            return res.status(201).json({
                message: "El idioma ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                error: "idioma-insertar",
                message: "El idioma no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar idioma
exports.deleteIdioma = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                error: "idioma-id-numero",
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si el idioma existe
        var idiomaExiste = await IdiomaService.idiomaExiste(id);
        if(!idiomaExiste){
            return res.status(422).json({
                error: "idioma-existir",
                message: "El idioma no existe",
            });
        }

        var borrado = await IdiomaService.deleteIdioma(id); //Borrar idioma

        //Comprobar si se ha borrado el idioma
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado el idioma",
            });
        } else{
            return res.status(422).json({
                error: "idioma-borrar",
                message: "No se ha borrado el idioma",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir idioma
exports.getIdioma = async function (req,res,next){
    try{

        let id = req.query.id;

        var row = await IdiomaService.getIdioma(id); //Obtener idioma

        if(row == null){
            return res.status(422).json({
                error: "idioma-existir",
                message: "El idioma no existe",
            });
        }

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todos los idiomas (solo admin)
exports.getAllIdioma = async function (req,res,next){
    try{

        var row = await IdiomaService.getAllIdioma(); //Obtener todos los idiomas

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}