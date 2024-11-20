const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');

const app = express();
app.use(bodyParser.json()); // Supporta JSON nel corpo della richiesta

app.post('/run-script', async (req, res) => {
    try {
        const { script, url } = req.body;

        if (!script || !url) {
            return res.status(400).send({ error: 'Script name and URL are required.' });
        }

        // Importa dinamicamente lo script richiesto
        const scriptFunction = require(`./scripts/${script}`);

        const browser = await puppeteer.launch();
        const result = await scriptFunction(browser, url);
        await browser.close();

        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred.', details: error.message });
    }
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
