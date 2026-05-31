const { createClient } = require('@supabase/supabase-js');

const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

async function bulkUpdate() {
  console.log("Starting optimized bulk affiliate link injection...");
  const updates = [
    // VPN
    { eq: { niche: 'vpn' }, like: '%NordVPN%', url: 'https://www.awin1.com/cread.php?awinmid=9399&awinaffid=2834344&clickref=msm_vpn_nord&p=' },
    { eq: { niche: 'vpn' }, like: '%Surfshark%', url: 'https://www.awin1.com/cread.php?awinmid=24941&awinaffid=2834344&clickref=msm_vpn_surfshark&p=' },
    { eq: { niche: 'vpn' }, like: '%ExpressVPN%', url: 'https://www.awin1.com/cread.php?awinmid=19433&awinaffid=2834344&clickref=msm_vpn_expressvpn&p=' },
    
    // SaaS
    { eq: { niche: 'saas' }, like: '%Jasper%', url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
    { eq: { niche: 'saas' }, like: '%Shopify%', url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
    { eq: { niche: 'saas' }, like: '%Canva%', url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_saas_fiverr&p=' },
    
    // Fintech
    { eq: { niche: 'fintech' }, like: '%Revolut%', url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
    { eq: { niche: 'fintech' }, like: '%Wise%', url: 'https://www.awin1.com/cread.php?awinmid=21180&awinaffid=2834344&clickref=msm_fintech_wise&p=' },
    
    // Gaming
    { eq: { niche: 'gaming' }, like: '%Elden Ring%', url: 'https://www.premiumcdkeys.com/products/elden-ring-shadow-of-the-erdtree?bg_ref=W0EfQrpgKg' },
    { eq: { niche: 'gaming' }, like: '%RTX 4090%', url: 'https://www.amazon.de/s?k=NVIDIA+RTX+4090&tag=1710200006-20' },
    { eq: { niche: 'gaming' }, like: '%Steam Deck%', url: 'https://www.amazon.de/s?k=Steam+Deck+OLED&tag=1710200006-20' },
    { eq: { niche: 'gaming' }, like: '%Logitech%', url: 'https://www.amazon.de/s?k=Logitech+G+Pro+X+Superlight+2&tag=1710200006-20' },
    
    // Travel
    { eq: { niche: 'travel' }, like: '%Booking%', url: 'https://www.awin1.com/cread.php?awinmid=5551&awinaffid=2834344&clickref=msm_travel_booking&p=' },
    { eq: { niche: 'travel' }, like: '%Airbnb%', url: 'https://www.awin1.com/cread.php?awinmid=3560&awinaffid=2834344&clickref=msm_travel_hotels&p=' },
    
    // Pet
    { eq: { niche: 'pet' }, like: '%Furbo%', url: 'https://www.amazon.de/s?k=Furbo+360+Dog+Camera&tag=1710200006-20' },
    { eq: { niche: 'pet' }, like: '%Blue Buffalo%', url: 'https://www.amazon.de/s?k=Blue+Buffalo+Life+Protection&tag=1710200006-20' },
    
    // WFH
    { eq: { niche: 'wfh' }, like: '%Herman Miller%', url: 'https://www.amazon.de/s?k=Herman+Miller+Aeron&tag=1710200006-20' },
    { eq: { niche: 'wfh' }, like: '%Studio Display%', url: 'https://www.amazon.de/s?k=Apple+Studio+Display&tag=1710200006-20' },
    
    // Electronics
    { eq: { niche: 'electronics' }, like: '%iPhone%', url: 'https://www.amazon.de/s?k=iPhone+16+Pro+Max&tag=1710200006-20' },
    { eq: { niche: 'electronics' }, like: '%Sony%', url: 'https://www.amazon.de/s?k=Sony+WH-1000XM5&tag=1710200006-20' },
    
    // Outdoor
    { eq: { niche: 'outdoor' }, like: '%Garmin%', url: 'https://www.amazon.de/s?k=Garmin+Fenix+7+Pro&tag=1710200006-20' },
    { eq: { niche: 'outdoor' }, like: '%YETI%', url: 'https://www.amazon.de/s?k=YETI+Tundra+45&tag=1710200006-20' },
    
    // Smarthome
    { eq: { niche: 'smarthome' }, like: '%Philips%', url: 'https://www.amazon.de/s?k=Philips+Hue+Bridge&tag=1710200006-20' },
    { eq: { niche: 'smarthome' }, like: '%Ring%', url: 'https://www.amazon.de/s?k=Ring+Video+Doorbell+Pro+2&tag=1710200006-20' },
    
    // AI Productivity
    { eq: { niche: 'aiproductivity' }, like: '%GoHighLevel%', url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
    { eq: { niche: 'aiproductivity' }, like: '%Notion%', url: 'https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_ai_fiverr&p=' },
    
    // Fashion
    { eq: { niche: 'fashion' }, like: '%Nike%', url: 'https://www.amazon.de/s?k=Nike+Air+Max&tag=1710200006-20' },
    { eq: { niche: 'fashion' }, like: '%Patagonia%', url: 'https://www.amazon.de/s?k=Patagonia+Torrentshell&tag=1710200006-20' }
  ];

  for (const update of updates) {
    const { data, error } = await sb.from('hubs_content')
      .update({ affiliate_url: update.url })
      .eq('niche', update.eq.niche)
      .like('title', update.like);
      
    if (error) {
      console.error(`Error updating ${update.like} in ${update.eq.niche}:`, error.message);
    } else {
      console.log(`Successfully updated ${update.like} in ${update.eq.niche}`);
    }
  }
  console.log("Bulk affiliate link injection complete!");
}

bulkUpdate();
