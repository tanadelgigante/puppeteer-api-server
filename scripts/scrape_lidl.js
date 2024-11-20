const axios = require('axios');

module.exports = async (browser, url, webhookUrl) => {
    const page = await browser.newPage();
    console.log('Pagina creata');
    
    await page.goto(url);
    console.log(`Navigato a: ${url}`);

    const links = await page.$$eval('a.ods-tile__link', anchors => {
        console.log('Estrazione dei link');
        return anchors.map(a => a.href);
    });

    console.log('Link estratti:', links);

    // Trasforma i link nel formato desiderato
    const formattedLinks = links.map(link => ({ link }));
    console.log('Link formattati:', formattedLinks);

    // Costruisci il payload per il Webhook Agent
    const payload = { results: { data: formattedLinks } };
    console.log('Payload costruito:', payload);

    // Chiamata al Webhook Agent di Huginn
	const webhookUrl = 'http://192.168.188.121:4750/users/1/web_requests/16/3fb20a86-9111-4351-a585-0397c89a5c14';
    try {
        const response = await axios.post(webhookUrl, payload);
        console.log('Webhook chiamato con successo:', response.data);
    } catch (error) {
        console.error('Errore nella chiamata al Webhook:', error);
    }

    return "OK";
};
