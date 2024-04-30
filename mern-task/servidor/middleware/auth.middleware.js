const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    if(!token) {
        res.status(401).json({msg: "No hay token, permiso no valido"})
    }
    // validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.usuario = cifrado.usuario;
        next()
    }catch(error) {
        res.status(401).json({msg: "Token no valido"})
    }
}