var momentoModel = require("../models/momentoModel");

function listar(req, res) {
    momentoModel.listar()
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

function cadastrar(req, res) {
    var titulo = req.body.titulo;
    var imagem = req.file.filename;
    var descricao = req.body.descricao;
    var favoritar = req.body.favoritar;

    momentoModel.cadastrar(titulo, imagem, descricao, favoritar)
        .then(() => res.json({ mensagem: "Momento Cadastrado!"}))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    listar,
    cadastrar
    
};