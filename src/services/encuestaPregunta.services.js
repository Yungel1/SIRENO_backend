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

//Si existe la relación entre una campaña y una encuesta concretos true sino false
exports.encuestaPreguntaExiste = async function (idEncuesta,idPregunta) {

    const row = await db.query(
        "SELECT idEncuesta,idPregunta FROM encuestapregunta WHERE idEncuesta=? and idPregunta=?",[
        idEncuesta,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Borrar relación entre una encuesta y una pregunta
exports.deleteEncuestaPregunta = async function (idEncuesta,idPregunta) {

    const rows = await db.query(
        "DELETE FROM encuestapregunta WHERE idEncuesta=? and idPregunta=?",[
        idEncuesta,
        idPregunta
        ]);
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}

//Coger todas las relaciones entre encuestas y preguntas
exports.getAllEncuestaPregunta = async function () {

    const row = await db.query(
        "SELECT idEncuesta,idPregunta,num_preg FROM encuestapregunta"
        );
        

    return row;

}
