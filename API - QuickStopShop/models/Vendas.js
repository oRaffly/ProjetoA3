module.exports = class Vendas {
    constructor(dataVenda, categoria, totalCompras, precoTotal, idUsuario) {
        this.dataVenda = dataVenda;
        this.categoria = categoria;
        this.totalCompras = totalCompras;
        this.precoTotal = precoTotal;
        this.idUsuario = idUsuario;
    }
}