const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const port = process.env.PORT

//Routers
const registerRouter = require('./src/routes/register.routes');

// parsear peticiones content-type - application/json
app.use(express.json());
// parsear peticiones content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Ruta para gestionar el inicio de sesión y registro
app.use('/register',registerRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})