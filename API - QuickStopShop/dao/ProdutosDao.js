const db = require("../config/conexao");

class ProdutosDAO {
    cadastrarProduto(produto, callback) {
        const { categoria, dataCriacao, nomeProduto, quantidade } = produto;
        const sql = 'INSERT INTO produtos (idProduto, categoria, dataCriacao, nomeProduto, quantidade) VALUES (?, ?, ?, ?, ?)';
        
        db.run(sql, [this.lastID, categoria, dataCriacao, nomeProduto, quantidade], function (err) {
            if (err) {
                console.error('Erro ao cadastrar produto:', err.message);
                callback(err, null);
            } else {
                console.log(`Novo produto cadastrado com ID: ${this.lastID}`);
                callback(null, { idProduto: this.lastID, categoria, dataCriacao, nomeProduto, quantidade });
            }
        });
    }
    obterProdutos(callback) {
        const sql = 'SELECT * FROM produtos'; // Consulta para selecionar todos os produtos
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao obter produtos:', err.message);
                callback(err, null);
            } else {
                callback(null, rows); // Retorna os produtos encontrados no banco de dados
            }
        });
    }
}

module.exports = new ProdutosDAO();