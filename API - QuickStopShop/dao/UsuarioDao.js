const db = require("../config/conexao");
const Usuarios = require('../models/Usuarios');

class UsuariosDAO {
    obterUsuarios(callback) {
        const sql = 'SELECT * FROM usuarios';

        db.all(sql, [], (err, usuarios) => {
            if (err) {
                console.error('Erro ao buscar usuários:', err.message);
                callback(err, null);
            } else {
                console.log('Usuários encontrados:', usuarios);
                const usuariosFormatados = usuarios.map(usuario => new Usuarios(
                    usuario.id, // Alteração aqui para incluir o idUsuario
                    usuario.titulo,
                    usuario.dataInscricao,
                    usuario.nomeUsuario,
                    usuario.genero,
                    usuario.idade,
                    usuario.email,
                    usuario.telefone,
                    usuario.cep,
                    usuario.enderecos,
                    usuario.nCompras,
                    usuario.nCancelamentos
                ));
                callback(null, usuariosFormatados);
            }
        });
    }

    obterUsuarioPorId(id, callback) {
        const sql = 'SELECT * FROM usuarios WHERE id = ?';
        db.get(sql, [id], (err, usuario) => {
            if (err) {
                console.error('Erro ao buscar usuário por ID:', err.message);
                callback(err, null);
            } else {
                if (usuario) {
                    console.log('Usuário encontrado:', usuario);
                    const usuarioFormatado = new Usuarios(
                        usuario.id, // Alteração aqui para incluir o idUsuario
                        usuario.titulo,
                        usuario.dataInscricao,
                        usuario.nomeUsuario,
                        usuario.genero,
                        usuario.idade,
                        usuario.email,
                        usuario.telefone,
                        usuario.cep,
                        usuario.enderecos,
                        usuario.nCompras,
                        usuario.nCancelamentos
                    );
                    callback(null, usuarioFormatado);
                } else {
                    console.log('Usuário não encontrado');
                    callback('Usuário não encontrado', null);
                }
            }
        });
    }

    adicionarUsuario(usuario, callback) {
        const { idUsuario, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos } = usuario; // Alteração aqui para incluir o idUsuario
        const sql = `INSERT INTO usuarios (id, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, [idUsuario, titulo, dataInscricao, nomeUsuario, genero, idade, email, telefone, cep, enderecos, nCompras, nCancelamentos], function (err) {
            if (err) {
                console.error('Erro ao adicionar usuário:', err.message);
                callback(err, null);
                return;
            }
            console.log(`Usuário adicionado com ID: ${idUsuario}`);
            callback(null, idUsuario);
        });
    }
}

module.exports = new UsuariosDAO();