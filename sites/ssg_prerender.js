const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SB_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphcWtjdGxydmVidWxuYnZpcnpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc2ODI1NiwiZXhwIjoyMDg4MzQ0MjU2fQ.NENzUeX60N4-U1OnUzG8s6J2efDyIZ_h6C-TtdK6Qjo';
const sb = createClient(SB_URL, SB_KEY);

const BASE_PATH = __dirname; // sites/ folder
const MASTER_SYNC = path.join(BASE_PATH, "..", "master_sync");

const HUBS = [
    { dirPath: "site-01-saas-rebuild", niche: "saas", route: "saas", name: "SaaS & AI Tools" },
    { dirPath: "site-02-gaming-hub", niche: "gaming", route: "gaming", name: "Gaming Deals" },
    { dirPath: "site-03-travel-rebuild", niche: "travel", route: "travel", name: "Travel Deals" },
    { dirPath: "site-04-pet-rebuild", niche: "pet", route: "pet", name: "Pet Care & Reviews" },
    { dirPath: "site-05-fintech-rebuild", niche: "fintech", route: "fintech", name: "Fintech & Finance" },
    { dirPath: "site-06-vpn-rebuild", niche: "vpn", route: "vpn", name: "VPN & Privacy" },
    { dirPath: "site-07-wfh-rebuild", niche: "wfh", route: "wfh", name: "WFH Gear & Setup" },
    { dirPath: "site-08-outdoor-rebuild", niche: "outdoor", route: "outdoor", name: "Outdoor Gear" },
    { dirPath: "site-09-smarthome-rebuild", niche: "smarthome", route: "smarthome", name: "Smart Home Tech" },
    { dirPath: "site-10-aiproductivity-rebuild", niche: "aiproductivity", route: "aiproductivity", name: "AI Productivity" },
    { dirPath: "site-11-fashion-rebuild", niche: "fashion", route: "fashion", name: "Fashion & Trends" },
    { dirPath: "site-12-electronics-rebuild", niche: "electronics", route: "electronics", name: "Electronics & Tech" }
];

const LANGUAGES = ['en', 'de', 'nl', 'fr'];

function cleanMarkdown(md) {
    if (!md) return '';
    return md
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\n/g, ' ');
}

function parseMarkdownToHtml(md, primaryColor = '#ef4444') {
    if (!md) return '';
    return md
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank" style="color: ${primaryColor}" class="underline">$1</a>`)
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-black text-white">$1</strong>')
        .replace(/\n/g, '<br/>');
}

