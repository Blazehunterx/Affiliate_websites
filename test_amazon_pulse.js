const axios = require('axios');
const cheerio = require('cheerio');

async function testAmazonPulse() {
    try {
        console.log("Testing Amazon Pulse Selectors...");
        const url = 'https://www.amazon.de/s?k=gaming+2026&s=date-desc-rank';
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } });
        const $ = cheerio.load(data);

        $('.s-result-item[data-component-type="s-search-result"]').slice(0, 3).each((i, el) => {
            const title = $(el).find('h2 a span').first().text();
            const price = $(el).find('.a-price-whole').first().text();
            console.log(`[PASS] Result ${i+1}: ${title.substring(0, 40)}... | Price: ${price || 'N/A'}`);
        });

    } catch (e) {
        console.error('Amazon Pulse Error:', e.message);
    }
}

testAmazonPulse();
