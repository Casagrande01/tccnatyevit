const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        const query = 'INSERT INTO produtos (nome, descricao, peso, validade, marca, valor, foto, dimensoes, material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [produto.nome, produto.descricao, produto.peso, produto.validade, produto.marca, produto.valor, produto.foto, produto.dimensoes, produto.material], (err, results) => {
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
            callback(null, results[0]);
        });
    },

    update: (id, produto, callback) => {
        const query = 'UPDATE produtos SET nome = ?, peso = ?, descricao = ?, validade = ?, marca = ?, valor = ?, foto = ?, dimensoes = ?, material = ? WHERE cod = ?';
        db.query(query, [produto.nome, produto.peso, produto.descricao, produto.validade, produto.marca, produto.valor, produto.foto, produto.dimensoes, produto.material, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM produtos WHERE cod = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM produtos'; 
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Produto;
