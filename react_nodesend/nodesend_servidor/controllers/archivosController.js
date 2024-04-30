const multer = require('multer');
const shortId = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlace');

exports.subirArchivo = async (req, res, next) => {
    const configuracionMulter = {
        limits = {fileSize: req.usuario? 1024 * 1024 * 10 : 1000000},
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length);
                cb(null, `${shortId.generate()}${extension}`)
            },
        })
    }
    const upload = multer(configuracionMulter).single('archivo');
    
    upload(req, res, async (error) => {
        if(!error) {
            res.json({archivo: req.file.filename})
        } else {
            console.log(error);
            return next();
        }
    })
}

exports.eliminarArchivo = async (req, res) => {
    try {
        fs.unlinkSync(__dirname + `../uploads/${req.archivo}`);
        console.log('archivo elminado');
    }catch(error) {
        console.log(error);
    }
}

exports.descargar = async (req, res, next) => {
    
    // Obtener el enlace
    const enlace = await Enlaces.findOne({nombre: req.params.archivo});

    const archivo = __dirname + '/../uploads/' + req.params.archivo;
    res.download(archivo);

    const {descargas, nombre} = enlace;
    // Si las descargas son > 1 , restar las descargas 
    if(descargas > 1) {
        enlace.descargas--;
        await enlace.save()
    } else {
        // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
        // Eliminar el archivo
        req.archivo = nombre;
        // Eliminar la entrada de la base de datos
        await Enlaces.findOneAndRemove(enlace.id);
        next();
    }
}