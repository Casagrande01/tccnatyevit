const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Produto Routes
router.get('/', produtoController.getAllProdutos);
router.get('/create', produtoController.renderCreateForm);
router.post('/create', produtoController.createProduto);
router.get('/edit/:id', produtoController.renderEditForm);
router.put('/edit/:id', produtoController.updateProduto);
router.delete('/delete/:id', produtoController.deleteProduto);

module.exports = router;
