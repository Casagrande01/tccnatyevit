const db = require('../config/db');

const instalacao = {
    create: (instalacao, callback) => {
        const query = 'INSERT INTO instalacaos (nome) VALUES (?)';
        db.query(query, [instalacao.nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM instalacaos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    findByinstalacaoname: (nome, callback) => {
        const query = 'SELECT * FROM instalacaos WHERE nome = ?';
        db.query(query, [nome], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    update: (id, instalacao, callback) => {
        const query = 'UPDATE instalacaos SET nome = ? WHERE id = ?';
        db.query(query, [instalacao.nome,id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM instalacaos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM instalacaos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },
};


module.exports = instalacao;