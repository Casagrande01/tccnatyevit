const Produto = require('../models/produtoModel');

const produtoController = {
    createProduto: (req, res) => {
        const newProduto = {
            cod: req.body.cod,
            nome: req.body.nome,
            descricao: req.body.descricao,
            peso: req.body.peso,
            validade: req.body.validade,
            marca: req.body.marca,
            valor: req.body.valor,
            foto: req.body.foto,
            dimensões: req.body.dimensões,
            material: req.body.material
        };

        Produto.create(newProduto, (err, produtoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/produtos');
        });
    },

    getProdutoById: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/show', { produto });
        });
    },
    
    getAllProdutos: (req, res) => {
        Produto.getAll((err, produtos) => { // Corrigido a sintaxe
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('produtos/index', { produtos });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('produtos/create', { categorias });
    },

    renderEditForm: (req, res) => {
        const produtoId = req.params.id;

        Produto.findById(produtoId, (err, produto) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!produto) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('produtos/edit', { produto, categorias });
        });
    },

    updateProduto: (req, res) => {
        const produtoId = req.params.id;
        
        const updatedProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            peso: req.body.peso,
            validade: req.body.validade,
            marca: req.body.marca,
            valor: req.body.valor,
            foto: req.body.foto,
            dimensões: req.body.dimensões,
            material: req.body.material
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
    }
};

module.exports = produtoController;
