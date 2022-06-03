const db = require("../helpers/db.js");

//Insertar situación en la base de datos
exports.insertarSituacion = async function (idGrado, idDocente, idGrupo, idAsignatura, idCampaña) {

    const rows = await db.query('INSERT INTO situacion(idGrado, idDocente, idGrupo, idAsignatura, idCampaña) VALUES(?,?,?,?,?)',[
        idGrado,
        idDocente,
        idGrupo,
        idAsignatura,
        idCampaña
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la situación true sino false
exports.situacionExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM situacion WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Devuelve la campaña de la situación
exports.getCampañaSituacion = async function (id) {

    const row = await db.query(
        "SELECT idCampaña FROM situacion WHERE id=?",
        id
        );
        
    return row;
}

//Si la situación  está repetida true sino false
exports.situacionRepetida = async function (idGrado, idDocente, idGrupo, idAsignatura, idCampaña) {

    const row = await db.query(
        "SELECT id FROM situacion WHERE idGrado=? and idDocente=? and idGrupo=? and idAsignatura=? and idCampaña=?",[
        idGrado,
        idDocente,
        idGrupo,
        idAsignatura,
        idCampaña
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}