const db = require("../config/conexao");

class CategoriasDAO {
    cadastrarCategorias(categoria, callback) {
        const { nome } = categoria;
        const sql = 'INSERT INTO categorias (nome) VALUES (?)';

        db.run(sql, [nome], function (err) {
            if (err) {
                console.error('Erro ao cadastrar categoria:', err.message);
                callback(err, null);
            } else {
                console.log(`Nova categoria cadastrada com ID: ${this.lastID}`);
                callback(null, { id: this.lastID, nome });
            }
        });
    }

    obterCategorias(callback) {
        const sql = 'SELECT * FROM categorias';

        db.all(sql, [], (err, categorias) => {
            if (err) {
                console.error('Erro ao buscar categorias:', err.message);
                callback(err, null);
            } else {
                console.log('Categorias encontradas:', categorias);
                callback(null, categorias);
            }
        });
    }
}

module.exports = new CategoriasDAO();