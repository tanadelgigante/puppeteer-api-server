const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

const SCRIPTS_DIR = path.join(__dirname, 'scripts'); // Cartella contenente gli script Puppeteer

// API per eseguire script
app.post('/run-script', (req, res) => {
    const { script, url } = req.body;

    if (!script || !url) {
        return res.status(400).send('Mancano i parametri "script" e "url".');
    }

    const scriptPath = path.join(SCRIPTS_DIR, script);
    const command = `node ${scriptPath} ${url}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Errore durante l\'esecuzione dello script:', stderr);
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

app.listen(3000, () => {
    console.log('Server API in ascolto sulla porta 3000');
});
