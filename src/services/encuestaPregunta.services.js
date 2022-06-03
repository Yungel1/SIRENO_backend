const db = require("../helpers/db.js");

//Relacionar una encuesta con una pregunta en la base de datos
exports.relacionarEncuestaPregunta = async function (idEncuesta, idPregunta, num_preg) {

    const rows = await db.query('INSERT INTO encuestapregunta(idEncuesta,idPregunta,num_preg) VALUES(?,?,?)',[
        idEncuesta,
        idPregunta,
        num_preg
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Devuelve las encuestas de la campaña
exports.getPreguntasEncuesta = async function (idEncuesta) {

    const row = await db.query(
        "SELECT idPregunta FROM encuestapregunta WHERE idEncuesta=?",
        idEncuesta
        );
        
    return row;
}
