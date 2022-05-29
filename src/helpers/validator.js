const { check } = require('express-validator');
//validaciones para login y registro
exports.signupValidation = [
    check('usuario', 'Nombre de usuario requerido').not().isEmpty(),
    check('contraseña', 'Contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 }),
    check('email','Incluya un email válido').isEmail().normalizeEmail({ gmail_remove_dots: true })
]
exports.loginValidation = [
    check('usuario', 'Nombre de usuario requerido').not().isEmpty(),
    check('contraseña', 'Contraseña debe tener un mínimo de 6 caracteres').isLength({ min: 6 })
]