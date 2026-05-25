var database = require("../database/config");

    function obterDistribuicaoFavoritos(usuario_id){
        const instrucao =  `
        SELECT
            SUM(CASE WHEN favoritar = 1 THEN 1 ELSE 0 END) AS favoritos,
            SUM(CASE WHEN favoritar = 0 THEN 1 ELSE 0 END) AS naoFavoritos
        FROM memoria
        WHERE usuario_id = ${usuario_id}
        ;
    `;
    return database.executar(instrucao);
    }

    function obterRegistrosMensal(usuario_id){
        const instrucao = `
        SELECT
            MONTH(data_criacao) AS mes,
            COUNT(id) AS quantidade
        FROM memoria
        WHERE usuario_id = ${usuario_id}
        GROUP BY MONTH(data_criacao)
        ORDER BY mes
        ;
    `;
    return database.executar(instrucao);
    }

    function obterCrescimentoPublicacoes(usuario_id){
        const instrucao = `
        SELECT
            MONTH(data_criacao) AS mes,
            COUNT(id) AS quantidade
        FROM memoria
        WHERE usuario_id = ${usuario_id}
        GROUP BY MONTH(data_criacao)
        ORDER BY mes
        ;
    `;
    return database.executar(instrucao);
    }

    function obterMidiasMaisUtilizadas(usuario_id){
        const instrucao = `
        SELECT
        COUNT(DISTINCT(memoria.musica_id)) AS musica,
        COUNT(DISTINCT(imagem.id)) AS imagem
        FROM memoria
        LEFT JOIN imagem
        ON memoria.id = imagem.memoria_id
        WHERE usuario_id = ${usuario_id}
        ;
        `;
        return database.executar(instrucao);
    }

module.exports = {
    obterDistribuicaoFavoritos,
    obterRegistrosMensal,
    obterCrescimentoPublicacoes,
    obterMidiasMaisUtilizadas
}