const Usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: (req, res) => {
        const newUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        };

        Usuario.create(newUsuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/dashboard');
        });
    },

    // Função de login
    loginUsuario: (req, res) => {
        const loginUsuario = {
            nome: req.body.nome,
            senha: req.body.senha
        };

        Usuario.login(loginUsuario, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }

            req.session.usuarioCod = usuario.cod; 

            res.redirect('/dashboard'); 
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
            nome: req.body.nome,
            email: req.body.email,
            password: req.body.password
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