async function runPrerender() {
    console.log("⚡ Starting Static Site Generation (SSG) Pre-renderer...");

    for (const hub of HUBS) {
        const hubDist = path.join(MASTER_SYNC, hub.route);
        const templatePath = path.join(hubDist, "index.html");

        if (!fs.existsSync(templatePath)) {
            console.warn(`⚠️ Warning: Template not found at ${templatePath}. Skipping.`);
            continue;
        }

        const template = fs.readFileSync(templatePath, 'utf8');

        console.log(`\n📦 Processing Hub: ${hub.name} (${hub.route})`);

                // Clean up existing audit directories before pre-rendering
        const auditsDir = path.join(hubDist, "audit");
        if (fs.existsSync(auditsDir)) {
            try {
                fs.rmSync(auditsDir, { recursive: true, force: true });
                console.log(`   Cleaned up old English audits for ${hub.niche}`);
            } catch (err) {
                console.warn(`   Could not delete ${auditsDir}: ${err.message}`);
            }
        }
        for (const lang of LANGUAGES) {
            if (lang !== 'en') {
                const langAuditDir = path.join(hubDist, lang, "audit");
                if (fs.existsSync(langAuditDir)) {
                    try {
                        fs.rmSync(langAuditDir, { recursive: true, force: true });
                        console.log(`   Cleaned up old ${lang} audits for ${hub.niche}`);
                    } catch (err) {
                        console.warn(`   Could not delete ${langAuditDir}: ${err.message}`);
                    }
                }
            }
        }

        // Fetch top 150 audits for this niche (ordered by created_at descending)
        const { data: audits, error } = await sb
            .from('hubs_content')
            .select('*')
            .eq('niche', hub.niche)
            .order('created_at', { ascending: false })
            .limit(150);

        if (error) {
            console.error(`❌ Error fetching database for ${hub.niche}:`, error.message);
            continue;
        }

        console.log(`   Found ${audits.length} total entries in database.`);

        for (const lang of LANGUAGES) {
            // Filter by language
            const langAudits = audits.filter(a => {
                if (lang === 'en') return a.language === 'en' || !a.language;
                return a.language === lang;
            });

            console.log(`   [${lang.toUpperCase()}] - ${langAudits.length} entries.`);

            // 1. Build Pre-rendered Homepage
            const homepageContent = `
                <div class="max-w-7xl mx-auto px-4 py-12">
                    <header class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-black text-white mb-4 uppercase">${hub.name}</h1>
                        <p class="text-gray-400 text-lg">Technical audits and real-time price comparisons for 2026.</p>
                    </header>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${langAudits.map(art => `
                            <article class="p-6 bg-zinc-900 border border-white/5 rounded-2xl hover:border-white/20 transition-all">
                                <h2 class="text-xl font-bold mb-3"><a href="${lang === 'en' ? '' : '/' + lang}/audit/${art.slug}" class="text-white hover:underline">${art.title}</a></h2>
                                <p class="text-gray-500 text-sm mb-4">${cleanMarkdown(art.content).substring(0, 120)}...</p>
                                <a href="${lang === 'en' ? '' : '/' + lang}/audit/${art.slug}" class="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline">Read Technical Audit &rarr;</a>
                            </article>
                        `).join('')}
                    </div>
                </div>
            `;

            let homepageHtml = template
                .replace('<html lang="en">', `<html lang="${lang}">`)
                .replace('<div id="root"></div>', `<div id="root">${homepageContent}</div>`);

            // Save Homepage
            if (lang === 'en') {
                fs.writeFileSync(templatePath, homepageHtml);
            } else {
                const langDir = path.join(hubDist, lang);
                fs.mkdirSync(langDir, { recursive: true });
                fs.writeFileSync(path.join(langDir, "index.html"), homepageHtml);
            }

            // 2. Build Pre-rendered Audit Pages
            for (const art of langAudits) {
                if (!art.slug) continue;

                // Determine target directory
                const pageDir = lang === 'en' 
                    ? path.join(hubDist, "audit", art.slug) 
                    : path.join(hubDist, lang, "audit", art.slug);

                fs.mkdirSync(pageDir, { recursive: true });

                const primaryColor = "#ef4444"; // Crimson Red default
                const parsedContent = parseMarkdownToHtml(art.content, primaryColor);

                // Build rich HTML body matching the theme of our magazine
                const auditBody = `
                    <main class="max-w-5xl mx-auto px-6 py-20 text-white font-sans">
                        <div class="space-y-12">
                            <div class="space-y-6">
                                <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em]" style="color: ${primaryColor}; borderColor: ${primaryColor}33">
                                    SECURE AUDIT CHANNEL MSM-2026
                                </div>
                                <h1 class="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase italic">${art.title}</h1>
                                <p class="text-gray-400 text-lg border-l-2 pl-6 font-serif italic" style="borderColor: ${primaryColor}">
                                    Technical analysis performed by our 2026 verified node cluster.
                                </p>
                            </div>

                            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-between">
                                <h2 class="text-xl font-bold uppercase tracking-wider">Tri-Force Integrity Index</h2>
                                <div class="text-4xl font-black" style="color: ${primaryColor}">${art.total_score || 95}/100</div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
                                <div class="md:col-span-8 text-lg text-gray-300 leading-relaxed font-serif">
                                    ${parsedContent}
                                </div>
                                <div class="md:col-span-4 h-fit p-6 bg-zinc-900 border border-white/5 rounded-3xl space-y-4">
                                    <h4 class="text-xs font-black uppercase tracking-widest text-zinc-500">Partner Acquisition</h4>
                                    <p class="text-xs text-gray-400 leading-relaxed">Secure your route via our verified partner network.</p>
                                    <a href="${art.affiliate_url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-full hover:opacity-95 transition-all">
                                        Secure via Partner
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                `;

                // Build Product/Review JSON-LD schema
                const schema = `
                    <script type="application/ld+json">
                    {
                      "@context": "https://schema.org",
                      "@type": "Product",
                      "name": "${art.title.replace(/"/g, '\\"')}",
                      "description": "${cleanMarkdown(art.content).substring(0, 150).replace(/"/g, '\\"')}",
                      "image": "${art.image_url || ''}",
                      "offers": {
                        "@type": "Offer",
                        "priceCurrency": "USD",
                        "price": "9.99",
                        "availability": "https://schema.org/InStock",
                        "url": "${art.affiliate_url || ''}"
                      },
                      "review": {
                        "@type": "Review",
                        "reviewRating": {
                          "@type": "Rating",
                          "ratingValue": "${art.total_score ? (art.total_score / 20).toFixed(1) : '4.8'}",
                          "bestRating": "5"
                        },
                        "author": {
                          "@type": "Organization",
                          "name": "Marvin Sluis Media Group"
                        }
                      }
                    }
                    </script>
                `;

                let auditHtml = template
                    .replace('<html lang="en">', `<html lang="${lang}">`)
                    .replace(/<title>.*?<\/title>/, `<title>${art.title} | Technical Audit 2026</title>`)
                    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${cleanMarkdown(art.content).substring(0, 150).replace(/"/g, '&quot;')}..." />`)
                    .replace('</head>', `${schema}</head>`)
                    .replace('<div id="root"></div>', `<div id="root">${auditBody}</div>`);

                // Write static audit file
                fs.writeFileSync(path.join(pageDir, "index.html"), auditHtml);
            }
        }
    }

    console.log("\n✅ Static Site Generation Complete! All pages successfully pre-rendered.");
}

runPrerender();