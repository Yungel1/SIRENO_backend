const db = require("../helpers/db.js");

//Si existe el departamento true sino false
exports.departamentoExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM departamento WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}