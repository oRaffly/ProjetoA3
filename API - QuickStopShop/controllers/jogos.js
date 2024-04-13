const JogoDAO = require('../dao/JogoDao');

module.exports = app => {
    app.post('/cadastrarJogo', (req, res) => {
        const { nome, fabricante, plataforma_id, status } = req.body;
        
        JogoDAO.adicionar({ nome, fabricante, plataforma_id, status }, (err, jogo) => {
            if (err) {
                console.error('Erro ao cadastrar jogo:', err);
                res.status(500).json({ error: 'Erro ao cadastrar jogo' });
            } else {
                res.status(200).json({ message: 'Jogo cadastrado com sucesso', jogo });
            }
        });
    });

    app.get('/obterJogos', (req, res) => {
        JogoDAO.obterJogos((err, jogos) => {
            if (err) {
                console.error('Erro ao obter jogos:', err);
                res.status(500).json({ error: 'Erro ao obter jogos' });
            } else {
                res.status(200).json({ jogos });
            }
        });
    });

    // Rota para obter um jogo pelo ID
    app.get('/obterJogo/:id', (req, res) => {
        const jogoId = req.params.id;
        JogoDAO.obterJogoPorId(jogoId, (err, jogo) => {
            if (err) {
                console.error('Erro ao obter jogo por ID:', err);
                res.status(500).json({ error: 'Erro ao obter jogo por ID' });
            } else {
                res.status(200).json({ jogo });
            }
        });
    });

    app.put('/atualizarJogo/:id', (req, res) => {
        const jogoId = req.params.id;
        const { nome, fabricante, plataforma_id, status } = req.body;
    
        JogoDAO.atualizar(jogoId, { nome, fabricante, plataforma_id, status }, (err, jogoAtualizado) => {
            if (err) {
                console.error('Erro ao atualizar jogo:', err);
                res.status(500).json({ error: 'Erro ao atualizar jogo' });
            } else if (!jogoAtualizado) {
                res.status(404).json({ error: 'Jogo não encontrado' });
            } else {
                res.status(200).json({ message: 'Jogo atualizado com sucesso', jogo: jogoAtualizado });
            }
        });
    });

    app.delete('/removerJogo/:id', (req, res) => {
        const jogoId = req.params.id;
        JogoDAO.remover(jogoId, (err, jogoRemovido) => {
            if (err) {
                console.error('Erro ao remover jogo:', err);
                res.status(500).json({ error: 'Erro ao remover jogo' });
            } else {
                res.status(200).json({ message: 'Jogo removido com sucesso', jogo: jogoRemovido });
            }
        });
    });
};