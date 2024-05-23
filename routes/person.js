const router = require('express').Router();
const uuid = require('uuid').v4;

//Importação do modelo Pessoa
const Person = require('../model/Person');

router.post('/create', async (req, res) => {
    const { name, email, phone, password } = req.body;

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

    if (!password) {
        res.status(401).json({ message: "A senha é obrigatória!" });
        return
    }

    try {
        const validateEmail = await Person.find({ email: email });

        if (validateEmail.length != 0) {
            res.status(401).json({
                message: "E-mail já cadastrado, por favor, faça-login.",
                page: "login"
            });

            return
        }
    } catch (error) {
        res.status(500).json(error);
    }

    const person = {
        name,
        email,
        phone,
        password
    }

    try {
        await Person.create(person);
        res.status(201).json({ message: "Pessoa cadastrada com sucesso!" });
    } catch (error) {
        res.status(500).json(error);
    }

});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const personLogin = await Person.findOne({ email: email, password: password });
        
        if (personLogin) {
            res.status(201).json(personLogin._id);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/token", async (req, res) => {
    const { id } = req.body;

    try {
        const insertToken = await Person.updateOne({_id: id}, {token: uuid()});
        res.status(201).json(insertToken);
    } catch (error) {
        res.status(500).json(error);
    }

});

router.get("/all", async (req, res) => {
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

        res.status(201).json({ message: "Dados atualizados com sucesso.", person });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;