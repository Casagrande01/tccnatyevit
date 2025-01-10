const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para obter todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para exibir o formulário de criação de um novo produto
router.get('/criar', produtoController.renderCreateForm);

// Rota para criar um novo produto (POST)
router.post('/criar', produtoController.createProduto);

// Rota para exibir o formulário de edição de um produto existente
router.get('/editar/:id', produtoController.renderEditForm);

// Rota para atualizar um produto existente
router.put('/editar/:id', produtoController.updateProduto);

// Rota para excluir um produto
router.delete('/deletar/:id', produtoController.deleteProduto);

module.exports = router;
