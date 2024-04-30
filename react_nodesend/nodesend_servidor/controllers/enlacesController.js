const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

exports.nuevoEnlace = async (req, res, next) => {
    // Revisar si hay errores


    // crear un objeto enlace
    const {nombre, nombre_original, password} = req.body;
    const enlace = new Enlaces();
    enlace.url = shortid.generate();

    // renombrar el archivo con un nombre unico
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    if(password) {
        const salt = await bcrypt.genSalt(10);
        enlace.password = await bcrypt.hash(password, salt);
    }
    enlace.descargas = 1;

    // Si el usuario está autenticado
    if(req.usuario) {
        const {password, descargas} = req.body;

        // Asignar a enlace el numero de descargas
        if(descargas) {
            enlace.descargas = descargas;
        }
        // Asignar el autor
        enlace.autor = req.usuario.id;
    }

    // Almacenar en la BD
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`});
    }catch(error){
        console.log(error);
    }
}

// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {
    const {url} = req.params;
    // Verificar si esxiste el enlace
    const enlace = await Enlaces.findOne({url});
    if(!enlace) {
        res.status(404).json({msg: 'Ese enlace no existe'});
    }

    res.json({archivo: enlace.nombre, password: false});
    next();
}

// Obtener el listado de todos los enlaces
exports.todosEnlaces = async (req, res) => {
    try {
        const enlaces = await Enlaces.find({}).select('url -_id');
        res.json({enlaces});
    }catch(error) {
        console.log(error);
    }
}

// retorna si el enlace tiene password o no
exports.tienePassword = async (req, res, next) => {
    const {url} = req.params;
    // Verificar si esxiste el enlace
    const enlace = await Enlaces.findOne({url});
    if(!enlace) {
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next();
    }
    if(enlace.password) {
        return res.json({password: true, enlace: enlace.url});
    }
    next()
}

// Verifica si el password es correcto
exports.verificarPassword = async (req, res, next) => {
    const {url} = req.params;
    const {password} = req.body;

    // consultar por el enlace
    const enlace = await Enlaces.findOne({url});

    // Verificar el password
    if(bcrypt.compareSync(password, enlace.password)) {
        // Permite al usuario descargar el archivo
    } else {
        return res.status(401).json({msg: 'Password Incorrecto'})
    }
}