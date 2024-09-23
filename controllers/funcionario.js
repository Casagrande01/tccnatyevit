const funcionario = require('../models/funcionarioModel');
const Categoria = require('../models/categoriaModel');

const funcionarioController = {

    createFuncionario: (req, res) => {

        const newFuncionario = {
            cod: req.body.cod,
            nome: req.body.nome,
            endereco: req.body.endereco,
            fone: req.body.fone,
            valor: req.body.valor,
            datadenasc: req.body.datadenasc,
            cpf: req.body.cpf,
            foto: req.body.foto,
            tiposanguineo: req.body.tiposanguineo,
            comorbidade: req.body.comorbidade,
            medicacao: req.body.medicacao,
            cttemergencia: req.body.cttemergencia,
            alergia: req.body.alergia,

        };

        Funcionario.create(newFuncionario, (err, funcionarioId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/funcionarios');
        });
    },

    getFuncionarioById: (req, res) => {
        const funcionarioId = req.params.id;

        Funcionario.findById(funcionarioId, (err, funcionario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!funcionario) {
                return res.status(404).json({ message: 'Funcionario not found' });
            }
            res.render('funcionarios/show', { funcionario });
        });
    },
    
    getAllFuncionarios: (req, res) => {
        const categoria = req.query.categoria || null;
        
        Funcionario.getAll(categoria, (err, funcionarios) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('funcionarios/index', { funcionarios, categorias, categoriaSelecionada: categoria });
            });
        });
    },

    renderCreateForm: (req, res) => {
        Categoria.getAll((err, categorias) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('funcionarios/create', { categorias });
        });
    },

    renderEditForm: (req, res) => {
        const funcionarioId = req.params.id;

        Funcionario.findById(funcionarioId, (err, funcionario) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!funcionario) {
                return res.status(404).json({ message: 'Funcionario not found' });
            }

            Categoria.getAll((err, categorias) => {
                if (err) {
                    return res.status(500).json({ error: err });
                }
                res.render('funcionarios/edit', { funcionario, categorias });
            });
        });
    },

    updateFuncionario: (req, res) => {
        const funcionarioId = req.params.id;
        
        const updatedFuncionario = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            preco: req.body.preco,
            quantidade: req.body.quantidade,
            categoria: req.body.categoria
        };

        Funcionario.update(funcionarioId, updatedFuncionario, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/funcionarios');
        });
    },

    deleteFuncionario: (req, res) => {
        const funcionarioId = req.params.id;

        Funcionario.delete(funcionarioId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/funcionarios');
        });
    }
};

module.exports = funcionarioController;
