import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const NovoFuncionario = () => {
    const navigate = useNavigate();
    // const [login, setLogin] = useState("");
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [cadastroEmail, setCadastroEmail] = useState("");
    const [cadastroSenha, setCadastroSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const handleCadastroClick = () => {
        const novoFuncionario = {
            // login,
            nome,
            sobrenome,
            cadastroEmail,
            cadastroSenha,
            confirmaSenha
        };

        // Criando um novo objeto com a estrutura correta para enviar na requisição POST
        const requestBody = {
            ...novoFuncionario,
            email: cadastroEmail // Renomeando o campo para 'email'
        };

        api.post('/cadastroFucionario', requestBody)
            .then(response => {
                console.log('Funcionário cadastrado com sucesso!', response.data);
                navigate('/homepage');
            })
            .catch(error => {
                console.error('Erro ao cadastrar funcionário:', error);
                // Trate o erro adequadamente, exiba uma mensagem de erro, etc.
            });
    };

    const handleCancelClick = () => {
        navigate('/homepage');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
                    <div id="novoTitulo">
                        <h2>Novo Funcionário</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                </div>
                <div className="novo-div">
                    {/* <label htmlFor="login">Login</label>
                    <input type="text" name="login" id="login" placeholder="Login..." onChange={(e) => setLogin(e.target.value)} /> */}
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" placeholder="Nome..." onChange={(e) => setNome(e.target.value)} />
                    <label htmlFor="sobrenome">Sobrenome</label>
                    <input type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome..." onChange={(e) => setSobrenome(e.target.value)} />
                    <label htmlFor="cadastroEmail">E-mail</label>
                    <input type="email" name="cadastroEmail" id="cadastroEmail" placeholder="E-mail..." onChange={(e) => setCadastroEmail(e.target.value)} />
                    <label htmlFor="cadastroSenha">Senha</label>
                    <input type="password" name="cadastroSenha" id="cadastroSenha" placeholder="Senha..." onChange={(e) => setCadastroSenha(e.target.value)} />
                    <label htmlFor="confirmaSenha">Confirmar Senha</label>
                    <input type="password" name="confirmaSenha" id="confirmaSenha" placeholder="Confirmar Senha..." onChange={(e) => setConfirmaSenha(e.target.value)} />
                    <button className="criarButton" onClick={handleCadastroClick}>Criar</button>
                </div>
            </div>
        </div>
    );
};

export default NovoFuncionario;