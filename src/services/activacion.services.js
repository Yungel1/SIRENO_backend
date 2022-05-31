const db = require("../helpers/db.js");

//Insertar activacion en la base de datos
exports.insertarActivacion = async function (docente, grupo, grado, asignatura, campaña, fechaActIni, fechaActFin) {

    const rows = await db.query('INSERT INTO activacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, activado, fueActivado, fechaActIni, fechaActFin) VALUES(?,?,?,?,?,false,false,?,?)',[
        docente,
        grupo,
        grado,
        asignatura,
        campaña,
        fechaActIni,
        fechaActFin
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

exports.activacionExiste  = async function (docente, grupo, grado, asignatura, campaña) {

    const row = await db.query(
        "SELECT idDocente,idGrupo,idGrado,idAsignatura,idCampaña FROM activacion WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?",[
        docente,
        grupo,
        grado,
        asignatura,
        campaña
        ]);
        
    if (row.length > 0) {
        return true; //La activacion existe
    } else{
        return false;
    }
}
