var CampañaEncuestaService = require('../services/campañaEncuesta.services');
var EncuestaService = require('../services/encuesta.services');
var CampañaService = require('../services/campaña.services');
var helperNumeric = require('../helpers/helperNumeric');

//Relacionar campaña y encuesta
exports.relacionarCampañaEncuesta = async function (req,res,next){
    try{
        
        //Comprobar si el id de la campaña y la encuesta son números
        if(!helperNumeric.isNumeric(req.body.idCampaña)||!helperNumeric.isNumeric(req.body.idEncuesta)){
            return res.status(422).json({
                message: "Uno de los parámetros ha de ser un número y no lo es",
            });
        }

        //Comprobar si la campaña existe
        var campañaExiste = await CampañaService.campañaExiste(req.body.idCampaña);
        if(!campañaExiste){
            return res.status(422).json({
                message: "La campaña no existe",
            });
        }

        //Comprobar si la encuesta existe
        var encuestaExiste = await EncuestaService.encuestaExiste(req.body.idEncuesta);
        if(!encuestaExiste){
            return res.status(422).json({
                message: "La encuesta no existe",
            });
        }

        var relacionado = await CampañaEncuestaService.relacionarCampañaEncuesta(req.body.idCampaña,req.body.idEncuesta); //Relacionar campaña y encuesta


        //Comprobar si se han relacionado la campaña y la encuesta
        if(relacionado){
            return res.status(201).json({
                message: "La campaña y la encuesta han sido relacionadas correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La campaña y la encuesta no han sido relacionadas correctamente",
            });
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}