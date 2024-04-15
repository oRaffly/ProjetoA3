const conexao = require('./conexao');
const ClienteDAO = require('../dao/ClienteDao');
const Cliente = require('../models/Cliente');
const UsuariosDAO = require('../dao/UsuariosDao');
const Usuarios = require('../models/Usuarios');

class Tabelas {
    init() {
        conexao.serialize(() => {
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
    }

    seed() {
        // Verifica se a tabela de usuários está vazia antes de adicionar usuários
        UsuariosDAO.obterUsuarios((err, usuarios) => {
            if (err) {
                console.error('Erro ao verificar se a tabela de usuários está vazia:', err);
                return;
            }

            // Se não houver usuários na tabela, adiciona três usuários não aleatórios
            if (usuarios.length === 0) {
                const novosUsuarios = [
                    new Usuarios(null, 'Cliente', '1990-01-01', 'Cliente 1', 'Masculino', 30, 'cliente1@teste.com', '123456', '12345678', [], 0, 0),
                    new Usuarios(null, 'Cliente', '1990-01-01', 'Cliente 2', 'Feminino', 35, 'cliente2@teste.com', '789012', '87654321', [], 0, 0),
                    new Usuarios(null, 'Cliente', '1990-01-01', 'Cliente 3', 'Masculino', 40, 'cliente3@teste.com', '345678', '98765432', [], 0, 0)
                ];

                novosUsuarios.forEach(novoUsuario => {
                    UsuariosDAO.adicionarUsuario(novoUsuario, (err, userId) => {
                        if (err) {
                            console.error('Erro ao adicionar usuário:', err);
                            return;
                        }
                        console.log(`Usuário adicionado com ID: ${userId}`);
                    });
                });
            }
        });
    }
}

// class Tabelas {
//     init() {
//         conexao.serialize(() => {
//             conexao.run(`
//                 CREATE TABLE IF NOT EXISTS clientes (
//                     id INTEGER PRIMARY KEY,
//                     nome varchar(255) NOT NULL,
//                     sobrenome varchar(255) NOT NULL,
//                     genero varchar(50) NOT NULL,
//                     dataNascimento DATE NOT NULL,
//                     email varchar(255) NOT NULL,
//                     senha varchar(255) NOT NULL
//                 )
//             `);
//         });
//         conexao.serialize(() => {
//             // Criação da tabela plataformas
//             conexao.run(`
//                 CREATE TABLE IF NOT EXISTS plataformas (
//                     id INTEGER PRIMARY KEY,
//                     nome VARCHAR(255) NOT NULL,
//                     tipo VARCHAR(255) NOT NULL
//                 )
//             `);
//         });
//         conexao.serialize(() => {
//             // Criação da tabela jogos
//             conexao.run(`
//                 CREATE TABLE IF NOT EXISTS jogos (
//                     id INTEGER PRIMARY KEY,
//                     nome VARCHAR(255) NOT NULL,
//                     fabricante VARCHAR(255) NOT NULL,
//                     plataforma_id INTEGER NOT NULL,
//                     status VARCHAR(50) NOT NULL,
//                     FOREIGN KEY (plataforma_id) REFERENCES plataformas(id)
//                 )
//             `);
//         });
//     }

//     seed() {
//         ClienteDAO.total((err, total) => {
//             if (total == 0) {
//                 ClienteDAO.adicionar(new Cliente('Cliente 1', 'Sobrenome 1', 'Gênero 1', '1990-01-01', 'cliente1@teste.com', '123456'), (err, userId) => {
//                     if (err) {
//                         console.error('Erro ao adicionar usuário:', err);
//                         return;
//                     }
//                     console.log(`Usuário adicionado com ID: ${userId}`);
//                 });
//                 // Repita para os outros clientes, se necessário
//             }
//         });
//     }
// }

module.exports = new Tabelas();