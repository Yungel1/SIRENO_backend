var IdiomaService = require('../services/idioma.services');

//Insertar idioma
exports.insertarIdioma = async function (req,res,next){
    try{

        var insertado = await IdiomaService.insertarIdioma(req.body.nombre); //Insertar idioma
       
        //Comprobar si se ha insertado el idioma
        if(insertado){
            return res.status(201).json({
                message: "El idioma ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El idioma no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}