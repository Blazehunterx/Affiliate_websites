const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
async function audit() {
    const { data: res } = await sb.from('hubs_content').select('niche, title').or('language.eq.en,language.is.null');
    const counts = {};
    res.forEach(i => counts[i.niche] = (counts[i.niche] || 0) + 1);
    console.log("Niche Breakdown:", counts);
    console.log("Sample Titles:", res.slice(0, 5).map(i => i.title));
}
audit();
