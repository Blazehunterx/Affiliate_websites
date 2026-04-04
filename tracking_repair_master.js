const { createClient } = require('@supabase/supabase-js');

// --- CONFIG ---
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const AMAZON_TAG = '1710200006-20';

/**
 * 100% TRACKING REPAIR MASTER
 * Ensures every single article has proper SubID tracking and Amazon fallback.
 */
async function repairTracking() {
    console.log("🛠️ Starting 100% Tracking Repair...");
    const { data: articles, error } = await sb.from('hubs_content').select('*');
    if (error) return console.log(error);

    for (const art of articles) {
        let finalUrl = art.affiliate_url;
        
        // 1. Awin SubID Injection
        if (finalUrl && finalUrl.includes('awin1.com') && !finalUrl.includes('subid=')) {
            const separator = finalUrl.includes('?') ? '&' : '?';
            finalUrl = `${finalUrl}${separator}subid=ms_media_audit_${art.niche}`;
        }
        
        // 2. Aggressive Fallback (If not Awin with SubID AND not Amazon with Tag)
        const isAwinCorrect = finalUrl && finalUrl.includes('awin1.com') && finalUrl.includes('subid=');
        const isAmazonCorrect = finalUrl && finalUrl.includes('amazon.') && finalUrl.includes('tag=');

        if (!isAwinCorrect && !isAmazonCorrect) {
            const cleanTitle = art.title.replace(/\[.*?\]/g, '').replace('Technical Audit: ', '').trim();
            const query = encodeURIComponent(cleanTitle);
            finalUrl = `https://www.amazon.de/s?k=${query}&tag=${AMAZON_TAG}`;
            console.log(`[REPAIR] Force Amazon fallback for: ${art.title}`);
        }

        const { error: updError } = await sb
            .from('hubs_content')
            .update({ affiliate_url: finalUrl })
            .eq('id', art.id);

        if (updError) console.error(`[FAIL] ${art.id}`, updError.message);
    }
    console.log("🏁 Tracking Repair Complete.");
}
repairTracking();
