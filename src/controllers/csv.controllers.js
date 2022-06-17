var UsuarioService = require('../services/usuario.services');
var UsuarioSituacionService = require('../services/usuarioSituacion.services');
var SituacionService = require('../services/situacion.services');
var GradoService = require('../services/grado.services');
var GrupoService = require('../services/grupo.services');
var AsignaturaService = require('../services/asignatura.services');
var CampañaService = require('../services/campaña.services');

var helperNumeric = require('../helpers/helperNumeric');
const csv = require('csv-parser');
const fs = require('fs');


//Procesar csv
exports.procesarCSV = async function (req,res,next){
    try{

        let files = req['files'];
        if(!files){
            return res.status(422).json({
                error: "csv-estar",
                message: "No se ha insertado ningún archivo .csv",
            });
        }

        let file = files.csv;
        if(file.mimetype!='text/csv'){
            return res.status(422).json({
                error: "csv-ser",
                message: "El archivo insertado no es un .csv",
            });
        }

        let path = __dirname + "/../files/" + file.name;

        await file.mv(path, (err) => {
            if (err) {
              return res.status(500).json({
                error: "csv-guardar",
                message: "No se ha podido guardar el archivo .csv",
            });
            }
        });

        const readStream = fs.createReadStream(path)
        .pipe(csv())

        let rows = [];
        let i = 0;

        for await (const row of readStream) {

            i++;
            let usuario = row.usuario;
            let idGrado = row.grado;
            let idDocente = row.docente;
            let idGrupo = row.grupo;
            let idAsignatura = row.asignatura;
            let idCampaña = row.campaña;

            var usuarioExiste = await UsuarioService.usuarioExiste(idDocente);
            //Comprobar si el usuario existe
            if(!usuarioExiste){
                return res.status(422).json({
                    error: "usuario-existir",
                    message: "El docente seleccionado no existe",
                    row: row,
                    linea: i
                });
            }
        
            var docenteExiste = await UsuarioService.docenteExiste(idDocente)
            //Comprobar si el id es de un docente
            if(!docenteExiste){
                return res.status(422).json({
                    error: "docente-existir",
                    message: "El docente seleccionado no corresponde a ningún docente existente",
                    row: row,
                    linea: i
                });
            }

            var grupoExiste = await GrupoService.grupoExiste(idGrupo);
            //Comprobar si el id del grupo existe
            if(!grupoExiste){
                return res.status(422).json({
                    error: "grupo-existir",
                    message: "El grupo seleccionado no corresponde a ningún grupo existente",
                    row: row,
                    linea: i
                });
            }

            var gradoExiste = await GradoService.gradoExiste(idGrado);
            //Comprobar si el id del grado existe
            if(!gradoExiste){
                return res.status(422).json({
                    error: "grado-existir",
                    message: "El grado seleccionado no corresponde a ningún grado existente",
                    row: row,
                    linea: i
                });
            }

            var asignaturaExiste = await AsignaturaService.asignaturaExiste(idAsignatura);
            //Comprobar si el id de la asignatura existe
            if(!asignaturaExiste){
                return res.status(422).json({
                    error: "asignatura-existir",
                    message: "La asignatura seleccionada no corresponde a ninguna asignatura existente",
                    row: row,
                    linea: i
                });
            }

            var idCamapñaEsInt = helperNumeric.isNumeric(idCampaña);
            //Comprobar si el id de la campaña es un numero
            if (!idCamapñaEsInt){
                return res.status(422).json({
                    error: "campaña-int",
                    message: "El id de la campaña seleccionada no es un número",
                    row: row,
                    linea: i
                });
            }

            var campañaExiste = await CampañaService.campañaExiste(idCampaña);
            //Comprobar si el id de la campaña existe
            if(!campañaExiste){
                return res.status(422).json({
                    error: "campaña-existir",
                    message: "La campaña seleccionada no corresponde a ninguna campaña existente",
                    row: row,
                    linea: i
                });
            }

            //Comprobar si el usuario existe
            var usuarioExiste = await UsuarioService.usuarioExiste(usuario);
            if(!usuarioExiste){
                return res.status(422).json({
                    error: "usuario-existir",
                    message: "El usuario no existe",
                    row: row,
                    linea: i
                });
            }

            rows.push(row);
        }

        let row;
        let idSituacion;

        for (var j = 0; j < rows.length; j++) {

            row = rows[j];

            //Comprobar si ya existe una situación igual (a excepción del id)
            var situacion = await SituacionService.getSituacionId(row.grado, row.docente, row.grupo, row.asignatura,row.campaña);
            //Comprobar si la situación está repetida
            if(situacion==null){

                idSituacion = await SituacionService.insertarSituacionGetId(row.grado, row.docente, row.grupo, row.asignatura,row.campaña); //Insertar situación
                //Comprobar si se ha insertado la situación
                if(!idSituacion){
                    return res.status(422).json({
                        error: "situacion-insertar",
                        message: "La situación no ha sido insertada",
                    });
                }
            
            } else{
                idSituacion = situacion.id;
            }

            var usuarioSituacionExiste = await UsuarioSituacionService.usuarioSituacionExiste(row.usuario,idSituacion);
            //Comprobar si la relación entre un usuario y una situación concretos existe
            if(!usuarioSituacionExiste){
                var relacionado = await UsuarioSituacionService.relacionarUsuarioSituacion(row.usuario,idSituacion); //Relacionar usuario y situación
                //Comprobar si se han relacionado el usuario y la situación
                if(!relacionado){
                    return res.status(422).json({
                        error: "usuario-situacion-relacionar",
                        message: "El usuario y la situación no han sido relacionadas correctamente",
                    });
                }
            }
            
        }
        
        return res.status(200).json("Se han insertado todas las entradas correctamente");


    } catch(err){
        console.log(err);
        return res.sendStatus(500) && next(err);
    }
}

async function procesar(i,row){
    
}