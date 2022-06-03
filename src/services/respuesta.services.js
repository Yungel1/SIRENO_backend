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


