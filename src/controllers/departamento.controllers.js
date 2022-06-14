var DepartamentoService = require('../services/departamento.services');

//Insertar departamento
exports.insertarDepartamento = async function (req,res,next){
    try{

        var idDepartamento = req.body.idDepartamento;

        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
            //Comprobar si el id del departamento existe
            if(departamentoExiste){
            return res.status(422).json({
                error: "departamento-existe",
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
                error: "departamento-insertar",
                message: "El departamento no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Eliminar departamento
exports.eliminarDepartamento = async function (req,res,next){
    try{

        var idDepartamento = req.query.idDepartamento;

        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
        //Comprobar si el id del departamento existe
        if(!departamentoExiste){
           return res.status(422).json({
               error: "departamento-existir",
               message: "El departamento seleccionado no existe",
           });
       }

        var eliminado = await DepartamentoService.eliminarDepartamento(idDepartamento); //Eliminar departamento
       
        //Comprobar si se ha eliminado el departamento
        if(eliminado){
            return res.status(201).json({
                message: "El departamento ha sido eliminado correctamente",
            });
        } else{
            return res.status(422).json({
                error: "departamento-eliminar",
                message: "El departamento no ha sido eliminado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Coger departamentos
exports.getDepartamentos = async function (req,res,next){
    try{

        var departamentos = await DepartamentoService.getDepartamentos(); //Coger todos las departamentos
       
        //Comprobar si se han cogido los departamentos
        if(departamentos){
            return res.status(201).json({departamentos});
        } else{
            return res.status(422).json({
                error: "departamento-coger",
                message: "No se han podido coger las departamentos",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}