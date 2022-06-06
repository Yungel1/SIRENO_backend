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
