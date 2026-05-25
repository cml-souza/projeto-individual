var graficosModel = require("../models/graficosModel");

    function obterDistribuicaoFavoritos(req, res){
        var usuario_id = req.params.usuario_id;

        graficosModel.obterDistribuicaoFavoritos(usuario_id)
            .then(function(resultado){
                res.status(200).json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log("Erro ao obter Distribuição de Momentos Favoritados.")
                res.status(500).json(erro.sqlMessage);
            });
    }

    function obterRegistrosMensal(req, res){
        var usuario_id = req.params.usuario_id;

        graficosModel.obterRegistrosMensal(usuario_id)
            .then(function(resultado){
                res.status(200).json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log("Erro ao obter Momentos Registrados por Mês")
                res.status(500).json(erro.sqlMessage);
            });
    }

    function obterCrescimentoPublicacoes(req, res){
        var usuario_id = req.params.usuario_id;

        graficosModel.obterCrescimentoPublicacoes(usuario_id)
            .then(function(resultado){
                res.status(200).json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log("Erro ao obter Crescimento de Publicações");
                res.status(500).json(erro.sqlMessage);
            })
    }

    function obterMidiasMaisUtilizadas(req, res){
        var usuario_id = req.params.usuario_id;

        graficosModel.obterMidiasMaisUtilizadas(usuario_id)
            .then(function(resultado){
                res.status(200).json(resultado);
            }).catch(function(erro){
                console.log(erro);
                console.log("Erro ao obter Mídias Mais Utilizadas");
                res.status(500).json(erro.sqlMessage);
            })
    }

module.exports = {
    obterDistribuicaoFavoritos,
    obterRegistrosMensal,
    obterCrescimentoPublicacoes,
    obterMidiasMaisUtilizadas
}