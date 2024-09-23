const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.getAllprodutos);
router.get('/new', produtoController.renderCreateForm);
router.post('/', produtoController.createproduto);
router.get('/:id', produtoController.getprodutoById);
router.get('/:id/edit', produtoController.renderEditForm);
router.put('/:id', produtoController.updateproduto);
router.delete('/:id', produtoController.deleteproduto);

module.exports = router;