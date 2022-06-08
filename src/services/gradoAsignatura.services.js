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

//Eliminar relacioón grado y asignatura en la base de datos
exports.elimiarRelacionGradoAsignatura = async function (idGrado,idAsignatura) {

    const rows = await db.query('DELETE FROM gradoasignatura WHERE idGrado=? and idAsignatura=?',[
        idGrado,
        idAsignatura
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todas las relaciones entre grados y asignaturas
exports.getAllGradoAsignatura = async function () {

    const row = await db.query(
        "SELECT idGrado,idAsignatura FROM gradoasignatura"
        );
        

    return row;

}