const db = require("../helpers/db.js");

exports.gradoExiste  = async function (grado) {

    const row = await db.query(
        "SELECT id FROM grado WHERE id=?",
        grado
        );
        
    if (row.length > 0) {
        return true; //El grado existe
    } else{
        return false;
    }
}