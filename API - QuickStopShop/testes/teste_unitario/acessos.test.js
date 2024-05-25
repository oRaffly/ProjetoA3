import { editarPermissoesFuncionario } from '../../regra_de_negocio/acessos';
import { criarFuncionario, funcionarios} from '../../regra_de_negocio/administração';

describe('editarPermissoesFuncionario', () => {
  const admin = { isAdmin: true };
  const naoAdmin = { isAdmin: false };

  const funcionario = { id: 1, nome: 'Funcionario 1', permissoes: [] };

  beforeEach(() => {
    // Limpar estado global de funcionários antes de cada teste
    criarFuncionario(admin, funcionario, funcionarios); // Passando a lista de funcionários como um argumento
  });

  test('permite admins editar permissões de funcionários', () => {
    const novasPermissoes = ['LER', 'ESCREVER'];
    editarPermissoesFuncionario(admin, funcionarios, funcionario.id, novasPermissoes);
    expect(funcionarios[0].permissoes).toEqual(novasPermissoes);
  });

  test('impede não-admins de editar permissões de funcionários', () => {
    const novasPermissoes = ['LER', 'ESCREVER'];
    expect(() => editarPermissoesFuncionario(naoAdmin, funcionarios, funcionario.id, novasPermissoes)).toThrow('Acesso negado');
  });
});