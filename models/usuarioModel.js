const db = require('../config/db');

const usuario = {
    // Função para criar um novo usuário
    create: (usuario, callback) => {
        const query = 'INSERT INTO usuarios (usuarioname, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(query, [usuario.usuarioname, usuario.email, usuario.password, usuario.role], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o ID do usuário criado
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
    findByusuarioname: (nome, callback) => {
        const query = 'SELECT * FROM usuarios WHERE usuarioname = ?';
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
        const query = 'UPDATE usuarios SET usuarioname = ?, email = ?, password = ?, role = ? WHERE id = ?';
        db.query(query, [usuario.usuarioname, usuario.email, usuario.password, usuario.role, id], (err, results) => {
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
        const query = 'SELECT * FROM usuarios WHERE usuarioname LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = usuario;
