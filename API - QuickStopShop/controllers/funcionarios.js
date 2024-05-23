const FuncionariosDAO = require('../dao/FuncionariosDao')

module.exports = app => {
    app.post('/cadastroFucionario', (request, response) => {
        const { nome, sobrenome, cadastroEmail, cadastroSenha } = request.body;

        const novoFuncionario = {
            nome,
            sobrenome,
            email: cadastroEmail,
            senha: cadastroSenha
        };

        FuncionariosDAO.adicionar(novoFuncionario); // Adiciona o novo funcionário ao banco de dados

        response.status(200).send('Funcionário cadastrado com sucesso!');
    });

    // Rota para o login de funcionários
    app.post('/loginFuncionario', (request, response) => {
        const { loginEmail, loginSenha } = request.body;

        console.log("Email recebido:", loginEmail); 
        console.log("Senha recebida:", loginSenha); 

        // Verificar se existe um funcionario com o email fornecido
        FuncionariosDAO.findByEmailAndPassword(loginEmail, loginSenha, (err, funcionario) => {
            if (err || !funcionario) {
                response.status(401).send('E-mail ou senha incorretos.');
            } else {
                // Se o login for bem-sucedido, retorne o nome completo do usuário
                const nomeCompleto = `${funcionario.nome} ${funcionario.sobrenome}`;
                response.status(200).send({ message: 'Login bem-sucedido!', nomeCompleto });
            }
        });
    });
}