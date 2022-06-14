var GradoAsignaturaService = require('../services/gradoAsignatura.services');
var GradoService = require('../services/grado.services');
var AsignaturaService = require('../services/asignatura.services');

//Relacionar grado y asignatura
exports.relacionarGradoAsignatura = async function (req,res,next){
    try{

        var idGrado = req.body.idGrado;
        var idAsignatura = req.body.idAsignatura;
        
        //Comprobar si el grado existe
        var gradoExiste = await GradoService.gradoExiste(idGrado);
        if(!gradoExiste){
            return res.status(422).json({
                error: "grado-existir",
                message: "El grado no existe",
            });
        }

        //Comprobar si la asignatura existe
        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
        if(!asignaturaExiste){
            return res.status(422).json({
                error: "asignatura-existir",
                message: "La asignatura no existe",
            });
        }

        //Comprobar si la asignatura y el grado estan relacionados
        var gradoAsignaturaExiste = await GradoAsignaturaService.gradoAsignaturaExiste(idGrado, idAsignatura);
        if(gradoAsignaturaExiste){
            return res.status(422).json({
                error: "grado-asignatura-relacionados",
                message: "El grado y la asignatura ya estan relacionados",
            });
        }

        var relacionado = await GradoAsignaturaService.relacionarGradoAsignatura(idGrado,idAsignatura); //Relacionar grado y asignatura

        //Comprobar si se han relacionado el grado y la asignatura
        if(relacionado){
            return res.status(201).json({
                message: "El grado y la asignatura han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                error: "grado-asignatura-relacionar",
                message: "El grado y la asignatura no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


//Eliminar relacioón grado y asignatura
exports.elimiarRelacionGradoAsignatura = async function (req,res,next){
    try{

        var idGrado = req.query.idGrado;
        var idAsignatura = req.query.idAsignatura;

        //Comprobar si la asignatura y el grado estan relacionados
        var gradoAsignaturaExiste = await GradoAsignaturaService.gradoAsignaturaExiste(idGrado, idAsignatura);
        if(! gradoAsignaturaExiste){
            return res.status(422).json({
                error: "grado-asignatura-relacion-existir",
                message: "El grado y la asignatura no estan relacionados",
            });
        }

        var eliminado = await GradoAsignaturaService.elimiarRelacionGradoAsignatura(idGrado, idAsignatura); //Eliminar relación grado y asignatura
       
        //Comprobar si se ha eliminado la relación grado y asignatura
        if(eliminado){
            return res.status(201).json({
                message: "La relación grado y asignatura ha sido eliminada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "grado-asignatura-relacion-eliminar",
                message: "La relación grado y asignatura no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todas las relaciones entre grados y asignaturas (solo admin)
exports.getAllGradoAsignatura = async function (req,res,next){
    try{

        var row = await GradoAsignaturaService.getAllGradoAsignatura(); //Obtener todas las relaciones entre grados y asignaturas

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

