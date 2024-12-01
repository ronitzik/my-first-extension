// openaiHelper.ts file
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
    throw new Error('API Key is missing or not loaded correctly from .env file');
}

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
    return await callOpenAIAPI(prompt);
}

export async function generateOptimizationTips(functionName: string, code: string): Promise<string> {
    const prompt = `
    Analyze the function named "${functionName}" in the provided code. Suggest optimizations to make it more efficient.
    Focus on reducing time complexity, space complexity, and improving readability. Answer in 2 LINES.

    Code:
    ${code}
    `;

    return await callOpenAIAPI(prompt);
}

async function callOpenAIAPI(prompt: string): Promise<string> {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
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
        console.error('Error calling OpenAI API:', error);
        throw new Error('Failed to process the request. Please check the API key or connection.');
    }
}