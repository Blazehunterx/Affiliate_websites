const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Awin Link Injector
 * This script matches approved partners to their respective niches and updates
 * the 'affiliate_url' in the latest 'hubs_content' records.
 */
async function injectLiveLinks() {
    console.log("🛠️ Starting Live Link Injection...");

    // 1. Fetch approved partners
    const { data: partners, error: pError } = await supabase
        .from('affiliate_partners')
        .select('*')
        .eq('status', 'approved');

    if (pError || !partners) return console.error("[ERROR] Could not fetch partners:", pError);

    console.log(`🔗 Found ${partners.length} candidates for injection.`);

    for (const partner of partners) {
        // Find dispatches for this niche that still have the placeholder/verification link
        const { data: dispatches, error: dError } = await supabase
            .from('hubs_content')
            .select('id, niche')
            .eq('niche', partner.niche)
            .ilike('affiliate_url', '%verification%'); // Look for the placeholder

        if (dispatches && dispatches.length > 0) {
            console.log(`[INJECTING] ${partner.name} tracking link into ${dispatches.length} [${partner.niche}] audits...`);
            
            for (const d of dispatches) {
                await supabase
                    .from('hubs_content')
                    .update({ affiliate_url: partner.tracking_url })
                    .eq('id', d.id);
            }
        }
    }

    console.log("🚀 Injection Complete. All audits now have live monetization.");
}

injectLiveLinks();
