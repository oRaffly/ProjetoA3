import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const Estoque = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get('/obterProdutos')
            .then(response => {
                setProdutos(response.data.produtos);
                console.log(response.data.produtos);
            })
            .catch(error => {
                console.error('Erro ao obter produtos:', error);
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
                                <button>NomeProduto</button>
                                <button>DataCriação</button>
                                <button>Categoria</button>
                                <button>Quantidade</button>
                                <input type="text" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="estoqueInfo">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>IdProduto</th>
                                            <th>NomeProduto</th>
                                            <th>DataCriação</th>
                                            <th>Categoria</th>
                                            <th>Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos.map(produto => (
                                            <tr>
                                                <td>{produto.idProduto}</td>
                                                <td>{produto.nomeProduto}</td>
                                                <td>{produto.dataCriacao}</td>
                                                <td>{produto.categoria}</td>
                                                <td>{produto.quantidade}</td>
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

export default Estoque;