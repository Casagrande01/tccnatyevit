const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

const authController = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.render('index', { errorMessage: 'Email não encontrado.' });
      }

      const senhaCorreta = await bcrypt.compare(senha, user.senha);
      if (!senhaCorreta) {
        return res.render('index', { errorMessage: 'Senha incorreta.' });
      }

      req.session.userId = user.id;
      req.session.user = user;

      res.redirect('/dashboard');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  cadastro: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      const userExists = await Usuario.findOne({ where: { email } });

      if (userExists) {
        return res.render('cadastro', { errorMessage: 'Email já cadastrado.' });
      }

      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      const newUser = { nome, email, senha: senhaHash };
      const createdUser = await Usuario.create(newUser);

      req.session.userId = createdUser.id;
      req.session.user = createdUser;

      res.redirect('/dashboard');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect('/'); // Redireciona para a página inicial após logout
    });
  },
};

module.exports = authController;
