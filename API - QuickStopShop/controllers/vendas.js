const VendasDAO = require('../dao/VendasDao');

module.exports = app => {
    app.post('/cadastrarVendas', (req, res) => {
        const { dataVenda, categoria, totalCompras, precoTotal, idUsuario } = req.body;
        
        VendasDAO.cadastrarVendas({ dataVenda, categoria, totalCompras, precoTotal, idUsuario }, (err, venda) => {
            if (err) {
                console.error('Erro ao cadastrar venda:', err);
                res.status(500).json({ error: 'Erro ao cadastrar venda' });
            } else {
                res.status(200).json({ message: 'Venda cadastrada com sucesso', venda });
            }
        });
    });

    app.get('/obterVendas', (req, res) => {
        VendasDAO.obterVendas((err, vendas) => {
            if (err) {
                console.error('Erro ao obter vendas:', err);
                res.status(500).json({ error: 'Erro ao obter vendas' });
            } else {
                res.status(200).json({ vendas });
            }
        });
    });
};