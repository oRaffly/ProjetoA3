const conexao = require('./conexao');
// const ClienteDAO = require('../dao/ClienteDao');
// const Cliente = require('../models/Cliente');
const FuncionariosDAO = require('../dao/FuncionariosDao');
const Funcionarios = require('../models/Funcionarios');
const ProdutosDAO = require('../dao/ProdutosDao');
const Produtos = require('../models/Produtos');
const CategoriasDAO = require('../dao/CategoriasDao');
const Categorias = require('../models/Categorias');
const UsuariosDao = require('../dao/UsuariosDao');
const Usuarios = require('../models/Usuarios');
const ComprasDAO = require('../dao/ComprasDao');
const Compras = require('../models/Compras');
const VendasDAO = require('../dao/VendasDao');
const Vendas = require('../models/Vendas');

class Tabelas {
    init() {
        conexao.serialize(() => {
            // Criação da tabela usuários
            conexao.run(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    idUsuario INTEGER PRIMARY KEY,
                    titulo VARCHAR(255) NOT NULL,
                    dataInscricao DATE NOT NULL,
                    nomeUsuario VARCHAR(255) NOT NULL,
                    genero VARCHAR(50) NOT NULL,
                    idade INTEGER NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    telefone VARCHAR(20) NOT NULL,
                    cep VARCHAR(10) NOT NULL,
                    enderecos TEXT, -- Armazenar múltiplos endereços como JSON ou JSONB
                    nCompras INTEGER NOT NULL,
                    nCancelamentos INTEGER NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela categorias
            conexao.run(`
                CREATE TABLE IF NOT EXISTS categorias (
                    id INTEGER PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela produtos
            conexao.run(`
                CREATE TABLE IF NOT EXISTS produtos (
                    idProduto INTEGER PRIMARY KEY,
                    categoria VARCHAR(255) NOT NULL,
                    dataCriacao DATE NOT NULL,
                    nomeProduto VARCHAR(255) NOT NULL,
                    quantidade INTEGER NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela compras
            conexao.run(`
                CREATE TABLE IF NOT EXISTS compras (
                    id INTEGER PRIMARY KEY,
                    idProduto INTEGER NOT NULL,
                    nomeProduto VARCHAR(255) NOT NULL,
                    quantidade INTEGER NOT NULL,
                    preco VARCHAR(255) NOT NULL,
                    status VARCHAR(255) NOT NULL,
                    dataCompra DATE NOT NULL,
                    idUsuario INTEGER NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela vendas
            conexao.run(`
                CREATE TABLE IF NOT EXISTS vendas (
                    idVenda INTEGER PRIMARY KEY,
                    dataVenda DATE NOT NULL,
                    categoria VARCHAR(255) NOT NULL,
                    totalCompras INTEGER NOT NULL,
                    precoTotal VARCHAR(255) NOT NULL,
                    idUsuario INTEGER NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela funcionarios
            conexao.run(`
                 CREATE TABLE IF NOT EXISTS funcionarios (
                    id INTEGER PRIMARY KEY,
                    nome varchar(255) NOT NULL,
                    sobrenome varchar(255) NOT NULL,
                    email varchar(255) NOT NULL,
                    senha varchar(255) NOT NULL
                 )
             `);
        });
    }

    seed() {
        UsuariosDao.obterUsuarios((err, usuarios) => {
            if (usuarios.length === 0) {
                const novosUsuarios = [
                    new Usuarios('Cliente', '01/01/2000', 'Cliente 1', 'Masculino', 30, 'cliente1@teste.com', '123456', '12345678', [], 3, 0),
                    new Usuarios('Cliente', '12/06/2003', 'Cliente 2', 'Feminino', 35, 'cliente2@teste.com', '789012', '87654321', [], 3, 0),
                    new Usuarios('Cliente', '30/12/2010', 'Cliente 3', 'Masculino', 40, 'cliente3@teste.com', '345678', '98765432', [], 3, 0)
                ];

                novosUsuarios.forEach(novoUsuario => {
                    UsuariosDao.adicionarUsuario(novoUsuario, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar usuário:', err);
                            return;
                        }
                        console.log(`Usuário adicionado com ID: ${userId}`);
                    });
                });
            }
        });
        FuncionariosDAO.total((err, total) => {
            if (total == 0) {
                FuncionariosDAO.adicionar(new Funcionarios('Funcionario 1', 'Sobrenome 1', 'funcionario@teste.com', '123456'), (err, userId) => {
                    if (err) {
                        console.error('Erro ao adicionar funcionário:', err);
                        return;
                    }
                    console.log(`Funcionário adicionado com ID: ${userId}`);
                });
                // Repita para os outros funcionarios, se necessário
            }
        });
        ProdutosDAO.obterProdutos((err, produtos) => {
            if (produtos.length == 0) {
                const novosProdutos = [
                    new Produtos('Categoria 1', '10/02/2012', 'Produto 1', 10),
                    new Produtos('Categoria 2', '08/05/2015', 'Produto 2', 50),
                    new Produtos('Categoria 3', '23/11/2018', 'Produto 3', 5)
                ];

                novosProdutos.forEach(novoProduto => {
                    ProdutosDAO.cadastrarProduto(novoProduto, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar produto:', err);
                            return;
                        }
                        console.log(`Produto adicionado com ID: ${userId}`);
                    });
                });
            }
        });
        ComprasDAO.obterCompras((err, compras) => {
            if (compras.length == 0) {
                const novasCompras = [
                    new Compras(1, 'Produto 1', 1, 'R$1,00', 'Entregue', '10/02/2021', 1),
                    new Compras(2, 'Produto 2', 1, 'R$49,00', 'Em Transporte', '10/02/2021', 1),
                    new Compras(3, 'Produto 3', 1, 'R$50,00', 'Em Transporte', '10/02/2021', 1),
                    new Compras(2, 'Produto 2', 1, 'R$49,00', 'Em Transporte', '08/05/2020', 2),
                    new Compras(1, 'Produto 1', 1, 'R$1,00', 'Entregue', '08/05/2020', 2),
                    new Compras(3, 'Produto 3', 1, 'R$50,00', 'Em Transporte', '08/05/2020', 2),
                    new Compras(3, 'Produto 3', 1, 'R$50,00', 'Em Transporte', '23/11/2019', 3),
                    new Compras(2, 'Produto 2', 1, 'R$49,00', 'Em Transporte', '23/11/2019', 3),
                    new Compras(1, 'Produto 1', 1, 'R$1,00', 'Entregue', '23/11/2019', 3)
                ];

                novasCompras.forEach(novaCompra => {
                    ComprasDAO.cadastrarCompras(novaCompra, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar compra:', err);
                            return;
                        }
                        console.log(`Compra adicionada com ID: ${userId}`);
                    });
                });
            }
        });
        VendasDAO.obterVendas((err, vendas) => {
            if (vendas.length == 0) {
                const novasVendas = [
                    new Vendas('10/02/2021', 'Categoria 1, Cat...', 3, 'R$100,00', 1),
                    new Vendas('08/05/2020', 'Categoria 2, Cat...', 3, 'R$100,00', 2),
                    new Vendas('23/11/2019', 'Categoria 3, Cat...', 3, 'R$100,00', 3)
                ];

                novasVendas.forEach(novaVenda => {
                    VendasDAO.cadastrarVendas(novaVenda, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar venda:', err);
                            return;
                        }
                        console.log(`Venda adicionada com ID: ${userId}`);
                    });
                });
            }
        });
        CategoriasDAO.obterCategorias((err, categorias) => {
            if (categorias.length == 0) {
                const novasCategorias = [
                    new Categorias('Categoria 1'),
                    new Categorias('Categoria 2'),
                    new Categorias('Categoria 3')
                ];

                novasCategorias.forEach(novaCategoria => {
                    CategoriasDAO.cadastrarCategorias(novaCategoria, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar categoria:', err);
                            return;
                        }
                        console.log(`Categoria adicionada com ID: ${userId}`);
                    });
                });
            }
        });
    }
}

module.exports = new Tabelas();