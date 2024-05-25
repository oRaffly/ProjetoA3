import { criarFuncionario, atualizarFuncionario, listarFuncionarios, deletarFuncionario, funcionarios } from '../../regra_de_negocio/administração';

describe('Testes de Integração para Administração', () => {
  const admin = { isAdmin: true };
  const naoAdmin = { isAdmin: false };
  const funcionario1 = { id: 1, nome: 'Funcionario 1', permissoes: [] };
  const funcionario2 = { id: 2, nome: 'Funcionario 2', permissoes: [] };

  beforeEach(() => {
    // Limpar estado global de funcionários antes de cada teste
    while (funcionarios.length) funcionarios.pop();
  });

  test('Admin pode criar, listar, atualizar e deletar funcionários', () => {
    // Criar funcionários
    criarFuncionario(admin, funcionario1);
    criarFuncionario(admin, funcionario2);
    
    // Verificar criação
    let lista = listarFuncionarios(admin);
    expect(lista).toHaveLength(2);

    // Atualizar funcionário
    const novosDados = { nome: 'Funcionario 1 Atualizado' };
    atualizarFuncionario(admin, funcionario1.id, novosDados);
    lista = listarFuncionarios(admin);
    expect(lista.find(f => f.id === funcionario1.id).nome).toBe('Funcionario 1 Atualizado');

    // Deletar funcionário
    deletarFuncionario(admin, funcionario2.id);
    lista = listarFuncionarios(admin);
    expect(lista).toHaveLength(1);
  });

  test('Não-admin não pode criar, listar, atualizar ou deletar funcionários', () => {
    // Tentativa de criar funcionário
    expect(() => criarFuncionario(naoAdmin, funcionario1)).toThrow('Acesso negado');

    // Tentativa de listar funcionários
    expect(() => listarFuncionarios(naoAdmin)).toThrow('Acesso negado');

    // Adiciona um funcionário para testar atualizações e deleções
    criarFuncionario(admin, funcionario1);

    // Tentativa de atualizar funcionário
    const novosDados = { nome: 'Funcionario 1 Atualizado' };
    expect(() => atualizarFuncionario(naoAdmin, funcionario1.id, novosDados)).toThrow('Acesso negado');

    // Tentativa de deletar funcionário
    expect(() => deletarFuncionario(naoAdmin, funcionario1.id)).toThrow('Acesso negado');
  });
});