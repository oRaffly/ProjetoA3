import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const DetalhePedido = () => {

    const handleVoltarClick = () => {
        navigate('/usuarios');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="otherNavbar">
                    <i id="back" className="fa-solid fa-less-than fa-2xl" style={{ visibility: 'hidden' }}></i>
                    <div id="titulo">
                        <h2>Detalhe de Pedido</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl" style={{ visibility: 'hidden' }}></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="user">
                    <div className="left-section">
                        <div className="usuario_n">Usuário N</div>
                    </div>
                    <div className="right-section">
                        <div className="pedidoInfo">
                            <p>IdProduto: </p>
                            <p>NomeProduto: </p>
                            <p>Endereço: </p>
                            <p>Status: </p>
                            <p>Quantidade: </p>
                            <p>Preço: </p>
                            <p>Data: </p>
                            <p>IdVenda: </p>
                        </div>
                        <div className="voltar1">
                            <button className="voltarButton" onClick={handleVoltarClick}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalhePedido;