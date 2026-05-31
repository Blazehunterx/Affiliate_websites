const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const BONUSARRIVE_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzODgiLCJ1c2VyX2lkIjoiMzA0NSIsIm5hbWUiOiJNYXJ2aW5tZWRhaSJ9.mXnkw+4Zll+ezG3KazlUsQwYwb+hBcUSzDrli+hdtxw=';
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';

const sb = createClient(SB_URL, SB_KEY);

async function syncBonusarrivePartners() {
    console.log("Checking Bonusarrive for approved advertisers to sync to affiliate_partners...");
    
    let page = 1;
    let totalSynced = 0;
    
    try {
        // Fetch existing partners to avoid duplicate queries
        const { data: existingPartners, error: fetchError } = await sb
            .from('affiliate_partners')
            .select('id, name, tracking_url');
            
        if (fetchError) {
            console.error("Error fetching existing partners:", fetchError.message);
            return;
        }
        
        while (true) {
            console.log(`Scanning Bonusarrive page ${page}...`);
            const response = await axios.post('https://www.bonusarrive.com/slapi/service/advertisers', {
                per_page: 100, page: page
            }, {
                headers: { 'Authorization': BONUSARRIVE_TOKEN, 'Content-Type': 'application/json' }
            });
            
            const list = response.data.data.list || [];
            if (list.length === 0) {
                console.log("No more advertisers found.");
                break;
            }
            
            for (const ad of list) {
                if (ad.merchant_status === 'approved' || ad.merchant_status === 'active') {
                    const name = ad.site_name;
                    const trackingUrl = ad.tracking_url;
                    
                    // Check if already exists in affiliate_partners
                    const existing = existingPartners.find(p => p.name.toLowerCase() === name.toLowerCase());
                    
                    if (existing) {
                        if (existing.tracking_url !== trackingUrl) {
                            console.log(`Updating partner link: ${name} -> ${trackingUrl}`);
                            const { error: updateErr } = await sb
                                .from('affiliate_partners')
                                .update({ tracking_url: trackingUrl, last_synced: new Date().toISOString() })
                                .eq('id', existing.id);
                            if (updateErr) console.error(`[DB ERROR] Update failed for ${name}: ${updateErr.message}`);
                        }
                    } else {
                        console.log(`Inserting new partner: ${name} -> ${trackingUrl}`);
                        const { error: insertErr } = await sb
                            .from('affiliate_partners')
                            .insert({
                                name: name,
                                tracking_url: trackingUrl,
                                status: 'approved',
                                last_synced: new Date().toISOString()
                            });
                        if (insertErr) console.error(`[DB ERROR] Insert failed for ${name}: ${insertErr.message}`);
                    }
                    totalSynced++;
                }
            }
            page++;
        }
        console.log(`Sync complete. Total approved Bonusarrive partners synced/checked: ${totalSynced}`);
    } catch (e) {
        console.error("Error during Bonusarrive sync:", e.message);
    }
}

syncBonusarrivePartners();
