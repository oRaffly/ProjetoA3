const UsuariosDAO = require('../dao/UsuariosDao');

module.exports = app => {
    app.get('/obterUsuarios', (req, res) => {
        UsuariosDAO.obterUsuarios((err, usuarios) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err);
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            } else {
                res.status(200).json({ usuarios });
            }
        });
    });

    // Rota para obter um usuário por ID
    app.get('/obterUsuarioPorId/:idUsuario', (req, res) => {
        const id = req.params.idUsuario; // Obtém o idUsuario da URL
        UsuariosDAO.obterUsuarioPorId(id, (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar usuário por ID:', err);
                res.status(500).json({ error: 'Erro ao buscar usuário por ID' });
            } else {
                res.status(200).json({ usuario });
            }
        });
    });
};