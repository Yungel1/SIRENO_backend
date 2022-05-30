var moment = require('moment');
moment().format(); 

var CampañaService = require('../services/campaña.services');

exports.insertarCampaña = async function (req,res,next){
    try{
        //Comprobar si el formato de fechas es correcto
        if(!moment(req.body.fechaIni, 'YYYY-MM-DD',true).isValid()||!moment(req.body.fechaFin, 'YYYY-MM-DD',true).isValid()){
            return res.status(422).json({
                message: "Formato de fechas incorrecto, formato de fechas: YYYY-MM-DD",
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
                message: "La campaña no ha sido insertada, compruebe que el tipo de dato sea correcto",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}