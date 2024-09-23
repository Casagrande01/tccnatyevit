const express = require('express');
const funcionarioController = require('../controllers/funcionarioController');
const router = express.Router();

router.get('/', funcionarioController.getAllfuncionarios);
router.get('/new', funcionarioController.renderCreateForm);
router.post('/', funcionarioController.createfuncionario);
router.get('/:id', funcionarioController.getfuncionarioById);
router.get('/:id/edit', funcionarioController.renderEditForm);
router.put('/:id', funcionarioController.updatefuncionario);
router.delete('/:id', funcionarioController.deletefuncionario);

module.exports = router;