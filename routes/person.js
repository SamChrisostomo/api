const router = require('express').Router();

//Importação do modelo Pessoa
const Person = require('../model/Person');

router.post('/create', async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name) {
        res.status(401).json({ message: "O nome é obrigatório!" });
        return
    }

    if (!email) {
        res.status(401).json({ message: "O e-mail é obrigatório!" });
        return
    }

    if (!phone) {
        res.status(401).json({ message: "O telefone é obrigatório!" });
        return
    }

    const person = {
        name,
        email,
        phone
    }

    try {
        await Person.create(person);
        res.status(201).json({ message: "Pessoa cadastrada com sucesso!" });
    } catch (error) {
        res.status(500).json(error);
    }

});

router.get("/findAll", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(201).json(people);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ message: "Por favor, forneca um ID para realizar a pesquisa!" });
        return
    }

    try {
        const findPerson = await Person.findOne({ _id: id });

        if (findPerson.matchedCount === 0) {
            res.status(400).json({ message: "Cadastro não encontrado, forneça um id válido." });
            return
        }

        res.status(200).json(findPerson);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.patch("/:id", async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(401).json({ message: "Por favor, forneca um ID para realizar a pesquisa!" });
        return
    }

    const { name, email, phone } = req.body;

    if (!name) {
        res.status(401).json({ message: "O nome é obrigatório!" });
        return
    }

    if (!email) {
        res.status(401).json({ message: "O e-mail é obrigatório!" });
        return
    }

    if (!phone) {
        res.status(401).json({ message: "O telefone é obrigatório!" });
        return
    }

    const person = {
        name, email, phone
    }

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person);

        if (updatePerson.matchedCount === 0) {
            res.status(400).json({ message: "Cadastro não encontrado, por esse motivo nenhum dado foi atualizado." });
            return
        }

        res.status(201).json({message: "Dados atualizados com sucesso.", person});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Person.deleteOne({_id: id});
        res.status(200).json({message: "Usuário removido com sucesso!"});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;