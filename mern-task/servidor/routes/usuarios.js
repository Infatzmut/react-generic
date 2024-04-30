// Rutas para crear usuarios
const {Router} = require('express');
const router = Router();
const check = require('express-validator');
const usuarioController = require('../controllers/usuario.controller');
// Crear usuario
router.post('/',
    [ check('nombre', 'El nombre es obligatorio').not.isEmpty(),
      check('nombre', 'El nombre es obligatorio').not.isEmpty(),
      check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})  
    ]
    ,usuarioController.crearUsuario)

module.exports = router;