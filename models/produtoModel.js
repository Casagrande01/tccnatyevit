// models/produtoModel.js
const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produtos (nome, descricao, valor, foto, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [produto.nome, produto.descricao, produto.valor, produto.foto, produto.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            if (results.length === 0) {
                return callback(null, null); 
            }
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET nome = ?, descricao = ?, valor = ?, foto = ?, categoria = ? WHERE id = ?';
        db.query(query, [produto.nome, produto.descricao, produto.valor, produto.foto, produto.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    // Alteração aqui para usar Promises
    getAll: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM produtos';
            db.query(query, (err, results) => {
                if (err) {
                    reject(err); // Caso haja erro, rejeita a Promise
                }
                resolve(results); // Caso contrário, resolve a Promise com os resultados
            });
        });
    }
};

module.exports = Produto;
