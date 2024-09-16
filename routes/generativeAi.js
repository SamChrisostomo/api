const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const gemini = require('../model/gemini');

router.get('/status', async (req, res) => {
    res.status(200).json({ message: 'Welcome to the Gemini API' })
})

router.post('/consulta', [
    body('text').isString().isEmpty({ ignore_whitespace: false }).withMessage('Forneça um prompt para consulta ao Gemini.'),
    body('role').isString().isEmpty({ ignore_whitespace: false }).withMessage('Forneça o nome do usuário.')
], async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        next(errors.array);
    }

    const { text, role } = req.body;
    const conversation = {
        role: role,
        parts: [
            { text: text }
        ]
    }

    console.log(conversation);

    try {
        const response = await gemini(conversation);
        res.status(200).json({ message: 'Consulta realizada com sucesso', response })
    } catch (e) {
        res.status(500).json({ message: 'Error', error: e })
        console.log(e)
    }
});

module.exports = router;