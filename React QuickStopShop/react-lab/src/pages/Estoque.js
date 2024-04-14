import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';

const Estoque = () => {
    const navigate = useNavigate();

    const handleVoltarClick = () => {
        navigate('/homepage');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <i id="back" class="fa-solid fa-less-than fa-2xl" onClick={handleVoltarClick}></i>
                    <div id="titulo">
                        <h2>Estoque</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                    <div className="estoque">
                        <div className="left-section">
                            <div className="options1">
                                <button>IdProduto</button>
                                <button>DataCriação</button>
                                <button>Categoria</button>
                                <button>Quantidade</button>
                                <button>Vendas</button>
                                <input type="text" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="estoqueInfo">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estoque;