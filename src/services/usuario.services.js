const db = require("../helpers/db.js");

//Obtener usuario y contraseña
exports.getUsuarioContraseña = async function (usuario) {

    const row = await db.query(
        "SELECT usuario,contraseña FROM Usuario WHERE usuario=?",
        usuario
        );

    return row
}

//UsuarioExiste
exports.usuarioExiste = async function (usuario) {

    const row = await db.query(
        "SELECT usuario FROM Usuario WHERE usuario=?",
        usuario
        );
        
    if (row.length > 0) {
        return true; //El usuario existe
    } else{
        return false;
    }


}