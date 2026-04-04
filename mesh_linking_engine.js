const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

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

/**
 * INTERNAL LINK MESH ENGINE
 * Injects cross-niche authority links into every article to boost network SEO.
 */
async function buildMesh() {
    console.log("🕸️ Weaving Internal Link Mesh...");
    const { data: articles } = await sb.from('hubs_content').select('id, title, content, niche, language');
    if (!articles) return;

    for (const art of articles) {
        // Find 2 other relevant niches
        const others = Object.keys(HUSB_MAP).filter(n => n !== art.niche);
        const random1 = others[Math.floor(Math.random() * others.length)];
        const random2 = others[Math.floor(Math.random() * others.length)];

        // CLEAN LINK TEMPLATES
        const link1 = `${HUSB_MAP[random1]}/${art.language || 'en'}/`;
        const link2 = `${HUSB_MAP[random2]}/${art.language || 'en'}/`;

        const sentinel = "<!-- MESH_LINKS_START -->";
        const content = art.content || '';

        // Only inject if sentinel doesn't exist
        if (!content.includes(sentinel)) {
            const meshBlock = `\n\n${sentinel}\n---\n**Related Technical Audits:**\n- [Check out the 2026 ${random1.toUpperCase()} Market Audit](${link1})\n- [Verified ${random2.toUpperCase()} Infrastructure Analysis](${link2})\n<!-- MESH_LINKS_END -->`;
            
            const newContent = `${content}${meshBlock}`;
            await sb.from('hubs_content').update({ content: newContent }).eq('id', art.id);
            console.log(`[MESH] Linked ${art.niche} to ${random1} and ${random2}.`);
        }
    }
    console.log("🏁 Mesh Weaving Complete.");
}

buildMesh();
