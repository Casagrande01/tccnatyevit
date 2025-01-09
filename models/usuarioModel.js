const db = require('../config/db');

const usuario = {
    login: (usuario, callback) => {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(query, [usuario.email], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null); // Usuário não encontrado
            }

            const user = results[0];
            if (user.senha !== usuario.senha) {
                return callback(null, null); // Senha incorreta
            }
            callback(null, user); // Usuário encontrado e senha correta
        });
    },

    create: (usuario, callback) => {
        const query = usuario.role 
            ? 'INSERT INTO usuarios (nome, email, senha, role) VALUES (?, ?, ?, ?)' 
            : 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';

        const params = usuario.role 
            ? [usuario.nome, usuario.email, usuario.senha, usuario.role] 
            : [usuario.nome, usuario.email, usuario.senha];

        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM usuarios';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    update: (id, usuario, callback) => {
        const query = usuario.role 
            ? 'UPDATE usuarios SET nome = ?, email = ?, senha = ?, role = ? WHERE id = ?' 
            : 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';

        const params = usuario.role 
            ? [usuario.nome, usuario.email, usuario.senha, usuario.role, id] 
            : [usuario.nome, usuario.email, usuario.senha, id];

        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};

module.exports = usuario;
