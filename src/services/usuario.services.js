const db = require("../helpers/db.js");

//Obtener usuario y contraseña
exports.getUsuarioContraseña = async function (usuario) {

    const row = await db.query(
        "SELECT usuario,contraseña FROM usuario WHERE usuario=?",
        usuario
        );

    return row
}

//Obtener usuario y email
exports.getUsernameAndEmail = async function (usuario) {

    const row = await db.query(
        "SELECT usuario,email FROM usuario WHERE usuario=?",
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

//Docente existe
exports.docenteExiste  = async function (docente) {

    const row = await db.query(
        "SELECT usuario FROM usuario WHERE usuario=? and docente=1",
        docente
        );
        
    if (row.length > 0) {
        return true; //El docente existe
    } else{
        return false;
    }
}

//Dar rol de administrador a un usuario
exports.darRolAdmin = async function (usuario) {

    const rows = await db.query('UPDATE usuario SET administrador=? WHERE usuario=?',[
        true,
        usuario,    
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha actualizado correctamente
    } else{
        return false; //No se ha actualizado
    }

}

//Editar rol de estudiante a un usuario
exports.editarRolEstudiante = async function (usuario,estudiante) {

    const rows = await db.query('UPDATE usuario SET estudiante=? WHERE usuario=?',[
        estudiante,
        usuario,    
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha actualizado correctamente
    } else{
        return false; //No se ha actualizado
    }

}

//Editar rol de docente a un usuario
exports.editarRolDocente = async function (usuario,docente,idDepartamento) {

    const rows = await db.query('UPDATE usuario SET docente=?,idDepartamento=? WHERE usuario=?',[
        docente,
        idDepartamento,
        usuario,    
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha actualizado correctamente
    } else{
        return false; //No se ha actualizado
    }

}

//Borrar usuario
exports.deleteUsuario = async function (usuario) {

    const rows = await db.query(
        "DELETE FROM usuario WHERE usuario=?",
        usuario
        );
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}