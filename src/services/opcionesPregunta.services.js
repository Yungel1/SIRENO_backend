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
