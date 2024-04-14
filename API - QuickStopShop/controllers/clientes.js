const ClienteDAO = require('../dao/ClienteDao')

module.exports = app => {
    app.post('/cadastro', (request, response) => {
        const { nome, sobrenome, genero, dataNascimento, cadastroEmail, cadastroSenha } = request.body;

        const novoUsuario = {
            nome,
            sobrenome,
            genero,
            dataNascimento,
            email: cadastroEmail,
            senha: cadastroSenha
        };

        ClienteDAO.adicionar(novoUsuario); // Adiciona o novo usuário ao banco de dados

        response.status(200).send('Usuário cadastrado com sucesso!');
    });

    // Rota para o login de usuários
    app.post('/login', (request, response) => {
        const { loginEmail, loginSenha } = request.body;

        console.log("Email recebido:", loginEmail); 
        console.log("Senha recebida:", loginSenha); 

        // Verificar se existe um cliente com o email fornecido
        ClienteDAO.findByEmailAndPassword(loginEmail, loginSenha, (err, cliente) => {
            if (err || !cliente) {
                response.status(401).send('E-mail ou senha incorretos.');
            } else {
                // Se o login for bem-sucedido, retorne o nome completo do usuário
                const nomeCompleto = `${cliente.nome} ${cliente.sobrenome}`;
                response.status(200).send({ message: 'Login bem-sucedido!', nomeCompleto });
            }
        });
    });
}