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

//Si existe el texto true sino false
exports.textoExiste = async function (idIdioma,idPregunta,idOpcionesPregunta) {

    const row = await db.query(
        "SELECT id FROM texto WHERE idIdioma=? and idPregunta=? and idOpcionesPregunta=?",[
        idIdioma,
        idPregunta,
        idOpcionesPregunta
        ]);
        
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

//Coger el texto
exports.getTexto = async function (idIdioma,idPregunta,idOpcionesPregunta) {

    let query = "SELECT texto FROM texto WHERE idIdioma=? and idPregunta=? and idOpcionesPregunta=?";
    let row;
    if (idOpcionesPregunta!=null){
        row = await db.query(
            query,[
            idIdioma,
            idPregunta,
            idOpcionesPregunta
            ]);
    } else{
        query = "SELECT texto FROM texto WHERE idIdioma=? and idPregunta=? and idOpcionesPregunta IS NULL"
        row = await db.query(
            query,[
            idIdioma,
            idPregunta
            ]);
    }

    if(row.length > 0){
        return row[0];
    } else{
        return null;
    }

}

//Coger todos los textos
exports.getAllTexto = async function () {

    const row = await db.query(
        "SELECT id,texto,idIdioma,idPregunta,idOpcionesPregunta FROM texto"
        );
        
    return row;

}