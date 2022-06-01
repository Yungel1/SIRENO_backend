var UsuarioService = require('../services/usuario.services');
var GrupoService = require('../services/grupo.services');
var GradoService = require('../services/grado.services');
var AsignaturaService = require('../services/asignatura.services');
var CampañaService = require('../services/campaña.services');
var SituacionService = require('../services/situacion.services');
var HelperNumeric = require('../helpers/helperNumeric.js');

//Insertar situación
exports.insertarSituacion = async function (req,res,next){
    try{

        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.idDocente);
        //Comprobar si el usuario existe
        if(!usuarioExiste){
            return res.status(201).json({
                message: "El docente seleccionado no existe",
            });
        }
       
        var docenteExiste = await UsuarioService.docenteExiste(req.body.idDocente)
        //Comprobar si el id es de un docente
        if(!docenteExiste){
            return res.status(422).json({
                message: "El docente seleccionado no corresponde a ningún docente existente",
            });
        }

        var grupoExiste = await GrupoService.grupoExiste(req.body.idGrupo);
         //Comprobar si el id del grupo existe
         if(!grupoExiste){
            return res.status(422).json({
                message: "El grupo seleccionado no corresponde a ningún grupo existente",
            });
        }

        var gradoExiste = await GradoService.gradoExiste(req.body.idGrado);
         //Comprobar si el id del grado existe
         if(!gradoExiste){
            return res.status(422).json({
                message: "El grado seleccionado no corresponde a ningún grado existente",
            });
        }

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(req.body.idAsignatura);
         //Comprobar si el id de la asignatura existe
         if(!asignaturaExiste){
            return res.status(422).json({
                message: "La asignatura seleccionada no corresponde a ninguna asignatura existente",
            });
        }

        var idCamapñaEsInt = HelperNumeric.isNumeric(req.body.idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                message: "El id de la campaña seleccionada no es un número",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(req.body.idCampaña);
         //Comprobar si el id de la campaña existe
         if(! campañaExiste){
            return res.status(422).json({
                message: "La campaña seleccionada no corresponde a ninguna campaña existente",
            });
        }

        var insertado = await SituacionService.insertarSituacion(req.body.idGrado, req.body.idDocente, req.body.idGrupo, req.body.idAsignatura); //Insertar situación

        //Comprobar si se ha insertado la situación
        if(insertado){
            return res.status(201).json({
                message: "La situación ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La situación no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}