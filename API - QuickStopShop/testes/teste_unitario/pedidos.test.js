import { alterarStatusPedido, pedidos } from '../../regra_de_negocio/pedidos';

describe('alterarStatusPedido', () => {
  const admin = { isAdmin: true };
  const naoAdmin = { isAdmin: false };
  const pedido = { id: 1, status: 'pendente' };

  beforeEach(() => {
    // Limpar estado global de pedidos antes de cada teste
    while (pedidos.length) pedidos.pop();
    pedidos.push(pedido);
  });

  test('permite admins alterar o status do pedido', () => {
    alterarStatusPedido(admin, pedido.id, 'enviado');
    expect(pedidos[0].status).toBe('enviado');
  });

  test('impede não-admins de alterar o status do pedido', () => {
    expect(() => alterarStatusPedido(naoAdmin, pedido.id, 'enviado')).toThrow('Acesso negado');
  });
});
