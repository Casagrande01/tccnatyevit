const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

router.get('/', usuarioController.getAllUsuarios);

router.get('/create', usuarioController.renderCreateForm);

router.post('/', usuarioController.createUsuario);
router.post('/login', usuarioController.loginUsuario);

router.get('/edit/:id', usuarioController.renderEditForm);

router.put('/edit/:id', usuarioController.updateUsuario);

router.delete('/delete/:id', usuarioController.deleteUsuario);

module.exports = router;
