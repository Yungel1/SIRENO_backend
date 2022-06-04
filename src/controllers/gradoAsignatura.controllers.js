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
                message: "El grado no existe",
            });
        }

        //Comprobar si la asignatura existe
        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
        if(!asignaturaExiste){
            return res.status(422).json({
                message: "La asignatura no existe",
            });
        }

        //Comprobar si la asignatura y el grado estan relacionados
        var gradoAsignaturaExiste = await GradoAsignaturaService.gradoAsignaturaExiste(idGrado, idAsignatura);
        if(gradoAsignaturaExiste){
            return res.status(422).json({
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
                message: "El grado y la asignatura no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

