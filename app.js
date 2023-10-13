const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = 3000;

//Configurar Json
app.use(
    express.urlencoded({
        extended: true
    }),
);

app.use(
    express.json()
);

//Definição da rota pessoa.
const person = require("./routes/person");
app.use("/person", person);

//Saudação inicial da api
app.get("/", (req, res) => {
    //Enviando uma resposa
    res.json({ message: "Hello World" });
});

const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;
const DBNAME = process.env.DB_NAME;
const DBATLAS = `mongodb+srv://${DBUSER}:${DBPASS}@apicluster.dqnz509.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
const DBLOCAL = 'mongodb://192.168.1.3:27017';

mongoose
.connect(DBATLAS)
.then(() => {
    console.info("MongoDB conectado!");
    app.listen(port, () => {
        console.info("Servidor express iniciado na porta: " + port);
    });
})
.catch((err) => {
    console.error("Opa, parece que tivemos problema para conectar com o banco, por esse motivo a API não foi inicializada.7");
    throw err
});