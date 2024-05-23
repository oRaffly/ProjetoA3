import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const Vendas = () => {
    const navigate = useNavigate();
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        api.get('/obterVendas')
            .then(response => {
                setVendas(response.data.vendas);
                console.log(response.data.vendas);
            })
            .catch(error => {
                console.error('Erro ao obter vendas:', error);
            });
    }, []);

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
                                <button>IdVenda</button>
                                <button>Data</button>
                                <button>Categoria</button>
                                <button>TotalCompras</button>
                                <button>PreçoTotal</button>
                                <button>IdUsuário</button>
                                <input type="text" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="vendasInfo">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>IdVenda</th>
                                            <th>Data</th>
                                            <th>Categoria</th>
                                            <th>TotalCompras</th>
                                            <th>PreçoTotal</th>
                                            <th>IdUsuário</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vendas.map(venda => (
                                            <tr key={venda.idVenda}>
                                                <td>{venda.idVenda}</td>
                                                <td>{venda.dataVenda}</td>
                                                <td>{venda.categoria}</td>
                                                <td>{venda.totalCompras}</td>
                                                <td>{venda.precoTotal}</td>
                                                <td>{venda.idUsuario}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendas;