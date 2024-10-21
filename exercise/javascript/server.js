const express = require('express');

/**
 * @file server.js
 * @description A simple API server built with Node.js and Express.
 * @module server
 */
//Ask copilot to build a siple API server
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route to test the server
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Example API endpoint
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example endpoint' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// server.js
