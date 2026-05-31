const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const PRODUCT_MAPPING = [
  { niche: 'vpn', keywords: ['nordvpn'], url: 'https://www.awin1.com/cread.php?awinmid=9399&awinaffid=2834344&clickref=msm_vpn_nord&p=' },
  { niche: 'vpn', keywords: ['surfshark'], url: 'https://www.awin1.com/cread.php?awinmid=24941&awinaffid=2834344&clickref=msm_vpn_surfshark&p=' },
  { niche: 'vpn', keywords: ['expressvpn'], url: 'https://www.awin1.com/cread.php?awinmid=19433&awinaffid=2834344&clickref=msm_vpn_expressvpn&p=' },
  { niche: 'saas', keywords: ['jasper'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  { niche: 'saas', keywords: ['shopify'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  { niche: 'saas', keywords: ['canva'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  { niche: 'fintech', keywords: ['revolut'], url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
  { niche: 'fintech', keywords: ['wise'], url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
  { niche: 'gaming', keywords: ['elden ring'], url: 'https://www.premiumcdkeys.com/products/elden-ring-shadow-of-the-erdtree?bg_ref=W0EfQrpgKg' },
  { niche: 'gaming', keywords: ['rtx 4090', '4090'], url: 'https://www.amazon.de/s?k=NVIDIA+RTX+4090&tag=1710200006-20' },
  { niche: 'gaming', keywords: ['steam deck'], url: 'https://www.amazon.de/s?k=Steam+Deck+OLED&tag=1710200006-20' },
  { niche: 'gaming', keywords: ['logitech'], url: 'https://www.amazon.de/s?k=Logitech+G+Pro+X+Superlight+2&tag=1710200006-20' },
  { niche: 'travel', keywords: ['booking'], url: 'https://www.awin1.com/cread.php?awinmid=5551&awinaffid=2834344&clickref=msm_travel_booking&p=' },
  { niche: 'travel', keywords: ['airbnb'], url: 'https://www.awin1.com/cread.php?awinmid=3560&awinaffid=2834344&clickref=msm_travel_hotels&p=' },
  { niche: 'pet', keywords: ['furbo'], url: 'https://www.amazon.de/s?k=Furbo+360+Dog+Camera&tag=1710200006-20' },
  { niche: 'pet', keywords: ['blue buffalo', 'buffalo'], url: 'https://www.amazon.de/s?k=Blue+Buffalo+Life+Protection&tag=1710200006-20' },
  { niche: 'wfh', keywords: ['herman miller', 'aeron'], url: 'https://www.amazon.de/s?k=Herman+Miller+Aeron&tag=1710200006-20' },
  { niche: 'wfh', keywords: ['studio display'], url: 'https://www.amazon.de/s?k=Apple+Studio+Display&tag=1710200006-20' },
  { niche: 'electronics', keywords: ['iphone'], url: 'https://www.amazon.de/s?k=iPhone+16+Pro+Max&tag=1710200006-20' },
  { niche: 'electronics', keywords: ['sony', 'xm5'], url: 'https://www.amazon.de/s?k=Sony+WH-1000XM5&tag=1710200006-20' },
  { niche: 'outdoor', keywords: ['garmin', 'fenix'], url: 'https://www.amazon.de/s?k=Garmin+Fenix+7+Pro&tag=1710200006-20' },
  { niche: 'outdoor', keywords: ['yeti', 'tundra'], url: 'https://www.amazon.de/s?k=YETI+Tundra+45&tag=1710200006-20' },
  { niche: 'smarthome', keywords: ['philips', 'hue'], url: 'https://www.amazon.de/s?k=Philips+Hue+Bridge&tag=1710200006-20' },
  { niche: 'smarthome', keywords: ['ring'], url: 'https://www.amazon.de/s?k=Ring+Video+Doorbell+Pro+2&tag=1710200006-20' },
  { niche: 'aiproductivity', keywords: ['gohighlevel'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
  { niche: 'aiproductivity', keywords: ['notion'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
  { niche: 'fashion', keywords: ['nike'], url: 'https://www.amazon.de/s?k=Nike+Air+Max&tag=1710200006-20' },
  { niche: 'fashion', keywords: ['patagonia'], url: 'https://www.amazon.de/s?k=Patagonia+Torrentshell&tag=1710200006-20' }
];

function getOptimalAffiliateUrl(niche, productName) {
  const nameLower = productName.toLowerCase();
  const nicheLower = niche.toLowerCase();
  const mapping = PRODUCT_MAPPING.find(m => m.niche === nicheLower && m.keywords.some(kw => nameLower.includes(kw)));
  if (mapping) return mapping.url;
  if (nicheLower === 'gaming') {
    const gameSlug = nameLower.replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    return 'https://www.premiumcdkeys.com/products/' + gameSlug + '?bg_ref=W0EfQrpgKg';
  }
  const isAwinNiche = ['vpn', 'saas', 'travel', 'fintech', 'aiproductivity'].includes(nicheLower);
  if (isAwinNiche) return 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_' + nicheLower + '_fallback&p=';
  return 'https://www.amazon.de/s?k=' + encodeURIComponent(productName) + '&tag=1710200006-20';
}

async function run() {
  console.log("Starting direct placeholder links replacement...");
  let totalFixed = 0;
  let loops = 0;
  const maxLoops = 2000; // safety ceiling

  while (loops < maxLoops) {
    loops++;
    console.log(`\n--- Loop #${loops} ---`);
    console.log("Fetching up to 1000 placeholders...");
    
    const { data: records, error } = await sb.from('hubs_content')
      .select('id, title, niche, affiliate_url')
      .like('affiliate_url', '%verification%')
      .limit(1000);

    if (error) {
      console.error("Error fetching placeholders:", error.message);
      break;
    }

    if (!records || records.length === 0) {
      console.log("No more placeholders found. Link replacement complete!");
      break;
    }

    console.log(`Fetched ${records.length} records. Processing...`);

    // Group updates by target URL
    const groups = {};
    for (const rec of records) {
      const targetUrl = getOptimalAffiliateUrl(rec.niche, rec.title);
      if (!groups[targetUrl]) {
        groups[targetUrl] = [];
      }
      groups[targetUrl].push(rec.id);
    }

    // Perform updates
    let updatedThisLoop = 0;
    let hasUpdateError = false;

    for (const [url, ids] of Object.entries(groups)) {
      console.log(`Updating ${ids.length} rows to URL: ${url}`);
      
      const { error: updateError } = await sb.from('hubs_content')
        .update({ affiliate_url: url })
        .in('id', ids);

      if (updateError) {
        console.error(`❌ DB ERROR: Update failed for URL ${url}:`, updateError.message);
        hasUpdateError = true;
        break; // break the URL loop
      } else {
        updatedThisLoop += ids.length;
      }
    }

    if (hasUpdateError) {
      console.log("Halting execution due to DB update error to prevent infinite loops.");
      break;
    }

    totalFixed += updatedThisLoop;
    console.log(`Loop #${loops} complete. Fixed this loop: ${updatedThisLoop} (Total fixed so far: ${totalFixed})`);

    // If we updated fewer rows than fetched, it means some rows failed or couldn't be updated
    if (updatedThisLoop === 0) {
      console.log("No rows were updated in this loop. Stopping to prevent infinite loops.");
      break;
    }
  }

  console.log(`\nLink replacement script finished. Total placeholders fixed: ${totalFixed}`);
  process.exit(0);
}

run();
