const db = require("../helpers/db.js");

//Insertar respuesta en la base de datos
exports.insertarRespuesta = async function (texto, idEncuesta) {

    const row = await db.query('INSERT INTO respuesta(texto,idEncuesta) VALUES(?,?)',[
        texto,
        idEncuesta
    ]);

    return row.insertId;
}

//Si la respuesta existe en la base de datos: true, sino false
exports.respuestaExiste  = async function (id) {

    const row = await db.query(
        "SELECT id FROM respuesta WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true; //La respuesta existe
    } else{
        return false;
    }
}

exports.getRespuestasMediaInformes = async function (idUsuario, idPregunta, idEncuesta) {

    const row = await db.query(
        "SELECT opcpregrespuesta.idOpcPreg, COUNT(distinct(opcpregrespuesta.idRespuesta)) AS veces_respondida FROM situacion,activacion,campañaencuesta,encuestapregunta,opcionespregunta,opcpregrespuesta,respuesta where situacion.idDocente=? and opcpregrespuesta.idPregunta=? and encuestapregunta.idEncuesta=? and opcionespregunta.idPregunta=opcpregrespuesta.idPregunta and opcionespregunta.id=opcpregrespuesta.idOpcPreg and encuestapregunta.idEncuesta=respuesta.idEncuesta and opcpregrespuesta.idRespuesta=respuesta.id and situacion.idCampaña=activacion.idCampaña and encuestapregunta.idEncuesta=campañaencuesta.idEncuesta and opcionespregunta.idPregunta=encuestapregunta.idPregunta and opcpregrespuesta.idPregunta = opcionespregunta.idPregunta and situacion.idCampaña=campañaencuesta.idCampaña and situacion.idDocente=activacion.idDocente and situacion.idAsignatura = activacion.idAsignatura and situacion.idGrado=activacion.idGrado and situacion.idGrupo=activacion.idGrupo and activacion.fueActivado=1 GROUP BY opcpregrespuesta.idOpcPreg;",[
            idUsuario,
            idPregunta,
            idEncuesta
        ]
      
        );
        
    return row;

}

