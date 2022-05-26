const db = require("../helpers/db.js");
const bcrypt = require('bcryptjs');

//Si el usuario existe en la base de datos: true, sino false
exports.usuarioExiste = async function (usuario) {

    const row = await db.query(
        "SELECT usuario FROM Usuario WHERE usuario=?",
        usuario
        );
        
    if (row.length > 0) {
        return true; //El usuario ya existe, por lo tanto no se ha insertado
    } else{
        return false;
    }


}

exports.registrar = async function (usuario,contraseña) {


    const hashPass = await bcrypt.hash(contraseña, 12);

    const rows = await db.query('INSERT INTO Usuario(usuario,contraseña) VALUES(?,?)',[
        usuario,
        hashPass
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{