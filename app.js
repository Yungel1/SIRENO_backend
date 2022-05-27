const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = process.env.PORT

//Routers
const registerRouter = require('./src/routes/register.routes');
const loginRouter = require('./src/routes/login.routes');

// parsear peticiones content-type - application/json
app.use(express.json());
// parsear peticiones content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Ruta para gestionar el registro
app.use('/register',registerRouter);

//Ruta para gestionar el inicio de sesión
app.use('/login',loginRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})