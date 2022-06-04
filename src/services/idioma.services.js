const db = require("../helpers/db.js");

//Insertar idioma en la base de datos
exports.insertarIdioma = async function (nombre) {

    const rows = await db.query('INSERT INTO idioma(nombre) VALUES(?)',[
        nombre
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Si existe el idioma true sino false
exports.idiomaExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM idioma WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Borrar idioma
exports.deleteIdioma = async function (id) {

    const rows = await db.query(
        "DELETE FROM idioma WHERE id=?",
        id
        );
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}