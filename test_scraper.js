const axios = require('axios');
const cheerio = require('cheerio');

async function testKinguin() {
    try {
        console.log("Testing Kinguin Scrape...");
        const url = 'https://www.kinguin.net/catalogsearch/result/?q=Elden%20Ring';
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        const price = $('.actual-price').first().text() || $('.price').first().text();
        console.log('Kinguin Price:', price || 'NOT FOUND');
    } catch (e) {
        console.error('Kinguin Error:', e.message);
    }
}

async function testAmazon() {
    try {
        console.log("\nTesting Amazon Scrape...");
        const url = 'https://www.amazon.de/s?k=Elden+Ring';
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const $ = cheerio.load(data);
        const pWhole = $('.a-price-whole').first().text();
        const pFrac = $('.a-price-fraction').first().text();
        console.log('Amazon Price:', pWhole && pFrac ? `${pWhole}.${pFrac}` : 'NOT FOUND');
    } catch (e) {
        console.error('Amazon Error:', e.message);
    }
}

async function testSteam() {
    try {
        console.log("\nTesting Steam API...");
        const res = await axios.get('https://store.steampowered.com/api/storesearch/?term=Elden%20Ring&l=english&cc=DE');
        const app = res.data.items[0];
        if (app) {
            const det = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${app.id}&cc=DE`);
            const p = det.data[app.id].data.price_overview;
            console.log('Steam Price:', p ? p.final / 100 : 'FREE/TBD');
        } else {
            console.log('Steam App NOT FOUND');
        }
    } catch (e) {
        console.error('Steam Error:', e.message);
    }
}

async function run() {
    await testKinguin();
    await testAmazon();
    await testSteam();
}
run();
