const db = require("../config/conexao");

class JogoDAO {
    adicionar(jogo, callback) {
        const { nome, fabricante, plataforma_id, status } = jogo;
        const sql = 'INSERT INTO jogos (nome, fabricante, plataforma_id, status) VALUES (?, ?, ?, ?)';
        
        db.run(sql, [nome, fabricante, plataforma_id, status], function (err) {
            if (err) {
                console.error('Erro ao cadastrar jogo:', err.message);
                callback(err, null);
            } else {
                console.log(`Novo jogo cadastrado com ID: ${this.lastID}`);
                callback(null, { id: this.lastID, nome, fabricante, plataforma_id, status });
            }
        });
    }
    obterJogos(callback) {
        const sql = 'SELECT * FROM jogos'; // Consulta para selecionar todos os jogos
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao obter jogos:', err.message);
                callback(err, null);
            } else {
                callback(null, rows); // Retorna os jogos encontrados no banco de dados
            }
        });
    }
    obterJogoPorId(id, callback) {
        const sql = 'SELECT * FROM jogos WHERE id = ?'; // Consulta para selecionar um jogo pelo ID
        
        db.get(sql, [id], (err, row) => {
            if (err) {
                console.error('Erro ao obter jogo por ID:', err.message);
                callback(err, null);
            } else {
                callback(null, row); // Retorna o jogo encontrado ou null se não encontrado
            }
        });
    }
    atualizar(id, novoJogo, callback) {
        const { nome, fabricante, plataforma_id, status } = novoJogo;
        const sql = 'UPDATE jogos SET nome = ?, fabricante = ?, plataforma_id = ?, status = ? WHERE id = ?';

        db.run(sql, [nome, fabricante, plataforma_id, status, id], function (err) {
            if (err) {
                console.error('Erro ao atualizar jogo:', err.message);
                callback(err, null);
            } else {
                if (this.changes === 0) {
                    // Nenhum jogo foi atualizado (possivelmente não foi encontrado)
                    callback(null, null);
                } else {
                    // Jogo atualizado com sucesso
                    console.log(`Jogo atualizado com ID: ${id}`);
                    callback(null, { id, nome, fabricante, plataforma_id, status });
                }
            }
        });
    }
    remover(id, callback) {
        const sql = 'DELETE FROM jogos WHERE id = ?'; // Query para deletar o jogo pelo ID
        
        db.run(sql, [id], function (err) {
            if (err) {
                console.error('Erro ao remover jogo:', err.message);
                callback(err, null);
            } else {
                console.log(`Jogo removido com ID: ${id}`);
                callback(null, { id });
            }
        });
    }
}

module.exports = new JogoDAO();