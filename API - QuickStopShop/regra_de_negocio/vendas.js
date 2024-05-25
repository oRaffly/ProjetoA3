export function vendaValida(dataVenda) {
  const cincoAnos = 5 * 365 * 24 * 60 * 60 * 1000; // 5 anos em milissegundos
  const agora = new Date();
  return (agora - new Date(dataVenda)) < cincoAnos;
}
