const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/usuarios', usuarioController.getAllUsuarios);
router.get('/usuarios/create', usuarioController.renderCreateForm);
router.post('/usuarios', usuarioController.createUsuario);
router.get('/usuarios/edit/:id', usuarioController.renderEditForm);
router.put('/usuarios/edit/:id', usuarioController.updateUsuario);
router.delete('/usuarios/delete/:id', usuarioController.deleteUsuario);

module.exports = router;
