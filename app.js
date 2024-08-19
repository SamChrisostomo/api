const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

//Configurando encodificação da url, Json e uso de cors
app.use(
    express.urlencoded({
        extended: true
    }),
    express.json(),
    cors()
);

//Definição da rota pessoa.
const person = require("./routes/person");
app.use("/person", person);

//Definição da rota Mascara.
const mask = require("./routes/mask");
app.use("/mask", mask);

//Definição da rota Gemini.
const gemini = require("./routes/generative_ai");
app.use("/gemini", gemini);

//Saudação inicial da api
app.get("/", (req, res) => {
    const saudacao = {
        api:{
            api_name: "",
            api_version: "1.1.0",
            api_description: "",
            api_author: "Samuel Crisóstomo",
        },
        person:{
            person_create: {
                url: "/person/create",
                method: "post",
                required: "Nome, E-mail, Telefone, Senha",
                description: "Utilize esse diretório para cadastrar uma nova pessoa no sistema."
            },
            person_login: {
                url: "/person/login",
                method: "post",
                required: "E-mail, Senha",
                description: "Utilize esse diretório para autenticar uma pessoa."
            },
            person_findOne: {
                url: "/person/:id",
                method: "get",
                required: "_id do cadastro",
                description: "Utilize esse diretório para localizar uma pessoa especifico no sistema."
            },
            person_findAll: {
                url: "/person/all",
                method: "get",
                required: " ",
                description: "Utilize esse diretório para receber uma lista de todas as pessoas no sistema"
            },
            person_updateOne: {
                url: "/person/:id",
                method: "patch",
                required: "Nome, E-mail, Telefone, Senha",
                description: "Utilize esse diretório para atualizar um cadastro no sistema."
            },
            person_delete: {
                url: "/person/:id",
                method: "delete",
                required: "_id do cadastro",
                description: "Utilize esse diretório para deletar o cadastro de uma pessoa no sistema"
            }
        }
    };

    //Enviando uma resposa
    res.status(200).json(saudacao);
});

const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;
const DBNAME = process.env.DB_NAME;
const DBATLAS = `mongodb+srv://${DBUSER}:${DBPASS}@apicluster.dqnz509.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const DBLOCAL = 'mongodb://127.0.0.1:27017';

mongoose
.connect(DBLOCAL)
.then(() => {
    console.info("MongoDB conectado!");
    app.listen(port, () => {
        console.info("Servidor express iniciado na porta: " + port);
    });
})
.catch((err) => {
    console.error("Opa, parece que tivemos problema para conectar com o banco, por esse motivo a API não foi inicializada.");
    throw err
});