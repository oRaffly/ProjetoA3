module.exports = class Produtos {
    constructor(categoria, dataCriacao, nomeProduto, quantidade) {
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
    }
}