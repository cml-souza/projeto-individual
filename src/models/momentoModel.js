var database = require("../database/config");

function listar(usuario_id) {
     var instrucao = `
        SELECT 
            memoria.id, 
            memoria.titulo, 
            memoria.descricao,
            memoria.favoritar,
            imagem.url AS imagem
        FROM memoria
        LEFT JOIN imagem
            ON imagem.memoria_id = memoria.id
        WHERE memoria.usuario_id = ${usuario_id}
        ORDER BY memoria.id DESC;
    `;
        return database.executar(instrucao);
}

function cadastrar(titulo, imagem, descricao, favoritar, usuario_id){
    var instrucaoMemoria = `
        INSERT INTO memoria (titulo, descricao, favoritar, usuario_id) 
        VALUES ('${titulo}', '${descricao}', ${favoritar}, ${usuario_id});
        `;

    return database.executar(instrucaoMemoria)
        .then(resultado => {
            var idMemoria = resultado.insertId;

            var instrucaoImagem = `
            INSERT INTO imagem (url, memoria_id)
            VALUES ('${imagem}', ${idMemoria});
            `;

            return database.executar(instrucaoImagem);
        });
}

module.exports = {
    listar,
    cadastrar
    
}