const ProdutosDAO = require('../dao/ProdutosDao');

module.exports = app => {
    app.post('/cadastrarProdutos', (req, res) => {
        const { categoria, dataCriacao, nomeProduto, quantidade } = req.body;
        
        ProdutosDAO.cadastrarProduto({ categoria, dataCriacao, nomeProduto, quantidade }, (err, produto) => {
            if (err) {
                console.error('Erro ao cadastrar produto:', err);
                res.status(500).json({ error: 'Erro ao cadastrar produto' });
            } else {
                res.status(200).json({ message: 'Produto cadastrado com sucesso', produto });
            }
        });
    });

    app.get('/obterProdutos', (req, res) => {
        ProdutosDAO.obterProdutos((err, produtos) => {
            if (err) {
                console.error('Erro ao obter produtos:', err);
                res.status(500).json({ error: 'Erro ao obter produtos' });
            } else {
                res.status(200).json({ produtos });
            }
        });
    });
};