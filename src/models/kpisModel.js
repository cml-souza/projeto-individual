var database = require("../database/config");

    function obterTotal(usuario_id){
        const instrucao = `
            SELECT
            COUNT(id) AS total
            FROM memoria
            WHERE usuario_id = ${usuario_id}
            ;
        `;
        return database.executar(instrucao);
    }

    function obterFavoritos(usuario_id){
        const instrucao = `
            SELECT
            COUNT(id) AS favoritos
            FROM memoria
            WHERE favoritar = 1
            AND usuario_id = ${usuario_id}
            ;
        `;
        return database.executar(instrucao);
    }

    function obterMusicasSalvas(usuario_id){
        const instrucao = `
            SELECT 
            COUNT(musica.id) AS musicas
            FROM musica
            JOIN memoria
            ON musica.id = memoria.musica_id
            WHERE memoria.usuario_id = ${usuario_id}
            ;
        `;
        return database.executar(instrucao);
    }

    function obterTaxaFavoritados(usuario_id){
        const instrucao = `
        SELECT
        ROUND(
            (
                COUNT(CASE WHEN favoritar = 1 THEN 1 END) * 100.0
            )  / NULLIF(COUNT(id), 0),
        2
        ) AS taxa
        FROM memoria
        WHERE usuario_id = ${usuario_id};
        `;
        return database.executar(instrucao);
    }

    module.exports = {
        obterTotal,
        obterFavoritos,
        obterMusicasSalvas,
        obterTaxaFavoritados
    }