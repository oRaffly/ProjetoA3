const db = require("../config/conexao");

class FuncionariosDAO {
    adicionar(funcionario) {
        const sql = `INSERT INTO funcionarios(nome, sobrenome, email, senha)
                     VALUES (?, ?, ?, ?)`;

        db.run(sql, [funcionario.nome, funcionario.sobrenome, funcionario.email, funcionario.senha], function (err) {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log(`Novo funcionário adicionado com ID: ${this.lastID}`);
        });
    }
    get(id, callback) {
        db.get('SELECT * FROM funcionarios WHERE id = ?', [id], (err, funcionario) => {
            if (err || funcionario == undefined) {
                callback("not found", null);
            } else {
                callback(null, funcionario);
            }
        });
    }
    all(callback) {
        db.all('SELECT * FROM funcionarios', [], (err, funcionarios) => {
            if (err || funcionarios == undefined) {
                callback("not found", null);
            } else {
                callback(null, funcionarios);
            }
        });
    }
    total(callback) {
        db.get('SELECT count(*) as count FROM funcionarios', [], (err, total) => {
            if (err || total == undefined) {
                callback("not found", null);
            } else {
                callback(null, total.count);
            }
        });
    }
    findByEmailAndPassword(email, senha, callback) {
        db.get('SELECT * FROM funcionarios WHERE email = ?', [email], (err, funcionario) => {
            if (err || funcionario === undefined) {
                callback("not found", null);
            } else {
                console.log('Email recebido:', email);
                console.log('Senha recebida:', senha);
    
                // Verificar se a senha fornecida corresponde à senha armazenada no banco de dados
                if (senha === funcionario.senha) {
                    const nomeCompleto = `${funcionario.nome} ${funcionario.sobrenome}`;
                    callback(null, { ...funcionario, nomeCompleto });
                } else {
                    console.log('Senha incorreta');
                    callback("not found", null);
                }
            }
        });
    }               
}

module.exports = new FuncionariosDAO();