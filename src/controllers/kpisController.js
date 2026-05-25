var kpisModel = require("../models/kpisModel");

    function obterTotal(req, res){
        var usuario_id = req.params.usuario_id;

        kpisModel.obterTotal(usuario_id)
            .then(function(resultado) {
                res.status(200).json(resultado);
            }).catch(function(erro) {
                console.log(erro);
                console.log("Erro ao obter total.");
                res.status(500).json(erro.sqlMessage);
            });
    }

    function obterFavoritos(req, res){
        var usuario_id = req.params.usuario_id;

        kpisModel.obterFavoritos(usuario_id)
            .then(function(resultado) {
                res.status(200).json(resultado);
            }).catch(function(erro) {
                console.log(erro);
                console.log("Erro ao obter favoritos.");
                res.status(500).json(erro.sqlMessage);
            });
    }

    function obterMusicasSalvas(req, res){
        var usuario_id = req.params.usuario_id;

        kpisModel.obterMusicasSalvas(usuario_id)
            .then(function(resultado) {
                res.status(200).json(resultado);
            }).catch(function(erro) {
                console.log(erro);
                console.log("Erro ao obter músicas salvas.");
                res.status(500).json(erro.sqlMessage);
            });
    }

    function obterTaxaFavoritados(req, res){
        var usuario_id = req.params.usuario_id;

        kpisModel.obterTaxaFavoritados(usuario_id)
            .then(function(resultado) {
                res.status(200).json(resultado);
            }).catch(function(erro) {
                console.log(erro);
                console.log("Erro ao obter taxa de favoritados.");
                res.status(500).json(erro.sqlMessage);
            });
    }

module.exports = {
    obterTotal,
    obterFavoritos,
    obterMusicasSalvas,
    obterTaxaFavoritados
}