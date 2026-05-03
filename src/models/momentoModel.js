var database = require("../database/config");

function listar() {
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
        ORDER BY memoria DESC;`;
        return database.executar(instrucao);
}

function cadastrar(titulo, imagem, descricao, favoritar){
    var instrucaoMemoria = `
        INSERT INTO memoria (titulo, descricao, favoritar) 
        VALUES ('${titulo}', '${descricao}', ${favoritar});
        `;

    return database.executar(instrucaoMemoria)
        .then(resultado => {
            var idMemoria = resultado.insertId;

            var instrucaoImagem = `
            INSERT INTO imagem (url, memoria_id)
            VALUES ('$(imagem)', ${idMemoria});
            `;

            return database.executar(instrucaoImagem);
        });
}

module.exports = {
    listar,
    cadastrar
    
}