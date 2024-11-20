module.exports = async (browser, url) => {
    const page = await browser.newPage();
    await page.goto(url);
    
    const links = await page.$$eval('a.ods-tile__link', anchors => anchors.map(a => a.href));
    return links;
};
