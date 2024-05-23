import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const DetalheVenda = () => {
    const navigate = useNavigate();
    const { idUsuario } = useParams(); // Obtendo o idUsuario da rota
    const [usuario, setUsuario] = useState(null); // Estado para armazenar os detalhes do usuário
    const [compras, setCompras] = useState([]); // Estado para armazenar os detalhes das compras, inicializado como array vazio

    useEffect(() => {
        // Fazendo a requisição para obter os detalhes do usuário com base no idUsuario
        api.get(`/obterUsuarioPorId/${idUsuario}`)
            .then(response => {
                setUsuario(response.data.usuario);
            })
            .catch(error => {
                console.error('Erro ao obter detalhes do usuário:', error);
            });
        // Fazendo a requisição para obter as compras do usuário com base no idUsuario
        api.get(`/obterComprasPorUsuario/${idUsuario}`)
            .then(response => {
                setCompras(response.data.compras);
            })
            .catch(error => {
                console.error('Erro ao obter compras do usuário:', error);
            });
    }, [idUsuario]);

    const handleVoltarClick = () => {
        navigate(`/usuario/${idUsuario}`);
    };

    // Verificando se os detalhes do usuário foram carregados
    if (!usuario) {
        return null;
    }

    return (
        <div className="container">
            <div className="sidebar">
                <div className="otherNavbar">
                    <i id="back" className="fa-solid fa-less-than fa-2xl" style={{ visibility: 'hidden' }}></i>
                    <div id="titulo">
                        <h2>Detalhes de Venda</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl" style={{ visibility: 'hidden' }}></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="detalheVenda">
                    <div className="left-section">
                        <div className="usuario_n">{usuario.nomeUsuario}</div>
                        <div className="options2">
                            <button>Atualizar Status</button>
                            <button>Manter Desconto</button>
                            <button>Cancelar Venda</button>
                            <button>Concluir Venda</button>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="vendaTable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>IdProd.</th>
                                        <th>NomeProd.</th>
                                        <th>Quant.</th>
                                        <th>Preço</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compras.length > 0 ? (
                                        compras.map(compra => (
                                            <tr key={compra.id}>
                                                <td>{compra.idProduto}</td>
                                                <td>{compra.nomeProduto}</td>
                                                <td>{compra.quantidade}</td>
                                                <td>{compra.preco}</td>
                                                <td>{compra.status}</td>
                                                <td>{compra.dataCompra}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6">Nenhuma compra encontrada</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="voltar2">
                            <span className="total">Total: R$: 100,00</span>
                            <div>
                                <button className="voltarButton" onClick={handleVoltarClick}>Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalheVenda;