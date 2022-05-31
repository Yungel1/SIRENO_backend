const db = require("../helpers/db.js");

//Insertar campaña en la base de datos
exports.insertarCampaña = async function (fechaIni, fechaFin, descripcion, anonima, con_registro) {

    const rows = await db.query('INSERT INTO campaña(fechaIni, fechaFin, descripcion, anonima, con_registro) VALUES(?,?,?,?,?)',[
        fechaIni,
        fechaFin,
        descripcion,
        anonima,
        con_registro
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la campaña true sino false
exports.campañaExiste = async function (id) {

    const row = await db.query(
        "SELECT id FROM campaña WHERE id=?",
        id
        );
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}