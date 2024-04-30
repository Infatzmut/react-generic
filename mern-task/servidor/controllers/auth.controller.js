const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticarUsuario = async (req, res) => {
    // revisar si existen erroes
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    const {email, password} = req.body
    try {
        // Revisar que el usuario este registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario) {
            return res.status(400).json({msg: 'El usuario no existe'});
        }
        // Revisar el password
        const goodPass = await bcryptjs.compare(password, usuario.password);
        if(!goodPass){
            return res.status(400).json({msg: "Contraseña incorrecta"});
        }
        // Si todo es correcto
        // Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hora
        }, (err, token) => {
            if(err) throw err;
            // mensaje de confirmacion
            res.json({token});
        })

    } catch(error){
        console.log(error);
    }
}

exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json(usuario)
    }catch(error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}