import { criarFuncionario, funcionarios } from '../../regra_de_negocio/administração';
import { criarPedido, alterarStatusPedido, listarPedidos, pedidos } from '../../regra_de_negocio/pedidos';

describe('Testes de Integração para Vendas', () => {
  const admin = { isAdmin: true };
  const naoAdmin = { isAdmin: false };
  const funcionario = { id: 1, nome: 'Funcionario 1', permissoes: [] };
  const pedido = { id: 1, status: 'pendente', detalhes: 'Pedido 1' };

  beforeEach(() => {
    // Limpar estado global de funcionários e pedidos antes de cada teste
    while (funcionarios.length) funcionarios.pop();
    while (pedidos.length) pedidos.pop();
  });

  test('Admin pode criar, listar e alterar status de pedidos', () => {
    // Criar funcionário administrador
    criarFuncionario(admin, funcionario);

    // Criar pedido
    criarPedido(admin, pedido);
    let listaPedidos = listarPedidos(admin);
    expect(listaPedidos).toHaveLength(1);
    expect(listaPedidos[0].status).toBe('pendente');

    // Alterar status do pedido
    alterarStatusPedido(admin, pedido.id, 'enviado');
    listaPedidos = listarPedidos(admin);
    expect(listaPedidos[0].status).toBe('enviado');
  });

  test('Não-admin não pode criar ou alterar status de pedidos', () => {
    // Tentar criar pedido como não-admin
    expect(() => criarPedido(naoAdmin, pedido)).toThrow('Acesso negado');

    // Criar pedido como admin para testar alteração de status
    criarPedido(admin, pedido);
    
    // Tentar alterar status como não-admin
    expect(() => alterarStatusPedido(naoAdmin, pedido.id, 'enviado')).toThrow('Acesso negado');
  });
});