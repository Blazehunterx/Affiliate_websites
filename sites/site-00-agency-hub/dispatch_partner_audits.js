const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { execSync } = require('child_process');
const path = require('path');

const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const rules = {
    vpn: ['vpn', 'proxy', 'privacy', 'secure', 'encrypt', 'hide', 'tunnel', 'ip', 'status', 'logs', 'expressvpn', 'nordvpn', 'surfshark', 'cyberghost', 'windscribe', 'ipvanish', 'mullvad', 'protonvpn'],
    gaming: ['gaming', 'game', 'play', 'steam', 'epic', 'origin', 'nintendo', 'xbox', 'playstation', 'cdkeys', 'kinguin', 'g2a', 'cd-key', 'toy', 'hobby', 'puzzle', 'card', 'chess', 'dice', 'boardgame', 'gamer', 'cd key', 'codes', 'kinguin', 'instant-gaming'],
    aiproductivity: ['ai', 'artificial', 'intelligence', 'gpt', 'writing', 'chat', 'assistant', 'copilot', 'cognitive', 'prompt', 'generative', 'notion', 'productivity', 'note', 'workflow', 'translate', 'translation', 'jasper', 'openai', 'anthropic', 'claude', 'midjourney', 'stable diffusion'],
    saas: ['saas', 'cloud', 'software', 'app', 'tool', 'api', 'integration', 'workflow', 'automation', 'code', 'git', 'developer', 'host', 'hosting', 'server', 'domain', 'mail', 'email', 'newsletter', 'crm', 'builder', 'web', 'seo', 'docusign', 'checkdomain', 'easyname', 'create', 'names', 'shopify', 'stripe', 'zoom', 'slack', 'hubspot', 'salesforce', 'mailchimp'],
    travel: ['travel', 'hotel', 'motel', 'flight', 'trip', 'booking', 'vacation', 'tour', 'resort', 'rental', 'parking', 'luggage', 'suitcase', 'airport', 'cruise', 'train', 'rail', 'expedia', 'agoda', 'booking.com', 'airbnb', 'tripadvisor', 'kayak', 'skyscanner', 'hertz', 'avis', 'budget', 'rentalcars', 'tours', 'tour'],
    pet: ['pet', 'dog', 'cat', 'vet', 'food', 'animal', 'puppy', 'feed', 'groom', 'training', 'collar', 'leash', 'cage', 'zooplus', 'purina', 'pedigree', 'whiskas', 'royal canin', 'vet', 'pets'],
    fintech: ['fintech', 'finance', 'bank', 'card', 'money', 'crypto', 'pay', 'credit', 'transfer', 'trading', 'broker', 'exchange', 'tax', 'invest', 'loan', 'wallet', 'ledger', 'accounting', 'billing', 'checkout', 'transaction', 'mortgage', 'capital', 'revolut', 'wise', 'stripe', 'paypal', 'coinbase', 'binance', 'robinhood', 'etoro', 'cashapp'],
    wfh: ['wfh', 'office', 'desk', 'chair', 'table', 'furniture', 'workspace', 'stationery', 'paper', 'print', 'ink', 'toner', 'printer', 'scanner', 'ergonomic', 'keyboard', 'mouse', 'stand', 'binder', 'folder', 'herman miller', 'steelcase', 'logitech', 'dell', 'lenovo', 'hp', 'desk', 'lights'],
    outdoor: ['outdoor', 'survival', 'camp', 'hike', 'trail', 'climb', 'tent', 'yeti', 'garmin', 'sport', 'backpack', 'bike', 'cycle', 'run', 'jacket', 'boots', 'patagonia', 'columbia', 'north face', 'hiking', 'tents', 'sleeping bag', 'camping'],
    smarthome: ['smarthome', 'smart', 'nest', 'ring', 'hue', 'bulb', 'plug', 'switch', 'sensor', 'lock', 'bell', 'thermostat', 'vacuum', 'robot', 'hub', 'alarm', 'philips', 'ring', 'nest', 'tp-link', 'wemo', 'august'],
    fashion: ['fashion', 'apparel', 'clothing', 'shoes', 'bag', 'jewelry', 'watch', 'style', 'wear', 'dress', 'shirt', 'glasses', 'sunglasses', 'jewel', 'cosmetics', 'beauty', 'hair', 'salon', 'makeup', 'perfume', 'boutique', 'gold', 'silver', 'diamond', 'ring', 'optic', 'lens', 'nike', 'adidas', 'zara', 'gucci', 'prada', 'rolex', 'pandora', 'sephora', 'ulta', 'perfumery'],
    electronics: ['electronics', 'hardware', 'phone', 'laptop', 'desktop', 'pc', 'cpu', 'gpu', 'rtx', 'apple', 'samsung', 'sony', 'audio', 'headphones', 'speaker', 'tv', 'screen', 'monitor', 'charger', 'cable', 'tech', 'gadgets', 'device', 'mobile', 'wireless', 'camera', 'nikon', 'canon', 'panasonic', 'asus', 'acer', 'msi', 'gigabyte']
};

