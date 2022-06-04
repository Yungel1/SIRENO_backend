var DepartamentoService = require('../services/departamento.services');

//Insertar departamento
exports.insertarDepartamento = async function (req,res,next){
    try{

        var idDepartamento = req.body.idDepartamento;

        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
            //Comprobar si el id del departamento existe
            if(departamentoExiste){
            return res.status(422).json({
                message: "El departamento seleccionado ya existe",
            });
        }

        var insertado = await DepartamentoService.insertarDepartamento(idDepartamento); //Insertar departamento
       
        //Comprobar si se ha insertado el departamento
        if(insertado){
            return res.status(201).json({
                message: "El departamento ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El departamento no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}