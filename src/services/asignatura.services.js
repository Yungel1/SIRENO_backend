const db = require("../helpers/db.js");

//Si la asignatrua existe en la base de datos: true, sino false
exports.asignaturaExiste  = async function (id) {

    const row = await db.query(
        "SELECT id FROM asignatura WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true; //La asignatura existe
    } else{
        return false;
    }
}

//Insertar asignatura en la base de datos
exports.insertarAsignatura = async function (id, idDepartamento) {

    const rows = await db.query('INSERT INTO asignatura(id, idDepartamento) VALUES(?,?)',[
        id,
        idDepartamento
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Eliminar asignatura en la base de datos
exports.eliminarAsignatura = async function (id) {

    const rows = await db.query('DELETE FROM asignatura WHERE id=?',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todos los asignaturas
exports.getAsignaturas  = async function () {

    const row = await db.query(
        "SELECT * FROM asignatura",
        );
        
    return row;
}