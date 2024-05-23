const db = require("../config/conexao");

class ComprasDAO {
    cadastrarCompras(compra, callback) {
        const { idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario } = compra;
        const sql = 'INSERT INTO compras (idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
        
        db.run(sql, [idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario], function (err) {
            if (err) {
                console.error('Erro ao cadastrar compras:', err.message);
                callback(err, null);
            } else {
                console.log(`Nova compra cadastrada com ID: ${this.lastID}`);
                callback(null, { id: this.lastID, idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario });
            }
        });
    }
    obterCompras(callback) {
        const sql = 'SELECT * FROM compras'; // Consulta para selecionar todos as compras
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao obter compras:', err.message);
                callback(err, null);
            } else {
                callback(null, rows); // Retorna as compras encontrados no banco de dados
            }
        });
    }
    obterComprasPorUsuario(idUsuario, callback) {
        const sql = 'SELECT * FROM compras WHERE idUsuario = ?';
        
        db.all(sql, [idUsuario], (err, rows) => {
            if (err) {
                console.error('Erro ao obter compras por idUsuario:', err.message);
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    }
}

module.exports = new ComprasDAO();