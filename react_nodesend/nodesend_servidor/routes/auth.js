const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

router.get('/', 
    auth,
    authController.usuarioAutenticado
);

router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'El password no puede ir vacío').not().isEmpty()
    ],
    authController.autenticarUsuario
);

module.exports = router;