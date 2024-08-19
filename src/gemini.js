const { GoogleGenerativeAI } = require('@google/generative-ai')


async function run(consulta) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({history: []});
    const query = await chat.sendMessage(consulta);
    const genai_response = query.response;

    return genai_response.text();
}

module.exports = run;