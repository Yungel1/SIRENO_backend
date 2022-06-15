const db = require("../helpers/db.js");

//Insertar opción de una pregunta en la base de datos
exports.insertarOpcionPregunta = async function (idPregunta) {

    const rows = await db.query('INSERT INTO opcionespregunta(idPregunta) VALUES(?)',[
        idPregunta
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }
}

//Si existe la opción de pregunta true sino false
exports.opcionesPreguntaExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM opcionespregunta WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}


//Devuelve las opcionesPregunta de la pregunta
exports.getOpcionesPregunta = async function (idPregunta) {

    const row = await db.query(
        "SELECT id FROM opcionespregunta WHERE idPregunta=?",
        idPregunta
        );
        
    return row;
}

//Eliminar opcionesPregunta en la base de datos
exports.eliminarOpcionesPregunta = async function (id) {

    const rows = await db.query('DELETE FROM opcionespregunta WHERE id=?',[
        id 
    ]);

    if (rows.affectedRows >= 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todos los opcionespreguntas
exports.getOpcionesPreguntas  = async function () {

    const row = await db.query(
        "SELECT * FROM opcionespregunta",
        );
        
    return row;
}

//Si la opción de pregunta existe y el usuario tiene acceso a esa opción de pregunta true sino false
exports.perteneceOpcionesPreguntaUsuario = async function (usuario,idPregunta,idOpcionesPregunta) {

    const row = await db.query(
        "SELECT opcionespregunta.idPregunta,opcionespregunta.id FROM usuariosituacion,situacion,campañaencuesta,encuestapregunta,opcionespregunta,activacion where usuariosituacion.usuario=? and opcionespregunta.id=? and opcionespregunta.idPregunta=? and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and campañaencuesta.idEncuesta=encuestapregunta.idEncuesta and encuestapregunta.idPregunta=opcionespregunta.idPregunta and usuariosituacion.respondida=0 and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1",[
        usuario,
        idOpcionesPregunta,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

exports.getOpcPreguntasUsuario = async function (idUsuario, idPregunta) {

    const row = await db.query(
        "SELECT opcionespregunta.id, opcionespregunta.idPregunta FROM usuariosituacion,situacion,campañaencuesta,activacion,encuestapregunta,opcionespregunta where usuariosituacion.usuario=? and opcionespregunta.idPregunta=? and usuariosituacion.respondida=0 and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1 and encuestapregunta.idEncuesta=campañaencuesta.idEncuesta and opcionespregunta.idPregunta=encuestapregunta.idPregunta;",[
            idUsuario,
            idPregunta
        ]
      
        );
        
    return row;

}

