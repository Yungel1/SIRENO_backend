var CentroDepartamentoService = require('../services/centroDepartamento.services');
var CentroService = require('../services/centro.services');
var DepartamentoService = require('../services/departamento.services');

//Relacionar centro y departamento
exports.relacionarCentroDepartamento = async function (req,res,next){
    try{

        var idCentro = req.body.idCentro;
        var idDepartamento = req.body.idDepartamento;
        
        //Comprobar si el centro existe
        var centroExiste = await CentroService.centroExiste(idCentro);
        if(!centroExiste){
            return res.status(422).json({
                message: "El centro no existe",
            });
        }

        //Comprobar si el departamento existe
        var departamentoExiste = await DepartamentoService.departamentoExiste(idDepartamento);
        if(!departamentoExiste){
            return res.status(422).json({
                message: "El departamento no existe",
            });
        }

        //Comprobar si el departamento y el centro estan relacionados
        var centroDepartamentoExiste = await CentroDepartamentoService.centroDepartamentoExiste(idCentro, idDepartamento);
        if(centroDepartamentoExiste){
            return res.status(422).json({
                message: "El centro y el departamento ya estan relacionados",
            });
        }

        var relacionado = await CentroDepartamentoService.relacionarCentroDepartamento(idCentro,idDepartamento); //Relacionar centro y departamento

        //Comprobar si se han relacionado el centro y el departamento
        if(relacionado){
            return res.status(201).json({
                message: "El centro y el departamento han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El centro y  el departamento no han sido relacionadas correctamente",
            });
        }
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}


//Eliminar relacioón centro y departamento
exports.elimiarRelacionCentroDepartamento = async function (req,res,next){
    try{

        var idCentro = req.query.idCentro;
        var idDepartamento = req.query.idDepartamento;

        //Comprobar si el departamento y el centro estan relacionados
        var centroDepartamentoExiste = await CentroDepartamentoService.centroDepartamentoExiste(idCentro, idDepartamento);
        if(! centroDepartamentoExiste){
            return res.status(422).json({
                message: "El centro y el departamento no estan relacionados",
            });
        }

        var eliminado = await CentroDepartamentoService.elimiarRelacionCentroDepartamento(idCentro, idDepartamento); //Eliminar relación centro y departamento
       
        //Comprobar si se ha eliminado la relación centro y departamento
        if(eliminado){
            return res.status(201).json({
                message: "La relación centro y departamento ha sido eliminada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La relación centro y departamento no ha sido eliminada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}
