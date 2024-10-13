const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Produto Routes
router.get('/produtos', produtoController.getAllProdutos);
router.get('/produtos/create', produtoController.renderCreateForm);
router.post('/produtos/create', produtoController.createProduto);
router.get('/produtos/edit/:id', produtoController.renderEditForm);
router.put('/produtos/edit/:id', produtoController.updateProduto);
router.delete('/produtos/delete/:id', produtoController.deleteProduto);

module.exports = router;
