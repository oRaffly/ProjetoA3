import { criarFuncionario, listarFuncionarios, atualizarFuncionario, deletarFuncionario, funcionarios } from '../../regra_de_negocio/administração';

describe('administracao', () => {
  const admin = { isAdmin: true };
  const naoAdmin = { isAdmin: false };
  const funcionario = { id: 1, nome: 'Funcionario 1' };

  beforeEach(() => {
    // Limpar estado global de funcionários antes de cada teste
    while (funcionarios.length) funcionarios.pop();
  });

  test('criarFuncionario permite admins criar funcionários', () => {
    criarFuncionario(admin, funcionario);
    expect(listarFuncionarios(admin)).toContainEqual(funcionario);
  });

  test('criarFuncionario impede não-admins de criar funcionários', () => {
    expect(() => criarFuncionario(naoAdmin, funcionario)).toThrow('Acesso negado');
  });

  test('atualizarFuncionario permite admins atualizar funcionários', () => {
    criarFuncionario(admin, funcionario);
    const dadosAtualizados = { nome: 'Funcionario 1 Atualizado' };
    atualizarFuncionario(admin, funcionario.id, dadosAtualizados);
    expect(listarFuncionarios(admin)).toContainEqual({ ...funcionario, ...dadosAtualizados });
  });

  test('deletarFuncionario permite admins deletar funcionários', () => {
    criarFuncionario(admin, funcionario);
    deletarFuncionario(admin, funcionario.id);
    expect(listarFuncionarios(admin)).not.toContainEqual(funcionario);
  });
});
