const conexao = require('./conexao');
const FuncionariosDAO = require('../dao/FuncionariosDao');
const Funcionarios = require('../models/Funcionarios');
const UsuariosDao = require('../dao/UsuariosDao');
const Usuarios = require('../models/Usuarios');

class Tabelas {
    init() {
        conexao.serialize(() => {
            // Criação da tabela usuários
            conexao.run(`
                CREATE TABLE IF NOT EXISTS usuarios (
                    id INTEGER PRIMARY KEY,
                    idUsuario INTEGER,
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
        // Verifica se a tabela de usuários está vazia antes de adicionar usuários
        UsuariosDao.obterUsuarios((err, usuarios) => {
            if (err) {
                console.error('Erro ao verificar se a tabela de usuários está vazia:', err);
                return;
            }

            // Se não houver usuários na tabela, adiciona três usuários não aleatórios
            if (usuarios.length === 0) {
                const novosUsuarios = [
                    new Usuarios(null, 'Cliente', '01/01/2000', 'Cliente 1', 'Masculino', 30, 'cliente1@teste.com', '123456', '12345678', [], 0, 0),
                    new Usuarios(null, 'Cliente', '02/01/2000', 'Cliente 2', 'Feminino', 35, 'cliente2@teste.com', '789012', '87654321', [], 0, 0),
                    new Usuarios(null, 'Cliente', '03/01/2000', 'Cliente 3', 'Masculino', 40, 'cliente3@teste.com', '345678', '98765432', [], 0, 0)
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
    }
}

module.exports = new Tabelas();