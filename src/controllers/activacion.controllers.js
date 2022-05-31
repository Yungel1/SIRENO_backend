var moment = require('moment');
moment().format(); 

var UsuarioService = require('../services/usuario.services');
var GrupoService = require('../services/grupo.services');
var GradoService = require('../services/grado.services');
var AsignaturaService = require('../services/asignatura.services');
var CampañaService = require('../services/campaña.services');
var ActivacionService = require('../services/activacion.services');

//Insertar activacion
exports.insertarActivacion = async function (req,res,next){
    try{

        var activacionExiste = await ActivacionService.activacionExiste(req.body.docente, req.body.grupo, req.body.grado, req.body.asignatura, req.body.campaña);
        //Comprobar si la activacion existe
        if(activacionExiste){
            return res.status(201).json({
                message: "La activación que se intenta crear ya existe",
            });
        }

        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.docente);
        //Comprobar si el usuario existe
        if(! usuarioExiste){
            return res.status(201).json({
                message: "El docente seleccionado no existe",
            });
        }
       
        var docenteExiste = await UsuarioService.docenteExiste(req.body.docente)
        //Comprobar si el id es de un docente
        if(! docenteExiste){
            return res.status(422).json({
                message: "El docente seleccionado no corresponde a ningún docente existente",
            });
        }

        var grupoExiste = await GrupoService.grupoExiste(req.body.grupo);
         //Comprobar si el id del grupo existe
         if(! grupoExiste){
            return res.status(422).json({
                message: "El grupo seleccionado no corresponde a ningún grupo existente",
            });
        }

        var gradoExiste = await GradoService.gradoExiste(req.body.grado);
         //Comprobar si el id del grado existe
         if(! gradoExiste){
            return res.status(422).json({
                message: "El grado seleccionado no corresponde a ningún grado existente",
            });
        }

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(req.body.asignatura);
         //Comprobar si el id del asignatura existe
         if(! asignaturaExiste){
            return res.status(422).json({
                message: "La asignatura seleccionada no corresponde a ninguna asignatura existente",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(req.body.campaña);
         //Comprobar si el id del campaña existe
         if(! campañaExiste){
            return res.status(422).json({
                message: "La campaña seleccionada no corresponde a ninguna campaña existente",
            });
        }

        var noFechaValida = (!moment(req.body.fechaActIni, 'YYYY-MM-DD',true).isValid() || !moment(req.body.fechaActFin, 'YYYY-MM-DD',true).isValid());
         //Comprobar si el formato de fechas es correcto
         if(noFechaValida){
            return res.status(422).json({
                message: "Formato de fechas incorrecto, formato de fechas: YYYY-MM-DD",
            });
        }

        if (req.body.fechaActFin <=  req.body.fechaActIni){
            return res.status(422).json({
                message: "La fecha final debe ser mínimo un día mas tarde que la incial",
            });
        }

        var insertado = await ActivacionService.insertarActivacion(req.body.docente, req.body.grupo, req.body.grado, req.body.asignatura, req.body.campaña, req.body.fechaActIni, req.body.fechaActFin); //Insertar actibación

        //Comprobar si se ha insertado la activacion
        if(insertado){
            return res.status(201).json({
                message: "La activación ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La activación no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}