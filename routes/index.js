var express = require('express');
var router = express.Router();
const Produto = require('../models/produtoModel');

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/cadastro', function(req, res, next) {
  res.render('cadastro');
});


router.get('/sobre', function(req, res, next) {
  res.render('sobre');
});

router.get('/produto', function(req, res, next) {
  res.render('produto');
});

router.get('/contato', function(req, res, next) {
  res.render('contato');
});

router.get('/', async function(req, res, next) {
  try {
    const produtos = await Produto.getAll();
    console.log(produtos);
    res.render('index', { usuarioId: req.session.usuarioId, produtos });
  } catch (error) {
    next(error);
  }
});



router.get('/teladecadastro', function(req, res, next) {
  res.render('teladecadastro');
});


module.exports = router;
