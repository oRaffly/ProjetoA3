import { vendaValida } from '../../regra_de_negocio/vendas';

describe('vendaValida', () => {
  test('retorna true para vendas dentro de 5 anos', () => {
    const dataVenda = new Date();
    dataVenda.setFullYear(dataVenda.getFullYear() - 4);
    expect(vendaValida(dataVenda)).toBe(true);
  });

  test('retorna false para vendas fora de 5 anos', () => {
    const dataVenda = new Date();
    dataVenda.setFullYear(dataVenda.getFullYear() - 6);
    expect(vendaValida(dataVenda)).toBe(false);
  });
});