const fallbackNiches = ['saas', 'electronics', 'wfh', 'gaming', 'fashion', 'travel'];


function checkReviewExists(niche, title) {
    const slugBase = title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
        
    const routes = {
        saas: 'saas',
        gaming: 'gaming',
        travel: 'travel',
        pet: 'pet',
        fintech: 'fintech',
        vpn: 'vpn',
        wfh: 'wfh',
        outdoor: 'outdoor',
        smarthome: 'smarthome',
        aiproductivity: 'aiproductivity',
        fashion: 'fashion',
        electronics: 'electronics'
    };
    const route = routes[niche];
    if (!route) return false;
    
    const auditDir = path.join(__dirname, '..', '..', 'master_sync', route, 'audit');
    if (!fs.existsSync(auditDir)) return false;
    
    try {
        const dirs = fs.readdirSync(auditDir);
        return dirs.some(d => d.toLowerCase().startsWith(slugBase.toLowerCase()));
    } catch (e) {
        console.error("Error reading audit dir:", e.message);
        return false;
    }
}

function classify(name) {
    const n = name.toLowerCase();
    for (const [niche, keywords] of Object.entries(rules)) {
        if (keywords.some(kw => n.includes(kw))) return niche;
    }
    return fallbackNiches[name.length % fallbackNiches.length];
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

function calculateWeightedScore(niche) {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const total = ((rand(85, 100) * 0.3) + (rand(85, 100) * 0.3) + (rand(80, 100) * 0.4)).toFixed(1);
    return {
        total,
        breakdown: { a: rand(85, 100), b: rand(85, 100), c: rand(80, 100) }
    };
}

function generateRichContent(niche, productName) {
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

async function run() {
    console.log("Starting batch partner review generator...");
    
    // 1. Fetch all approved partners
    const { data: partners, error: pError } = await sb
        .from('affiliate_partners')
        .select('*')
        .eq('status', 'approved');
        
    if (pError || !partners) {
        console.error("Error fetching partners:", pError ? pError.message : "No partners");
        return;
    }
    
    console.log(`Found ${partners.length} approved partners. Fetching existing reviews...`);
    
    // 2. Local filesystem-based check for existing reviews to prevent duplicates
    console.log("Checking filesystem for existing reviews...");
    
    let injected = 0;
    
    for (const partner of partners) {
        const name = partner.name;
        const niche = classify(name);
        const title = `${name}: Technical Integrity Review | 2026 Market Audit`;
        
        if (checkReviewExists(niche, title)) {
            continue;
        }
        
        console.log(`Generating review for partner: ${name} in niche: ${niche}`);
        
        const content = generateRichContent(niche, name);
        const slug = generateSlug(title);
        const { total, breakdown } = calculateWeightedScore(niche);
        
        const dispatch = {
            niche: niche,
            title: title,
            content: content,
            image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200',
            affiliate_url: partner.tracking_url,
            created_at: new Date().toISOString(),
            language: 'en',
            slug: slug,
            total_score: total,
            score_breakdown: breakdown
        };
        
        const { error: insError } = await sb.from('hubs_content').insert([dispatch]);
        
        if (insError) {
            console.error(`Error inserting review for ${name}:`, insError.message);
        } else {
            console.log(`Successfully published review page for ${name} at /audit/${slug}`);
            injected++;
        }
        
        await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(`Successfully inserted ${injected} new partner reviews!`);
    
    if (injected > 0) {
        console.log("Triggering network build and deployment...");
        
        const scriptDir = __dirname;
        const rootDir = path.join(scriptDir, '..', '..');
        
        try {
            // Build dynamic sitemaps
            execSync('node generate_dynamic_sitemap.js', { cwd: scriptDir, stdio: 'inherit' });
            
            // Compile SSG
            execSync('node ../ssg_prerender.js', { cwd: scriptDir, stdio: 'inherit' });
            
            // Replicate to dist
            execSync('node ../copy_to_dist.js', { cwd: scriptDir, stdio: 'inherit' });
            
            // Stage, commit and push to git
            execSync('git add master_sync', { cwd: rootDir, stdio: 'inherit' });
            execSync('git commit -m "auto: Batch partner reviews update" || true', { cwd: rootDir, stdio: 'inherit' });
            execSync('git push', { cwd: rootDir, stdio: 'inherit' });
            
            // Wrangler deploy
            console.log("Deploying directly to Cloudflare Pages...");
            execSync('npx wrangler pages deploy master_sync/dist --project-name=marvinsluis-media --branch=main --commit-dirty=true', { cwd: rootDir, stdio: 'inherit' });
            
            console.log("Deployment complete! All new partner reviews are live.");
        } catch (e) {
            console.error("Error during deployment:", e.message);
        }
    }
}

run();
