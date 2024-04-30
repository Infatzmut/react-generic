const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
exports.crearUsuario = async (req, res) => {
    // Validar si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()) {
        return res.status().json({errores: errores.array()});
    }
    
    const {email, password} = req.body;
    try{
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({email});
        if(usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body)
        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        
        // guardar usuario
        await usuario.save()

        // crear el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        // firmar el jwt
        jwt.sign(payload, process.env.SECRET,{
            expiresIn: 3600
        }, (err, token) => {
            if(err) throw error;
            // Mensaje de confirmacion
            res.json({token})
        });
        res.send('Usuario creado correctamente');
    }catch(error){
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}