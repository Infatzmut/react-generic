const Proyecto = require('../models/Proyecto');
const {validationResult } = require('express-validator')
exports.crearProyecto = async (req, res) => {
    // Revisar si hay erroes
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    try {
        // Crear un nuevo proyecto
        const proyecto = new Proyecto(req.body);

        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id;
        // guardamos proyecto
        proyecto.save();
        res.status(200).json(proyecto);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerProyecto = async (req, res) => {
    try{
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1})
        res.json(proyectos)
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.actualizarProyecto = async (req, res) => {
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    const {nombre} = req.body;
    const nuevoProyecto = {}

    if(nombre){
        nuevoProyecto.nombre = nombre;
    }

    try{
        // revisar el id
        let proyecto = await Proyecto.findById(req.params.id)    
        // si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // verficar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }
        // actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id:req.params.id}, {$set: nuevoProyecto}, {new:true})
        return res.json(proyecto);
    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.eliminarProyecto = async (req, res) => {
    try{
        let proyecto = await Proyecto.findById(req.params.id)    
        // si el proyecto existe o no
        if(!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }
        // verficar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No Autorizado'})
        }

        // Eliminar el proyecto
        await Proyecto.findByIdAndRemove({_id: req.params.id})
        res.json({msg: 'Proyecto eliminado'})
    }catch(error){
        res.status(500).send('hubo un error')
    }
}