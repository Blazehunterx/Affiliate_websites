const axios = require('axios');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const KINGUIN_TAG = 'r=69ca45d301a37';
const AMAZON_TAG = '1710200006-20';

/**
 * SCRAPING ENGINE: STEAM
 */
async function getSteamPrice(title) {
    try {
        // Search for AppID
        const searchRes = await axios.get(`https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(title)}&l=english&cc=DE`);
        const app = searchRes.data.items[0];
        if (!app) return null;
        
        // Get Detail Price
        const detailRes = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${app.id}&cc=DE`);
        const data = detailRes.data[app.id].data;
        return data.price_overview ? data.price_overview.final / 100 : null;
    } catch (e) { return null; }
}

/**
 * SCRAPING ENGINE: KINGUIN
 */
const U_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
];

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function getKinguinPrice(title) {
    try {
        await sleep(2000); // Rate limit
        const url = `https://www.kinguin.net/catalogsearch/result/?q=${encodeURIComponent(title)}`;
        const ua = U_AGENTS[Math.floor(Math.random() * U_AGENTS.length)];
        const { data } = await axios.get(url, { headers: { 'User-Agent': ua } });
        const $ = cheerio.load(data);
        const priceText = $('.actual-price').first().text() || $('.price').first().text();
        return parseFloat(priceText.replace(/[^0-9.]/g, '')) || null;
    } catch (e) { return null; }
}

/**
 * SCRAPING ENGINE: AMAZON
 */
async function getAmazonPrice(title) {
    try {
        const url = `https://www.amazon.de/s?k=${encodeURIComponent(title)}`;
        const ua = U_AGENTS[Math.floor(Math.random() * U_AGENTS.length)];
        const { data } = await axios.get(url, { 
            headers: { 
                'User-Agent': ua,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.google.com/'
            } 
        });
        const $ = cheerio.load(data);
        const priceWhole = $('.a-price-whole').first().text().trim();
        const priceFraction = $('.a-price-fraction').first().text().trim();
        return parseFloat(`${priceWhole}.${priceFraction}`.replace(/[^0-9.]/g, '')) || null;
    } catch (e) { return null; }
}

/**
 * MAIN SYNC CYCLE
 */
async function runSync() {
    console.log("🦾 Launching Real-Time Scraping Engine...");
    const { data: deals } = await sb.from('gaming_deals').select('*');
    if (!deals) return;

    for (const deal of deals) {
        console.log(`[PROCESS] ${deal.title}...`);
        
        const [steam, kinguin, amazon] = await Promise.all([
            getSteamPrice(deal.title),
            getKinguinPrice(deal.title),
            getAmazonPrice(deal.title)
        ]);

        const updates = {};
        if (steam) updates.official_price = steam;
        
        if (kinguin) {
            updates.keyshop_k_price = kinguin;
            // Generate tracking link if possible
            updates.keyshop_k_link = `https://www.kinguin.net/catalogsearch/result/?q=${encodeURIComponent(deal.title)}?${KINGUIN_TAG}`;
        }
        
        if (amazon) {
            updates.amazon_price = amazon;
            // Generate link if possible
            updates.amazon_link = `https://www.amazon.de/s?k=${encodeURIComponent(deal.title)}&tag=${AMAZON_TAG}`;
        }

        if (Object.keys(updates).length > 0) {
            await sb.from('gaming_deals').update(updates).eq('id', deal.id);
            console.log(` ✅ Updated ${deal.title} | Steam: ${steam} | King: ${kinguin} | Amz: ${amazon}`);
        } else {
            console.log(` ⚠️ No changes for ${deal.title}`);
        }
    }
    console.log("🏁 Cycle Complete.");
}

runSync();
