import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Other.css';
import api from '../api';

const NovoProduto = () => {
    const navigate = useNavigate();
    const [nomeProduto, setNomeProduto] = useState('');
    const [categoria, setCategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [dataAtual, setDataAtual] = useState('');

    useEffect(() => {
        // Ao montar o componente, carregue as categorias do banco de dados
        carregarCategorias();
        // Configura a data atual formatada
        const dataAtualFormatada = formatarData(new Date());
        setDataAtual(dataAtualFormatada);
    }, []);

    const formatarData = (data) => {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    // Função para carregar as categorias do banco de dados
    const carregarCategorias = () => {
        api.get('/obterCategorias')
            .then(response => {
                setCategorias(response.data.categorias);
                console.log('Categorias obtidas:', response.data.categorias);
            })
            .catch(error => {
                console.error('Erro ao buscar categorias:', error);
            });
    };

    const handleCancelClick = () => {
        navigate('/homepage');
    };

    const handleCriarProdutoClick = () => {
        const novoProduto = {
            categoria,
            dataCriacao: dataAtual,
            nomeProduto,
            quantidade
        };

        api.post('/cadastrarProdutos', novoProduto)
            .then(response => {
                console.log('Produto cadastrado com sucesso:', response.data);
                navigate('/homepage');
            })
            .catch(error => {
                console.error('Erro ao cadastrar produto:', error);
                // Trate o erro adequadamente, exiba uma mensagem de erro, etc.
            });
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="navbar">
                    <button className="cancelButton" onClick={handleCancelClick}>Cancel</button>
                    <div id="novoTitulo">
                        <h2>Novo Produto</h2>
                    </div>
                    <i id="reload" className="fa-solid fa-rotate-right fa-2xl"></i>
                    <div className="minus"></div>
                    <div className="exit"></div>
                </div>
                <div className="img">
                    <div className="img-image"></div>
                </div>
                <div className="novo-div">
                    <label htmlFor="productName">Nome</label>
                    <input type="text" value={nomeProduto} onChange={e => setNomeProduto(e.target.value)} />
                    <label htmlFor="productCat">Categoria</label>
                    <select value={categoria} onChange={e => setCategoria(e.target.value)}>
                        <option value="">...Selecione</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.nome}>{categoria.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="productQtd">Quantidade</label>
                    <input type="text" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                    <button className="criarButton" onClick={handleCriarProdutoClick}>Criar</button>
                </div>
            </div>
        </div>
    );
};

export default NovoProduto;