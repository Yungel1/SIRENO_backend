const db = require("../helpers/db.js");

//Si el centro existe en la base de datos: true, sino false
exports.centroExiste  = async function (id) {

    const row = await db.query(
        "SELECT id FROM centro WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true; //El centro existe
    } else{
        return false;
    }
}

//Insertar centro en la base de datos
exports.insertarCentro = async function (id) {

    const rows = await db.query('INSERT INTO centro(id) VALUES(?)',[
        id,
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}