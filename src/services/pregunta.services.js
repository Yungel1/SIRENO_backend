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

    if (rows.affectedRows >= 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todos los preguntas
exports.getPreguntas  = async function () {

    const row = await db.query(
        "SELECT * FROM pregunta",
        );
        
    return row;
}
//Si la pregunta existe y el usuario tiene acceso a esa pregunta true sino false
exports.pertenecePreguntaUsuario = async function (usuario,idPregunta) {

    const row = await db.query(
        "SELECT pregunta.id FROM usuariosituacion,situacion,campañaencuesta,encuestapregunta,pregunta,activacion where usuariosituacion.usuario=? and pregunta.id=? and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and campañaencuesta.idEncuesta=encuestapregunta.idEncuesta and encuestapregunta.idPregunta=pregunta.id and usuariosituacion.respondida=0 and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1",[
        usuario,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Si la pregunta existe y el usuario tiene acceso a esa pregunta true sino false
exports.pertenecePreguntaUsuarioInforme = async function (usuario,idPregunta) {

    const row = await db.query(
        "SELECT pregunta.id FROM usuariosituacion,situacion,campañaencuesta,encuestapregunta,pregunta,activacion where situacion.idDocente=? and pregunta.id=? and situacion.idCampaña=campañaencuesta.idCampaña and campañaencuesta.idEncuesta=encuestapregunta.idEncuesta and encuestapregunta.idPregunta=pregunta.id and usuariosituacion.respondida=0 and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1",[
        usuario,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Si la pregunta existe y el usuario tiene acceso a esa pregunta true sino false
exports.getPreguntaInfo = async function (idPregunta) {

    const row = await db.query(
        "SELECT * FROM pregunta WHERE id=?",[
        idPregunta
        ]);
        
    return row[0];

}
