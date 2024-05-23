import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const NovaCategoria = () => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');

    const handleCancelClick = () => {
        navigate('/homepage');
    };

    const handleCriarCategoriaClick = () => {
        const novaCategoria = {
            nome
        };

        api.post('/cadastrarCategorias', novaCategoria)
            .then(response => {
                console.log('Categoria cadastrada com sucesso:', response.data);
                navigate('/homepage');
            })
            .catch(error => {
                console.error('Erro ao cadastrar categoria:', error);
                // Trate o erro adequadamente, exiba uma mensagem de erro, etc.
            });
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
                    <div id="novoTitulo">
                        <h2>Nova Categoria</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                </div>
                <div className="novo-div">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
                    <button className="criarButton" onClick={handleCriarCategoriaClick}>Criar</button>
                </div>
            </div>
        </div>
    );
};

export default NovaCategoria;