const { validationResult } = require("express-validator");
const Person = require("../model/Person");
const jwt = require("jsonwebtoken");
const { getHash, getProfile, authPerson } = require("../services/AuthPerson");
const { upload } = require("../middlewares/FileStorage");

exports.createPerson = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: "Erro na validação.",
            errors: errors.array()
        })
    }

    const { name, email, phone, password } = req.body;

    try {
        const validateEmail = await Person.find({ email: email });

        if (validateEmail.length != 0) {
            return next({
                status: 401,
                message: "E-mail já cadastrado, por favor, faça login.",
            });
        }

    } catch (error) {
        return next({
            error: error
        });
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
        return next({ error: error });
    }

};

exports.authPerson = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 400,
            message: "Erro na validação.",
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try {
        const personLogin = await Person.findOne({ email: email });

        if (personLogin && personLogin.password === password) {
            jwt.sign({ id: personLogin._id }, getHash(), { expiresIn: '1h' }, function (err, token) {
                if (err) {
                    return next({
                        error: err
                    });
                }
                return res.status(200).json({
                    status: 200,
                    token: token
                });
            });
        } else {
            return next({
                status: 401,
                message: "E-mail ou senha inválidos."
            });
        }

    } catch (error) {
        return next({
            error: error
        });
    }
};

exports.getPersons = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: "Erro na validação.",
            errors: errors.array(),
        });

        return
    }

    const { id } = req.body;
    try {
        const isValidId = await Person.findOne({ _id: id });

        if (isValidId.level === "admin") {
            try {
                const people = await Person.find();
                res.status(200).json(people);
            } catch (error) {
                return next(error);
            }
        } else {
            return next({
                status: 404,
                message: "ID fornecido não possui credenciais para essa operação."
            });
        }
    } catch (error) {
        return next({
            status: 404,
            message: "Não encontrado cadastro para o ID fornecido."
        });
    }

};

exports.getPerson = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: "Erro na validação.",
            error: errors.array(),
        });
    }

    const token = req.headers.token;

    try {
        const auth = await authPerson(token);
        try {
            const findPerson = await Person.findOne({ _id: auth.id });
            if (findPerson === null) {
                return next({
                    status: 404,
                    message: "Cadastro não encontrado, forneça um id válido."
                });

            }
            res.status(200).json(getProfile(findPerson));
        } catch (error) {
            return next({
                error: error
            });
        }
    } catch (error) {
        return next({
            error: error
        });
    }
};

exports.updatePerson = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: "Erro na validação.",
            error: errors.array(),
        })
    }

    const token = req.headers.token;

    try {
        const auth = await authPerson(token);
        try {
            const updatePerson = await Person.updateOne({ _id: auth.id }, req.body);
        } catch (error) {
            return next({ error: error })
        }

    } catch (error) {
        return next({ error: error })
    }
};

exports.deletePerson = async (req, res, next) => {

    const id = req.params.id;

    try {
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        return next(error);
    }
};

exports.uploadProfilePhoto = async (req, res, next) => {
    const fileName = req.fileUploadedName;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next({
            status: 401,
            message: "Erro na validação.",
            error: errors.array(),
        })
    }else if (!req.file) {
        return next({
            status: 401,
            message: "Nenhum arquivo foi enviado."
        });
    }
    const token = req.headers.token;
    try {
        const auth = await authPerson(token);
        try {
            await Person.findOneAndUpdate({ _id: auth.id }, { avatar: fileName })
            res.status(201).json({
                status: 201,
                message: "Arquivo armazenado com sucesso.",
                filename: fileName
            });
        } catch (error) {
            return next({ message: "Erro ao gravar o arquivo no Banco de Dados", error: error });
        }
    } catch (error) {
        return next({ error: error });
    }
}