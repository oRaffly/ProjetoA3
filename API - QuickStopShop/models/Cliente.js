module.exports = class Cliente {
    constructor(nome, sobrenome, genero, dataNascimento, email, senha) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.genero = genero;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
    }
}