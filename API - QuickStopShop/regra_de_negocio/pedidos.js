export const pedidos = [];

export function criarPedido(admin, pedido) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    pedidos.push(pedido);
}

export function listarPedidos(admin) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    return pedidos;
}

export function alterarStatusPedido(admin, pedidoId, novoStatus) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (!pedido) throw new Error('Pedido não encontrado');
    pedido.status = novoStatus;
}