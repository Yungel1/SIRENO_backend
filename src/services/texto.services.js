const db = require("../helpers/db.js");

//Insertar un texto en la base de datos
exports.insertarTexto = async function (texto, idIdioma, idPregunta, idOpcionesPregunta) {

    const rows = await db.query('INSERT INTO texto(texto, idIdioma, idPregunta, idOpcionesPregunta) VALUES(?,?,?,?)',[
        texto,
        idIdioma,
        idPregunta,
        idOpcionesPregunta
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe el texto true sino false
exports.textoExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM texto WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Borrar texto
exports.deleteTexto = async function (id) {

    const rows = await db.query(
        "DELETE FROM texto WHERE id=?",
        id
        );
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}