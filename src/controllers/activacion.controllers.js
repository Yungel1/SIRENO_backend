var moment = require('moment');
moment().format(); 

var UsuarioService = require('../services/usuario.services');
var GrupoService = require('../services/grupo.services');
var GradoService = require('../services/grado.services');
var AsignaturaService = require('../services/asignatura.services');
var CampañaService = require('../services/campaña.services');
var ActivacionService = require('../services/activacion.services');
var HelperNumeric = require('../helpers/helperNumeric.js');

//Insertar activacion
exports.insertarActivacion = async function (req,res,next){
    try{

        var idDocente = req.body.idDocente;
        var idGrupo = req.body.idGrupo;
        var idGrado = req.body.idGrado;
        var idAsignatura = req.body.idAsignatura;
        var idCampaña = req.body.idCampaña;
        var fechaActIni = req.body.fechaActIni;
        var fechaActFin = req.body.fechaActFin;


        var activacionExiste = await ActivacionService.activacionExiste(idDocente, idGrupo, idGrado, idAsignatura, idCampaña);
        //Comprobar si la activacion existe
        if(activacionExiste){
            return res.status(422).json({
                message: "La activación que se intenta crear ya existe",
            });
        }

        var usuarioExiste = await UsuarioService.usuarioExiste(idDocente);
        //Comprobar si el usuario existe
        if(! usuarioExiste){
            return res.status(422).json({
                message: "El docente seleccionado no existe",
            });
        }
       
        var docenteExiste = await UsuarioService.docenteExiste(idDocente)
        //Comprobar si el id es de un docente
        if(! docenteExiste){
            return res.status(422).json({
                message: "El docente seleccionado no corresponde a ningún docente existente",
            });
        }

        var grupoExiste = await GrupoService.grupoExiste(idGrupo);
         //Comprobar si el id del grupo existe
         if(! grupoExiste){
            return res.status(422).json({
                message: "El grupo seleccionado no corresponde a ningún grupo existente",
            });
        }

        var gradoExiste = await GradoService.gradoExiste(idGrado);
         //Comprobar si el id del grado existe
         if(! gradoExiste){
            return res.status(422).json({
                message: "El grado seleccionado no corresponde a ningún grado existente",
            });
        }

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
         //Comprobar si el id de la asignatura existe
         if(! asignaturaExiste){
            return res.status(422).json({
                message: "La asignatura seleccionada no corresponde a ninguna asignatura existente",
            });
        }

        var idCamapñaEsInt = HelperNumeric.isNumeric(idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                message: "La campaña seleccionada no es un número",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(idCampaña);
         //Comprobar si el id de la campaña existe
         if(! campañaExiste){
            return res.status(422).json({
                message: "La campaña seleccionada no corresponde a ninguna campaña existente",
            });
        }

        var noFechaValida = (!moment(fechaActIni, 'YYYY-MM-DD',true).isValid() || !moment(fechaActFin, 'YYYY-MM-DD',true).isValid());
         //Comprobar si el formato de fechas es correcto
         if(noFechaValida){
            return res.status(422).json({
                message: "Formato de fechas incorrecto, formato de fechas: YYYY-MM-DD",
            });
        }

        if (fechaActFin <=  fechaActIni){
            return res.status(422).json({
                message: "La fecha final debe ser mínimo un día mas tarde que la incial",
            });
        }

        var insertado = await ActivacionService.insertarActivacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, fechaActIni, fechaActFin); //Insertar activación

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


//Actualizar activacion
exports.actualizarActivacion = async function (req,res,next){
    try{

        var idDocente = req.body.idDocente;
        var idGrupo = req.body.idGrupo;
        var idGrado = req.body.idGrado;
        var idAsignatura = req.body.idAsignatura;
        var idCampaña = req.body.idCampaña;
        var fechaActIni = req.body.fechaActIni;
        var fechaActFin = req.body.fechaActFin;

        var activacionExiste = await ActivacionService.activacionExiste(idDocente, idGrupo, idGrado, idAsignatura, idCampaña);
        //Comprobar si la activacion existe
        if(!activacionExiste){
            return res.status(422).json({
                message: "La activación que se intenta actualizar no existe",
            });
        }

        var noFechaValida = (!moment(fechaActIni, 'YYYY-MM-DD',true).isValid() || !moment(fechaActFin, 'YYYY-MM-DD',true).isValid());
         //Comprobar si el formato de fechas es correcto
         if(noFechaValida){
            return res.status(422).json({
                message: "Formato de fechas incorrecto, formato de fechas: YYYY-MM-DD",
            });
        }

        if (fechaActFin <=  fechaActIni){
            return res.status(422).json({
                message: "La fecha final debe ser mínimo un día mas tarde que la incial",
            });
        }

        var actualizado = await ActivacionService.actualizarActivacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, fechaActIni, fechaActFin); //Insertar activación

        //Comprobar si se ha actualizado la activacion
        if(actualizado){
            return res.status(201).json({
                message: "La activación ha sido actualizada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La activación no ha sido actualizada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Activar activacion admin
exports.activarActivacionAdmin = async function (req,res,next){
    try{

        var idDocente = req.body.idDocente;
        var idGrupo = req.body.idGrupo;
        var idGrado = req.body.idGrado;
        var idAsignatura = req.body.idAsignatura;
        var idCampaña = req.body.idCampaña;
        var activado = req.body.activado;

        var activacionExiste = await ActivacionService.activacionExiste(idDocente, idGrupo, idGrado, idAsignatura, idCampaña);
        //Comprobar si la activacion existe
        if(!activacionExiste){
            return res.status(422).json({
                message: "La activación que se intenta activar no existe",
            });
        }

        var activadoEsCeroOUno = ([0,1].includes(Number(activado)));
        //Comprobar si son integer (0 o 1) false y true
        if(!activadoEsCeroOUno){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en los campos correspondientes",
            });
        }

        var actualizado = await ActivacionService.activarActivacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, activado); //Activar la activación

        //Comprobar si se ha actualizado la activacion
        if(actualizado){
            return res.status(201).json({
                message: "La activación ha sido activada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La activación no ha sido activada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Activar activacion docente
exports.activarActivacionDocente = async function (req,res,next){
    try{

        var idDocente = req.usuario;
        var idGrupo = req.body.idGrupo;
        var idGrado = req.body.idGrado;
        var idAsignatura = req.body.idAsignatura;
        var idCampaña = req.body.idCampaña;
        var activado = req.body.activado;

        var docenteExiste = await UsuarioService.docenteExiste(idDocente)
        //Comprobar si el id es de un docente
        if(! docenteExiste){
            return res.status(422).json({
                message: "El usuario con el ha iniciado sesión no corresponde a ningún docente.",
            });
        }

        var activacionExiste = await ActivacionService.activacionExiste(idDocente, idGrupo, idGrado, idAsignatura, idCampaña);
        //Comprobar si la activacion existe
        if(!activacionExiste){
            return res.status(422).json({
                message: "La activación que se intenta activar no existe",
            });
        }
        
        var activadoEsCeroOUno = ([0,1].includes(Number(activado)));
        //Comprobar si son integer (0 o 1) false y true
        if(!activadoEsCeroOUno){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en los campos correspondientes",
            });
        }

        var actualizado = await ActivacionService.activarActivacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, activado); //Activar la activación

        //Comprobar si se ha actualizado la activacion
        if(actualizado){
            return res.status(201).json({
                message: "La activación ha sido activada correctamente",
            });
        } else{
            return res.status(422).json({
                message: "La activación no ha sido activada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

