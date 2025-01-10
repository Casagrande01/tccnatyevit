const Produto = require('../models/produtoModel');

const produtoController = {

    createProduto: (req, res) => {
        const { nome, descricao, valor, foto, categoria } = req.body;


        const newProduto = { nome, descricao, valor, foto, categoria };
console.log(newProduto);
        Produto.create(newProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar produto.' });
            }
            res.redirect('/');  // Após criar, redireciona para o perfil
        });
    },

    

    getDashboard: (req, res) => {
        const produtoId = req.session.produtoId;

        if (!produtoId) {
            return res.redirect('/produtos/login');
        }

        Produto.findById(produtoId, (err, produto) => {
            if (err || !produto) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.render('dashboard', { produto });
        });
    },

    getAllProdutos: (req, res) => {
        Produto.getAll((err, produtos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('/', { produtos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('produtos/edit', { produto });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        const updatedProduto = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            role: req.body.role,
        };

        Produto.update(produtoId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    logoutProduto: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao realizar logout.' });
            }
            res.redirect('/produtos/login');
        });
    },
};

module.exports = produtoController;
