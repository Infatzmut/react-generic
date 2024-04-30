const {Router} = require('express');
const router = require('./usuarios');
const proyectoController = require('../controllers/proyecto.controller');
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware');
// Crea proyectos
router.post('/', authMiddleware, [check('nombre', "El nombre del proyecto es obligatorio").notEmpty()], proyectoController.crearProyecto)
router.get('/', authMiddleware, proyectoController.obtenerProyecto)
router.put('/:id',
                authMiddleware, 
                [check('nombre', "El nombre del proyecto es obligatorio").not().isEmpty()],
                proyectoController.actualizarProyecto)
router.delete(':/id', authMiddleware, proyectoController.eliminarProyecto)
module.exports = router;