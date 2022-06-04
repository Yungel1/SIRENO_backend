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