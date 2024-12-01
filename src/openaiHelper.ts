import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    throw new Error('API Key is missing or not loaded correctly from .env file');
}
console.log('Loaded API Key:', OPENAI_API_KEY);

export async function analyzeComplexity(code: string): Promise<string> {
    const prompt = `
    Analyze the provided JavaScript code. Return the following:
    1. Total time complexity of the entire file.
    2. The name of the function with the highest complexity.
    Only provide the response in the format:
    "Total Time Complexity: [complexity]
    Most Complex Function: [function name]"
    \n\n${code}
    `;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error fetching complexity analysis:', error);
        throw new Error('Failed to analyze complexity. Please check the OpenAI API key or connection.');
    }
}