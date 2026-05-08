var database = require("../database/config");

function cadastrar(titulo, 
    imagem, 
    descricao, 
    favoritar, 
    usuario_id){

    var instrucaoMemoria = `
    INSERT INTO memoria (
        titulo,
        descricao,
        favoritar,
        usuario_id
    ) 
    VALUES (
        '${titulo}',
        '${descricao}',
        ${favoritar},
        ${usuario_id}
    );
`;
         console.log(instrucaoMemoria);
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

function deletar(id) {
    const instrucao = `
        DELETE FROM imagem
        WHERE memoria_id = ${id};
        `;

    return database.executar(instrucao)
        .then(() => {

            const instrucao2 = `
                DELETE FROM memoria
                WHERE id = ${id};
            `;

        return database.executar(instrucao2);
        });

}

function editar(id,
    titulo,
    descricao,
    favoritar,
    imagem
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
            if (imagem){
                let instrucaoImg = `
                    UPDATE imagem
                    SET url = '${imagem}'
                    WHERE memoria_id = ${id};
                `;

                return database.executar(instrucaoImg);
            }
        });
}

module.exports = {
    listar,
    cadastrar,
    deletar,
    editar
    
}