const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})
const {validationResult} = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {
    // revisar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    // buscar el usuario para ver si esta registrado
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        res.status(401).json({msg: 'El usuario no existe'});
        return next();
    }
    // Verificar el password y autenticar el usuario
    if(bcrypt.compareSync(password, usuario.password)) {
        // Crear JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        })
        res.json({token});
    } else {
        res.status(401).json({msg: 'Password incorrecto'});
        return next();
    }
}

exports.usuarioAutenticado = async (req, res) => {
    res.json({usuario: req.usuario});
}