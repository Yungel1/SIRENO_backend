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
               error: "grado-existe",
               message: "El grado seleccionado ya existe",
           });
       }

        var centroExiste = await CentroService.centroExiste(idCentro);
            //Comprobar si el id del centro existe
            if(! centroExiste){
            return res.status(422).json({
                error: "centro-existir",
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
                error: "grado-insertar",
                message: "El grado no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar grado
exports.eliminarGrado = async function (req,res,next){
    try{

        var idGrado = req.query.idGrado;

        var gradoExiste = await GradoService.gradoExiste(idGrado);
        //Comprobar si el id del grado existe
        if(!gradoExiste){
           return res.status(422).json({
               error: "grado-existir",
               message: "El grado seleccionado no existe",
           });
       }

        var eliminado = await GradoService.eliminarGrado(idGrado); //Eliminar grado
       
        //Comprobar si se ha eliminado el grado
        if(eliminado){
            return res.status(201).json({
                message: "El grado ha sido eliminado correctamente",
            });
        } else{
            return res.status(422).json({
                error: "grado-eliminar",
                message: "El grado no ha sido eliminado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger grados
exports.getGrados = async function (req,res,next){
    try{

        var grados = await GradoService.getGrados(); //Coger todos las grados
       
        //Comprobar si se han cogido los grados
        if(grados){
            return res.status(201).json({grados});
        } else{
            return res.status(422).json({
                error: "grado-coger",
                message: "No se han podido coger las grados",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}