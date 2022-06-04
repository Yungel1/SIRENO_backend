var GrupoService = require('../services/grupo.services');

//Insertar grupo
exports.insertarGrupo = async function (req,res,next){
    try{

        var idGrupo = req.body.idGrupo;

        var grupoExiste = await GrupoService.grupoExiste(idGrupo);
        //Comprobar si el id del grupo existe
        if(grupoExiste){
           return res.status(422).json({
               message: "El grupo seleccionado ya existe",
           });
       }

        var insertado = await GrupoService.insertarGrupo(idGrupo); //Insertar grupo
       
        //Comprobar si se ha insertado el grupo
        if(insertado){
            return res.status(201).json({
                message: "El grupo ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El grupo no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}