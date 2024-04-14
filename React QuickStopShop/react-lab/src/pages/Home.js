import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import { useUser } from './UserContext';
import '../App.css';
// import api from '../api';

// const LoginSection = ({ onForgotPasswordClick, onLoginClick, onRegisterClick }) => {
//     const [email, setEmail] = useState("");
//     const [senha, setSenha] = useState("");

//     const handleLoginClick = () => {
//         const usuario = {
//             loginEmail: email,
//             loginSenha: senha
//         };

//         onLoginClick(usuario); // Chama a função onLoginClick com os dados do usuário
//     };

//     return (
//         <div className="row">
//             <div className="d-flex flex-wrap align-items-center justify-content-center">
//                 <div className="card loginCard">
//                     <div className="card-header">
//                         <h3 className="login-title">Login</h3>
//                     </div>
//                     <div className="card-body" style={{ marginRight: "0px" }}>
//                         <form>
//                             <div className="container">
//                                 <label className="login-info" htmlFor="loginEmail">E-mail</label>
//                                 <br />
//                                 <input className="col-12" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 <br />
//                                 <label className="login-info" htmlFor="loginSenha">Senha</label>
//                                 <br />
//                                 <input className="col-12" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
//                                 <br />
//                                 <a href="#" onClick={onForgotPasswordClick}>Esqueceu a senha?</a>
//                             </div>
//                             <div className="container login-button">
//                                 <div className="flex-container">
//                                     <button style={{ width: "300px" }} type="button" className="btn btn-lg btn-warning" onClick={handleLoginClick}>Entrar</button>
//                                     <br />
//                                     <h4 id="ou">OU</h4>
//                                     <button style={{ width: "300px" }} type="button" className="btn btn-lg btn-warning" onClick={onRegisterClick}>Cadastre-se</button>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

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
        navigate('/homepage');
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

// const ForgotPasswordCodeSection = ({ onSendCodeClick, onBackClick }) => {
//     const [email, setEmail] = useState("");
//     const [code, setCode] = useState("");

//     const handleSendCodeClick = () => {
//         // Lógica para enviar código de recuperação de senha
//         // Implemente conforme necessário
//     };

//     const handleValidateCodeClick = () => {
//         // Lógica para validar o código de recuperação de senha
//         // Implemente conforme necessário
//     };

//     return (
//         <div className="row">
//             <div className="d-flex flex-wrap align-items-center justify-content-center">
//                 <div className="card codigoCard">
//                     <div className="card-header">
//                         <h3 className="login-title">Recuperar Senha</h3>
//                     </div>
//                     <div className="card-body" style={{ marginRight: "0px" }}>
//                         <form id="codigoForm">
//                             <div className="container">
//                                 <label className="login-info" htmlFor="senhaEmail">E-mail</label>
//                                 <br />
//                                 <input className="col-12" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                             </div>
//                             <div className="container login-button">
//                                 <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-warning" onClick={handleSendCodeClick}>Enviar Código</button>
//                             </div>
//                             <br />
//                             <div className="container">
//                                 <label className="login-info" htmlFor="senhaCodigo">Código</label>
//                                 <br />
//                                 <input className="col-12" type="text" value={code} onChange={(e) => setCode(e.target.value)} />
//                             </div>
//                             <div className="container login-button">
//                                 <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-warning" onClick={handleValidateCodeClick}>Validar</button>
//                             </div>
//                             <div className="voltar" style={{ marginReft: "185px " }}>
//                                 <a href="#" onClick={onBackClick} style={{ textDecoration: "none", color: "black" }}>
//                                     <h5>Voltar</h5>
//                                 </a>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const CadastroSection = ({ onCadastroClick }) => {
//     const [nome, setNome] = useState("");
//     const [sobrenome, setSobrenome] = useState("");
//     const [genero, setGenero] = useState("");
//     const [dataNascimento, setDataNascimento] = useState("");
//     const [cadastroEmail, setCadastroEmail] = useState("");
//     const [cadastroSenha, setCadastroSenha] = useState("");
//     const [confirmaSenha, setConfirmaSenha] = useState("");

//     const handleCadastroClick = () => {
//         const novoUsuario = {
//             nome,
//             sobrenome,
//             genero,
//             dataNascimento,
//             cadastroEmail,
//             cadastroSenha,
//             confirmaSenha
//         };

//         // Criando um novo objeto com a estrutura correta para enviar na requisição POST
//         const requestBody = {
//             ...novoUsuario,
//             email: cadastroEmail // Renomeando o campo para 'email'
//         };

//         api.post('/cadastro', requestBody)
//             .then(response => {
//                 console.log('Usuário cadastrado com sucesso!', response.data);
//                 window.location.reload(); // Recarrega a página após o cadastro bem-sucedido
//             })
//             .catch(error => {
//                 console.error('Erro ao cadastrar usuário:', error);
//                 // Trate o erro adequadamente, exiba uma mensagem de erro, etc.
//             });
//     };

