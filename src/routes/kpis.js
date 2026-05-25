var express = require("express");
var router = express.Router();
var kpiController = require("../controllers/kpisController");

router.get(
    "/total/:usuario_id", function(req, res){
        kpiController.obterTotal(req, res);
    });

router.get(
    "/favoritos/:usuario_id", function(req, res){
        kpiController.obterFavoritos(req, res);
    });

router.get(
    "/musicas/:usuario_id", function(req, res){
        kpiController.obterMusicasSalvas(req, res);
    });

router.get(
    "/taxa/:usuario_id", function(req, res){
        kpiController.obterTaxaFavoritados(req, res);
    });

module.exports = router;