
const { Router } = require('express');
const { usuariosGET, usuariosPUT, usuariosPOST, usuariosDELETE, usuariosPATCH } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGET);

router.post('/', usuariosPOST);

router.put('/:id', usuariosPUT);

router.patch('/', usuariosPATCH);

router.delete('/:id', usuariosDELETE);



module.exports = router;