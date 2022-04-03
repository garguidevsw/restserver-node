const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validator } = require('../middlewares/validator');

const router = Router();

// ====== Login  ========

router.post('/login', [
    check('email', 'El correo electrónico es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validator
], login);

router.post('/google', [
    check('id_token', 'El id token es obligatorio').not().isEmpty(),
    validator
], googleSignIn);

module.exports = router;