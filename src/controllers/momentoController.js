var momentoModel = require("../models/momentoModel");

function cadastrar(req, res) {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log(req.body);
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var favoritar = req.body.favoritar;
    var usuario_id = req.body.usuario_id;

     const imagem =
        req.files["imagem"]
        ? req.files["imagem"][0].filename
        : null;

    const musica =
        req.files["musica"]
        ? req.files["musica"][0].filename
        : null;

    if (!titulo || !imagem || !usuario_id) {
        return res.status(400).json({
            mensagem: "Dados incompletos"
        });
    }

    momentoModel.cadastrar(
        titulo,
        imagem,
        descricao,
        favoritar,
        usuario_id,
        musica)
        .then(() => {
            res.json({ mensagem: "Momento Cadastrado!"});
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro);
        });
}

function listar(req, res) {
    var usuario_id = req.query.usuario_id;

    console.log("usuario_id recebido: ", usuario_id);

    if (!usuario_id) {
        return res.status(400).send("usuario_id não enviado");
    }

    momentoModel.listar(usuario_id)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function deletar(req, res){
    const id = req.params.id;

    momentoModel.deletar(id)
        .then(() => {
            res.json({
                mensagem: "Momento deletado!"
            });
        })
        .catch(erro => {
            res.status(500).json(erro);
        });
}

function editar(req, res) {
    const id = req.params.id;

    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    const favoritar = req.body.favoritar;

     const imagem =
        req.files["imagem"]
        ? req.files["imagem"][0].filename
        : null;

    const musica =
        req.files["musica"]
        ? req.files["musica"][0].filename
        : null;

    momentoModel.editar(id,
        titulo,
        descricao,
        favoritar,
        imagem,
        musica
    )
    .then(() => {
        res.json({
            mensagem: "Momento atualizado!"
        });
    })
    .catch(erro => {
        res.status(500).json(erro);
    });
}

module.exports = {
    listar,
    cadastrar,
    deletar,
    editar
    
};