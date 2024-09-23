const empresa = require('../models/empresaModel');
const Categoria = require('../models/categoriaModel');

const empresaController = {

    createProduto: (req, res) => {

        const newProduto = {
            cod: req.body.cod,
            ramo: req.body.ramo,
            website: req.body.website,
            email: req.body.email,
            fone: req.body.fone,
            cnpj: req.body.cnpj,
            fundacao: req.body.fundacao,
            endereco: req.body.endereco,
            nome: req.body.nome,

        };

        Produto.create(newProduto, (err, empresaId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/empresas');
        });
    },

    getProdutoById: (req, res) => {
        const empresaId = req.params.id;

        Produto.findById(empresaId, (err, empresa) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!empresa) {
                return res.status(404).json({ message: 'Produto not found' });
            }
            res.render('empresas/show', { empresa });
        });
    },
    
    getAllProdutos: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Produto.getAll(categoria, (err, empresas) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('empresas/index', { empresas, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('empresas/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const empresaId = req.params.id;

        Produto.findById(empresaId, (err, empresa) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!empresa) {
                return res.status(404).json({ message: 'Produto not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('empresas/edit', { empresa, categorias });
            });
        });
    },

    updateProduto: (req, res) => {
        const empresaId = req.params.id;
        
        const updatedProduto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Produto.update(empresaId, updatedProduto, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/empresas');
        });
    },

    deleteProduto: (req, res) => {
        const empresaId = req.params.id;

        Produto.delete(empresaId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/empresas');
        });
    }
};

module.exports = empresaController;
