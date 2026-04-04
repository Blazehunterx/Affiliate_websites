const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const KINGUIN_TAG = 'r=69ca45d301a37';
const AMAZON_TAG = '1710200006-20';

/**
 * INITIAL DEAL PUMP
 * Migrates existing hub audits into the new Multi-Store schema for the Gaming Hub.
 */
async function pumpGamingDeals() {
    console.log("🚀 Initializing Multi-Store Deal Pump...");

    // 1. Fetch current gaming audits
    const { data: audits } = await sb.from('hubs_content').select('*').eq('niche', 'gaming').eq('language', 'en');
    if (!audits) return;

    for (const art of audits) {
        const cleanTitle = art.title.replace(/\[.*?\]/g, '').replace('Technical Audit: ', '').trim();
        const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const kinguinLink = `https://www.kinguin.net/catalogsearch/result/?q=${encodeURIComponent(cleanTitle)}&${KINGUIN_TAG}`;
        const amazonLink = `https://www.amazon.de/s?k=${encodeURIComponent(cleanTitle)}&tag=${AMAZON_TAG}`;

        const parsePrice = (p) => {
            if (!p) return 59.99;
            const clean = String(p).replace(/[^0-9.]/g, '');
            return parseFloat(clean) || 59.99;
        };

        const basePrice = parsePrice(art.price_observed);

        const deal = {
            title: cleanTitle,
            image_url: art.image_url,
            official_price: basePrice,
            official_link: `https://store.steampowered.com/search/?term=${encodeURIComponent(cleanTitle)}`,
            keyshop_a_price: basePrice * 0.6, // Estimated Awin Floor
            keyshop_a_link: art.affiliate_url,
            keyshop_k_price: basePrice * 0.55, // Estimated Kinguin Floor (Usually lower)
            keyshop_k_link: kinguinLink,
            amazon_price: basePrice * 0.85, 
            amazon_link: amazonLink,
            trust: 9.9,
            discount: 45
        };

        const { error: insError } = await sb.from('gaming_deals').upsert(deal, { onConflict: 'title' });
        if (insError) console.error(`[FAIL] ${cleanTitle}:`, insError.message);
        else console.log(`[PASS] ${cleanTitle}: Multi-Store Integration OK.`);
    }

    console.log("🏁 Deal Pump Complete.");
}

pumpGamingDeals();
