var UsuarioService = require('../services/usuario.services');
var DepartamentoService = require('../services/departamento.services');


//Dar el rol de administrador al usuario
exports.darRolAdmin = async function (req,res,next){
    try{

        //Comprobar si el usuario existe
        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        if(!usuarioExiste){
            return res.status(422).json({
                message: "El usuario no existe",
            });
        }

        var actualizado = await UsuarioService.darRolAdmin(req.body.usuario); //Dar rol de administrador

        //Comprobar si se ha dado el rol de administrador
        if(actualizado){
            return res.status(201).json({
                message: "Se ha proporcionado el rol de administrador",
            });
        } else{
            return res.status(422).json({
                message: "No se ha proporcionado el rol de administrador",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Actualizar rol de estudiante
exports.editarRolEstudiante = async function (req,res,next){
    try{

        //Comprobar si es integer (0 o 1) estudiante
        if(![0,1].includes(Number(req.body.estudiante))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en el campo 'estudiante'",
            });
        }

        //Comprobar si el usuario existe
        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        if(!usuarioExiste){
            return res.status(422).json({
                message: "El usuario no existe",
            });
        }

        var actualizado = await UsuarioService.editarRolEstudiante(req.body.usuario,req.body.estudiante); //Actualizar rol de estudiante

        //Comprobar si se ha actualizado el rol de estudiante
        if(actualizado){
            return res.status(201).json({
                message: "Se ha editado el rol de estudiante",
            });
        } else{
            return res.status(422).json({
                message: "No se ha editado el rol de estudiante",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

//Actualizar rol de docente
exports.editarRolDocente = async function (req,res,next){
    try{

        //Comprobar si es integer (0 o 1) docente
        if(![0,1].includes(Number(req.body.docente))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en el campo 'docente'",
            });
        }

        //Comprobar si el usuario existe
        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        if(!usuarioExiste){
            return res.status(422).json({
                message: "El usuario no existe",
            });
        }

        //Comprobar que el departamento del docente existe (si tiene rol de docente)
        if(req.body.docente == 1){
            var departamentoExiste = await DepartamentoService.departamentoExiste(req.body.idDepartamento);
            //Comprobar si el departamento existe
            if(!departamentoExiste){
                return res.status(422).json({
                    message: "El departamento no existe",
                });
            }
        }
        //Si no tiene rol docente, tampoco departamento asignado
        if(req.body.docente == 0){
            req.body.idDepartamento = null;
        }

        var actualizado = await UsuarioService.editarRolDocente(req.body.usuario,req.body.docente,req.body.idDepartamento); //Actualizar rol de docente

        //Comprobar si se ha actualizado el rol de docente
        if(actualizado){
            return res.status(201).json({
                message: "Se ha editado el rol de docente",
            });
        } else{
            return res.status(422).json({
                message: "No se ha editado el rol de docente",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}
