const puppeteer = require('puppeteer');

(async () => {
    const url = process.argv[2];
    if (!url) {
        console.error('Errore: URL non fornito.');
        process.exit(1);
    }

    console.log(`Scraping: ${url}`);
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        const links = await page.evaluate(() =>
            Array.from(document.querySelectorAll('a')).map(a => a.href)
        );

        console.log('Link trovati:', links);
    } catch (error) {
        console.error('Errore:', error);
    } finally {
        await browser.close();
    }
})();
