const conexao = require('./conexao');
const ClienteDAO = require('../dao/ClienteDao');
const Cliente = require('../models/Cliente');

class Tabelas {
    init() {
        conexao.serialize(() => {
            conexao.run(`
                CREATE TABLE IF NOT EXISTS clientes (
                    id INTEGER PRIMARY KEY,
                    nome varchar(255) NOT NULL,
                    sobrenome varchar(255) NOT NULL,
                    genero varchar(50) NOT NULL,
                    dataNascimento DATE NOT NULL,
                    email varchar(255) NOT NULL,
                    senha varchar(255) NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela plataformas
            conexao.run(`
                CREATE TABLE IF NOT EXISTS plataformas (
                    id INTEGER PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL,
                    tipo VARCHAR(255) NOT NULL
                )
            `);
        });
        conexao.serialize(() => {
            // Criação da tabela jogos
            conexao.run(`
                CREATE TABLE IF NOT EXISTS jogos (
                    id INTEGER PRIMARY KEY,
                    nome VARCHAR(255) NOT NULL,
                    fabricante VARCHAR(255) NOT NULL,
                    plataforma_id INTEGER NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    FOREIGN KEY (plataforma_id) REFERENCES plataformas(id)
                )
            `);
        });
    }

    seed() {
        ClienteDAO.total((err, total) => {
            if (total == 0) {
                ClienteDAO.adicionar(new Cliente('Cliente 1', 'Sobrenome 1', 'Gênero 1', '1990-01-01', 'cliente1@teste.com', '123456'), (err, userId) => {
                    if (err) {
                        console.error('Erro ao adicionar usuário:', err);
                        return;
                    }
                    console.log(`Usuário adicionado com ID: ${userId}`);
                });
                // Repita para os outros clientes, se necessário
            }
        });
    }
}

module.exports = new Tabelas();