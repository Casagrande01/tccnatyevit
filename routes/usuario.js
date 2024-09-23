const express = require('express');
const usuarioController = require('../controllers/usuarioControler');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);
router.get('/new', usuarioController.renderCreateForm);
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.get('/:id/edit', usuarioController.renderEditForm);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;