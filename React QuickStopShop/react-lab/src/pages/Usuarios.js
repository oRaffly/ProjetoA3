import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const Usuarios = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        api.get('/obterUsuarios')
            .then(response => {
                setUsuarios(response.data.usuarios);
                console.log(response.data.usuarios);
            })
            .catch(error => {
                console.error('Erro ao obter usuários:', error);
            });
    }, []);

    const handleUsuarioClick = (idUsuario) => {
        navigate(`/usuario/${idUsuario}`);
    };

    const handleVoltarClick = () => {
        navigate('/homepage');
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <i id="back" class="fa-solid fa-less-than fa-2xl" onClick={handleVoltarClick}></i>
                    <div id="titulo">
                        <h2>Usuários</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                    <div className="usuarios">
                        <div className="left-section">
                            <div className="options1">
                                <button>IdUsuário</button>
                                <button>DataInscrição</button>
                                <button>Gênero</button>
                                <button>NumeroCompras</button>
                                <button>Idade</button>
                                <button>Local(CEP)</button>
                                <input type="text" placeholder="Pesquisar..." />
                            </div>
                        </div>
                        <div className="right-section">
                            <div className="usuariosInfo">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>IdUsuário</th>
                                            <th>DataInscrição</th>
                                            <th>Gênero</th>
                                            <th>NumeroCompras</th>
                                            <th>Idade</th>
                                            <th>Local(CEP)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map(usuario => (
                                            <tr key={usuario.idUsuario} onClick={() => handleUsuarioClick(usuario.idUsuario)}>
                                                <td>{usuario.idUsuario}</td>
                                                <td>{usuario.dataInscricao}</td>
                                                <td>{usuario.genero}</td>
                                                <td>{usuario.nCompras}</td>
                                                <td>{usuario.idade}</td>
                                                <td>{usuario.cep}</td>
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

export default Usuarios;