import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Homepage = () => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/');
    };

    const handleButtonClick = (route) => {
        navigate(route);
    };

    return (
        <div className="container">
            <div className="buttons">
                <button className="button" onClick={() => handleButtonClick('/novoProduto')}>Cadastrar produto</button>
                <button className="button" onClick={() => handleButtonClick('/novaCategoria')}>Cadastrar categoria de produto</button>
                <button className="button" onClick={() => handleButtonClick('/novoFuncionario')}>Cadastrar funcionário</button>
                <button className="button" onClick={() => handleButtonClick('/estoque')}>Consultar estoque</button>
                <button className="button" onClick={() => handleButtonClick('/usuarios')}>Consultar usuários</button>
                <button className="button" onClick={() => handleButtonClick('/vendas')}>Consultar vendas</button>
            </div>
            <div className="sidebar">
                <div className="navbar">
                    <button className="logoutButton" onClick={handleLogoutClick}>Logout</button>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                    <div className="img-text">Quick Stop Shop</div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;