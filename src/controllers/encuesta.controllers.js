var EncuestaService = require('../services/encuesta.services');

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