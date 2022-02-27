
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosPUT, usuariosPOST, usuariosDELETE, usuariosPATCH } = require('../controllers/usuarios');
const { isRoleValid, existEmail, existUserId } = require('../helpers/db-validators');
const { validator } = require('../middlewares/validator');

const router = Router();

// ====== GET Request  ========

router.get('/', usuariosGET);

// ====== POST Request  ========

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 carácteres').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(existEmail),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isRoleValid),  // (role) => isRoleValid(role)
    validator
], usuariosPOST);

// ====== PUT Request  ========

router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existUserId),
    check('role').custom(isRoleValid),
    validator
], usuariosPUT);

// ====== PATCH Request  ========

router.patch('/', usuariosPATCH);

// ====== DELETE Request  ========

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(existUserId),
    validator
], usuariosDELETE);



module.exports = router;