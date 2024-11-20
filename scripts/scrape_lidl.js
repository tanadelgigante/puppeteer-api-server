const axios = require('axios');

module.exports = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.$$eval('a.ods-tile__link', anchors => anchors.map(a => a.href));

    // Trasforma i link nel formato desiderato
    const formattedLinks = links.map(link => ({ link }));

    // Costruisci il payload per il Webhook Agent
    const payload = { results: { data: formattedLinks } };

	const webhookUrl = 'http://192.168.188.121:4750/users/1/web_requests/16/3fb20a86-9111-4351-a585-0397c89a5c14';
	// Chiamata al Webhook Agent di Huginn
    try {
        await axios.post(webhookUrl, payload);
        console.log('Webhook chiamato con successo');
    } catch (error) {
        console.error('Errore nella chiamata al Webhook:', error);
    }

    return "OK";
};
