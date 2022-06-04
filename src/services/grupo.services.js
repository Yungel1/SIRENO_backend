const db = require("../helpers/db.js");

//Si el grupo existe en la base de datos: true, sino false
exports.grupoExiste  = async function (id) {

    const row = await db.query(
        "SELECT id FROM grupo WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true; //El grupo existe
    } else{
        return false;
    }
}

//Insertar grupo en la base de datos
exports.insertarGrupo = async function (id) {

    const rows = await db.query('INSERT INTO grupo(id) VALUES(?)',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Eliminar grupo en la base de datos
exports.eliminarGrupo = async function (id) {

    const rows = await db.query('DELETE FROM grupo WHERE id=?',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}