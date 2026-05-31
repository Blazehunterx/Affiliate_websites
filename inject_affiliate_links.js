// ============================================================
// STEP 1: AFFILIATE LINK INJECTOR
// Assigns real tracked Awin links to all hubs_content records
// by niche so every audit page has a live conversion path.
// ============================================================
const { createClient } = require('@supabase/supabase-js');

const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);
const AFF_ID = '2834344';

// Real Awin merchant IDs per niche — rotating pool for diversity
// Each entry: awinmid, real product name, commission tier
const NICHE_MERCHANTS = {
  vpn: [
    { mid: 9399, name: 'NordVPN DE', tag: 'nordvpn', commission: 'HIGH' },
    { mid: 24941, name: 'Surfshark', tag: 'surfshark', commission: 'HIGH' },
    { mid: 19433, name: 'ExpressVPN', tag: 'expressvpn', commission: 'HIGH' },
  ],
  saas: [
    { mid: 6288, name: 'Fiverr', tag: 'fiverr', commission: 'HIGH' },
    { mid: 295, name: 'Create.net', tag: 'createnet', commission: 'MED' },
    { mid: 1757, name: 'UKHost4u', tag: 'ukhost4u', commission: 'MED' },
  ],
  fintech: [
    { mid: 6288, name: 'Fiverr', tag: 'fiverr', commission: 'HIGH' },
    { mid: 21180, name: 'Wise', tag: 'wise', commission: 'HIGH' },
    { mid: 8470, name: 'Ziggo Zakelijk', tag: 'ziggo', commission: 'MED' },
  ],
  gaming: [
    { mid: 24882, name: 'Green Man Gaming', tag: 'gmg', commission: 'MED' },
    { mid: 25001, name: 'Instant Gaming', tag: 'instantgaming', commission: 'MED' },
  ],
  travel: [
    { mid: 5551, name: 'Booking.com', tag: 'booking', commission: 'HIGH' },
    { mid: 3560, name: 'Hotels.com', tag: 'hotels', commission: 'MED' },
  ],
  pet: [
    { mid: 112976, name: 'Brisks Outdoors', tag: 'brisks', commission: 'MED' },
    { mid: 7399, name: 'zooplus', tag: 'zooplus', commission: 'MED' },
  ],
  wfh: [
    { mid: 61655, name: 'Back to the Office', tag: 'bttoffice', commission: 'MED' },
    { mid: 6288, name: 'Fiverr', tag: 'fiverr', commission: 'HIGH' },
  ],
  outdoor: [
    { mid: 112976, name: 'Brisks Outdoors', tag: 'brisks', commission: 'MED' },
  ],
  smarthome: [
    { mid: 295, name: 'Create.net', tag: 'createnet', commission: 'MED' },
  ],
  aiproductivity: [
    { mid: 6288, name: 'Fiverr', tag: 'fiverr', commission: 'HIGH' },
    { mid: 295, name: 'Create.net', tag: 'createnet', commission: 'MED' },
  ],
  fashion: [
    { mid: 1006, name: 'The Safe Shop', tag: 'safeshop', commission: 'MED' },
  ],
  electronics: [
    { mid: 24882, name: 'Green Man Gaming', tag: 'gmg', commission: 'MED' },
  ],
};

function buildAwinUrl(mid, subid) {
  return `https://www.awin1.com/cread.php?awinmid=${mid}&awinaffid=${AFF_ID}&clickref=${subid}&p=`;
}

function buildAmazonUrl(keyword) {
  return `https://www.amazon.de/s?k=${encodeURIComponent(keyword)}&tag=1710200006-20`;
}

async function injectLinks() {
  console.log('🔗 Starting Affiliate Link Injection...');
  const niches = Object.keys(NICHE_MERCHANTS);

  for (const niche of niches) {
    const merchants = NICHE_MERCHANTS[niche];
    if (!merchants || !merchants.length) continue;

    // Fetch all EN records that still use the placeholder URL
    const { data: records } = await sb.from('hubs_content')
      .select('id, slug, niche')
      .eq('niche', niche)
      .like('affiliate_url', '%verification%');

    if (!records || !records.length) {
      console.log(`[${niche.toUpperCase()}] Already updated or no records.`);
      continue;
    }

    console.log(`[${niche.toUpperCase()}] Injecting into ${records.length} records...`);
    let updated = 0;

    for (const rec of records) {
      // Rotate merchants for diversity
      const merchant = merchants[updated % merchants.length];
      const subid = `msm_${niche}_${merchant.tag}`;
      const affiliateUrl = buildAwinUrl(merchant.mid, subid);

      const { error } = await sb.from('hubs_content')
        .update({ affiliate_url: affiliateUrl })
        .eq('id', rec.id);

      if (!error) updated++;
    }
    console.log(`  ✅ ${updated}/${records.length} updated for ${niche}`);
  }
  console.log('\n🏁 Affiliate Link Injection Complete!');
}

injectLinks();