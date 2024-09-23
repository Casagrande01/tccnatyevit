const express = require('express');
const empresController = require('../controllers/empresaController');
const router = express.Router();

router.get('/', empresController.getAllempress);
router.get('/new', empresController.renderCreateForm);
router.post('/', empresController.createempres);
router.get('/:id', empresController.getempresById);
router.get('/:id/edit', empresController.renderEditForm);
router.put('/:id', empresController.updateempres);
router.delete('/:id', empresController.deleteempres);

module.exports = router;