// Rutas para autenticar usuarios
const {Router} = require('express');
const router = Router();
const check = require('express-validator');
const auth = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');
// Iniciar sesion
router.post('/',
    [ 
      check('email', 'El email debe ser valido').isEmail(),
      check('password', 'El password debe ser minimo de 6 caracteres').isLength({min:6})  
    ]
    ,authController)

router.get('/', auth, authController.usuarioAutenticado)
module.exports = router;