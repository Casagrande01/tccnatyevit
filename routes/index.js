var express = require('express');
var router = express.Router();

// Rota principal
router.get('/', function(req, res, next) {
  res.render('index');
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

router.get('/login', function(req, res, next) {
  res.render('login');
});

module.exports = router;
