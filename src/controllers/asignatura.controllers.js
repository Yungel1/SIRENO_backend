var AsignaturaService = require('../services/asignatura.services');
var DepartamentoService = require('../services/departamento.services');

//Insertar asignatura
exports.insertarAsignatura = async function (req,res,next){
    try{

        var idAsignatura = req.body.idAsignatura;
        var idDepartamento = req.body.idDepartamento;

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
            //Comprobar si el id de la asignatura existe
            if(asignaturaExiste){
            return res.status(422).json({
                message: "La asignatura seleccionada ya existe",
            });
        }

        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
        //Comprobar si el id del departamento existe
        if(! departamentoExiste){
        return res.status(422).json({
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
                message: "La asignatura no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}