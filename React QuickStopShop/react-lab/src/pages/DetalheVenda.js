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
    const [editandoStatus, setEditandoStatus] = useState(null); // Estado para controlar se o status está sendo editado
    const [statusSelecionado, setStatusSelecionado] = useState(""); // Estado para armazenar o status selecionado

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

    const handleCompraClick = (compraId) => {
        setEditandoStatus(compraId);
    };

    const handleAtualizarStatusClick = () => {
        if (!editandoStatus) {
            alert("Por favor, escolha um item.");
            return;
        }

        if (statusSelecionado) {
            api.put(`/atualizarStatus/${editandoStatus}`, { novoStatus: statusSelecionado })
                .then(response => {
                    const { id, status } = response.data.compra;
                    const novasCompras = compras.map(compra => {
                        if (compra.id === id) {
                            return { ...compra, status };
                        }
                        return compra;
                    });
                    setCompras(novasCompras);
                    setEditandoStatus(null);
                    setStatusSelecionado("");
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erro ao atualizar status:', error);
                });
        }
    };

    const handleCancelarClick = () => {
        setEditandoStatus(null);
        setStatusSelecionado("");
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
                        <div className="usuario_n">{usuario ? usuario.nomeUsuario : ''}</div>
                        <div className="options2">
                            <button onClick={handleAtualizarStatusClick}>Atualizar Status</button>
                            <button>Manter Desconto</button>
                            {editandoStatus && (
                                <button onClick={handleCancelarClick}>Cancelar</button>
                            )}
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
                                    {compras.map(compra => (
                                        <tr key={compra.id}>
                                            <td>{compra.idProduto}</td>
                                            <td>{compra.nomeProduto}</td>
                                            <td>{compra.quantidade}</td>
                                            <td>{compra.preco}</td>
                                            <td>
                                                {editandoStatus === compra.id ? (
                                                    <select
                                                        value={statusSelecionado}
                                                        onChange={e => setStatusSelecionado(e.target.value)}
                                                    >
                                                        <option value="">Selecione o status</option>
                                                        <option value="Pagamento Efetuado">Pagamento Efetuado</option>
                                                        <option value="Em Transporte">Em Transporte</option>
                                                        <option value="Cancelado">Cancelado</option>
                                                        <option value="Entregue">Entregue</option>
                                                    </select>
                                                ) : (
                                                    <span onClick={() => handleCompraClick(compra.id)}>{compra.status}</span>
                                                )}
                                            </td>
                                            <td>{compra.dataCompra}</td>
                                        </tr>
                                    ))}
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