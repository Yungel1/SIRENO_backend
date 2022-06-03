const db = require("../helpers/db.js");

//Insertar opcPregRespuesta en la base de datos
exports.insertarOpcPregRespuesta = async function (idOpcPreg, idRespuesta, idPregunta) {

    const row = await db.query('INSERT INTO opcpregrespuesta(idOpcPreg,idRespuesta,idPregunta) VALUES(?,?,?)',[
        idOpcPreg,
        idRespuesta,
        idPregunta
    ]);

    if (row.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Si la opcPregRespuesta existe en la base de datos: true, sino false
exports.opcPregRespuestaExiste  = async function (idOpcPreg, idRespuesta, idPregunta) {

    const row = await db.query(
        "SELECT idOpcPreg,idRespuesta,idPregunta FROM opcpregrespuesta WHERE idOpcPreg=? AND idRespuesta=? AND idPregunta=?", [
        idOpcPreg,
        idRespuesta,
        idPregunta
        ]);
        
    if (row.length > 0) {
        return true; //La respuesta existe
    } else{
        return false;
    }
}


