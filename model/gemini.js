const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.API);
const conversationHistory = [];

async function Gemini(consulta) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    conversationHistory.push(consulta);
    const chat = model.startChat({
        history: conversationHistory,
        generationConfig: {
            candidateCount: 1,
            temperature: 1.0,
            maxOutputTokens: 1000,
            responseMimeType: 'text/plain'
        }
    });

    const result = await chat.sendMessage([
        { text: "Responda à última mensagem usando formatação Markdown quando apropriado. Traga respostas completas." }
    ]);
    const response = result.response.text();
    
    conversationHistory.forEach((element) => {
        console.log(element.role);
        console.table(element.parts);
    });

    return response;
}

module.exports = Gemini;