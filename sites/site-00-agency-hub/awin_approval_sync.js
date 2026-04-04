const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const AWIN_API_KEY = process.env.AWIN_API_KEY || '6975f078-a13b-4265-b772-76b99ea46fd6';
const AWIN_PUBLISHER_ID = '1692233'; // Marvin's Publisher ID
const SUPABASE_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Syncs Awin approvals and updates Supabase 'hubs_content' or a dedicated 'affiliate_partners' table.
 */
async function syncAwinApprovals() {
    console.log("🔍 Checking Awin for new program approvals...");
    
    try {
        // 1. Fetch all joined programs
        const response = await axios.get(`https://api.awin.com/publishers/${AWIN_PUBLISHER_ID}/programmes?relationship=joined`, {
            headers: { 'Authorization': `Bearer ${AWIN_API_KEY}` }
        });

        const joinedPrograms = response.data;
        console.log(`✅ Found ${joinedPrograms.length} approved programs.`);

        for (const prog of joinedPrograms) {
            const cleanUrl = prog.clickThroughUrl;
            console.log(`🔗 Processing [${prog.name}] | URL: ${cleanUrl}`);

            // 2. Update Supabase with the live link where applicable
            // (Note: This logic should match the merchant to its specific hub niche)
            const { error } = await supabase
                .from('affiliate_partners') // Hypothetical table for persistent partner links
                .upsert({ 
                    awin_id: prog.id, 
                    name: prog.name, 
                    tracking_url: cleanUrl, 
                    status: 'approved',
                    last_synced: new Date().toISOString()
                }, { onConflict: 'awin_id' });

            if (error) console.error(`[DB ERROR] ${prog.name}: ${error.message}`);
        }

        console.log("🚀 Sync Complete. All approved links are now ready for injection.");

    } catch (err) {
        console.error(`[SYNC FAILED] ${err.message}`);
    }
}

syncAwinApprovals();
