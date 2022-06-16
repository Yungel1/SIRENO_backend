const db = require("../helpers/db.js");

//Relacionar una encuesta con una campaña en la base de datos
exports.relacionarCampañaEncuesta = async function (idCampaña, idEncuesta) {

    const rows = await db.query('INSERT INTO campañaencuesta(idCampaña, idEncuesta) VALUES(?,?)',[
        idCampaña,
        idEncuesta
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Devuelve las encuestas de la campaña
exports.getEncuestasCampaña = async function (idCampaña) {

    const row = await db.query(
        "SELECT idEncuesta FROM campañaencuesta WHERE idCampaña=?",
        idCampaña
        );
        
    return row;
}

//Si existe la relación entre una campaña y una encuesta concretos true sino false
exports.campañaEncuestaExiste = async function (idCampaña,idEncuesta) {

    const row = await db.query(
        "SELECT idCampaña,idEncuesta FROM campañaencuesta WHERE idCampaña=? and idEncuesta=?",[
        idCampaña,
        idEncuesta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Borrar relación entre una campaña y una encuesta
exports.deleteCampañaEncuesta = async function (idCampaña,idEncuesta) {

    const rows = await db.query(
        "DELETE FROM campañaencuesta WHERE idCampaña=? and idEncuesta=?",[
        idCampaña,
        idEncuesta
        ]);
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}

//Coger todas las relaciones entre campañas y encuestas
exports.getAllCampañaEncuesta = async function () {

    const row = await db.query(
        "SELECT idCampaña,idEncuesta FROM campañaencuesta"
        );
        

    return row;

}

exports.getEncuestasUsuario = async function (idUsuario, idCampaña) {

    const row = await db.query(
        "SELECT campañaencuesta.idEncuesta FROM usuariosituacion,situacion,campañaencuesta,activacion where usuariosituacion.usuario=? and campañaencuesta.idCampaña=? and usuariosituacion.respondida=0 and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1",[
            idUsuario,
            idCampaña
        ]
      
        );
        
    return row;

}

exports.getEncuestasUsuarioInformes = async function (idUsuario, idCampaña) {

    const row = await db.query(
        "SELECT campañaencuesta.idEncuesta FROM situacion,activacion,campañaencuesta where situacion.idDocente=? and campañaencuesta.idCampaña=? and situacion.idCampaña=activacion.idCampaña and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.fueActivado=1;",[
            idUsuario,
            idCampaña
        ]
      
        );
        
    return row;

}

//Si la relación de campaña y encuetsa y el usuario tiene acceso
exports.perteneceCampañaEncuestaUsuario = async function (usuario,idEncuesta,idCampaña) {

    const row = await db.query(
        "SELECT campañaencuesta.idEncuesta,campañaencuesta.idCampaña FROM usuariosituacion,situacion,campañaencuesta,activacion where usuariosituacion.usuario=? and campañaencuesta.idEncuesta=? and campañaencuesta.idCampaña=? and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campañaencuesta.idCampaña and usuariosituacion.respondida=0 and situacion.idCampaña=activacion.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.activado=1;",[
        usuario,
        idEncuesta,
        idCampaña
        ]);
        
    return row;

}

