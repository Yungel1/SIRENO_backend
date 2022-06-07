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

//Insertar departamento en la base de datos
exports.insertarDepartamento = async function (id) {

    const rows = await db.query('INSERT INTO departamento(id) VALUES(?)',[
        id,
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha insertado correctamente
    } else{
        return false; //No se ha insertado
    }


}

//Eliminar departamento en la base de datos
exports.eliminarDepartamento = async function (id) {

    const rows = await db.query('DELETE FROM departamento WHERE id=?',[
        id
    ]);

    if (rows.affectedRows === 1) {
        return true; //Se ha eliminado correctamente
    } else{
        return false; //No se ha eliminado
    }


}

//Coger todos los departamentos
exports.getDepartamentos  = async function () {

    const row = await db.query(
        "SELECT * FROM departamento",
        );
        
    return row;
}