const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

/**
 * ASSET HIGH-FIDELITY PUMP
 * This script identifies placeholder images and replaces them with curated Unsplash/Stock visuals.
 */
async function pumpAssets() {
    console.log("📸 Starting Asset High-Fidelity Wave...");

    // 1. Fetch articles with placeholders
    const { data: articles, error } = await sb
        .from('hubs_content')
        .select('*')
        .or('image_url.ilike.%placeholder%,image_url.is.null');

    if (error || !articles) return console.error("❌ Fetch Error:", error);
    console.log(`[*] Found ${articles.length} placeholder assets.`);

    // Mapping keywords to high-res Unsplash IDs (High conversion)
    const assetMap = {
        gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
        vpn: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200',
        saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
        fintech: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200',
        travel: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1200',
        pet: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200',
        electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1200',
        fashion: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=1200',
        default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200'
    };

    for (const art of articles) {
        const targetImg = assetMap[art.niche] || assetMap.default;

        // --- SUBID TRACKING INJECTION ---
        let finalUrl = art.affiliate_url;
        if (finalUrl && !finalUrl.includes('subid=')) {
            const separator = finalUrl.includes('?') ? '&' : '?';
            finalUrl = `${finalUrl}${separator}subid=ms_media_audit_${art.niche}`;
        }

        const { error: updError } = await sb
            .from('hubs_content')
            .update({ 
                image_url: targetImg,
                affiliate_url: finalUrl 
            })
            .eq('id', art.id);

        if (updError) console.error(`[FAIL] ${art.id}:`, updError.message);
        else console.log(`[OK] ${art.id}: Asset & Tracking Optimized.`);
    }

    console.log("🏁 Asset Wave Complete.");
}

pumpAssets();
