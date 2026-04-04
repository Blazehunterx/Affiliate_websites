const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
async function verify() {
    const { data: de } = await sb.from('hubs_content').select('id', { count: 'exact' }).eq('language', 'de');
    const { data: nl } = await sb.from('hubs_content').select('id', { count: 'exact' }).eq('language', 'nl');
    const { data: fr } = await sb.from('hubs_content').select('id', { count: 'exact' }).eq('language', 'fr');
    console.log(`DE: ${de?.length || 0}, NL: ${nl?.length || 0}, FR: ${fr?.length || 0}`);
}
verify();
