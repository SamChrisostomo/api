const router = require('express').Router();
const run = require('../src/gemini');

router.get('/status', async (req, res) => {
    res.status(200).json({ message: 'Welcome to the Gemini API' })
})

router.post('/consulta', async (req, res) => {
    const { prompt } = req.body
    try{
        const response = await run(prompt);
        res.status(200).json({ message: 'Consulta realizada com sucesso', response })
    }catch(e){
        res.status(500).json({ message: 'Error', error: e })
        console.log(e)
    }
});

module.exports = router;