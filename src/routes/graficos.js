var express = require("express");
var router = express.Router();
var graficosController = require("../controllers/graficosController");

router.get(
    "/distribuicao/:usuario_id", function(req, res){
        graficosController.obterDistribuicaoFavoritos(req, res);
    });

router.get(
    "/registrosMensal/:usuario_id", function(req, res){
        graficosController.obterRegistrosMensal(req, res);
    });

router.get(
    "/crescimento/:usuario_id", function(req, res){
        graficosController.obterCrescimentoPublicacoes(req, res);
    });

router.get(
    "/midias/:usuario_id", function(req, res){
        graficosController.obterMidiasMaisUtilizadas(req, res);
    }
)

module.exports = router;