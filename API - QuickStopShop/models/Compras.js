module.exports = class Compras {
    constructor(idProduto, nomeProduto, quantidade, preco, status, dataCompra, idUsuario) {
        this.idProduto = idProduto;
        this.nomeProduto = nomeProduto;
        this.quantidade = quantidade;
        this.preco = preco;
        this.status = status;
        this.dataCompra = dataCompra;
        this.idUsuario = idUsuario;
    }
}