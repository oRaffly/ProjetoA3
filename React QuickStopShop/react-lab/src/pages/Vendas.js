import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';

const Vendas = () => {
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
                        <h2>Vendas</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                    <div className="vendas">
                        <div className="left-section">
                            <div className="options1">
                                <button>IdProduto</button>
                                <button>Data</button>
                                <button>Categoria</button>
                                <button>TotalVendas</button>
                                <button>Preço</button>
                                <button>Estoque</button>
                                <input type="text" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="vendasInfo">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendas;