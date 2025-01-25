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
            descricao: {
                problema_relatado: "Meu sistema não está imprimindo o cupom fiscal",
                procedimentos: "Realizada correção no sistema",
                solucao: "Realizada correção no sistema"
            },
            email: "",
            telefone: "85901234567",
            horario_atendimento: {
                semana: "8h-18h",
                sabado: "8h-13h",
                domingo: "Fechado"
            }
        }
    });
});

router.post("/create", async (req, res) => {
    const { contato, loja, caso, sistema, assunto, descricao, email, telefone, horario_atendimento } = req.body;

    const mask = {
        "contato": contato,
        "loja": loja,
        "caso": caso,
        "sistema": sistema,
        "assunto": assunto,
        "descricao": descricao,
        "email": email,
        "telefone": telefone,
        "horario_atendimento":{
            "semana": horario_atendimento.semana,
            "sabado": horario_atendimento.sabado,
            "domingo": horario_atendimento.domingo
        }
    }

    try {
        
        await Mask.create(mask);
        res.status(200).json(mask);

    } catch(error) {
        res.status(500).json(error);
    }
});

router.get("/:consultar_caso", async (req, res) => {
    const { consultar_caso } = req.params;

    if(isNaN(consultar_caso) || consultar_caso.length != 8){
        res.status(401).json({error: "Número de caso inválido ou não existe", solucao: "Verifique o número de caso e tente novamente"})
        return;
    }

    try {
        const mask = await Mask.findOne({caso: consultar_caso});
        if(!mask){
            res.status(404).json({error: "Caso não localizado no sistema"});
            return;
        }

        res.status(200).json(mask);
    }catch(error){
        res.status(500).json(error);
    }
});

router.patch("/:consultar_caso", async (req, res) => {
    const { consultar_caso } = req.params;
    const { contato, loja, caso, sistema, assunto, descricao, email, telefone, horario_atendimento } = req.body;

    const caso_alterado = {
        "contato": contato,
        "loja": loja,
        "caso": caso,
        "sistema": sistema,
        "assunto": assunto,
        "descricao": descricao,
        "email": email,
        "telefone": telefone,
        "horario_atendimento":{
            "semana": horario_atendimento.semana,
            "sabado": horario_atendimento.sabado,
            "domingo": horario_atendimento.domingo
        }
    }

    if(isNaN(consultar_caso) || consultar_caso.length != 8){
        res.status(401).json({error: "Número de caso inválido ou não existe", solucao: "Verifique o número de caso e tente novamente"})
        return;
    }

    try {
        
        const localizar_caso = await Mask.findOne({caso: consultar_caso});
        if(!localizar_caso){
            res.status(404).json({error: "Caso não encontrado", solucao: "Verifique o número de caso e tente novamente"});
            return;
        }
        
        await Mask.updateOne({caso: consultar_caso}, caso_alterado);
        res.status(200).json(caso_alterado);

    } catch(error) {
        res.status(500).json(error);
    }
});

router.delete("/:consultar_caso", async (req, res) => {
    const { consultar_caso } = req.params;

    if(isNaN(consultar_caso) || consultar_caso.length != 8){
        res.status(401).json({error: "Número de caso inválido ou não existe", solucao: "Verifique o número de caso e tente novamente"})
        return;
    }

    try{
        const mask = await Mask.deleteOne({caso: consultar_caso});
        if(mask){
            res.status(200).json({message: "Caso excluído com sucesso"});
        }
    }catch(error){
        res.status(500).json(error);
    }
});

module.exports = router;