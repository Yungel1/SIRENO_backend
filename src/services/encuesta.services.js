const db = require("../helpers/db.js");

//Insertar encuesta en la base de datos
exports.insertarEncuesta = async function (nombre) {

    const rows = await db.query('INSERT INTO encuesta(nombre) VALUES(?)',
        nombre
    );

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Si existe la encuesta true sino false
exports.encuestaExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM encuesta WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Borrar encuesta
exports.deleteEncuesta = async function (id) {

    const rows = await db.query(
        "DELETE FROM encuesta WHERE id=?",
        id
        );
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}

//Coger todas las encuestas
exports.getAllEncuesta = async function () {

    const row = await db.query(
        "SELECT id,nombre FROM encuesta"
        );
        

    return row;

}