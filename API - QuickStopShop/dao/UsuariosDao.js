const db = require("../config/conexao");

class UsuariosDAO {
    adicionarUsuario(usuario, callback) {
        const { titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos } = usuario; // Alteração aqui para incluir o idUsuario
        const sql = `INSERT INTO usuarios (idUsuario, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [this.lastID, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos], function (err) {
            if (err) {
                console.error('Erro ao adicionar usuário:', err.message);
                callback(err, null);
            } else {
                console.log(`Usuário adicionado com ID: ${this.lastID}`);
                callback(null, { idUsuario: this.lastID, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos });
            }
        });
    }
    obterUsuarios(callback) {
        const sql = 'SELECT * FROM usuarios';

        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err.message);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
    obterUsuarioPorId(id, callback) {
        const sql = 'SELECT * FROM usuarios WHERE idUsuario = ?';
        
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Erro ao buscar usuário por ID:', err.message);
                callback(err, null);
            } else {
                callback(null, row);
            }
        });
    }
}

module.exports = new UsuariosDAO();