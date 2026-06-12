require('../load_env');
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SB_URL = 'https://nrthkusyewvdcjkiihmy.supabase.co';
const SB_KEY = 'sb_secret_jmHkejYmB9DogpRu-STqlA_9aaMqOem';
const sb = createClient(SB_URL, SB_KEY);

const HUBS = [
    { niche: "saas", route: "saas", name: "SaaS & AI Tools" },
    { niche: "gaming", route: "gaming", name: "Gaming Deals" },
    { niche: "travel", route: "travel", name: "Travel Deals" },
    { niche: "pet", route: "pet", name: "Pet Care & Reviews" },
    { niche: "fintech", route: "fintech", name: "Fintech & Finance" },
    { niche: "vpn", route: "vpn", name: "VPN & Privacy" },
    { niche: "wfh", route: "wfh", name: "WFH Gear & Setup" },
    { niche: "outdoor", route: "outdoor", name: "Outdoor Gear" },
    { niche: "smarthome", route: "smarthome", name: "Smart Home Tech" },
    { niche: "aiproductivity", route: "aiproductivity", name: "AI Productivity" },
    { niche: "fashion", route: "fashion", name: "Fashion & Trends" },
    { niche: "electronics", route: "electronics", name: "Electronics & Tech" }
];

function cleanMarkdown(md) {
    if (!md) return '';
    return md
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\n/g, ' ')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

async function generateRssFeeds() {
    console.log("Generating RSS Feeds for all hubs...");
    const distPath = __dirname;

    for (const hub of HUBS) {
        const hubDir = path.join(distPath, hub.route);
        if (!fs.existsSync(hubDir)) fs.mkdirSync(hubDir);

        console.log(`Processing RSS for ${hub.name}...`);
        const { data: records, error } = await sb
            .from('hubs_content')
            .select('created_at, title, slug, content, image_url')
            .eq('niche', hub.niche)
            .limit(1000);

        if (error) {
            console.error(`Error fetching for ${hub.niche}:`, error.message);
            continue;
        }

        const buildDate = new Date().toUTCString();
        
        let itemsXml = '';
        if (records && records.length > 0) {
            const sorted = records.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
            const top30 = sorted.slice(0, 30);
            
            for (const rec of top30) {
                const url = `https://marvinsluis-media.pages.dev/${hub.route}/audit/${rec.slug}/`;
                const cleanTitle = rec.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                const desc = cleanMarkdown(rec.content).substring(0, 300);
                const pubDate = new Date(rec.created_at).toUTCString();
                
                itemsXml += `
        <item>
            <title>${cleanTitle}</title>
            <link>${url}</link>
            <description><![CDATA[${desc}...]]></description>
            <pubDate>${pubDate}</pubDate>
            <guid>${url}</guid>
            ${rec.image_url ? `<enclosure url="${rec.image_url}" type="image/jpeg" />` : ''}
        </item>`;
            }
        }

        const cleanHubName = hub.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
<channel>
    <title>Marvin Sluis Media Group - ${cleanHubName}</title>
    <link>https://marvinsluis-media.pages.dev/${hub.route}/</link>
    <description>Technical Integrity Reviews and audits for ${cleanHubName}</description>
    <language>en</language>
    <lastBuildDate>${buildDate}</lastBuildDate>${itemsXml}
</channel>
</rss>`;

        fs.writeFileSync(path.join(hubDir, 'rss.xml'), rssXml);
        console.log(`Successfully generated RSS for ${hub.route} at ${hub.route}/rss.xml`);
    }
}

generateRssFeeds().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
