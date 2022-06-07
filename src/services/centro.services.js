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

//Eliminar centro en la base de datos
exports.eliminarCentro = async function (id) {

    const rows = await db.query('DELETE FROM centro WHERE id=?',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }

}

//Coger todos los centros
exports.getCentros  = async function () {

    const row = await db.query(
        "SELECT * FROM centro",
        );
        
    return row;
}