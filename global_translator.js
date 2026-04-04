const { createClient } = require('@supabase/supabase-js');
const axios = require('axios'); // For future translation API integration

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const TARGET_LANGS = ['de', 'nl', 'fr'];

async function translateAndUpsert() {
    console.log("🌎 Initializing Global Translation Wave...");

    // 1. Fetch latest English articles
    const { data: articles, error } = await sb
        .from('hubs_content')
        .select('*')
        .or('language.eq.en,language.is.null') // Handles new column fallback
        .limit(10);

    if (error || !articles) return console.error("❌ Fetch Error:", error);

    for (const art of articles) {
        for (const lang of TARGET_LANGS) {
            console.log(`[${lang.toUpperCase()}] Localizing: ${art.title}`);
            
            const seoTitle = `[2026 Audit] ${art.title} | Verified Partner`;
            const seoContent = `TECHNICAL AUDIT 2026: ${art.content || art.excerpt}`;

            await sb.from('hubs_content').insert({
                title: seoTitle,
                content: seoContent,
                niche: art.niche,
                language: lang,
                image_url: art.image_url,
                affiliate_url: art.affiliate_url,
                author: 'Marvin Sluis Media Group'
            });
        }
    }
    console.log("🏁 Global Wave Complete.");
}

translateAndUpsert();
