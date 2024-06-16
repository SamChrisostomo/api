const router = require('express').Router();
const uuid = require('uuid');

//Importação do modelo Mascara
const Mask = require('../model/Mask');

router.get("/status", (req, res) => {
    res.status(200).json({
        url: "/mask/",
        availabe_url: {
            mask_create:"/mask/create"
        },
        mask_model:{
            contato: "Maria",
            loja: "19505",
            caso: "01234567",
            sistema: "SysPDV",
            assunto: "CM_Venda_Erro_Imprimir cupom_Reclamação",
            descricao:{
                problema_relatado: "Meu sistema não está imprimindo o cupom fiscal",
                procedimentos: "Realizada correção no sistema",
                solucao: "Realizada correção no sistema"
            },
            email: "",
            telefone: "85901234567",
            horarioAtendimento: {
                semana: "8h-18h",
                sabado: "8h-13h",
                domingo: "Fechado"
            }
        }
    });
});

router.post("/create", async (req, res) => {
    const { contato, loja, caso, sistema, assunto, descricao, email, telefone, horarioAtendimento } = req.body;

    const mask = {
        contato,
        loja,
        caso,
        sistema,
        assunto,
        descricao,
        email,
        telefone,
        horarioAtendimento
    }

    try {
        
        Mask.create(mask) && res.status(200).json(mask);

    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;