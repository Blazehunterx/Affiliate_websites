import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zaqkctlrvebulnbvirzl.supabase.co'
const supabaseAnonKey = 'sb_publishable_piF2oDl8c9kNiJXFTJTskA_v0VZfoEi'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifyAll() {
  const niches = ['saas', 'gaming', 'travel', 'pet', 'fintech', 'vpn', 'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'];
  
  console.log("=== SUPABASE DATA AUDIT START ===");
  
  for (const niche of niches) {
    const { data, error } = await supabase
      .from('hubs_content')
      .select('*')
      .eq('niche', niche)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`[${niche.toUpperCase()}] ERROR:`, error.message);
    } else {
      console.log(`[${niche.toUpperCase()}] Found ${data.length} entries.`);
      if (data.length > 0) {
        console.log(`   Sample Title: "${data[0].title}"`);
      }
    }
  }
}

verifyAll();
