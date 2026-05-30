var favoritosModel = require("../models/favoritosModel");

function listar(req, res) {
    var usuario_id = req.params.usuario_id;

    console.log("usuario_id recebido: ", usuario_id);

    if (!usuario_id) {
        return res.status(400).send("usuario_id não enviado");
    }

    favoritosModel.listar(usuario_id)
        .then(resultado => res.json(resultado))
        .catch(erro => res.status(500).json(erro));
}

module.exports = {
    listar
}