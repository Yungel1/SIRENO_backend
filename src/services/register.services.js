const db = require("../helpers/db.js");
const bcrypt = require('bcryptjs');

//Si el usuario existe en la base de datos: true, sino false
exports.usuarioExiste = async function (usuario) {

    const row = await db.query(
        "SELECT usuario FROM usuario WHERE usuario=?",
        usuario
        );
        
    if (row.length > 0) {
        return true; //El usuario ya existe, por lo tanto no se ha insertado
    } else{
        return false;
    }


}

//Registrar usuario en la base de datos
exports.registrar = async function (usuario,contraseña,email) {


    const hashPass = await bcrypt.hash(contraseña, 12);

    const rows = await db.query('INSERT INTO usuario(usuario,contraseña,email) VALUES(?,?,?)',[
        usuario,
        hashPass,
        email
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}