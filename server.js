// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');  // Use `require` for body-parser
const { sendRequestToApi } = require('./app.js');

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

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
