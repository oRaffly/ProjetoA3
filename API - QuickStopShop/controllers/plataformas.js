const PlataformaDAO = require('../dao/PlataformaDao')

module.exports = app => {
    app.post('/cadastrarPlataforma', (req, res) => {
        const { nome, tipo } = req.body;
        PlataformaDAO.adicionar({ nome, tipo }, (err, plataforma) => {
            if (err) {
                console.error('Erro ao cadastrar plataforma:', err);
                res.status(500).json({ error: 'Erro ao cadastrar plataforma' });
            } else {
                res.status(200).json({ message: 'Plataforma cadastrada com sucesso' });
            }
        });
    });

    app.get('/obterPlataformas', (req, res) => {
        PlataformaDAO.obterPlataformas((err, plataformas) => {
            if (err) {
                console.error('Erro ao buscar plataformas:', err);
                res.status(500).json({ error: 'Erro ao buscar plataformas' });
            } else {
                res.status(200).json({ plataformas });
            }
        });
    });

    // Rota para remover uma plataforma pelo ID
    app.delete('/removerPlataforma/:id', (req, res) => {
        const plataformaId = req.params.id;
        PlataformaDAO.remover(plataformaId, (err, plataformaRemovida) => {
            if (err) {
                console.error('Erro ao remover plataforma:', err);
                res.status(500).json({ error: 'Erro ao remover plataforma' });
            } else {
                res.status(200).json({ message: 'Plataforma removida com sucesso', plataforma: plataformaRemovida });
            }
        });
    });
}