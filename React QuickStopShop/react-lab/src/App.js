import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './pages/UserContext';

// Pages
import Home from './pages/Home';
import Homepage from './pages/Homepage';
import Estoque from './pages/Estoque';
import Usuarios from './pages/Usuarios';
import Usuario from './pages/Usuario';
import Vendas from './pages/Vendas';
import NovoProduto from './pages/NovoProduto';
import NovaCategoria from './pages/NovaCategoria';
import NovoFuncionario from './pages/NovoFuncionario';
import DetalheVenda from './pages/DetalheVenda';

// Components
// import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/usuario/:idUsuario" element={<Usuario />} /> {/* Defina o parâmetro idUsuario */}
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/novoProduto" element={<NovoProduto />} />
            <Route path="/novaCategoria" element={<NovaCategoria />} />
            <Route path="/novoFuncionario" element={<NovoFuncionario />} />
            <Route path="/detalheVenda/:idUsuario" element={<DetalheVenda />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;