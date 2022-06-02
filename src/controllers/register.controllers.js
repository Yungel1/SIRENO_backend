var RegisterService = require('../services/register.services');
var UsuarioService = require('../services/usuario.services');
var DepartamentoService = require('../services/departamento.services');
const { validationResult } = require('express-validator');

//Registrar usuario si no existe en la base de datos
exports.registrarUsuario = async function (req, res, next) {

    //Mirar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

        var usuarioExiste = await UsuarioService.usuarioExiste(req.body.usuario);
        //Comprobar si el usuario existe
        if(usuarioExiste){
            return res.status(201).json({
                message: "El usuario ya está en uso",
            });
        }

        var emailExiste = await UsuarioService.emailExiste(req.body.email);
        //Comprobar si el usuario existe
        if(emailExiste){
            return res.status(201).json({
                message: "El email ya está en uso",
            });
        }

        //Si no se pasan los roles en el req, se ponen a 0 (false)
        if(req.body.estudiante==null) req.body.estudiante = 0;
        if(req.body.docente==null) req.body.docente = 0;
        if(req.body.administrador==null) req.body.administrador = 0;

        //Comprobar si son integer (0 o 1) anonima y con_registro
        if(![0,1].includes(Number(req.body.estudiante))||![0,1].includes(Number(req.body.docente))||![0,1].includes(Number(req.body.administrador))){
            return res.status(422).json({
                message: "No ha insertado un valor entre 0 y 1 en los campos correspondientes",
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
        
        var registrado = await RegisterService.registrar(req.body.usuario,req.body.contraseña,req.body.email,req.body.estudiante,req.body.docente,req.body.administrador,req.body.idDepartamento); //Registrar usuario

        //Comprobar si se ha registrado
        if(registrado){
            return res.status(201).json({
                message: "El usuario ha sido insertado correctamente",
            });
        } else{
            return res.status(422).json({
                message: "El usuario no ha sido insertado",
            });
        }
    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}