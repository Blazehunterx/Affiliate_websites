const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

// --- Configuration ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo'; 

const HUSB_MAP = {
    'gaming': 'https://marvinsluis-media.pages.dev/gaming',
    'saas': 'https://marvinsluis-media.pages.dev/saas',
    'vpn': 'https://marvinsluis-media.pages.dev/vpn',
    'travel': 'https://marvinsluis-media.pages.dev/travel',
    'pet': 'https://marvinsluis-media.pages.dev/pet',
    'fintech': 'https://marvinsluis-media.pages.dev/fintech',
    'wfh': 'https://marvinsluis-media.pages.dev/wfh',
    'outdoor': 'https://marvinsluis-media.pages.dev/outdoor',
    'smarthome': 'https://marvinsluis-media.pages.dev/smarthome',
    'aiproductivity': 'https://marvinsluis-media.pages.dev/aiproductivity',
    'fashion': 'https://marvinsluis-media.pages.dev/fashion',
    'electronics': 'https://marvinsluis-media.pages.dev/electronics'
};

async function generateSitemap() {
    console.log("🔍 Starting Dynamic Sitemap Generation...");
    
    if (!SB_KEY) {
        console.error("❌ Missing SUPABASE_SERVICE_ROLE_KEY. Cannot fetch audits.");
        return;
    }

    const supabase = createClient(SB_URL, SB_KEY);
    let articles = [];
    console.log("Fetching audit records from Supabase (Top 300 per Niche)...");
    const niches = ['gaming', 'saas', 'vpn', 'travel', 'pet', 'fintech', 'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'];
    for (const niche of niches) {
        const { data: rawData, error } = await supabase
            .from('hubs_content')
            .select('id, niche, language, slug, created_at')
            .eq('niche', niche)
            .limit(300);
        if (error) {
            console.error(`Error fetching sitemap audits for ${niche}:`, error.message);
        } else if (rawData) {
            // Sort descending locally
            const sortedData = rawData.sort((a, b) => {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            }).slice(0, 150);
            articles = [...articles, ...sortedData];
        }
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Add Main Hubs
    Object.values(HUSB_MAP).forEach(url => {
        xml += `  <url><loc>${url}/</loc><priority>1.0</priority></url>\n`;
    });

    // 2. Add Language Hubs
    const languages = ['en', 'de', 'nl'];
    Object.keys(HUSB_MAP).forEach(niche => {
        languages.forEach(lang => {
            xml += `  <url><loc>${HUSB_MAP[niche]}/${lang}/</loc><priority>0.8</priority></url>\n`;
        });
    });

    // 3. Add 1,000+ Individual Audit Pages (The Long-Tail SEO Power)
    console.log(`🔍 Mapping ${articles.length} individual audits...`);
    articles.forEach(art => {
        if (art.slug) {
            const langPrefix = (art.language && art.language !== 'en') ? '/' + art.language : '';
            const url = `${HUSB_MAP[art.niche]}${langPrefix}/audit/${art.slug}`;
            xml += `  <url><loc>${url}</loc><priority>0.6</priority></url>\n`;
        }
    });

    xml += `</urlset>`;

    fs.writeFileSync('sitemap_msm_2026.xml', xml);
    try {
        const path = require('path');
        fs.writeFileSync(path.join(__dirname, '../../master_sync/sitemap_msm_2026.xml'), xml);
        fs.writeFileSync(path.join(__dirname, '../../master_sync/sitemap.xml'), xml);
        fs.writeFileSync(path.join(__dirname, '../../master_sync/dist/sitemap_msm_2026.xml'), xml);
        fs.writeFileSync(path.join(__dirname, '../../master_sync/dist/sitemap.xml'), xml);
        console.log("✅ Sitemaps replicated to master_sync and dist");
    } catch (err) {
        console.error("❌ Replication error:", err.message);
    }
    console.log(`✅ Sitemap Upgraded: ${articles.length + 48} total SEO entry points indexed.`);

    // Ping search engines
    console.log("📡 Pinging search engines with new sitemap...");
    axios.get('https://www.google.com/ping?sitemap=https://marvinsluis-media.pages.dev/sitemap.xml')
        .then(() => console.log("📡 Google pinged successfully!"))
        .catch(e => console.error("❌ Google ping failed:", e.message));
    axios.get('https://www.bing.com/ping?sitemap=https://marvinsluis-media.pages.dev/sitemap.xml')
        .then(() => console.log("📡 Bing pinged successfully!"))
        .catch(e => console.error("❌ Bing ping failed:", e.message));
}

generateSitemap();
