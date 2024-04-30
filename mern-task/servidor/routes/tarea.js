const router = require('./usuarios');
const tareaController = require('../controllers/tarea.controller');
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware');
// Crea tareas

router.post('/',
    authMiddleware,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea)

// Obtener las tareas por proyecto
router.get('/',auth,  tareaController.obtenerTareas);

router.put('/:id', auth, tareaController.actualizarTarea);
module.exports = router;