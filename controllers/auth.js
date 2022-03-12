const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user');
const { generateJWT } = require("../helpers/generate-jwt");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Si el usuario esta activo
        if(!user.status){
            return res.status(400).json({
                msg: 'El usuario no existe'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario o Password incorrectos'
            });
        }

        // Generar JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hubo un error en el inicio de sesión'
        });
    }
    
}

module.exports = {
    login
}