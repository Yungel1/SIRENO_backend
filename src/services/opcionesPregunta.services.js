const db = require("../helpers/db.js");

//Insertar opción de una pregunta en la base de datos
exports.insertarOpcionPregunta = async function (idPregunta, num_opc) {

    const rows = await db.query('INSERT INTO opcionespregunta(idPregunta,num_opc) VALUES(?,?)',[
        idPregunta,
        num_opc
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }
}

//Insertar opción de una pregunta en la base de datos
exports.insertarOpcPregGetId = async function (idPregunta, num_opc) {

    const rows = await db.query('INSERT INTO opcionespregunta(idPregunta,num_opc) VALUES(?,?)',[
        idPregunta,
        num_opc
    ]);

    return rows.insertId;
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

//Si existe la relación entre una pregunta y un num_opc concretos true sino false
exports.preguntaNumOpcExiste = async function (idPregunta, num_opc) {

    const row = await db.query(
        "SELECT idPregunta, num_opc FROM opcionespregunta WHERE idPregunta=? and num_opc=?", [
        idPregunta,
        num_opc
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}


//Devuelve las opcionesPregunta de la pregunta
exports.getOpcionesPregunta = async function (idPregunta) {

    const row = await db.query(
        "SELECT id, idPregunta, num_opc FROM opcionespregunta WHERE idPregunta=?",
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

//Si la opción de pregunta existe y el usuario tiene acceso a esa opción de pregunta true sino false
exports.perteneceOpcionesPreguntaUsuarioInformes = async function (usuario,idPregunta,idOpcionesPregunta) {

    const row = await db.query(
        "SELECT opcionespregunta.idPregunta,opcionespregunta.id FROM usuariosituacion,situacion,campañaencuesta,encuestapregunta,opcionespregunta,activacion where situacion.idDocente=? and opcionespregunta.id=? and opcionespregunta.idPregunta=? and situacion.idCampaña=campañaencuesta.idCampaña and campañaencuesta.idEncuesta=encuestapregunta.idEncuesta and encuestapregunta.idPregunta=opcionespregunta.idPregunta and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1",[
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
        "SELECT DISTINCT opcionespregunta.id, opcionespregunta.idPregunta, opcionespregunta.num_opc FROM usuariosituacion,situacion,campañaencuesta,activacion,encuestapregunta,opcionespregunta where usuariosituacion.usuario=? and opcionespregunta.idPregunta=? and usuariosituacion.respondida=0 and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1 and encuestapregunta.idEncuesta=campañaencuesta.idEncuesta and opcionespregunta.idPregunta=encuestapregunta.idPregunta ORDER BY opcionespregunta.num_opc;",[
            idUsuario,
            idPregunta
        ]
      
        );
        
    return row;

}

exports.getOpcionesPreguntaInformes = async function (idUsuario, idPregunta) {

    const row = await db.query(
        "SELECT DISTINCT opcionespregunta.id, opcionespregunta.idPregunta, opcionespregunta.num_opc FROM situacion,activacion,campañaencuesta,encuestapregunta,opcionespregunta where situacion.idDocente=? and opcionespregunta.idPregunta=? and situacion.idCampaña=activacion.idCampaña and encuestapregunta.idEncuesta=campañaencuesta.idEncuesta and opcionespregunta.idPregunta=encuestapregunta.idPregunta and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.fueActivado=1 ORDER BY opcionespregunta.num_opc;",[
            idUsuario,
            idPregunta
        ]
      
        );
        
    return row;

}

