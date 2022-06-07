const db = require("../helpers/db.js");

//Insertar pregunta en la base de datos
exports.insertarPregunta = async function (tipoPreg) {

    const rows = await db.query('INSERT INTO pregunta(tipoPreg) VALUES(?)',[
        tipoPreg
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la pregunta true sino false
exports.preguntaExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM pregunta WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Eliminar pregunta en la base de datos
exports.eliminarPregunta = async function (id) {

    const rows = await db.query('DELETE FROM pregunta WHERE id=?',[
        id 
    ]);

    console.log(rows);
    if (rows.affectedRows >= 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Si la pregunta existe y el usuario tiene acceso a esa pregunta true sino false
exports.pertenecePreguntaUsuario = async function (usuario,idPregunta) {

    const row = await db.query(
        "SELECT pregunta.id FROM usuariosituacion,situacion,campañaencuesta,encuestapregunta,pregunta where usuariosituacion.usuario=? and pregunta.id=? and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and campañaencuesta.idEncuesta=encuestapregunta.idEncuesta and encuestapregunta.idPregunta=pregunta.id",[
        usuario,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}