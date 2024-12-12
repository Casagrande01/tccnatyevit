const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/', function(req, res, next) {
    res.render('carrinho');
});

module.exports = router;
