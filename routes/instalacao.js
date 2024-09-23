const express = require('express');
const instalacaoController = require('../controllers/instalacaoController');
const router = express.Router();

router.get('/', instalacaoController.getAllinstalacaos);
router.get('/new', instalacaoController.renderCreateForm);
router.post('/', instalacaoController.createinstalacao);
router.get('/:id', instalacaoController.getinstalacaoById);
router.get('/:id/edit', instalacaoController.renderEditForm);
router.put('/:id', instalacaoController.updateinstalacao);
router.delete('/:id', instalacaoController.deleteinstalacao);

module.exports = router;