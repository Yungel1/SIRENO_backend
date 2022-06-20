var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication');
var authorization = require('../middlewares/authorization');
var roles = require('../helpers/roles');

var OpcionesPreguntaController = require('../controllers/opcionesPregunta.controllers')

//Insertar opción de pregunta
router.post('/', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.insertarOpcionPregunta);

//Insertar opción de pregunta, conseguir id
router.post('/insertargetid', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.insertarOpcPregGetId);


//Coger las opcionesPregunta de la pregunta seleccionada
router.get('/getQuestionOptions', authentication, (req, res, next) => authorization(req,res,next,[roles.Todos]), OpcionesPreguntaController.getOpcionesPregunta);

//Coger las opcionesPregunta de la pregunta seleccionada
router.get('/getOptions', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.getOpciones);

//Coger los ordern de los numeros de la pregunta seleccionada
router.get('/getNumOpc', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.getNumOpcPreg);

//Eliminar opcionesPregunta
router.delete('/delete', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.eliminarOpcionesPregunta);

//Coger opcionespreguntas
router.get('/get', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador]), OpcionesPreguntaController.getOpcionesPreguntas);

//Obtener las opcPreguntas para informes
router.get('/getQuestionOptionsReports', authentication, (req, res, next) => authorization(req,res,next,[roles.Administrador, roles.Docente]), OpcionesPreguntaController.getOpcionesPreguntaInformes);

module.exports = router;