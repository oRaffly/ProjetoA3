const db = require("../config/conexao");

class PlataformaDAO {
    adicionar(plataforma, callback) {
        const { nome, tipo } = plataforma;
        const sql = 'INSERT INTO plataformas (nome, tipo) VALUES (?, ?)';

        db.run(sql, [nome, tipo], function (err) {
            if (err) {
                console.error('Erro ao cadastrar plataforma:', err.message);
                callback(err, null);
            } else {
                console.log(`Nova plataforma cadastrada com ID: ${this.lastID}`);
                callback(null, { id: this.lastID, nome, tipo });
            }
        });
    }
    obterPlataformas(callback) {
        const sql = 'SELECT * FROM plataformas';

        db.all(sql, [], (err, plataformas) => {
            if (err) {
                console.error('Erro ao buscar plataformas:', err.message);
                callback(err, null);
            } else {
                console.log('Plataformas encontradas:', plataformas);
                callback(null, plataformas);
            }
        });
    }
    remover(id, callback) {
        const sql = 'DELETE FROM plataformas WHERE id = ?';

        db.run(sql, [id], function (err) {
            if (err) {
                console.error('Erro ao remover plataforma:', err.message);
                callback(err, null);
            } else {
                console.log(`Plataforma removida com ID: ${id}`);
                callback(null, { id });
            }
        });
    }
}
module.exports = new PlataformaDAO();