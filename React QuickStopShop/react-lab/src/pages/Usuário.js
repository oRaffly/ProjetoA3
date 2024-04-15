import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const Usuario = () => {
    const navigate = useNavigate();
    const { idUsuario } = useParams(); // Obtendo o idUsuario da rota
    const [usuario, setUsuario] = useState(null); // Estado para armazenar os detalhes do usuário

    useEffect(() => {
        // Fazendo a requisição para obter os detalhes do usuário com base no idUsuario
        api.get(`/obterUsuarioPorId/${idUsuario}`)
            .then(response => {
                setUsuario(response.data.usuario);
            })
            .catch(error => {
                console.error('Erro ao obter detalhes do usuário:', error);
            });
    }, [idUsuario]);

    const handleVoltarClick = () => {
        navigate('/usuarios');
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
                        <h2>Usuário</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl" style={{ visibility: 'hidden' }}></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="user">
                    <div className="left-section">
                        <div className="usuario_n">Usuário N</div>
                        <div className="options2">
                            <button>Compras</button>
                            <button>Bloquear Acesso</button>
                        </div>
                    </div>
                    <div className="right-section">
                        <div className="userInfo">
                            <p>IdUsuário: {usuario.idUsuario}</p>
                            <p>NomeUsuário: {usuario.nomeUsuario}</p>
                            <p>E-mail: {usuario.email}</p>
                            <p>Telefone: {usuario.telefone}</p>
                            <p>NºCompras: {usuario.nCompras}</p>
                            <p>NºCancelamentos: {usuario.nCancelamentos}</p>
                            <p>Titulo: {usuario.titulo}</p>
                            <p>Endereços: {usuario.enderecos}</p>
                        </div>
                        <div className="voltar">
                            <button className="voltarButton" onClick={handleVoltarClick}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Usuario;