const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = process.env.PORT

//Routers
const registerRouter = require('./src/routes/register.routes');
const loginRouter = require('./src/routes/login.routes');
const campañaRouter = require('./src/routes/campaña.routes');
const preguntaRouter = require('./src/routes/pregunta.routes');
const encuestaRouter = require('./src/routes/encuesta.routes');
const textoRouter = require('./src/routes/texto.routes');
const idiomaRouter = require('./src/routes/idioma.routes');
const opcionesPreguntaRouter = require('./src/routes/opcionesPregunta.routes');
const campañaEncuestaRouter = require('./src/routes/campañaEncuesta.routes');
const encuestaPreguntaRouter = require('./src/routes/encuestaPregunta.routes');
const activacionRouter = require('./src/routes/activacion.routes');
const situacionRouter = require('./src/routes/situacion.routes');
const usuarioSituacionRouter = require('./src/routes/usuarioSituacion.routes');
const respuestaRouter = require('./src/routes/respuesta.routes');
const usuarioRouter = require('./src/routes/usuario.routes');
const grupoRouter = require('./src/routes/grupo.routes');
const gradoRouter = require('./src/routes/grado.routes');
const centroRouter = require('./src/routes/centro.routes');
const departamentoRouter = require('./src/routes/departamento.routes');
const asignaturaRouter = require('./src/routes/asignatura.routes');
const gradoAsignaturaRouter = require('./src/routes/gradoAsignatura.routes');
const centroDepartamentoRouter = require('./src/routes/centroDepartamento.routes');

// parsear peticiones content-type - application/json
app.use(express.json());
// parsear peticiones content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Ruta para gestionar el registro
app.use('/register',registerRouter);

//Ruta para gestionar el inicio de sesión
app.use('/login',loginRouter);

//Ruta para gestionar campañas
app.use('/campana',campañaRouter);

//Ruta para gestionar preguntas
app.use('/pregunta',preguntaRouter);

//Ruta para gestionar encuestas
app.use('/encuesta',encuestaRouter);

//Ruta para gestionar textos
app.use('/texto',textoRouter);

//Ruta para gestionar idiomas
app.use('/idioma',idiomaRouter);

//Ruta para gestionar opciones de pregunta
app.use('/opcionespregunta',opcionesPreguntaRouter);

//Ruta para gestionar relación de campañas y encuestas
app.use('/campanaencuesta',campañaEncuestaRouter);

//Ruta para gestionar relación de encuestas y preguntas
app.use('/encuestapregunta',encuestaPreguntaRouter);

//Ruta para gestionar activaciones
app.use('/activacion',activacionRouter);

//Ruta para gestionar situaciones docente
app.use('/situacion',situacionRouter);

//Ruta para gestionar relación de usuarios y situaciones
app.use('/usuariosituacion',usuarioSituacionRouter);

//Ruta para gestionar respuestas
app.use('/respuesta',respuestaRouter);

//Ruta para gestionar usuarios
app.use('/usuario',usuarioRouter);

//Ruta para gestionar grupos
app.use('/grupo',grupoRouter);

//Ruta para gestionar grados
app.use('/grado',gradoRouter);

//Ruta para gestionar centros
app.use('/centro',centroRouter);

//Ruta para gestionar departamentos
app.use('/departamento',departamentoRouter);

//Ruta para gestionar asignatura
app.use('/asignatura',asignaturaRouter);

//Ruta para gestionar relación de grados y asignaturas
app.use('/gradoasignatura',gradoAsignaturaRouter);

//Ruta para gestionar relación de centro y departamento
app.use('/centrodepartamento',centroDepartamentoRouter);

app.listen(port, () => {
  console.log(`Sireno listening on port ${port}`)
})