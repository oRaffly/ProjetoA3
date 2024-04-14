import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import GameVerseLogo from '../images/GameVerse_logo.png';
import { useUser } from '../pages/UserContext';

import './Navbar.css';

const Navbar = () => {
    const location = useLocation();

    const isHome = location.pathname === '/'; // Verifica se está na página Home

    const { userName } = useUser(); // Obtendo o nome do usuário do contexto

    if (isHome) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark navBar">
                <div className="container">
                    <a className="navbar-brand">
                        <img src={GameVerseLogo} alt="GameVerseLogo" width="100" height="100" />
                        GameVerse
                    </a>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark navBar">
                <div className="container">
                    <a className="navbar-brand" href="">
                        <img src={GameVerseLogo} alt="GameVerseLogo" width="100" height="100" />
                        GameVerse
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07"
                        aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse justify-content-md-center collapse" id="navbarsExample07">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/usuario">Menu</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Jogos</a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/jogos/favoritos">Favoritos</NavLink></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><NavLink className="dropdown-item" to="/jogos/categorias">Categorias</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/sobre">Sobre</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav sm-icons">
                            <li className="nav-item dropdown">
                                <a id="username" className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle icon"></i> {userName || 'Usuário'}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="/perfil">Perfil</NavLink></li>
                                    <li><hr className="dropdown-divider"></hr></li>
                                    <li><NavLink className="dropdown-item" to="/">Sair</NavLink></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;