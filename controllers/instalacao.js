const instalacao = require('../models/instalacaoModel');
const Categoria = require('../models/categoriaModel');

const instalacaoController = {

    createInstalacao: (req, res) => {

        const newInstalacao = {
            cod: req.body.cod,
            material: req.body.material,
            qtdplaca: req.body.qtdplaca,
            qdtfornecido : req.body.qdtfornecido,
            formadepagam : req.body.formadepagam,
            restricao : req.body.restricao,
            valor : req.body.valor,
            equipamentos : req.body.equipamentos,
            localizacao : req.body.localizacao,
            tempo : req.body.tempo,

        };

        Instalacao.create(newInstalacao, (err, instalacaoId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/instalacaos');
        });
    },

    getInstalacaoById: (req, res) => {
        const instalacaoId = req.params.id;

        Instalacao.findById(instalacaoId, (err, instalacao) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!instalacao) {
                return res.status(404).json({ message: 'Instalacao not found' });
            }
            res.render('instalacaos/show', { instalacao });
        });
    },
    
    getAllInstalacaos: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Instalacao.getAll(categoria, (err, instalacaos) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('instalacaos/index', { instalacaos, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('instalacaos/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const instalacaoId = req.params.id;

        Instalacao.findById(instalacaoId, (err, instalacao) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!instalacao) {
                return res.status(404).json({ message: 'Instalacao not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('instalacaos/edit', { instalacao, categorias });
            });
        });
    },

    updateInstalacao: (req, res) => {
        const instalacaoId = req.params.id;
        
        const updatedInstalacao = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Instalacao.update(instalacaoId, updatedInstalacao, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/instalacaos');
        });
    },

    deleteInstalacao: (req, res) => {
        const instalacaoId = req.params.id;

        Instalacao.delete(instalacaoId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/instalacaos');
        });
    }
};

module.exports = instalacaoController;