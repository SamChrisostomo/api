const router = require('express').Router();
const { body, header, param } = require("express-validator");

//Importação do modelo Pessoa
const Person = require('../model/Person');
const { createPerson, authPerson, getPerson, updatePerson, deletePerson, uploadProfilePhoto, getPersons } = require('../controllers/personController');
const { upload } = require('../middlewares/FileStorage');

router.get('/all', [
    header('token').isJWT().withMessage('Forneça um token válido')
], getPersons);

router.post('/create', [
    body('name').isString().isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres.'),
    body('email').isEmail().withMessage('Forneça um endereço de E-mail válido.'),
    body('phone').isString().isLength({ min: 10, max: 11 }).withMessage('O telefone deve ter entre 10 e 11 caracteres.'),
    body('password').isString().isStrongPassword({ minLength: 10, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1 }).withMessage('Forneça uma senha com no mínimo 13 caracteres, contendo números, letras minúsculas e maiúsculas e símbolos.')
], createPerson);

router.post("/login", [
    body('email').isEmail().withMessage('Força um endereço de E-mail válido.'),
    body('password').isString().isLength({ min: 13 }).withMessage('Forneça uma senha váida, com no mínimo 13 caracteres.')
], authPerson);

router.get("/auth", [
    header('token').isJWT().withMessage('Forneça um token válido.')
], getPerson);

router.patch("/update", [
    header('token').isJWT().withMessage('Forneça um token válido.'),
], updatePerson);

router.delete("/delete", [
    header('token').isJWT().withMessage('Forneça um token válido.'),
], deletePerson);

router.post('/upload', [
    header('token').isJWT().withMessage('Forneça um token válido.'),
    body('path').isString().withMessage('Forneça o caminho para armazenamento do arquivo.'),
], upload.single('avatar'), uploadProfilePhoto);

module.exports = router;