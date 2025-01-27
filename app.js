const mongoose = require("mongoose");

require("dotenv").config();

const express = require("express");
const router = express.Router();
const { param, validationResult } = require("express-validator");
const cors = require("cors");
const { customErros } = require("./middlewares/CustomErrors");

const app = express();
const port = 5000;

//Configurando encodificação da url, Json e uso de cors
app.use(
  express.urlencoded({
    extended: true,
  }),
  express.json(),
  cors()
);

//Saudação inicial da api
app.get("/", (req, res) => {
  const saudacao = {
    api: {
      api_name: "",
      api_version: "1.1.0",
      api_description: "",
      api_author: "Samuel Crisóstomo",
    },
    person: {
      person_create: {
        url: "/person/create",
        method: "post",
        required: "Nome, E-mail, Telefone, Senha",
        description:
          "Utilize esse diretório para cadastrar uma nova pessoa no sistema.",
      },
      person_login: {
        url: "/person/login",
        method: "post",
        required: "E-mail, Senha",
        description: "Utilize esse diretório para autenticar uma pessoa.",
      },
      person_findOne: {
        url: "/person/:id",
        method: "get",
        required: "_id do cadastro",
        description:
          "Utilize esse diretório para localizar uma pessoa especifico no sistema.",
      },
      person_findAll: {
        url: "/person/all",
        method: "get",
        required: " ",
        description:
          "Utilize esse diretório para receber uma lista de todas as pessoas no sistema",
      },
      person_updateOne: {
        url: "/person/:id",
        method: "patch",
        required: "Nome, E-mail, Telefone, Senha",
        description:
          "Utilize esse diretório para atualizar um cadastro no sistema.",
      },
      person_delete: {
        url: "/person/:id",
        method: "delete",
        required: "_id do cadastro",
        description:
          "Utilize esse diretório para deletar o cadastro de uma pessoa no sistema",
      },
    },
  };

  //Enviando uma resposa
  res.status(200).json(saudacao);
});

//Definição da rota pessoa.
const person = require("./routes/person");
app.use("/person", person);

app.get(
  "/profile-photo/:rota/:avatar",
  [
    param("rota")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Forneça a rota do arquivo."),
    param("avatar")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Forneça um nome de arquivo válido."),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 400,
        message: "Erro na validação.",
        errors: errors.array(),
      });
    }
    const { rota, avatar } = req.params;
    res.sendFile(__dirname + `\\${rota}\\${avatar}`);
  }
);

app.use((err, req, res, next) => customErros(err, req, res));

const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;
const DBNAME = process.env.DB_NAME;
const DBATLAS = `mongodb+srv://${DBUSER}:${DBPASS}@apicluster.dqnz509.mongodb.net/${DBNAME}?retryWrites=true&w=majority&appName=APICluster`;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErros: true },
};
//const DBLOCAL = 'mongodb://127.0.0.1:53074';

async function run() {
  try {
    await mongoose.connect(DBATLAS, clientOptions);
    console.info("MongoDB conectado!");
    app.listen(port, () => {
      console.info("Servidor express iniciado na porta: " + port);
    });
  } catch (err) {
    await mongoose.disconnect();
    console.error(
      "Opa, parece que tivemos problema para conectar com o banco, por esse motivo a API não foi inicializada."
    );
    throw err;
  }
}

run().catch(console.dir);