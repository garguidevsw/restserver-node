const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid  = async(role = '') => {
    const existRole = await Role.findOne({ role });
    if(!existRole){
        throw new Error(`El role ${role} no esta registrado en la base de datos`);
    }
}

const existEmail = async(email = '') => {

    const emailExist = await User.findOne({ email });

    if(emailExist) {
        throw new Error(`El email ${email} ya éxiste en la base de datos`);
    }
}
const existUserId = async(id = '') => {

    const existId = await User.findById( id );

    if(!existId) {
        throw new Error(`El id no existe en la base de datos`);
    }
}

module.exports = {
    isRoleValid,
    existEmail,
    existUserId
}