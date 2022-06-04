const db = require("../helpers/db.js");

//Relacionar un centro con un departamento en la base de datos
exports.relacionarCentroDepartamento = async function (idCentro, idDepartamento) {

    const rows = await db.query('INSERT INTO centrodepartamento(idCentro, idDepartamento) VALUES(?,?)',[
        idCentro,
        idDepartamento
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }

}

//Si existe la relación entre un centro y departamento concretos true sino false
exports.centroDepartamentoExiste = async function (idCentro,idDepartamento) {

    const row = await db.query(
        "SELECT idCentro,idDepartamento FROM centrodepartamento WHERE idCentro=? and idDepartamento=?",[
        idCentro,
        idDepartamento
        ]);
        
    if (row.length > 0) {
        return true;
    } else{
        return false;
    }
}

//Eliminar relacioón centro y departamento en la base de datos
exports.elimiarRelacionCentroDepartamento = async function (idCentro,idDepartamento) {

    const rows = await db.query('DELETE FROM centrodepartamento WHERE idCentro=? and idDepartamento=?',[
        idCentro,
        idDepartamento
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}