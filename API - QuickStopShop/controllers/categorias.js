const CategoriasDAO = require('../dao/CategoriasDao')

module.exports = app => {
    app.post('/cadastrarCategorias', (req, res) => {
        const { nome } = req.body;
        CategoriasDAO.cadastrarCategorias({ nome }, (err, categoria) => {
            if (err) {
                console.error('Erro ao cadastrar categoria:', err);
                res.status(500).json({ error: 'Erro ao cadastrar categoria' });
            } else {
                res.status(200).json({ message: 'Categoria cadastrada com sucesso' });
            }
        });
    });

    app.get('/obterCategorias', (req, res) => {
        CategoriasDAO.obterCategorias((err, categorias) => {
            if (err) {
                console.error('Erro ao buscar categorias:', err);
                res.status(500).json({ error: 'Erro ao buscar categorias' });
            } else {
                res.status(200).json({ categorias });
            }
        });
    });
}