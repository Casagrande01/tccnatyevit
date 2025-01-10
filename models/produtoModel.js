const db = require('../config/db');

const Produto = {
    create: (produto, callback) => {
        // Corrigido: A query agora tem 6 parâmetros, que são passados corretamente
        const query = 'INSERT INTO produtos (nome, descricao, valor, foto, categoria) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [produto.nome, produto.descricao, produto.valor, produto.foto, produto.categoria], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results.insertId); // Retorna o id do produto recém inserido
        });
    },

    findById: (id, callback) => {
        // A query agora busca o produto usando o id
        const query = 'SELECT * FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            // Verifica se existe algum produto com esse id
            if (results.length === 0) {
                return callback(null, null); // Nenhum produto encontrado
            }
            callback(null, results[0]); // Retorna o primeiro produto encontrado
        });
    },

    update: (id, produto, callback) => {
        // Corrigido: Adicionado o campo peso e corrigido a inconsistência com o nome da chave primária
        const query = 'UPDATE produtos SET nome = ?, descricao = ?, valor = ?, foto = ?, categoria = ? WHERE id = ?';
        db.query(query, [produto.nome, produto.descricao, produto.valor, produto.foto, produto.categoria, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    delete: (id, callback) => {
        // Corrigido: Usando `id` em vez de `cod`
        const query = 'DELETE FROM produtos WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna o resultado da operação
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM produtos';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results); // Retorna todos os produtos encontrados
        });
    }
};

module.exports = Produto;
