const usuario = require('../models/usuarioModel');
const Categoria = require('../models/categoriaModel');

const usuarioController = {

    createusuario: (req, res) => {

        const newusuario = {
            cod : req.body.cod,
            nome : req.body.nome,
            email : req.body.email,
            datadenasc: req.body.datadenasc,
            fone : req.body.fone,
            endereco : req.body.endereco,
            cpf_cnpj: req.body.cpf_cnpj,

        };

        usuario.create(newusuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    getusuarioById: (req, res) => {
        const usuarioId = req.params.id;

        usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario not found' });
            }
            res.render('usuarios/show', { usuario });
        });
    },
    
    getAllusuarios: (req, res) => {
        const categoria = req.query.categoria || null;
        
        usuario.getAll(categoria, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('usuarios/index', { usuarios, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'usuario not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('usuarios/edit', { usuario, categorias });
            });
        });
    },

    updateusuario: (req, res) => {
        const usuarioId = req.params.id;
        
        const updatedusuario = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        usuario.update(usuarioId, updatedusuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteusuario: (req, res) => {
        const usuarioId = req.params.id;

        usuario.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    }
};

module.exports = usuarioController;