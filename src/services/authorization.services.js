const db = require("../helpers/db.js");
const Roles = require("../helpers/roles")

//Comprobar si existe autorización en la cabecera
exports.tienePermisos = function (rolesConAcceso,rolesActuales){

    //Si ningún rol tiene acceso false
    if (rolesConAcceso.length==0){
        return false;
    }
    //Si todos los roles tienen acceso true
    if (rolesConAcceso.includes(Roles.Todos)){
        return true;
    }
    //Si tiene uno de los roles con acceso true, sino false
    for (let role of rolesConAcceso) {
        if(rolesActuales[role]){
            return true
        }
    }
    return false;

    

}