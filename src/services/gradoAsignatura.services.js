const db = require("../helpers/db.js");

//Relacionar un grado con una asignatura en la base de datos
exports.relacionarGradoAsignatura = async function (idGrado, idAsignatura) {

    const rows = await db.query('INSERT INTO gradoasignatura(idGrado, idAsignatura) VALUES(?,?)',[
        idGrado,
        idAsignatura
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la relación entre un grado y asignatura concretos true sino false
exports.gradoAsignaturaExiste = async function (idGrado,idAsignatura) {

    const row = await db.query(
        "SELECT idGrado,idAsignatura FROM gradoasignatura WHERE idGrado=? and idAsignatura=?",[
        idGrado,
        idAsignatura
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }
}