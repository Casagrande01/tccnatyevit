const Usuario = require('../models/usuarioModel');

const usuarioController = {
    // Função para criar um novo usuário
    createUsuario: (req, res) => {
        const newUsuario = {
            usuarioname: req.body.usuarioname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user', // Valor default para role
        };

        // Chama o método create do modelo para inserir o novo usuário no banco
        Usuario.create(newUsuario, (err, usuarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            // Redireciona para a página de lista de usuários
            res.redirect('/usuarios');
        });
    },

    // Função para obter um usuário pelo ID
    getUsuarioById: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            res.render('usuarios/show', { usuario });
        });
    },

    // Função para obter todos os usuários
    getAllUsuarios: (req, res) => {
        Usuario.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    // Função para renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    // Função para renderizar o formulário de edição
    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    // Função para atualizar um usuário
    updateUsuario: (req, res) => {
        const usuarioId = req.params.id;
        const updatedUsuario = {
            usuarioname: req.body.usuarioname,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user',
        };

        Usuario.update(usuarioId, updatedUsuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    // Função para deletar um usuário
    deleteUsuario: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    // Função para buscar usuários por nome
    searchUsuarios: (req, res) => {
        const search = req.query.search || '';

        Usuario.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
        });
    },
};

module.exports = usuarioController;
