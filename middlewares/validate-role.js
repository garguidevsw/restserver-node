const { response } = require("express")

const isAdminRole = ( req, res = response, next ) => {

    if(!req.userAuth){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin antes validar el token'
        });
    }

    const { role, name } = req.userAuth;

    if( role !== 'ADMIN_ROLE'){
        return res.status(500).json({
            msg: `${name} no tiene permisos de administrador`
        });
    }

    next();
}

const validateRole = ( ...roles ) => {

    return ( req, res = response, next ) => {

        if(!req.userAuth){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin antes validar el token'
            });
        }

        if( !roles.includes( req.userAuth.role ) ){
            return res.status(401).json({
                msg: `No cuenta con el role requerido - ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    validateRole
}