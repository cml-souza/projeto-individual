// Criando configs
var express = require("express");
var router = express.Router();
var upload = require("../config/upload");
var momentoController = require("../controllers/momentoController");

// POST - Momento
router.post("/cadastrar", upload.single("imagem"), function (req, res) {

    const titulo = req.body.titulo;
    const imagem = req.file.filename;
    const descricao = req.body.descricao;
    const favoritar = req.body.favoritar;

    // Checando recebimento 
    console.log("Dados Recebidos: ");
    console.log({titulo, imagem, descricao, favoritar});
    res.json({ mensagem : "OK" });

});

// GET 
router.get("/listar", function (req, res) {
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
    ORDER BY memoria DESC;`;

    database.executar(instrucao)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage)
        })
});


module.exports = router;
