// Criando configs
var express = require("express");
var router = express.Router();
var upload = require("../config/configUpload");
var momentoController = require("../controllers/momentoController");

// POST - Subir Momento
router.post(
    "/cadastrar",
    upload.single("imagem"),
    function (req, res) {
        momentoController.cadastrar(req, res);
    });

// GET - Listar Momento
router.get(
    "/listar", function (req, res) {
    momentoController.listar(req, res);
});

// DELETE - Deletar Momento
router.delete(
    "/deletar/:id", function(req, res) {
        momentoController.deletar(req, res);

});

// PUT - Update Momento
router.put(
    "/editar/:id",
    upload.single("imagem"),
    function (req, res) {
        momentoController.editar(req, res);
    });


module.exports = router;
