const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json());

app.post('/run-script', async (req, res) => {
    try {
        console.log('Incoming request body:', req.body);
        const { script, url } = req.body;

        if (!script || !url) {
            console.error('Missing script or URL in request');
            return res.status(400).send({ error: 'Script name and URL are required.' });
        }

        // Normalize URL if it doesn't start with https://www.lidl.it
        const normalizedUrl = url.startsWith('https://www.lidl.it') 
            ? url 
            : `https://www.lidl.it${url}`;

        console.log('Normalized URL:', normalizedUrl);

        const scriptFunction = require(`./scripts/${script}`);

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        console.log('Launching script...');
        const result = await scriptFunction(browser, normalizedUrl);
        await browser.close();

        console.log('Script executed successfully');
        res.json({ result });
    } catch (error) {
        console.error('Error occurred:', error.message);
        res.status(500).send({ error: 'An error occurred.', details: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});