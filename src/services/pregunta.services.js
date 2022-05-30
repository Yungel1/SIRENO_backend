const db = require("../helpers/db.js");

//Insertar pregunta en la base de datos
exports.insertarPregunta = async function (tipoPreg) {

    const rows = await db.query('INSERT INTO Pregunta(tipoPreg) VALUES(?)',[
        tipoPreg
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}