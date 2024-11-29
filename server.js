// server.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { sendRequestToApi } from './app.js';

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(path.resolve(), 'public')));

// API route
app.post('/api/send-request', async (req, res) => {
    try {
        const userInput = req.body.userInput;
        const result = await sendRequestToApi(userInput);
        res.json(result);
    } catch (error) {
        console.error('Error in server:', error);
        res.status(500).json({ error: error.message });
    }
});

// Catch-all route to serve the HTML file
app.get('*', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
