const { createClient } = require('@supabase/supabase-js');
const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const PRODUCT_MAPPING = [
  // VPN
  { niche: 'vpn', keywords: ['nordvpn'], url: 'https://www.awin1.com/cread.php?awinmid=9399&awinaffid=2834344&clickref=msm_vpn_nord&p=' },
  { niche: 'vpn', keywords: ['surfshark'], url: 'https://www.awin1.com/cread.php?awinmid=24941&awinaffid=2834344&clickref=msm_vpn_surfshark&p=' },
  { niche: 'vpn', keywords: ['expressvpn'], url: 'https://www.awin1.com/cread.php?awinmid=19433&awinaffid=2834344&clickref=msm_vpn_expressvpn&p=' },
  // SaaS
  { niche: 'saas', keywords: ['jasper'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  { niche: 'saas', keywords: ['shopify'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  { niche: 'saas', keywords: ['canva'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
  // Fintech
  { niche: 'fintech', keywords: ['revolut'], url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
  { niche: 'fintech', keywords: ['wise'], url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
  // Gaming
  { niche: 'gaming', keywords: ['elden ring'], url: 'https://www.premiumcdkeys.com/products/elden-ring-shadow-of-the-erdtree?bg_ref=W0EfQrpgKg' },
  { niche: 'gaming', keywords: ['rtx 4090', '4090'], url: 'https://www.amazon.de/s?k=NVIDIA+RTX+4090&tag=1710200006-20' },
  { niche: 'gaming', keywords: ['steam deck'], url: 'https://www.amazon.de/s?k=Steam+Deck+OLED&tag=1710200006-20' },
  { niche: 'gaming', keywords: ['logitech'], url: 'https://www.amazon.de/s?k=Logitech+G+Pro+X+Superlight+2&tag=1710200006-20' },
  // Travel
  { niche: 'travel', keywords: ['booking'], url: 'https://www.awin1.com/cread.php?awinmid=5551&awinaffid=2834344&clickref=msm_travel_booking&p=' },
  { niche: 'travel', keywords: ['airbnb'], url: 'https://www.awin1.com/cread.php?awinmid=3560&awinaffid=2834344&clickref=msm_travel_hotels&p=' },
  // Pet
  { niche: 'pet', keywords: ['furbo'], url: 'https://www.amazon.de/s?k=Furbo+360+Dog+Camera&tag=1710200006-20' },
  { niche: 'pet', keywords: ['blue buffalo', 'buffalo'], url: 'https://www.amazon.de/s?k=Blue+Buffalo+Life+Protection&tag=1710200006-20' },
  // WFH
  { niche: 'wfh', keywords: ['herman miller', 'aeron'], url: 'https://www.amazon.de/s?k=Herman+Miller+Aeron&tag=1710200006-20' },
  { niche: 'wfh', keywords: ['studio display'], url: 'https://www.amazon.de/s?k=Apple+Studio+Display&tag=1710200006-20' },
  // Electronics
  { niche: 'electronics', keywords: ['iphone'], url: 'https://www.amazon.de/s?k=iPhone+16+Pro+Max&tag=1710200006-20' },
  { niche: 'electronics', keywords: ['sony', 'xm5'], url: 'https://www.amazon.de/s?k=Sony+WH-1000XM5&tag=1710200006-20' },
  // Outdoor
  { niche: 'outdoor', keywords: ['garmin', 'fenix'], url: 'https://www.amazon.de/s?k=Garmin+Fenix+7+Pro&tag=1710200006-20' },
  { niche: 'outdoor', keywords: ['yeti', 'tundra'], url: 'https://www.amazon.de/s?k=YETI+Tundra+45&tag=1710200006-20' },
  // Smarthome
  { niche: 'smarthome', keywords: ['philips', 'hue'], url: 'https://www.amazon.de/s?k=Philips+Hue+Bridge&tag=1710200006-20' },
  { niche: 'smarthome', keywords: ['ring'], url: 'https://www.amazon.de/s?k=Ring+Video+Doorbell+Pro+2&tag=1710200006-20' },
  // AI Productivity
  { niche: 'aiproductivity', keywords: ['gohighlevel'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
  { niche: 'aiproductivity', keywords: ['notion'], url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
  // Fashion
  { niche: 'fashion', keywords: ['nike'], url: 'https://www.amazon.de/s?k=Nike+Air+Max&tag=1710200006-20' },
  { niche: 'fashion', keywords: ['patagonia'], url: 'https://www.amazon.de/s?k=Patagonia+Torrentshell&tag=1710200006-20' }
];

async function run() {
  console.log("Fetching all records with verification placeholders...");
  
  let hasMore = true;
  let offset = 0;
  let totalUpdated = 0;

  while (hasMore) {
    console.log(`Fetching chunk of 1000 records from offset ${offset}...`);
    const { data: records, error } = await sb.from('hubs_content')
      .select('id, title, niche')
      .like('affiliate_url', '%verification%')
      .range(offset, offset + 999);

    if (error) {
      console.error("Error fetching records:", error.message);
      break;
    }

    if (!records || records.length === 0) {
      console.log("No more records with placeholder links found.");
      hasMore = false;
      break;
    }

    console.log(`Fetched ${records.length} records. Processing...`);

    // Group updates by URL to batch them
    const groups = {};
    for (const rec of records) {
      const niche = rec.niche.toLowerCase();
      const title = rec.title.toLowerCase();
      
      // Find matching mapping
      const mapping = PRODUCT_MAPPING.find(m => 
        m.niche === niche && m.keywords.some(kw => title.includes(kw))
      );

      const targetUrl = mapping ? mapping.url : `https://www.amazon.de/s?k=${encodeURIComponent(rec.title)}&tag=1710200006-20`; // fallback

      if (!groups[targetUrl]) groups[targetUrl] = [];
      groups[targetUrl].push(rec.id);
    }

    // Execute bulk updates for this chunk
    for (const [url, ids] of Object.entries(groups)) {
      console.log(`Updating ${ids.length} records with URL: ${url}`);
      const { error: updateError } = await sb.from('hubs_content')
        .update({ affiliate_url: url })
        .in('id', ids);

      if (updateError) {
        console.error(`Error updating chunk for URL ${url}:`, updateError.message);
      } else {
        totalUpdated += ids.length;
      }
    }

    // If we fetched fewer than 1000 records, there are no more records
    if (records.length < 1000) {
      hasMore = false;
    } else {
      offset = 0; // Keep offset at 0 since rows drop out of filter
    }
  }

  console.log(`Successfully completed! Total records updated: ${totalUpdated}`);
}

run();
