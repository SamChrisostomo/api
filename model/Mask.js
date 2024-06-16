const mongoose = require("mongoose");

const Mask = mongoose.model("Mask", {
    contato: String,
    loja: Number,
    caso: Number,
    sistema: String,
    assunto: String,
    descricao: String,
    email: String,
    telefone: String,
    horarioAtendimento: String
});

module.exports = Mask;