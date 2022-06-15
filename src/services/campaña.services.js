const db = require("../helpers/db.js");

//Insertar campaña en la base de datos
exports.insertarCampaña = async function (nombre,fechaIni, fechaFin, descripcion, anonima, con_registro) {

    const rows = await db.query('INSERT INTO campaña(nombre,fechaIni, fechaFin, descripcion, anonima, con_registro) VALUES(?,?,?,?,?,?)',[
        nombre,
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

//Borrar campaña
exports.deleteCampaña = async function (id) {

    const rows = await db.query(
        "DELETE FROM campaña WHERE id=?",
        id
        );
        
    if (rows.affectedRows === 1) {
        return true;
    } else{
        return false;
    }

}

//Coger todas las campañas
exports.getAllCampaña = async function () {

    const row = await db.query(
        "SELECT id,nombre,fechaIni,fechaFin,descripcion,anonima,con_registro FROM campaña"
        );
        
    return row;


}

//Coger la campaña
exports.getCampañaInfo = async function (id) {

    const row = await db.query(
        "SELECT nombre,fechaIni,fechaFin,descripcion,anonima,con_registro FROM campaña WHERE id=?",
        id
        );
        
    if(row.length > 0){
        return row;
    } else{
        return null;
    }

}

//Si la campaña existe y el usuario tiene acceso a esa campaña true sino false
exports.perteneceCampañaUsuario = async function (usuario,id) {

    const row = await db.query(
        "SELECT campaña.id FROM usuariosituacion,situacion,campaña where usuariosituacion.usuario=? and campaña.id=? and usuariosituacion.idSituacion=situacion.id and situacion.idCampaña=campaña.id",[
        usuario,
        id
        ]);

    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}

//Si la campaña existe y el usuario tiene acceso a esa campaña true sino false
exports.perteneceCampañaDocente = async function (idDocente,id) {

    const row = await db.query(
        "SELECT campaña.id FROM situacion,campaña where situacion.idDocente=? and campaña.id=? and situacion.idCampaña=campaña.id",[
        idDocente,
        id
        ]);

    if (row.length > 0) {
        return true;
    } else{
        return false;
    }

}