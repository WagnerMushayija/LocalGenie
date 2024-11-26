//server.js

import express from 'express';
import bodyParser from 'body-parser';
import { sendRequestToApi } from './app.js';

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());


// Serve static files from the current directory (no need for a separate public folder)
app.use(express.static('.'));

app.post('/api/send-request', async (req, res) => {
    try {
        const userInput = req.body.userInput;
        const result = await sendRequestToApi(userInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.static('public')); // Serve static files (e.g., HTML, CSS, JS) from 'public' directory

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});