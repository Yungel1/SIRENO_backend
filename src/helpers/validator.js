const { check } = require('express-validator');

exports.signupValidation = [
    check('usuario', 'Nombre de usuario requerido').not().isEmpty(),
    check('contraseña', 'Contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 })
]
exports.loginValidation = [
    check('usuario', 'Nombre de usuario requerido').not().isEmpty(),
    check('contraseña', 'Contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 })
]