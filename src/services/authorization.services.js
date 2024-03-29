const roles = require("../helpers/roles");

//Comprobar si existe autorización en la cabecera
exports.tienePermisos = function (rolesConAcceso,rolesActuales){

    //Si ningún rol tiene acceso false
    if (rolesConAcceso.length==0){
        return false;
    }
    //Si todos los roles tienen acceso o es administrador true
    if (rolesConAcceso.includes(roles.Todos) || rolesActuales[0].administrador){
        return true;
    }
    
    //Si tiene uno de los roles con acceso true, sino false
    for (let role of rolesConAcceso) {

        if(rolesActuales[0][role]){
            return true
        }
    }
    return false;

    

}