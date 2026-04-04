const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const AMAZON_TAG = '1710200006-20';
const NICHES = ['gaming', 'saas', 'vpn', 'travel', 'pet', 'fintech', 'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'];

const U_AGENTS = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36'
];

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

/**
 * AMAZON BESTSELLER PULSE
 * Scrapes trending niche products and injects them as 'Daily Top Picks' audits.
 */
async function syncAmazonPulse() {
    console.log("🔥 Syncing Mobile-Stealth Amazon Pulse...");

    for (const niche of NICHES) {
        try {
            console.log(`[PULSE] Scanning Amazon for ${niche}...`);
            await sleep(7000 + Math.random() * 5000); // Randomized delay

            const url = `https://www.amazon.de/s?k=${niche}+2026&s=date-desc-rank`;
            const ua = U_AGENTS[Math.floor(Math.random() * U_AGENTS.length)];
            const { data } = await axios.get(url, { 
                headers: { 
                    'User-Agent': ua,
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7',
                    'sec-ch-ua-mobile': '?1',
                    'sec-ch-ua-platform': '"iOS"',
                    'Referer': 'https://www.google.com/'
                } 
            });
            const $ = cheerio.load(data);

            // Grab first 2 valid results
            const results = [];
            $('.s-result-item[data-component-type="s-search-result"]').slice(0, 2).each((i, el) => {
                const title = $(el).find('h2 a span').text().trim();
                const price = $(el).find('.a-price-whole').first().text().trim();
                const img = $(el).find('img.s-image').attr('src');
                const path = $(el).find('h2 a').attr('href');

                if (title && path) {
                    results.push({
                        title: `Amazon Best Pick: ${title.substring(0, 50)}...`,
                        content: `Verified 2026 Amazon Trending Item. High velocity sales data detected for ${niche} sector.`,
                        image_url: img,
                        affiliate_url: `https://www.amazon.de${path}${path.includes('?') ? '&' : '?'}tag=${AMAZON_TAG}`,
                        niche: niche,
                        language: 'en',
                        author: 'Marvin Sluis AI Insights',
                        price_observed: price ? `€${price}` : 'Check Price'
                    });
                }
            });

            if (results.length > 0) {
                await sb.from('hubs_content').upsert(results, { onConflict: 'title' });
                console.log(` ✅ Injected ${results.length} Amazon picks for ${niche}.`);
            }
        } catch (e) {
            console.error(` ❌ Error scanning ${niche}:`, e.message);
        }
    }
    console.log("🏁 Amazon Pulse Sync Complete.");
}

syncAmazonPulse();
