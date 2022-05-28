const jwt = require('jsonwebtoken');
const db = require("../helpers/db.js");

//Comprobar si existe autorización en la cabecera
exports.tokenExists = function (headerAuth){

    if(
        !headerAuth ||
        !headerAuth.startsWith('Bearer') ||
        !headerAuth.split(' ')[1]
    ){
        return false;
    } 
    return true;
}

//Decodificar el token
exports.decodeToken = function (headerAuth){

    const theToken = headerAuth.split(' ')[1];
    const decoded = jwt.verify(theToken, process.env.PASSPHRASE);

    return decoded;
}
