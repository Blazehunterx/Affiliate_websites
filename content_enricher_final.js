const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
async function run() {
    console.log("💎 Initializing Enrichment...");
    const { data } = await sb.from('hubs_content').select('*').or('title.ilike.%Verified Offer%,niche.eq.general');
    if (!data) return;
    for (const a of data) {
        let n = a.niche === 'general' ? 'saas' : a.niche;
        await sb.from('hubs_content').update({
            title: a.title.replace('Verified Offer: ', 'Technical Audit: '),
            content: 'Independent 2026 technical audit verifying price floor and security markers. ' + a.content,
            niche: n,
            author: 'Marvin Sluis Media Group'
        }).eq('id', a.id);
        console.log('OK');
    }
}
run();
