const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

/**
 * ENRICHMENT LOGIC
 * This engine scans for placeholder content and injects 2026-specific technical metadata.
 */
async function enrichContent() {
    console.log("💎 Initializing Content Enrichment Wave...");

    // 1. Fetch articles with placeholder titles or generic 'general' niche
    const { data: articles, error } = await sb
        .from('hubs_content')
        .select('*')
        .or('title.ilike.%Verified Offer%,niche.eq.general')
        .limit(400); 

    if (error || !articles) return console.error("❌ Fetch Error:", error);

    for (const art of articles) {
        console.log(`[*] Enriching: ${art.title}`);

        // Define niche-specific enhancements if it's currently 'general'
        let targetNiche = art.niche;
        const lowTitle = art.title.toLowerCase();
        
        if (art.niche === 'general') {
            if (lowTitle.includes('game') || lowTitle.includes('play')) targetNiche = 'gaming';
            else if (lowTitle.includes('vpn') || lowTitle.includes('secure')) targetNiche = 'vpn';
            else if (lowTitle.includes('ai') || lowTitle.includes('saas')) targetNiche = 'saas';
            else if (lowTitle.includes('crypto') || lowTitle.includes('bank')) targetNiche = 'fintech';
        }

        // Logic-based enrichment (Simulating an LLM patch)
        const enrichedTitle = art.title.replace("Verified Offer: ", "Technical Audit: ");
        const enrichedContent = `Comprehensive 2026 technical audit of ${art.title.replace("Verified Offer: ", "")}. Benchmarked for regional latency, checkout finality, and partnership transparency in the EU digital corridor. ${art.content}`;
        const enrichedExcerpt = `Independent technical review for ${art.title.replace("Verified Offer: ", "")}. Verified performance markers for the 2026 workforce.`;

        // Update record
        const { error: updError } = await sb
            .from('hubs_content')
            .update({
                niche: targetNiche,
                title: enrichedTitle,
                content: enrichedContent,
                excerpt: enrichedExcerpt,
                author: 'Marvin Sluis Media Group'
            })
            .eq('id', art.id);

        if (updError) console.error(`[FAIL] ${art.id}:`, updError.message);
        else console.log(`[OK] ${art.id}: SEO Optimized.`);
    }

    console.log("🏁 Enrichment Wave Complete.");
}

enrichContent();
