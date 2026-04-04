const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
async function verify() {
    const { data: en } = await sb.from('hubs_content').select('id, created_at').or('language.eq.en,language.is.null').order('created_at', { ascending: false });
    console.log(`Total English: ${en?.length || 0}`);
    if (en && en.length > 0) {
        console.log(`Latest: ${en[0].created_at}`);
    }
}
verify();
