module.exports = class Usuarios {
    constructor(titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos) {
        this.titulo = titulo;
        this.dataInscricao = dataInscricao;
        this.nomeUsuario = nomeUsuario;
        this.genero = genero;
        this.idade = idade;
        this.email = email;
        this.telefone = telefone;
        this.cep = cep;
        this.enderecos = enderecos;
        this.nCompras = nCompras;
        this.nCancelamentos = nCancelamentos;
    }
}