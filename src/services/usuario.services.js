const db = require("../helpers/db.js");

//Obtener usuario y contraseña
exports.getUsuarioContraseña = async function (usuario) {

    const row = await db.query(
        "SELECT usuario,contraseña FROM usuario WHERE usuario=?",
        usuario
        );

    return row
}

//UsuarioExiste
exports.usuarioExiste = async function (usuario) {

    const row = await db.query(
        "SELECT usuario FROM usuario WHERE usuario=?",
        usuario
        );
        
    if (row.length > 0) {
        return true; //El usuario existe
    } else{
        return false;
    }

}


//EmailExiste
exports.emailExiste = async function (email) {

    const row = await db.query(
        "SELECT email FROM usuario WHERE email=?",
        email
        );
        
    if (row.length > 0) {
        return true; //El email existe
    } else{
        return false;
    }

}

//Obtener usuario
exports.getUsuario = async function (usuario) {

    const row = await db.query(
        "SELECT usuario FROM usuario WHERE usuario=?",
        usuario
        );
        
    if(row.length > 0){
        return row[0].usuario;
    } else{
        return null;
    }

}

//Obtener roles de usuario
exports.getRoles = async function (usuario) {

    const row = await db.query(
        "SELECT estudiante,docente,administrador FROM usuario WHERE usuario=?",
        usuario
        );
        
        return row;

}