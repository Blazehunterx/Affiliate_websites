const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
const AFF_ID = '2834344';

const NICHE_LINKS = {
  vpn: 'https://www.awin1.com/cread.php?awinmid=9399&awinaffid=' + AFF_ID + '&clickref=msm_vpn_nord&p=',
  saas: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=' + AFF_ID + '&clickref=msm_saas_fiverr&p=',
  fintech: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=' + AFF_ID + '&clickref=msm_fintech_wise&p=',
  gaming: 'https://www.awin1.com/cread.php?awinmid=24882&awinaffid=' + AFF_ID + '&clickref=msm_gaming_gmg&p=',
  travel: 'https://www.awin1.com/cread.php?awinmid=5551&awinaffid=' + AFF_ID + '&clickref=msm_travel_booking&p=',
  pet: 'https://www.awin1.com/cread.php?awinmid=112976&awinaffid=' + AFF_ID + '&clickref=msm_pet_brisks&p=',
  wfh: 'https://www.awin1.com/cread.php?awinmid=61655&awinaffid=' + AFF_ID + '&clickref=msm_wfh_bttoffice&p=',
  outdoor: 'https://www.awin1.com/cread.php?awinmid=112976&awinaffid=' + AFF_ID + '&clickref=msm_outdoor_brisks&p=',
  smarthome: 'https://www.awin1.com/cread.php?awinmid=295&awinaffid=' + AFF_ID + '&clickref=msm_smarthome_create&p=',
  aiproductivity: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=' + AFF_ID + '&clickref=msm_ai_fiverr&p=',
  fashion: 'https://www.awin1.com/cread.php?awinmid=1006&awinaffid=' + AFF_ID + '&clickref=msm_fashion_safeshop&p=',
  electronics: 'https://www.awin1.com/cread.php?awinmid=24882&awinaffid=' + AFF_ID + '&clickref=msm_electronics_gmg&p=',
};

async function fixLinks() {
  console.log('Fixing affiliate links via bulk update...');
  const niches = Object.keys(NICHE_LINKS);
  
  for (const niche of niches) {
    const link = NICHE_LINKS[niche];
    // Use RPC/update without filter (update all in niche)
    const { data, error } = await sb.from('hubs_content')
      .update({ affiliate_url: link })
      .eq('niche', niche)
      .select('id');
    
    if (error) {
      console.log('[' + niche + '] Error:', error.message);
    } else {
      console.log('[' + niche.toUpperCase() + '] Updated ' + (data ? data.length : '?') + ' records');
    }
  }
  console.log('Done!');
}

fixLinks();
