var database = require("../database/config");

function listar(usuario_id) {
    var instrucao = `
        SELECT 
            memoria.id, 
            memoria.titulo, 
            memoria.descricao,
            memoria.favoritar,
            imagem.url AS imagem,
            musica.url AS musica
        FROM memoria
        LEFT JOIN imagem
            ON imagem.memoria_id = memoria.id
        LEFT JOIN musica
            ON musica.id = memoria.musica_id
        WHERE memoria.usuario_id = ${usuario_id}
        AND memoria.favoritar = 1
        ORDER BY memoria.id DESC;
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar
}