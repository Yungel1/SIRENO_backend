var AsignaturaService = require('../services/asignatura.services');
var DepartamentoService = require('../services/departamento.services');

//Insertar asignatura
exports.insertarAsignatura = async function (req,res,next){
    try{

        var idAsignatura = req.body.id;
        var idDepartamento = req.body.idDepartamento;

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
            //Comprobar si el id de la asignatura existe
            if(asignaturaExiste){
            return res.status(422).json({
                error: "asignatura-existir",
                message: "La asignatura seleccionada ya existe",
            });
        }

        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
        //Comprobar si el id del departamento existe
        if(! departamentoExiste){
        return res.status(422).json({
            error: "departamento-existir",
            message: "El departamento seleccionado no existe",
        });
    }

        var insertado = await AsignaturaService.insertarAsignatura(idAsignatura, idDepartamento); //Insertar asignatura
       
        //Comprobar si se ha insertado la asignatura
        if(insertado){
            return res.status(201).json({
                message: "La asignatura ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "asignatura-insertar",
                message: "La asignatura no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar asignatura
exports.eliminarAsignatura = async function (req,res,next){
    try{

        var idAsignatura = req.query.idAsignatura;

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
        //Comprobar si el id de la asignatura existe
        if(!asignaturaExiste){
           return res.status(422).json({
                error: "asignatura-existir",
               message: "El asignatura seleccionado no existe",
           });
       }

        var eliminado = await AsignaturaService.eliminarAsignatura(idAsignatura); //Eliminar asignatura
       
        //Comprobar si se ha eliminado la asignatura
        if(eliminado){
            return res.status(201).json({
                message: "La asignatura ha sido eliminada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "asignatura-eliminar",
                message: "La asignatura no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger asignaturas
exports.getAsignaturas = async function (req,res,next){
    try{

        var asignaturas = await AsignaturaService.getAsignaturas(); //Coger todos las asignaturas
       
        //Comprobar si se han cogido los asignaturas
        if(asignaturas){
            return res.status(201).json({asignaturas});
        } else{
            return res.status(422).json({
                message: "No se han podido coger las asignaturas",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}