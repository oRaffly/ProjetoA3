export function editarPermissoesFuncionario(admin, funcionarios, funcionarioId, permissoes) {
  if (!admin.isAdmin) throw new Error('Acesso negado');
  const funcionario = funcionarios.find(f => f.id === funcionarioId);
  if (!funcionario) throw new Error('Funcionário não encontrado');
  funcionario.permissoes = permissoes;
}