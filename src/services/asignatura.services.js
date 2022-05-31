const db = require("../helpers/db.js");

//Si la asignatrua existe en la base de datos: true, sino false
exports.asignaturaExiste  = async function (asignatura) {

    const row = await db.query(
        "SELECT id FROM asignatura WHERE id=?",
        asignatura
        );
        
    if (row.length > 0) {
        return true; //La asignatura existe
    } else{
        return false;
    }
}