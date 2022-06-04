var CentroService = require('../services/centro.services');

//Insertar centro
exports.insertarCentro = async function (req,res,next){
    try{

        var idCentro = req.body.idCentro;

        var centroExiste = await CentroService.centroExiste(idCentro);
            //Comprobar si el id del centro existe
            if(centroExiste){
            return res.status(422).json({
                message: "El centro seleccionado ya existe",
            });
        }

        var insertado = await CentroService.insertarCentro(idCentro); //Insertar centro
       
        //Comprobar si se ha insertado el centro
        if(insertado){
            return res.status(201).json({
                message: "El centro ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El centro no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar centro
exports.eliminarCentro = async function (req,res,next){
    try{

        var idCentro = req.query.idCentro;

        var centroExiste = await CentroService.centroExiste(idCentro);
        //Comprobar si el id del centro existe
        if(!centroExiste){
           return res.status(422).json({
               message: "El centro seleccionado no existe",
           });
       }

        var eliminado = await CentroService.eliminarCentro(idCentro); //Eliminar centro
       
        //Comprobar si se ha eliminado el centro
        if(eliminado){
            return res.status(201).json({
                message: "El centro ha sido eliminado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El centro no ha sido eliminado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}