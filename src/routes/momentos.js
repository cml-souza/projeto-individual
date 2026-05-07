// Criando configs
var express = require("express");
var router = express.Router();
var upload = require("../config/configUpload");
var momentoController = require("../controllers/momentoController");

// POST - Momento
router.post(
    "/cadastrar",
    upload.single("imagem"),
    function (req, res) {
        momentoController.cadastrar(req, res);
    }
);

// GET - Listar
router.get("/listar", function (req, res) {
    momentoController.listar(req, res);
});


module.exports = router;
