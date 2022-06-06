var moment = require('moment');
moment().format(); 

var CampañaService = require('../services/campaña.services');
var helperNumeric = require('../helpers/helperNumeric');

//Insertar campaña
exports.insertarCampaña = async function (req,res,next){
    try{
        //Comprobar si el formato de fechas es correcto
        if(!moment(req.body.fechaIni, 'YYYY-MM-DD',true).isValid()||!moment(req.body.fechaFin, 'YYYY-MM-DD',true).isValid()){
            return res.status(422).json({
                message: "Formato de fechas incorrecto, formato de fechas: YYYY-MM-DD",
            });
        }

        //Comprobar que la fecha fin es posterior a la fecha inicial
        if (req.body.fechaFin <=  req.body.fechaIni){
            return res.status(422).json({
                message: "La fecha final debe ser mínimo un día mas tarde que la incial",
            });
        }

        //Comprobar si son integer (0 o 1) anonima y con_registro
        if(![0,1].includes(Number(req.body.anonima))||![0,1].includes(Number(req.body.con_registro))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en los campos correspondientes",
            });
        }

        var insertado = await CampañaService.insertarCampaña(req.body.fechaIni,req.body.fechaFin,req.body.descripcion,req.body.anonima,req.body.con_registro); //Insertar campaña

        //Comprobar si se ha insertado la campaña
        if(insertado){
            return res.status(201).json({
                message: "La campaña ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La campaña no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar campaña
exports.deleteCampaña = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!helperNumeric.isNumeric(id)){
            return res.status(422).json({
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si la campaña existe
        var campañaExiste = await CampañaService.campañaExiste(id);
        if(!campañaExiste){
            return res.status(422).json({
                message: "La campaña no existe",
            });
        }

        var borrado = await CampañaService.deleteCampaña(id); //Borrar campaña

        //Comprobar si se ha borrado la campaña
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la campaña",
            });
        } else{
            return res.status(422).json({
                message: "No se ha borrado la campaña",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}