const Usuario = require('../models/usuarioModel');

const usuarioController = {
    createUsuario: (req, res) => {
        const { nome, email, senha, role } = req.body;

        // Se você não quer usar o campo 'role', remova a verificação para 'role' e o valor no objeto
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
        }

        // Se 'role' for necessário, adicione-o aqui
        const newUsuario = { nome, email, senha, role };

        Usuario.create(newUsuario, (err) => {
            if (err) {
                console.log("Erro ao criar usuário:", err);  // Depuração do erro
                return res.status(500).json({ error: 'Erro ao criar usuário.' });
            }
            res.redirect('/dashboard');  // Após criar, redireciona para o dashboard
        });
    },

    loginUsuario: (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({ message: 'Nome e senha são obrigatórios.' });
        }

        Usuario.login({ nome, senha }, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao tentar logar.' });
            }
            if (!usuario) {
                return res.status(401).json({ message: 'Nome de usuário ou senha incorretos.' });
            }

            req.session.usuarioId = usuario.id;
            res.redirect('/dashboard');
        });
    },

    getUsuarioById: (req, res) => {
        const usuarioId = req.params.id;

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.render('usuarios/show', { usuario });
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
            role: req.body.role,  // Se 'role' for opcional, remova essa linha
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

    searchUsuarios: (req, res) => {
        const search = req.query.search || '';

        Usuario.searchByName(search, (err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ usuarios });
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
