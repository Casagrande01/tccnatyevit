const Produto = require('../models/produtoModel');

const produtoController = {

    createProduto: (req, res) => {
        const { nome, descricao, valor, categoria } = req.body;
        const foto = req.file ? req.file.filename : null; // Obtém o nome da foto carregada
        const newProduto = { nome, descricao, valor, foto, categoria }; // Adiciona foto ao produto

        Produto.create(newProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao criar produto.' + err });
            }
            res.redirect('/'); // Redireciona para a página inicial após o cadastro
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

    deleteProduto: (req, res) => {
        const produtoId = req.params.id;

        Produto.delete(produtoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

};

module.exports = produtoController;
