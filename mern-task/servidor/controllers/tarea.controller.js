const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
const {validationResult } = require('express-validator')

// crea una nueva tarea

exports.crearTarea = async (req, res) => {
    // Revisar si hay erroes
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
    const {proyecto} = req.body;
    try {
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        const tarea = new Tarea(req.body);
        await tarea.save()
        return res.json(tarea);
    } catch(error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}

exports.obtenerTareas = async (req, res) => {
    // Extraer el proyecto y comprobar si existe
    
    try {
        const {proyecto} = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Obtener las tareaas por proyecto
        const tareas = await Tarea.find({proyecto});
        res.json({tareas});
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarTarea = async (req, res) => {
    try {
        const {proyecto, nombre, estado} = req.body;
        
        // Si la tarea existe o no 
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Crear un objeto con la nueva informacion 
        const nuevaTarea= {};

        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado

        // Guardar la tarea
        tareaExiste = await Tarea.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new :true});
        res.json({tarea});

    }catch(error){
        console.log(error);
        res.send('Hubo un error')
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        const {proyecto, nombre, estado} = req.body;
        
        // Si la tarea existe o no 
        let tareaExiste = await Tarea.findById(req.params.id);
        if(!tareaExiste){
            return res.status(404).json({msg: 'No existe esa tarea'});
        }
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea elimnada'});
    }catch(error){
        console.error(error);
        res.send('Hubo un error');
    }
}
