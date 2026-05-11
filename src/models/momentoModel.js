var database = require("../database/config");

function cadastrar(
    titulo,
    imagem,
    descricao,
    favoritar,
    usuario_id,
    musica) {

    if (musica){
        const instrucaoMusica = `
        INSERT INTO musica (url)
        VALUES (${musica ? '${musica}' : null});
    `;

        return database.executar(instrucaoMusica)

        .then(resultadoMusica => {

            const musica_id =
                resultadoMusica.insertId;

            const instrucaoMemoria = `
                INSERT INTO memoria (
                    titulo,
                    descricao,
                    favoritar,
                    usuario_id,
                    musica_id
                )
                VALUES (
                    '${titulo}',
                    '${descricao}',
                    ${favoritar},
                    ${usuario_id},
                    ${musica_id}
                );
            `;
            console.log(instrucaoMemoria);
            return database.executar(instrucaoMemoria);
        })

        .then(resultado => {
            var idMemoria = resultado.insertId;

            var instrucaoImagem = `
            INSERT INTO imagem (url, memoria_id)
            VALUES ('${imagem}', ${idMemoria});
            `;

            return database.executar(instrucaoImagem);
        });
    } else {

        const instrucaoMemoria = `
            INSERT INTO memoria (
                titulo,
                descricao,
                favoritar,
                usuario_id,
                musica_id
            )
            VALUES (
                '${titulo}',
                '${descricao}',
                ${favoritar},
                ${usuario_id},
                null
            );
        `;

        return database.executar(instrucaoMemoria)

            .then(resultado => {

                const idMemoria =
                    resultado.insertId;

                const instrucaoImagem = `
                    INSERT INTO imagem (
                        url,
                        memoria_id
                    )
                    VALUES (
                        '${imagem}',
                        ${idMemoria}
                    );
                `;

                return database.executar(
                    instrucaoImagem
                );
            });
    }


}

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
        ORDER BY memoria.id DESC;
    `;
    return database.executar(instrucao);
}

function deletar(id) {

    const buscarMusica = `
        SELECT musica_id
        FROM memoria
        WHERE id = ${id};
    `;

    return database.executar(buscarMusica)

        .then(resultado => {

            const musica_id =
                resultado[0].musica_id;

            // Deletar imagem
            const deletarImagem = `
                DELETE FROM imagem
                WHERE memoria_id = ${id};
            `;

            return database.executar(deletarImagem)

                .then(() => {

                    // Deletar memória
                    const deletarMemoria = `
                        DELETE FROM memoria
                        WHERE id = ${id};
                    `;

                    return database.executar(
                        deletarMemoria
                    );
                })

                .then(() => {

                    // Deletar música
                    if (musica_id) {

                        const deletarMusica = `
                            DELETE FROM musica
                            WHERE id = ${musica_id};
                        `;

                        return database.executar(
                            deletarMusica
                        );
                    }
                });
        });

}

function editar(
    id,
    titulo,
    descricao,
    favoritar,
    imagem,
    musica
) {
    let instrucao = `
        UPDATE memoria
        SET
            titulo = '${titulo}',
            descricao = '${descricao}',
            favoritar = ${favoritar}
        WHERE id = ${id};
    `;

    return database.executar(instrucao)
        .then(() => {
            if (imagem) {
                let instrucaoImg = `
                    UPDATE imagem
                    SET url = '${imagem}'
                    WHERE memoria_id = ${id};
                `;

                return database.executar(instrucaoImg);
            }
        })
        .then(() => {

            if (musica) {

                const buscarMusica = `
                SELECT musica_id
                FROM memoria
                WHERE id = ${id};
            `;

                return database.executar(buscarMusica)

                    .then(resultado => {

                        const musica_id =
                            resultado[0].musica_id;

                        if (musica_id){
                            const instrucaoMusica = `
                                UPDATE musica
                                SET url = '${musica}'
                                WHERE id = ${musica_id};
                    `;

                        return database.executar(
                            instrucaoMusica
                        );
                        } else {

                            const inserirMusica = `
                                INSERT INTO musica (url)
                                VALUES ('${musica}');
                            `;

                            return database.executar(inserirMusica)
                                .then(resultadoMusica => {
                                    const novaMusicaId = resultadoMusica.insertId;
                                    
                                    const atualizarMemoria = `
                                        UPDATE memoria
                                        SET musica_id = ${novaMusicaId}
                                        WHERE id = ${id};
                                        `;

                                        return database.executar(atualizarMemoria);
                                });
                        }
                    });
            }
        });
}

module.exports = {
    listar,
    cadastrar,
    deletar,
    editar

}