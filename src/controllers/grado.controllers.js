var GradoService = require('../services/grado.services');
var CentroService = require('../services/centro.services');

//Insertar grado
exports.insertarGrado = async function (req,res,next){
    try{

        var idGrado = req.body.idGrado;
        var idCentro = req.body.idCentro;

        var gradoExiste = await GradoService.gradoExiste(idGrado);
        //Comprobar si el id del grado existe
        if(gradoExiste){
           return res.status(422).json({
               message: "El grado seleccionado ya existe",
           });
       }

        var centroExiste = await CentroService.centroExiste(idCentro);
            //Comprobar si el id del centro existe
            if(! centroExiste){
            return res.status(422).json({
                message: "El centro seleccionado no existe",
            });
        }

        var insertado = await GradoService.insertarGrado(idGrado, idCentro); //Insertar grado
       
        //Comprobar si se ha insertado el grado
        if(insertado){
            return res.status(201).json({
                message: "El grado ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El grado no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}