const db = require("../helpers/db.js");

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