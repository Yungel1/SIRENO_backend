const db = require("../helpers/db.js");

//Si el grado existe en la base de datos: true, sino false
exports.gradoExiste  = async function (id) {

    const row = await db.query(
        "SELECT id FROM grado WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true; //El grado existe
    } else{
        return false;
    }
}

//Insertar grado en la base de datos
exports.insertarGrado = async function (id, idCentro) {

    const rows = await db.query('INSERT INTO grado(id,idCentro) VALUES(?,?)',[
        id,
        idCentro
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Eliminar grado en la base de datos
exports.eliminarGrado = async function (id) {

    const rows = await db.query('DELETE FROM grado WHERE id=?',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todos los grados
exports.getGrados  = async function () {

    const row = await db.query(
        "SELECT * FROM grado",
        );
        
    return row;
}