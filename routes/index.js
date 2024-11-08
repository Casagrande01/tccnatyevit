var express = require('express');
var router = express.Router();

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

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
