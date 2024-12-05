const db = require('../config/db');

const usuario = {
    // Função para criar um novo usuário
    create: (usuario, callback) => {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        db.query(query, [usuario.nome, usuario.email, usuario.senha], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId)
        });
    },

    // Função para realizar o login
    login: (usuario, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nome = ?';
        db.query(query, [usuario.nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null); 
            }

            const user = results[0];

            if (user.senha !== usuario.senha) {
                return callback(null, null); 
            }
            callback(null, user);
        });
    },

    // Função para buscar um usuário pelo ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    // Função para buscar um usuário pelo nome de usuário
    findBynome: (nome, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Função para buscar todos os usuários
    getAll: (callback) => {
        const query = 'SELECT * FROM usuarios'; 
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Função para atualizar um usuário
    update: (id, usuario, callback) => {
        const query = 'UPDATE usuarios SET nome = ?, email = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [usuario.nome, usuario.email, usuario.password, usuario.role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Função para deletar um usuário
    delete: (id, callback) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Função para buscar usuários por nome (como pesquisa)
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM usuarios WHERE nome LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = usuario;
