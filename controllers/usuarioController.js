const Usuario = require('../models/usuarioModel');

const usuarioController = {
    loginUsuario: (req, res) => {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.render('login', { errorMessage: 'Email e senha são obrigatórios' });
        }

        Usuario.login({ email, senha }, (err, usuario) => {
            if (err) {
                return res.render('login', { errorMessage: 'Erro ao tentar logar: ' + err });
            }
            if (!usuario) {
                return res.render('login', { errorMessage: 'Usuário ou senha incorretos' });
            }

            console.log(usuario);

            // Configura a sessão do usuário, agora usando 'cod' no lugar de 'id'
            req.session.usuarioId = usuario.cod;  // Corrigido para 'cod'

            // Redireciona para a página de perfil após login bem-sucedido
            res.redirect('/usuarios/perfil');
            return;
        });
    },

    getPerfil: (req, res) => {
        const usuarioId = req.session.usuarioId;  // Usando 'usuarioId' armazenado na sessão

        // Usando getAll com filtro para buscar pelo 'cod'
        Usuario.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ message: 'Erro ao buscar usuário. ' + err });
            }

            const usuario = usuarios.find(u => u.cod === usuarioId);  // Filtrando pelo 'cod'
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            // Exibe os dados do usuário na página de perfil
            res.render('perfil', { usuario });
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
                console.log("Erro ao criar usuário:", err);
                return res.status(500).json({ error: 'Erro ao criar usuário.' });
            }
            res.redirect('/usuarios/perfil');
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

        // Usando getAll com filtro para buscar pelo 'cod'
        Usuario.getAll((err, usuarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }

            const usuario = usuarios.find(u => u.cod === usuarioId);  // Filtrando pelo 'cod'
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
