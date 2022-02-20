const { response } = require('express');  // esta linea solo es para obtener la ayuda de VSCode para codificar

const usuariosGET = (req = request, res = response) => {
    const {nombre, password, page = 1} = req.query;
    res.status(200).json({
        msg: "get API - Controller",
        nombre,
        password,
        page
    })
}

const usuariosPOST = (req, res = response) => {
    
    const body = req.body;

    res.status(200).json({
        msg: "post API - Controller",
        body
    })
}

const usuariosPUT = (req, res = response) => {
    
    const { id } = req.params;

    res.status(200).json({
        msg: "put API - Controller",
        id
    })
}

const usuariosPATCH = (req, res = response) => {
    
    res.status(200).json({
        msg: "patch API - Controller"
    })
}

const usuariosDELETE = (req, res = response) => {
    const { id } = req.params;
    res.status(200).json({
        msg: "delete API - Controller",
        id
    })
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosPUT,
    usuariosPATCH,
    usuariosDELETE
}