const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const AMAZON_TAG = '1710200006-20';
const KINGUIN_TAG = 'r=69ca45d301a37';
const AWIN_ID = '1595486';
const BONUS_ID = '11167';

const niches = [
    'saas', 'gaming', 'travel', 'pet', 'fintech', 'vpn', 
    'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'
];

async function seedDeals() {
    console.log("🌱 Seeding Global Hub Deals (3 Partners per Niche)...");
    
    for (const niche of niches) {
        const query = encodeURIComponent(niche);
        const deals = [
            {
                title: `${niche.toUpperCase()} Tech Solution Alpha`,
                niche: niche,
                image: `https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800`,
                trust_score: 9.8,
                discount: 15,
                amazon_price: 349.99,
                amazon_link: `https://www.amazon.de/s?k=${query}&tag=${AMAZON_TAG}`,
                awin_price: 325.00,
                awin_link: `https://www.awin1.com/cread.php?awinaffid=${AWIN_ID}&p=`,
                bonusarrive_price: niche === 'gaming' ? null : 330.00,
                bonusarrive_link: niche === 'gaming' ? null : `https://www.bonusarrive.com/advertiser/${BONUS_ID}`,
                keyshop_k_price: niche === 'gaming' ? 29.99 : null,
                keyshop_k_link: niche === 'gaming' ? `https://www.kinguin.net/catalogsearch/result/?q=${query}?${KINGUIN_TAG}` : null
            }
        ];

        const { error } = await sb.from('hub_deals').upsert(deals, { onConflict: 'title' });
        if (error) console.error(`❌ Error seeding ${niche}:`, error.message);
        else console.log(`✅ Seeded [${niche}]`);
    }
    console.log("🏁 Global Seeding Complete.");
}

seedDeals();
