const mongoose = require("mongoose");

const Mask = mongoose.model("Mask", {
    contato: { type:String},
    loja: {type: Number },
    caso: { type: Number, unique: true},
    sistema: String,
    assunto: String,
    descricao: { type: Object },
    email: { type: String },
    telefone: { type: String },
    horario_atendimento: { type: Object },
    data_criacao: { type: Date, default: Date.now() },
});

module.exports = Mask;