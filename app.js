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
const activacionRouter = require('./src/routes/activacion.routes');

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

//Ruta para gestionar activaciones
app.use('/activacion',activacionRouter);

app.listen(port, () => {
  console.log(`Sireno listening on port ${port}`)
})