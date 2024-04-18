import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
import '../App.css';
import api from '../api';

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loginButtonText, setLoginButtonText] = useState("Login");
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

    // Adiciona um evento de clique ao botão de login
    useEffect(() => {
        const loginButton = document.querySelector('.loginButton');
        const imgText = document.querySelector('.img-text');
        const loginDiv = document.querySelector('.login-div');

        const handleLoginButtonClick = () => {
            if (loginButtonText === 'Login') {
                setLoginButtonText('Cancel');
                imgText.style.display = 'none';
                loginDiv.style.display = 'flex';
                setIsLoginFormVisible(true);
            } else {
                setLoginButtonText('Login');
                imgText.style.display = 'block';
                loginDiv.style.display = 'none';
                setIsLoginFormVisible(false);
            }
        };

        loginButton.addEventListener('click', handleLoginButtonClick);

        return () => {
            // Remove o evento de clique ao desmontar o componente
            loginButton.removeEventListener('click', handleLoginButtonClick);
        };
    }, [loginButtonText]);

    const handleLoginClick = () => {
        const usuario = {
            loginEmail: email,
            loginSenha: senha
        };

        api.post('/loginFuncionario', usuario)
            .then(response => {
                const nomeCompleto = response.data.nomeCompleto;
                console.log('Funcionário '+nomeCompleto+' fez login com sucesso!');
                navigate('/homepage');
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                alert('E-mail ou senha incorretos.');
            });
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <button className="loginButton">{loginButtonText}</button>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                    <div className="img-text">Quick Stop Shop</div>
                </div>
                <div className="login-div">
                    <label htmlFor="loginEmail">E-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="loginSenha">Senha</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button className="entrarButton" onClick={handleLoginClick}>Entrar</button>
                </div>
            </div>
        </div>
    );
};

export default Home;