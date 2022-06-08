const db = require("../helpers/db.js");

//Relacionar una encuesta con una pregunta en la base de datos
exports.relacionarUsuarioSituacion = async function (usuario, idSituacion) {

    const rows = await db.query('INSERT INTO usuariosituacion(usuario, idSituacion, respondida) VALUES(?,?,?)',[
        usuario,
        idSituacion,
        false
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la relación entre un usuario y situación concretos true sino false
exports.usuarioSituacionExiste = async function (usuario,idSituacion) {

    const row = await db.query(
        "SELECT usuario,idSituacion,respondida FROM usuariosituacion WHERE usuario=? and idSituacion=?",[
        usuario,
        idSituacion
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Actualizar el campo respondida de usuariosituación en la base de datos
exports.actualizarUsuarioSituacion = async function (usuario, idSituacion,respondida) {

    const rows = await db.query('UPDATE usuariosituacion SET respondida=? WHERE usuario=? and idSituacion=?',[
        respondida,
        usuario,
        idSituacion     
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha actualizado correctamente
    } else{
        return false; //No se ha actualizado
    }

}

//Seleccionar todas las situaciones del usuario
exports.getSituacionesUsuario = async function (usuario) {

    const row = await db.query(
        "SELECT idSituacion FROM usuariosituacion WHERE usuario=?",[
        usuario,
        ]);
        
    return (row);

}

//Seleccionar todos los usuarios de la situacion
exports.getUsuariosSituacion = async function (idSituacion) {

    const row = await db.query(
        "SELECT usuario FROM usuariosituacion WHERE idSituacion=?",[
            idSituacion,
        ]);
        
    return (row);

}

//Ver si la situación a sido respondida por el usuario
exports.usuarioSituacionRespondida = async function (usuario,idSituacion) {

    const row = await db.query(
        "SELECT respondida FROM usuariosituacion WHERE usuario=? and idSituacion=?",[
        usuario,
        idSituacion
        ]);
        
    return (row[0].respondida);

}

//Borrar relación  entre un usuario-situación
exports.deleteUsuarioSituacion = async function (usuario,idSituacion) {

    const rows = await db.query(
        "DELETE FROM usuariosituacion WHERE usuario=? and idSituacion=?",[
        usuario,
        idSituacion
        ]);
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}

//Coger todas las relaciones entre usuarios y situaciones
exports.getAllUsuarioSituacion = async function () {

    const row = await db.query(
        "SELECT usuario,idSituacion,respondida FROM usuariosituacion"
        );
        

    return row;

}