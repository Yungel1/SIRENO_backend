const db = require("../helpers/db.js");

exports.asignaturaExiste  = async function (asignatura) {

    const row = await db.query(
        "SELECT id FROM asignatura WHERE id=?",
        asignatura
        );
        
    if (row.length > 0) {
        return true; //El asignatura existe
    } else{
        return false;
    }
}