// app.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const API_URL = 'https://chatgpt-42.p.rapidapi.com/gpt4';

// Send data to the API
export async function sendRequestToApi(userInput) {
    const data = JSON.stringify({
        messages: [
            {
                role: 'user',
                content: userInput
            }
        ],
        web_access: false
    });

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: data
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching the response.... app.js');
    }
}