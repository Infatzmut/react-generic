const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'})

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(authHeader) {
        try {
            // Obtener el token
            const token = authHeader.split(' ')[1];
            // comprobar el json web token
            const usuario = jwt.verify(token, process.env.SECRETA);
            req.usuario = usuario;
        }catch(error) {
            console.log(error);
        }
    } 
    return next();
}