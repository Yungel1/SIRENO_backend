var UsuarioService = require('../services/usuario.services');
var GrupoService = require('../services/grupo.services');
var GradoService = require('../services/grado.services');
var AsignaturaService = require('../services/asignatura.services');
var CampañaService = require('../services/campaña.services');
var SituacionService = require('../services/situacion.services');
var UsuarioSituacionService = require('../services/usuarioSituacion.services');
var HelperNumeric = require('../helpers/helperNumeric.js');

//Insertar situación
exports.insertarSituacion = async function (req,res,next){
    try{

        //Comprobar si ya existe una situación igual (a excepción del id)
        var situacionRepetida = await SituacionService.situacionRepetida(req.body.idGrado, req.body.idDocente, req.body.idGrupo, req.body.idAsignatura,req.body.idCampaña);
        //Comprobar si la situación está repetida
        if(situacionRepetida){
            return res.status(422).json({
                error: "situacion-ya-existir",
                message: "Ya hay una situación con estos parámetros",
            });
        }

        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.idDocente);
        //Comprobar si el usuario existe
        if(!usuarioExiste){
            return res.status(422).json({
                error: "usuario-existir",
                message: "El docente seleccionado no existe",
            });
        }
       
        var docenteExiste = await UsuarioService.docenteExiste(req.body.idDocente)
        //Comprobar si el id es de un docente
        if(!docenteExiste){
            return res.status(422).json({
                error: "docente-existir",
                message: "El docente seleccionado no corresponde a ningún docente existente",
            });
        }

        var grupoExiste = await GrupoService.grupoExiste(req.body.idGrupo);
         //Comprobar si el id del grupo existe
         if(!grupoExiste){
            return res.status(422).json({
                error: "grupo-existir",
                message: "El grupo seleccionado no corresponde a ningún grupo existente",
            });
        }

        var gradoExiste = await GradoService.gradoExiste(req.body.idGrado);
         //Comprobar si el id del grado existe
         if(!gradoExiste){
            return res.status(422).json({
                error: "grado-existir",
                message: "El grado seleccionado no corresponde a ningún grado existente",
            });
        }

        var asignaturaExiste = await AsignaturaService.asignaturaExiste(req.body.idAsignatura);
         //Comprobar si el id de la asignatura existe
         if(!asignaturaExiste){
            return res.status(422).json({
                error: "asignatura-existir",
                message: "La asignatura seleccionada no corresponde a ninguna asignatura existente",
            });
        }

        var idCamapñaEsInt = HelperNumeric.isNumeric(req.body.idCampaña);
        //Comprobar si el id de la campaña es un numero
        if (!idCamapñaEsInt){
            return res.status(422).json({
                error: "campaña-int",
                message: "El id de la campaña seleccionada no es un número",
            });
        }

        var campañaExiste = await CampañaService.campañaExiste(req.body.idCampaña);
         //Comprobar si el id de la campaña existe
         if(! campañaExiste){
            return res.status(422).json({
                error: "campaña-existir",
                message: "La campaña seleccionada no corresponde a ninguna campaña existente",
            });
        }

        var insertado = await SituacionService.insertarSituacion(req.body.idGrado, req.body.idDocente, req.body.idGrupo, req.body.idAsignatura,req.body.idCampaña); //Insertar situación

        //Comprobar si se ha insertado la situación
        if(insertado){
            return res.status(201).json({
                message: "La situación ha sido insertada correctamente",
            });
        } else{
            return res.status(422).json({
                error: "situacion-insertar",
                message: "La situación no ha sido insertada",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Seleccionar las campañas del la situación del usuario logeado
exports.getCampañaSituacion = async function (req,res,next){
    try{

        var idSituacion = req.query.idSituacion;
        var idUsuario = req.usuario;

        //Seleccionar las situaciones del usuario
        var getSituacionesUsuario = await UsuarioSituacionService.getSituacionesUsuario(idUsuario); 
        if(getSituacionesUsuario.length === 0){
            return res.status(422).json({
                error: "usuario-situacion-relacionar",
                message: "No tienes ninguna situación relacionada",
            });
        }

        var idSituacionEsInt = HelperNumeric.isNumeric(idSituacion);
        //Comprobar si el id de la situación es un numero
        if (!idSituacionEsInt){
            return res.status(422).json({
                error: "situacion-int",
                message: "La situación seleccionada no es un número",
            });
        }

        //Comprobar que la situación existe
        var situacionExiste = await SituacionService.situacionExiste(idSituacion); 
        if(! situacionExiste){
            return res.status(422).json({
                error: "situacion-existir",
                message: "La situación no existe",
            });
        }

        //Comprobar que la situación es del usuario logeado
        var ecnontrado = false;
        getSituacionesUsuario.forEach(situacion => {
            var tieneSituacion = (situacion.idSituacion === parseInt(idSituacion));
            if(tieneSituacion){
                ecnontrado = true;
            }
        });
        if (! ecnontrado){
            return res.status(422).json({
                error: "usuario-situacion-relacionar",
                message: "El usuario no tiene esa situación",
            });
        }

        //Ver si la situación está respondida o no
        var getSituacionesRespondidasUsuario = await UsuarioSituacionService.usuarioSituacionRespondida(idUsuario, idSituacion); 
        if(getSituacionesRespondidasUsuario){
            return res.status(422).json({
                error: "situacion-responder",
                message: "La situación seleccionada ya esta respondida",
            });
        }
       
        //Seleccionar la campaña de la situacion
        var getCampañaSituacion = await SituacionService.getCampañaSituacion(idSituacion); 
        if(getCampañaSituacion[0].idCampaña === null){
            return res.status(422).json({
                error: "situacion-campaña-relacionar",
                message: "La situación seleccionada no tiene niguna campaña",
            });
        }
        else{
            return res.status(200).json(getCampañaSituacion);
        }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Borrar situación
exports.deleteSituacion = async function (req,res,next){
    try{

        let id = req.query.id;

        //Comprobar si el id es un número
        if(!HelperNumeric.isNumeric(id)){
            return res.status(422).json({
                error: "situacion-int",
                message: "El id introducido no es un número",
            });
        }

        //Comprobar si la situación existe
        var situacionExiste = await SituacionService.situacionExiste(id);
        if(!situacionExiste){
            return res.status(422).json({
                error: "situacion-existir",
                message: "La situación no existe",
            });
        }

        var borrado = await SituacionService.deleteSituacion(id); //Borrar situación

        //Comprobar si se ha borrado la situación
        if(borrado){
            return res.status(201).json({
                message: "Se ha borrado la situación",
            });
        } else{
            return res.status(422).json({
                error: "situacion-eliminar",
                message: "No se ha borrado la situación",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Saber a que usuarios hay que enviar email dada la situación
exports.enviarEmailUsuarios = async function (req,res,next){
    try{

        var idDocente = req.query.idDocente;
        var idGrupo = req.query.idGrupo;
        var idGrado = req.query.idGrado;
        var idAsignatura = req.query.idAsignatura;
        var idCampaña = req.query.idCampaña;

        //Comprobar si ya existe una situación igual (a excepción del id)
        var idSituacion = await SituacionService.situacionRepetida(idGrado, idDocente, idGrupo, idAsignatura, idCampaña);
        if(! idSituacion){
            return res.status(422).json({
                error: "situacion-existir",
                message: "No existe ninguna situación con estos parametros",
            });
        }

        var idUsuarios = await UsuarioSituacionService.getUsuariosSituacion(idSituacion);
        var promises = [];

        async function pushUser(id){
            var usuario = await UsuarioService.getUsernameAndEmail(id);
            return usuario[0];
        }
        
        idUsuarios.forEach(idUsuario => {
            promises.push(pushUser(idUsuario.usuario).then( usuario => {
                var username = usuario.usuario;
                var email = usuario.email;
                return {username, email};
            }));
        });

        Promise.all(promises).then(values => {
            return res.status(201).json(values);
          });
        
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Conseguir todas las situaciones (solo admin)
exports.getAllSituacion = async function (req,res,next){
    try{

        var row = await SituacionService.getAllSituacion(); //Obtener todas las situaciones

        return res.status(200).json(row);

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Seleccionar las campañas para los informes
exports.getCampañaInformes = async function (req,res,next){
    try{

        var idUsuario = req.usuario;

         //Seleccionar las campañas para los informes
         var campañasInformes = await SituacionService.getCampañaInformes(idUsuario); 
         if(campañasInformes.length === 0){
             return res.status(422).json({
                 error: "campañas-informes",
                 message: "El docente no tiene ninguna campaña relacionada",
             });
         }
         else{
             return res.status(200).json(campañasInformes);
         }

    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}