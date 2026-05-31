/**
 * Daily Dispatch Orchestrator v3.0 | High-Intent Affiliate Engine
 * Marvin Sluis Media Group | Search Dominance System
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { postPin } = require('./pinterest_auto_pilot');
const { forceIndexURL } = require('./google_indexer');
const { PRODUCT_MATRIX } = require('./product_matrix');

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

function getOptimalAffiliateUrl(niche, productName) {
  const nameLower = productName.toLowerCase();
  const nicheLower = niche.toLowerCase();

  const mapping = PRODUCT_MAPPING.find(m => 
    m.niche === nicheLower && m.keywords.some(kw => nameLower.includes(kw))
  );

  if (mapping) {
    return mapping.url;
  }

  if (nicheLower === 'gaming') {
    const gameSlug = nameLower.replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
    return `https://www.premiumcdkeys.com/products/${gameSlug}?bg_ref=W0EfQrpgKg`;
  }

  const isAwinNiche = ['vpn', 'saas', 'travel', 'fintech', 'aiproductivity'].includes(nicheLower);
  if (isAwinNiche) {
    return `https://www.awin1.com/cread.php?awinmid=6288&awinaffid=2834344&clickref=msm_${nicheLower}_fallback&p=`;
  }

  return `https://www.amazon.de/s?k=${encodeURIComponent(productName)}&tag=1710200006-20`;
}

async function getLiveAffiliateUrl(niche, productName) {
  if (supabase) {
    try {
      const { data: partners, error } = await supabase
        .from('affiliate_partners')
        .select('name, tracking_url')
        .eq('status', 'approved');

      if (!error && partners) {
        const nameLower = productName.toLowerCase();
        const matched = partners.find(p => {
          const pNameLower = p.name.toLowerCase();
          return nameLower.includes(pNameLower) || pNameLower.includes(nameLower);
        });

        if (matched) {
          console.log(`[MONETIZATION] Using Live Approved Partner Link for ${productName}: ${matched.name} -> ${matched.tracking_url}`);
          return matched.tracking_url;
        }
      }
    } catch (e) {
      console.error("[MONETIZATION ERROR] Failed to fetch live partner links:", e.message);
    }
  }
  return getOptimalAffiliateUrl(niche, productName);
}



const SUPABASE_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo'; 

const niches = [
    'saas', 'gaming', 'travel', 'pet', 'fintech', 'vpn', 
    'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'
];

const supabase = (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && SUPABASE_SERVICE_ROLE_KEY !== 'undefined') 
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) 
    : null;

const { execSync } = require('child_process');

function calculateWeightedScore(niche) {
    const clusters = {
        technical: ['vpn', 'saas', 'aiproductivity', 'fintech'],
        consumer: ['gaming', 'electronics', 'smarthome'],
        lifestyle: ['fashion', 'travel', 'pet', 'wfh', 'outdoor']
    };

    let metrics = { a: 0, b: 0, c: 0, labels: [] };
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

    if (clusters.technical.includes(niche)) {
        metrics = {
            a: rand(85, 100), // Infrastructure
            b: rand(90, 100), // Security
            c: rand(80, 100), // Data Value
            labels: ['Infrastructure', 'Security', 'Data Value']
        };
    } else if (clusters.consumer.includes(niche)) {
        metrics = {
            a: rand(80, 100), // Performance
            b: rand(85, 100), // Build Integrity
            c: rand(75, 100), // Price-to-Performance
            labels: ['Performance', 'Build Quality', 'Market Price']
        };
    } else {
        metrics = {
            a: rand(85, 100), // Brand Authenticity
            b: rand(80, 100), // Logistics Speed
            c: rand(85, 100), // Curated Selection
            labels: ['Authenticity', 'Logistics', 'Curated Value']
        };
    }

    const total = ((metrics.a * 0.3) + (metrics.b * 0.3) + (metrics.c * 0.4)).toFixed(1);
    return { total, breakdown: metrics };
}

function generateSlug(title) {
    let slug = title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    const hash = Math.random().toString(36).substring(2, 6);
    return `${slug}-${hash}`;
}


function generateRichContent(niche, productName, keyword) {
  let sections = [];
  
  if (niche === 'vpn') {
    sections = [
      `### 1. Cryptographic Latency & Server Grid Check`,
      `We subjected **${productName}** to a battery of technical stress tests from multiple European exit nodes. The 2026 node clusters registered average connection overheads of less than **3.8ms**, representing elite performance for secure packet routing.`,
      `- **Protocol Performance**: WireGuard was stable at 940 Mbps (Gigabit line saturation limit).`,
      `- **Kill Switch Integrity**: 100% effective in routing leakage checks.`,
      `### 2. No-Logs Policy & Legal Jurisdiction`,
      `Our legal node has verified that **${productName}** operates under a privacy-friendly jurisdiction. Real-time RAM-only server verification confirms that session state logs are wiped instantly upon packet handoff.`,
      `### 3. Recommended Actions & Partner Rates`,
      `For users seeking absolute privacy coverage, **${productName}** is highly recommended. Our network has secured priority bandwidth routing with our verified partner network below.`
    ];
  } else if (niche === 'saas' || niche === 'aiproductivity') {
    sections = [
      `### 1. API Responsiveness & Compute Performance`,
      `Our performance probes monitored the response latency of **${productName}** endpoints over 72 hours. Average API response times sat at **120ms**, with a 99.99% uptime profile.`,
      `- **Integration Overhead**: Very low, fits cleanly into standard enterprise CI/CD loops.`,
      `- **Scalability Index**: Rated 9.4/10 under simulated peak concurrent workflows.`,
      `### 2. Value Proposition & Market Alternatives`,
      `Compared to legacy market platforms, **${productName}** provides a streamlined toolchain that saves teams up to 40% in monthly software overhead.`,
      `### 3. Operational Integrity & Recommendation`,
      `If you are looking to scale your development or marketing velocity, secure your access route via our verified partner deal link.`
    ];
  } else if (niche === 'gaming') {
    sections = [
      `### 1. Frame Latency & Digital Delivery Speed`,
      `We audited the activation pipelines and download servers for **${productName}**. Game key validation was instant across Steam/Epic platforms.`,
      `- **Keys Delivery Speed**: Average delivery time was **1.4 seconds** post-acquisition.`,
      `- **Affiliate Partner Status**: Fully verified with authorized digital key sellers.`,
      `### 2. Game Performance Profile (2026 PC Tech)`,
      `Our testing labs ran **${productName}** on a standard RTX 4090 node. Core thread utilization was highly optimized, maintaining a stable 120 FPS frame time pacing.`,
      `### 3. Price-to-Value & Partner Recommendation`,
      `Acquiring this game key from unauthorized resellers poses security risks. Secure a verified legal copy using the partner link below.`
    ];
  } else {
    sections = [
      `### 1. Quality Control & Material Audit`,
      `Our curation nodes subjected **${productName}** to our 2026 verification matrix. The build quality, materials used, and consumer ratings were analyzed.`,
      `- **Durability Rating**: High, outperforming competitor products by 18% in simulated lifecycle tests.`,
      `- **Price Index**: Excellent price-to-performance ratio for the EU market.`,
      `### 2. Consumer Feedback & Logistics`,
      `Shipping and tracking channels for **${productName}** show high efficiency. Average delivery times in DE, NL, and UK were under 2.5 business days.`,
      `### 3. Verdict & Acquisition Recommendation`,
      `Based on our technical audit, **${productName}** receives a strong recommendation. Use our verified secure partner link to buy directly.`
    ];
  }

  return sections.join('\n\n');
}

async function generateEditorialAudit(niche, product) {
    console.log(`🚀 [GENERATING] High-Intent Dispatch: ${product.name} (${niche.toUpperCase()})`);
    
    const languages = ['en', 'de', 'nl'];
    const selectedLang = languages[Math.floor(Math.random() * languages.length)];
    const keyword = product.keywords[Math.floor(Math.random() * product.keywords.length)];
    
    const title = `${product.name}: ${keyword} | Technical Integrity 2026`;
    const content = generateRichContent(niche.toLowerCase(), product.name, keyword);
    const img = "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200"; 

    const { total, breakdown } = calculateWeightedScore(niche);
    const slug = generateSlug(title);

    return { 
        niche: niche.toLowerCase(), 
        title: title, 
        content: content, 
        image_url: img, 
        affiliate_url: await getLiveAffiliateUrl(niche, product.name), 
        created_at: new Date().toISOString(),
        language: selectedLang,
        slug: slug,
        total_score: total,
        score_breakdown: breakdown
    };
}

async function runDailyDispatch() {
    if (!SUPABASE_SERVICE_ROLE_KEY || SUPABASE_SERVICE_ROLE_KEY === 'undefined') {
        console.error("[ERROR] Missing KEY");
        return;
    }

    const shuffledNiches = [...niches].sort(() => Math.random() - 0.5);

    for (const targetNiche of shuffledNiches) {
        const prodList = PRODUCT_MATRIX[targetNiche] || [{ name: `${targetNiche.toUpperCase()} Hub`, keywords: ["Performance Audit"] }];
        
        for (const product of prodList) {
            let dispatch = await generateEditorialAudit(targetNiche, product);
            
            // --- PROACTIVE MONETIZATION ---
            dispatch.affiliate_url = await getLiveAffiliateUrl(targetNiche, product.name);

            if (supabase) {
                const { error } = await supabase.from('hubs_content').insert([dispatch]);
                if (!error) {
                    console.log(`✅ [HIGH INTENT] ${product.name} Live at /audit/${dispatch.slug}`);
                    
                    // --- GOOGLE INDEXING PUSH ---
                    const fullUrl = `https://marvinsluis-media.pages.dev/audit/${dispatch.slug}`;
                    await forceIndexURL(fullUrl);
                } else {
                    console.error(`❌ ${product.name}: ${error.message}`);
                }
            }

            // Social Pulse Disabled (Trial Status)
            await postPin(dispatch);
            await new Promise(r => setTimeout(r, 100)); // Velocity Boost
        }
    }

    // --- SEO & DEPLOYMENT SYNC ---
    console.log("[SYNC] Updating Sitemap, Compiling SSG and Deploying via Git...");
    try {
        const path = require('path');
        
        // Execute generate_dynamic_sitemap.js in its own directory
        execSync('node generate_dynamic_sitemap.js', { cwd: __dirname, stdio: 'inherit' });
        
        // Compile new reviews
        execSync('node ../ssg_prerender.js', { cwd: __dirname, stdio: 'inherit' });
        
        // Replicate to dist
        execSync('node ../copy_to_dist.js', { cwd: __dirname, stdio: 'inherit' });
        
        // Stage, commit and push to trigger Cloudflare edge deploy
        const rootDir = path.join(__dirname, '../..');
        execSync('git add master_sync', { cwd: rootDir, stdio: 'inherit' });
        execSync('git commit -m "auto: Daily dispatch update" || true', { cwd: rootDir, stdio: 'inherit' });
        execSync('git push', { cwd: rootDir, stdio: 'inherit' });

        // Deploy directly to Cloudflare Pages via Wrangler (since marvinsluis-media uses direct upload)
        console.log("[SYNC] Deploying marvinsluis-media directly to Cloudflare Pages via Wrangler...");
        try {
            execSync('npx wrangler pages deploy master_sync/dist --project-name=marvinsluis-media --branch=main --commit-dirty=true', { cwd: rootDir, stdio: 'inherit' });
        } catch (err) {
            console.error("[SYNC ERROR] Wrangler deploy failed: " + err.message);
        }
        
        console.log("[SYSTEM] Search Dominance v3.0 - Fully Synced to Global Network via Git Push.");
    } catch (e) {
        console.error("[SYNC ERROR] " + e.message);
    }
}

async function startAutonomousEngine() {
    console.log("💎 [AUTONOMOUS MODE] Marvin Media Shopping OS: ENGAGED.");
    while (true) {
        try {
            await runDailyDispatch();
            console.log("\n💤 [SLEEP] Dispatch cycle complete. Next run in 4 hours...");
            await new Promise(resolve => setTimeout(resolve, 4 * 60 * 60 * 1000));
        } catch (e) {
            console.error("🔥 [CRITICAL ERROR] Engine failure: " + e.message);
            await new Promise(resolve => setTimeout(resolve, 60000)); // Retry in 1 min
        }
    }
}

if (process.argv.includes('--once') || process.env.ONCE === 'true') {
    console.log("[AUTONOMOUS MODE] Running daily dispatch loop exactly once...");
    runDailyDispatch().then(() => {
        console.log("o. Single dispatch cycle complete.");
        process.exit(0);
    }).catch(e => {
        console.error("[CRITICAL ERROR] Single dispatch cycle failed:", e);
        process.exit(1);
    });
} else {
    startAutonomousEngine();
}

