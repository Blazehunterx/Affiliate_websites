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
  console.log('Scanning table via ID pagination to fix remaining placeholders...');
  let lastId = '00000000-0000-0000-0000-000000000000';
  let totalFixed = 0;
  let totalScanned = 0;
  while (true) {
    const { data: records, error } = await sb.from('hubs_content')
      .select('id, title, niche, affiliate_url')
      .gt('id', lastId)
      .order('id', { ascending: true })
      .limit(5000);
    if (error) {
      console.error('Error fetching records:', error.message);
      break;
    }
    if (!records || records.length === 0) {
      console.log('Finished scanning the entire table.');
      break;
    }
    lastId = records[records.length - 1].id;
    totalScanned += records.length;
    const placeholders = records.filter(r => r.affiliate_url && r.affiliate_url.includes('verification'));
    if (placeholders.length > 0) {
      console.log('Found ' + placeholders.length + ' placeholders in chunk. Fixing...');
      for (const rec of placeholders) {
        const targetUrl = getOptimalAffiliateUrl(rec.niche, rec.title);
        const { error: updateErr } = await sb.from('hubs_content').update({ affiliate_url: targetUrl }).eq('id', rec.id);
        if (updateErr) {
          console.error('Error updating id ' + rec.id + ':', updateErr.message);
        } else {
          totalFixed++;
        }
      }
    }
    if (totalScanned % 50000 === 0) {
      console.log('Scanned ' + totalScanned + ' rows... Fixed so far: ' + totalFixed);
    }
  }
  console.log('Done! Total scanned: ' + totalScanned + ', Total fixed: ' + totalFixed);
}
run();
