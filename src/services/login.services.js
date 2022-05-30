const db = require("../helpers/db.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Comprobar si el usuario existe, si existe -> true, sino false
exports.usuarioCorrecto = function (row) {

    if (row.length === 0) {
        return false;
    }
    return true;

}

//Comprobar si la contraseña es correcta, si es correcta -> true, sino false
exports.contraseñaCorrecta = async function (contraseña,row) {

    const passMatch = await bcrypt.compare(contraseña, row[0].contraseña);

    return passMatch;

}

//obtener el token
exports.obtenerToken = function (row) {

    const elToken = jwt.sign({usuario:row[0].usuario},process.env.PASSPHRASE,{ expiresIn: '2h' });

    return elToken;

}