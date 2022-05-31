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