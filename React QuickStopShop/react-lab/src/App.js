import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Homepage from './pages/Homepage';
import Estoque from './pages/Estoque';
import Usuarios from './pages/Usuarios';
import Vendas from './pages/Vendas';
import NovoProduto from './pages/NovoProduto';
import NovaCategoria from './pages/NovaCategoria';
import NovoFuncionario from './pages/NovoFuncionario';

// Components
// import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/vendas" element={<Vendas />} />
            <Route path="/novoProduto" element={<NovoProduto />} />
            <Route path="/novaCategoria" element={<NovaCategoria />} />
            <Route path="/novoFuncionario" element={<NovoFuncionario />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;