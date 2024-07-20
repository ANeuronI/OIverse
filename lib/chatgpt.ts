
import Groq from 'groq-sdk';

const openai = new Groq({
    apiKey: process.env['GROQAPI_KEYS'],
})

export default openai;