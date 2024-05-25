export const funcionarios = [];

export function criarFuncionario(admin, funcionario) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    funcionarios.push(funcionario);
}

export function listarFuncionarios(admin) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    return funcionarios;
}

export function atualizarFuncionario(admin, id, dados) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    const index = funcionarios.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Funcionário não encontrado');
    funcionarios[index] = { ...funcionarios[index], ...dados };
}

export function deletarFuncionario(admin, id) {
    if (!admin.isAdmin) throw new Error('Acesso negado');
    const index = funcionarios.findIndex(f => f.id === id);
    if (index === -1) throw new Error('Funcionário não encontrado');
    funcionarios.splice(index, 1);
}