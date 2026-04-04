const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

async function auditAssets() {
    console.log("🧐 Auditing Monetization Assets...");
    const { data: res, error } = await sb.from('hubs_content').select('id, title, niche, affiliate_url, image_url');
    if (error) return console.log(error);

    let issues = {
        placeholderImages: 0,
        missingAffiliate: 0,
        invalidTracking: 0
    };

    res.forEach(a => {
        if (!a.image_url || a.image_url.includes('placeholder')) issues.placeholderImages++;
        if (!a.affiliate_url) issues.missingAffiliate++;
        else if (!a.affiliate_url.includes('http')) issues.invalidTracking++;
    });

    console.log("Audit Results:", issues);
    console.log("Total Audited:", res.length);
}
auditAssets();
