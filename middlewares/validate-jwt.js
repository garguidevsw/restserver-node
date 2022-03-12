const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Token requerido'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.PRIVATEKEY);

        //Leer el usuario al que corresponde el uid

        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no encontrado'
            });
        }

        // Verificar si el usuario no ha sido borrado
        if(!user.status){
            return res.status(401).json({
                msg: 'Usuario no encontrado | status: false'
            });
        }

        req.userAuth = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

    
}

module.exports = {
    validateJWT
}