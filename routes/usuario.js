const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const requireAuth = require('../middleware/requireAuth')

router.post('/login', usuarioController.loginUsuario);  // O login é feito aqui

router.get('/perfil', requireAuth, usuarioController.getPerfil);
// Outras rotas
router.get('/', usuarioController.getAllUsuarios);
router.get('/create', usuarioController.renderCreateForm);
router.post('/cadastro', usuarioController.createUsuario);
router.get('/edit/:id', usuarioController.renderEditForm);
router.put('/edit/:id', usuarioController.updateUsuario);
router.delete('/delete/:id', usuarioController.deleteUsuario);

module.exports = router;
