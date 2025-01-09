const Usuario = require('../models/usuarioModel');

const usuarioController = {
    loginUsuario: (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        // Chama o modelo para verificar o login
        Usuario.login({ email, senha }, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao tentar logar.' });
            }
            if (!usuario) {
                return res.status(401).json({ message: 'Email ou senha incorretos.' });
            }

            // Configura a sessão do usuário
            req.session.usuarioId = usuario.id;

            // Redireciona para a página de perfil após login bem-sucedido
            res.redirect('/usuarios/perfil');
        });
    },

    createUsuario: (req, res) => {
        const { nome, email, senha, role } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
        }

        const newUsuario = { nome, email, senha, role };

        Usuario.create(newUsuario, (err) => {
            if (err) {
                console.log("Erro ao criar usuário:", err);  // Depuração do erro
                return res.status(500).json({ error: 'Erro ao criar usuário.' });
            }
            res.redirect('/usuarios/perfil');  // Após criar, redireciona para o perfil
        });
    },

    getPerfil: (req, res) => {
        const usuarioId = req.session.usuarioId;

        if (!usuarioId) {
            return res.redirect('/usuarios/login');
        }

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err || !usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Exibe os dados do usuário na página de perfil
            res.render('perfil', { usuario });
        });
    },

    getDashboard: (req, res) => {
        const usuarioId = req.session.usuarioId;

        if (!usuarioId) {
            return res.redirect('/usuarios/login');
        }

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err || !usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            res.render('dashboard', { usuario });
        });
    },

    getAllUsuarios: (req, res) => {
        Usuario.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('usuarios/index', { usuarios });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('usuarios/create');
    },

    renderEditForm: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/edit', { usuario });
        });
    },

    updateUsuario: (req, res) => {
        const usuarioId = req.params.id;
        const updatedUsuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            role: req.body.role,
        };

        Usuario.update(usuarioId, updatedUsuario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    deleteUsuario: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.delete(usuarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/usuarios');
        });
    },

    logoutUsuario: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao realizar logout.' });
            }
            res.redirect('/usuarios/login');
        });
    },
};

module.exports = usuarioController;
