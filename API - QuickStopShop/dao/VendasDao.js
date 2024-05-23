const db = require("../config/conexao");

class VendasDAO {
    cadastrarVendas(venda, callback) {
        const { dataVenda, categoria, totalCompras, precoTotal, idUsuario } = venda;
        const sql = 'INSERT INTO vendas (idVenda, dataVenda, categoria, totalCompras, precoTotal, idUsuario) VALUES (?, ?, ?, ?, ?, ?)';
        
        db.run(sql, [this.lastID, dataVenda, categoria, totalCompras, precoTotal, idUsuario], function (err) {
            if (err) {
                console.error('Erro ao cadastrar vendas:', err.message);
                callback(err, null);
            } else {
                console.log(`Nova venda cadastrado com ID: ${this.lastID}`);
                callback(null, { idVenda: this.lastID, dataVenda, categoria, totalCompras, precoTotal, idUsuario });
            }
        });
    }
    obterVendas(callback) {
        const sql = 'SELECT * FROM vendas'; // Consulta para selecionar todos as vendas
        
        db.all(sql, [], (err, rows) => {
            if (err) {
                console.error('Erro ao obter vendas:', err.message);
                callback(err, null);
            } else {
                callback(null, rows); // Retorna as vendas encontrados no banco de dados
            }
        });
    }
}

module.exports = new VendasDAO();