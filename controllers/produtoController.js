const Produto = require('../models/produtoModel');

const produtoController = {
    // Criar um novo produto
    createProduto: async (req, res) => {
        try {
            const { nome, descricao, valor, categoria } = req.body;
            const foto = req.file ? req.file.filename : null;  // Obtém o nome do arquivo de imagem, caso exista

            // Validação de dados
            if (!nome || !valor || !categoria) {
                return res.status(400).json({ error: 'Nome, valor e categoria são obrigatórios' });
            }

            // Criar o novo produto
            const newProduto = { nome, descricao, valor, foto, categoria };

            const produtoId = await Produto.create(newProduto);
            res.status(201).redirect('/produtos'); // Redireciona após criação com status 201

        } catch (err) {
            console.error('Erro ao criar produto:', err);
            res.status(500).json({ error: 'Erro interno ao criar produto' });
        }
    },

    // Buscar um produto por ID
    getProdutoById: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findById(produtoId);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.render('produtos/show', { produto });
        } catch (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno ao buscar produto' });
        }
    },

    // Buscar todos os produtos
    getAllProdutos: async (req, res) => {
        try {
            const produtos = await Produto.getAll();
            res.render('produtos/index', { produtos });
        } catch (err) {
            console.error('Erro ao listar produtos:', err);
            res.status(500).json({ error: 'Erro interno ao listar produtos' });
        }
    },

    // Renderizar o formulário de criação
    renderCreateForm: (req, res) => {
        res.render('produtos/create');
    },

    // Renderizar o formulário de edição
    renderEditForm: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const produto = await Produto.findById(produtoId);

            if (!produto) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            res.render('produtos/edit', { produto });
        } catch (err) {
            console.error('Erro ao buscar produto para edição:', err);
            res.status(500).json({ error: 'Erro interno ao buscar produto para edição' });
        }
    },

    // Atualizar um produto
    updateProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            const { nome, descricao, valor, categoria } = req.body;
            const foto = req.file ? req.file.filename : null;  // Atualiza a foto, se houver

            // Validação de dados
            if (!nome || !valor || !categoria) {
                return res.status(400).json({ error: 'Nome, valor e categoria são obrigatórios para atualizar o produto' });
            }

            const updatedProduto = { nome, descricao, valor, foto, categoria };
            await Produto.update(produtoId, updatedProduto);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro interno ao atualizar produto' });
        }
    },

    // Deletar um produto
    deleteProduto: async (req, res) => {
        try {
            const produtoId = req.params.id;
            await Produto.delete(produtoId);
            res.redirect('/produtos');
        } catch (err) {
            console.error('Erro ao excluir produto:', err);
            res.status(500).json({ error: 'Erro interno ao excluir produto' });
        }
    }
};

module.exports = produtoController;