var momentoModel = require("../models/momentoModel");

function listar(req, res) {
    var usuario_id = req.query.usuario_id;

    console.log("usuario_id recebido: ", usuario_id);

    if (!usuario_id) {
        return res.status(400).send("usuario_id não enviado");
    }

    momentoModel.listar()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function cadastrar(req, res) {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    var titulo = req.body.titulo;
    var imagem = req.file.filename;
    var descricao = req.body.descricao;
    var favoritar = req.body.favoritar;
    var usuario_id = req.body.usuario_id;

    momentoModel.cadastrar(titulo, imagem, descricao, favoritar, usuario_id)
        .then(() => res.json({ mensagem: "Momento Cadastrado!"}))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    listar,
    cadastrar
    
};