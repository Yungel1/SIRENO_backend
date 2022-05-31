const db = require("../helpers/db.js");

//Si el grupo existe en la base de datos: true, sino false
exports.grupoExiste  = async function (grupo) {

    const row = await db.query(
        "SELECT id FROM grupo WHERE id=?",
        grupo
        );
        
    if (row.length > 0) {
        return true; //El grupo existe
    } else{
        return false;
    }
}