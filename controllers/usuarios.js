const { response, request } = require('express');  // esta linea solo es para obtener la ayuda de VSCode para codificar

const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usuariosGET = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    // const users = await User.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await User.countDocuments(query);

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        users
    });
}

const usuariosPOST = async(req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({
        name,
        email,
        password,
        role
    });

    // Verificar si el correo existe se realiza en las rutas

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await user.save();
    res.status(200).json({
        msg: "post API - Controller",
        user
    })
}

const usuariosPUT = async(req, res = response) => {
    
    const { id } = req.params;

    const { _id, password, google, email, ...userInfo } = req.body;

    if( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        userInfo.password = bcryptjs.hashSync(password, salt);
    }

    const userDB = await User.findByIdAndUpdate( id, userInfo );

    res.status(200).json(userDB)
}

const usuariosPATCH = (req, res = response) => {
    
    res.status(200).json({
        msg: "patch API - Controller"
    })
}

const usuariosDELETE = async (req, res = response) => {
    const { id } = req.params;

    // Borrado de la base de datos
    // const user = await User.findByIdAndDelete(id);


    // Borrar solo marcando el registro
    const user = await User.findByIdAndUpdate(id, {status: false});


    res.status(200).json({
        user
    })
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}