const db = require("../helpers/db.js");

//Insertar activacion en la base de datos
exports.insertarActivacion = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña, fechaActIni, fechaActFin) {

    const rows = await db.query('INSERT INTO activacion(idDocente, idGrupo, idGrado, idAsignatura, idCampaña, activado, fueActivado, fechaActIni, fechaActFin) VALUES(?,?,?,?,?,false,false,?,?)',[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña,
        fechaActIni,
        fechaActFin
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}


//Si la activacion es 1 true, sino false
exports.campañaActivada  = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña) {

    const row = await db.query(
        "SELECT activado FROM activacion WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?",[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña   
        ]);
    
    if (row[0].activado) {
        return true; //La activacion esta activada
    } else{
        return false;
    }
}

//Actualizar activacion en la base de datos
exports.actualizarActivacion = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña, fechaActIni, fechaActFin) {

    const rows = await db.query('UPDATE activacion SET fechaActIni=?, fechaActFin=? WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?',[
        fechaActIni,
        fechaActFin,
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña        
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha actualizado correctamente
    } else{
        return false; //No se ha actualizado
    }

}

//Si la activación existe en la base de datos: true, sino false
exports.activacionExiste  = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña) {

    const row = await db.query(
        "SELECT idDocente,idGrupo,idGrado,idAsignatura,idCampaña FROM activacion WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?",[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña   
        ]);
    
    if (row.length > 0) {
        return true; //La activacion existe
    } else{
        return false;
    }
}

//Si la activación existe en la base de datos: true, sino false
exports.getActivado  = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña) {

    const row = await db.query(
        "SELECT activado FROM activacion WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?",[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña   
        ]);
    
   return row;
}

//Activar activacion en la base de datos
exports.activarActivacion = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña, activado) {

    const rows = await db.query('UPDATE activacion SET activado=?, fueActivado=true WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?',[
        activado,
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña        
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha activado correctamente
    } else{
        return false; //No se ha activado
    }

}

//Eliminar activacion en la base de datos
exports.eliminarActivacion = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña) {

    const rows = await db.query('DELETE FROM activacion WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?',[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña     
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}
//Coger las fechas y si fue activado en la base de datos
exports.cogerActivacion = async function () {

    const rows = await db.query('SELECT * FROM activacion');

    return rows;
}

//Activar activacion en la base de datos
exports.cambiarFueActivado = async function (idDocente, idGrupo, idGrado, idAsignatura, idCampaña) {

    const rows = await db.query('UPDATE activacion SET fueActivado=true WHERE idDocente=? and idGrupo=? and idGrado=? and idAsignatura=? and idCampaña=?',[
        idDocente,
        idGrupo,
        idGrado,
        idAsignatura,
        idCampaña        
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha activado correctamente
    } else{
        return false; //No se ha activado
    }

}
