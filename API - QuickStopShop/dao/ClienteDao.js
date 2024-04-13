const db = require("../config/conexao");
const bcrypt = require('bcrypt');

class ClienteDAO {
    adicionar(cliente) {
        const sql = `INSERT INTO clientes(nome, sobrenome, genero, dataNascimento, email, senha)
                     VALUES (?, ?, ?, ?, ?, ?)`;

        // Hash da senha antes de armazená-la no banco de dados
        bcrypt.hash(cliente.senha, 10, (err, hash) => {
            if (err) {
                console.error('Erro ao hashear a senha:', err);
                return;
            }

            db.run(sql, [cliente.nome, cliente.sobrenome, cliente.genero, cliente.dataNascimento, cliente.email, hash], function (err) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.log(`Novo cliente adicionado com ID: ${this.lastID}`);
            });
        });
    }
    get(id, callback) {
        db.get('SELECT * FROM clientes WHERE id = ?', [id], (err, cliente) => {
            if (err || cliente == undefined) {
                callback("not found", null);
            } else {
                callback(null, cliente);
            }
        });
    }
    all(callback) {
        db.all('SELECT * FROM clientes', [], (err, clientes) => {
            4
            if (err || clientes == undefined) {
                callback("not found", null);
            } else {
                callback(null, clientes);
            }
        });
    }
    total(callback) {
        db.get('SELECT count(*) as count FROM clientes', [], (err, total) => {
            if (err || total == undefined) {
                callback("not found", null);
            } else {
                callback(null, total.count);
            }
        });
    }
    findByEmailAndPassword(email, senha, callback) {
        db.get('SELECT * FROM clientes WHERE email = ?', [email], (err, cliente) => {
            if (err || cliente === undefined) {
                callback("not found", null);
            } else {
                console.log('Email recebido:', email);
                console.log('Senha recebida:', senha);
    
                // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
                bcrypt.compare(senha, cliente.senha, (err, res) => {
                    if (err) {
                        console.log('Erro ao comparar senhas:', err);
                        callback("not found", null);
                    } else if (res) {
                        const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
                        callback(null, { ...cliente, nomeCompleto });
                    } else {
                        console.log('Senha incorreta');
                        callback("not found", null);
                    }
                });
            }
        });
    }               
}
module.exports = new ClienteDAO();