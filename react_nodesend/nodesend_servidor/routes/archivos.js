const express = require('express');
const router = express.Router();
const archivosController = require('../controller/archivosController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');


router.post('/',
    auth,
    archivosController.subirArchivo
);

router.get('/:archivo',
    archivosController.descargar,
    archivosController.eliminarArchivo
)
module.exports = router;