//     return (
//         <div className="row">
//             <div className="d-flex flex-wrap align-items-center justify-content-center">
//                 <div className="card cadastroCard">
//                     <div className="card-header">
//                         <h3 className="cadastro-title">Cadastre-se</h3>
//                     </div>
//                     <div className="card-body">
//                         <form id="cadastroForm">
//                             <div className="container">
//                                 <label htmlFor="nome">Nome:</label>
//                                 <input className="col-12" type="text" name="nome" id="nome" placeholder="Nome..." onChange={(e) => setNome(e.target.value)} />
//                                 <br />
//                                 <br />
//                                 <label htmlFor="sobrenome">Sobrenome:</label>
//                                 <input className="col-12" type="text" name="sobrenome" id="sobrenome" placeholder="Sobrenome..." onChange={(e) => setSobrenome(e.target.value)} />
//                                 <br />
//                                 <br />
//                                 <label htmlFor="genero">Gênero:</label>
//                                 <select className="col-12" name="genero" id="genero" onChange={(e) => setGenero(e.target.value)}>
//                                     <option value=""></option>
//                                     <option value="Homem">Homem</option>
//                                     <option value="Mulher">Mulher</option>
//                                     <option value="Outro">Outro</option>
//                                 </select>
//                                 <br />
//                                 <br />
//                                 <label htmlFor="dataNascimento">Data de Nascimento:</label>
//                                 <input className="col-12" type="date" name="dataNascimento" id="dataNascimento" onChange={(e) => setDataNascimento(e.target.value)} />
//                                 <br />
//                                 <br />
//                                 <label htmlFor="cadastroEmail">E-mail:</label>
//                                 <input className="col-12" type="email" name="cadastroEmail" id="cadastroEmail" placeholder="E-mail..." onChange={(e) => setCadastroEmail(e.target.value)} />
//                                 <br />
//                                 <br />
//                                 <label htmlFor="cadastroSenha">Senha:</label>
//                                 <input className="col-12" type="password" name="cadastroSenha" id="cadastroSenha" placeholder="Senha..." onChange={(e) => setCadastroSenha(e.target.value)} />
//                                 <br />
//                                 <br />
//                                 <label htmlFor="confirmaSenha">Confirmar Senha:</label>
//                                 <input className="col-12" type="password" name="confirmaSenha" id="confirmaSenha" placeholder="Confirmar Senha..." onChange={(e) => setConfirmaSenha(e.target.value)} />
//                             </div>
//                             <div className="container cadastro-button">
//                                 <button style={{ width: "334px" }} type="button" className="btn btn-lg btn-warning" onClick={handleCadastroClick}>Cadastrar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Home = () => {
//     const navigate = useNavigate();
//     const [showLogin, setShowLogin] = useState(true);
//     const [forgotPasswordType, setForgotPasswordType] = useState(null);
//     const { userName, updateUserName } = useUser();

//     const handleForgotPasswordClick = (type) => {
//         setForgotPasswordType(type);
//         setShowLogin(false);
//     };

//     const handleLoginClick = (usuario) => {
//         api.post('/login', usuario)
//             .then(response => {
//                 const nomeCompleto = response.data.nomeCompleto;
//                 updateUserName(nomeCompleto);
//                 navigate('/usuario');
//             })
//             .catch(error => {
//                 console.error('Erro ao fazer login:', error);
//                 alert('E-mail ou senha incorretos.');
//             });
//     };

//     const handleRegisterClick = () => {
//         setForgotPasswordType(null); // Limpa o tipo de recuperação de senha
//         setShowLogin(false); // Esconder a seção de login
//     };

//     const handleBackClick = () => {
//         setShowLogin(true); // Volta para a tela de login
//         setForgotPasswordType(null); // Limpa o tipo de recuperação de senha
//     };

//     useEffect(() => {
//         // Lógica para manipular a exibição com base no estado de "forgotPasswordType"
//     }, [forgotPasswordType]);

//     return (
//         <div className="login">
//             {showLogin && (
//                 <LoginSection
//                     onForgotPasswordClick={() => handleForgotPasswordClick('code')}
//                     onLoginClick={handleLoginClick}
//                     onRegisterClick={handleRegisterClick}
//                 />
//             )}

//             {!showLogin && forgotPasswordType === 'code' && (
//                 <ForgotPasswordCodeSection
//                     onBackClick={handleBackClick}
//                 />
//             )}

//             {!showLogin && forgotPasswordType === null && (
//                 <CadastroSection />
//             )}
//         </div>
//     );
// };

export default Home;