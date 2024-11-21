const axios = require('axios');

module.exports = async (browser, url) => {
	
	// Normalize URL if it doesn't start with https://www.lidl.it
	const normalizedUrl = url.startsWith('https://www.lidl.it') 
	    ? url 
	    : `https://www.lidl.it${url}`;

	console.log('Normalized URL:', normalizedUrl);
	
    const page = await browser.newPage();
    console.log('Pagina creata');
    
    await page.goto(normalizedUrl);
    console.log(`Navigato a: ${normalizedUrl}`);

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
	const webhookUrl = '<your_webhook_url>';
    try {
        const response = await axios.post(webhookUrl, payload);
        console.log('Webhook chiamato con successo:', response.data);
    } catch (error) {
        console.error('Errore nella chiamata al Webhook:', error);
    }

    return "OK";
};
