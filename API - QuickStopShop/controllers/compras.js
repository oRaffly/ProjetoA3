const ComprasDAO = require('../dao/ComprasDao');

module.exports = app => {
    app.post('/cadastrarCompras', (req, res) => {
        const { idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario } = req.body;
        
        ComprasDAO.cadastrarCompras({ idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario }, (err, compra) => {
            if (err) {
                console.error('Erro ao cadastrar compra:', err);
                res.status(500).json({ error: 'Erro ao cadastrar compra' });
            } else {
                res.status(200).json({ message: 'Compra cadastrada com sucesso', compra });
            }
        });
    });

    app.get('/obterCompras', (req, res) => {
        ComprasDAO.obterCompras((err, compras) => {
            if (err) {
                console.error('Erro ao buscar compras:', err);
                res.status(500).json({ error: 'Erro ao buscar compras' });
            } else {
                res.status(200).json({ compras });
            }
        });
    });

    app.get('/obterComprasPorUsuario/:idUsuario', (req, res) => {
        const idUsuario = req.params.idUsuario;
        ComprasDAO.obterComprasPorUsuario(idUsuario, (err, compras) => {
            if (err) {
                console.error('Erro ao obter compras:', err);
                res.status(500).json({ error: 'Erro ao obter compras' });
            } else {
                res.status(200).json({ compras });
            }
        });
    });
    
    app.put('/atualizarStatus/:compraId', (req, res) => {
        const compraId = req.params.compraId;
        const { novoStatus } = req.body;

        ComprasDAO.atualizarStatus(compraId, novoStatus, (err, compra) => {
            if (err) {
                console.error('Erro ao atualizar status:', err);
                res.status(500).json({ error: 'Erro ao atualizar status' });
            } else {
                res.status(200).json({ message: 'Status atualizado com sucesso', compra });
            }
        });
    });
};