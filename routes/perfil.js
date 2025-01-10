// routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Outras rotas
router.get('/perfil', usuarioController.getPerfil);  // Nova rota para o perfil

// As rotas existentes
router.get('/login', (req, res) => {
    res.render('login');  // Aqui você renderiza a página de login
});

router.post('/login', usuarioController.loginUsuario);  // O login é feito aqui

router.get('/dashboard', usuarioController.getDashboard);

// Outras rotas
router.get('/', usuarioController.getAllUsuarios);
router.get('/create', usuarioController.renderCreateForm);
router.post('/cadastro', usuarioController.createUsuario);
router.get('/edit/:id', usuarioController.renderEditForm);
router.put('/edit/:id', usuarioController.updateUsuario);
router.delete('/delete/:id', usuarioController.deleteUsuario);

module.exports = router;
