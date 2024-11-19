import axios from 'axios';
import key from './key.json';

const apiKey = key.openAIKey;

const openAI = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    }
});

export default generateText = async (prompt) => {
    try {
        const response = await openAI.post('/engines/davinci/completions', {
            prompt: prompt,
            max_tokens: 150
        });
        return response.data.choices[0].text;
    } catch (error) {
        console.error(error);
        throw error;
    }
};