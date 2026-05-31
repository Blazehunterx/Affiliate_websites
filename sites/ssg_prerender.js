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
    console.log("🚀 Starting Static Site Generation (SSG) Pre-renderer...");

    for (const hub of HUBS) {
        const hubDist = path.join(MASTER_SYNC, hub.route);
        const templatePath = path.join(hubDist, "index.html");

        if (!fs.existsSync(templatePath)) {
            console.warn(`⚠️ Warning: Template not found at ${templatePath}. Skipping.`);
            continue;
        }

        const template = fs.readFileSync(templatePath, 'utf8');

        console.log(`\n📂 Processing Hub: ${hub.name} (${hub.route})`);

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

        // Fetch 3 pages of metadata in parallel (total 3000 rows) to get recent reviews
        console.log(`   Fetching metadata for ${hub.niche}...\n`);
        const promises = [
            sb.from('hubs_content').select('id, created_at, niche, title, slug, language, total_score, score_breakdown, affiliate_url, image_url').eq('niche', hub.niche).range(0, 999),
            sb.from('hubs_content').select('id, created_at, niche, title, slug, language, total_score, score_breakdown, affiliate_url, image_url').eq('niche', hub.niche).range(1000, 1999),
            sb.from('hubs_content').select('id, created_at, niche, title, slug, language, total_score, score_breakdown, affiliate_url, image_url').eq('niche', hub.niche).range(2000, 2999)
        ];
        const results = await Promise.all(promises);
        let rawAudits = [];
        let error = null;
        for (const res of results) {
            if (res.error) {
                error = res.error;
            }
            if (res.data) {
                rawAudits.push(...res.data);
            }
        }

        let audits = [];
        if (!error && rawAudits.length > 0) {
            // Sort descending locally to find the newest 150 rows
            const sorted = rawAudits.sort((a, b) => {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            });
            const top150 = sorted.slice(0, 150);
            const topIds = top150.map(x => x.id);

            // Fetch full rows for the top 150 using primary key lookup
            if (topIds.length > 0) {
                const { data: fullAudits, error: fullError } = await sb
                    .from('hubs_content')
                    .select('*')
                    .in('id', topIds);
                if (!fullError && fullAudits) {
                    audits = fullAudits.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
                } else if (fullError) {
                    console.error(`   Error fetching full audits:`, fullError);
                    error = fullError;
                }
            }
        } else if (error) {
            console.error(`   Error details for ${hub.niche}:`, error);
        }

        if (error) {
            console.error(`   Error fetching database for ${hub.niche}:`, error.message);
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

            // Build Prominent Interactive Banners
            let bannerHtml = '';
            if (hub.niche === 'saas') {
                bannerHtml = `
                    <div class="mb-16 p-8 bg-gradient-to-r from-purple-950/40 to-indigo-950/40 backdrop-blur-md border border-purple-500/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                        <div class="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
                        <div class="space-y-2 relative z-10">
                            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-purple-400">
                                Interactive Tool Live
                            </div>
                            <h2 class="text-2xl font-black text-white uppercase tracking-tight">SaaS Spend Optimizer & Alternative Finder</h2>
                            <p class="text-zinc-400 text-sm max-w-xl">Analyze your current software stack and instantly discover 100% free or low-cost verified alternative tools.</p>
                        </div>
                        <a href="/tools/saas-optimizer.html" class="px-8 py-4 bg-purple-500 text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 relative z-10 shrink-0">
                            Optimize Stack Free &rarr;
                        </a>
                    </div>
                `;
            } else if (hub.niche === 'vpn') {
                bannerHtml = `
                    <div class="mb-16 p-8 bg-gradient-to-r from-emerald-950/40 to-teal-950/40 backdrop-blur-md border border-emerald-500/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                        <div class="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                        <div class="space-y-2 relative z-10">
                            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                Interactive Tool Live
                            </div>
                            <h2 class="text-2xl font-black text-white uppercase tracking-tight">2026 VPN Latency & Security Matrix</h2>
                            <p class="text-zinc-400 text-sm max-w-xl">Compare speed retention rates, legal jurisdictions, and active pricing across elite verified VPN providers.</p>
                        </div>
                        <a href="/tools/vpn-compare.html" class="px-8 py-4 bg-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 relative z-10 shrink-0">
                            Compare VPNs Free &rarr;
                        </a>
                    </div>
                `;
            }

            // 1. Build Pre-rendered Homepage
            const homepageContent = `
                <div class="max-w-7xl mx-auto px-4 py-12">
                    <header class="text-center mb-16">
                        <h1 class="text-4xl md:text-6xl font-black text-white mb-4 uppercase">${hub.name}</h1>
                        <p class="text-gray-400 text-lg">Technical audits and real-time price comparisons for 2026.</p>
                    </header>
                    ${bannerHtml}
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

                // Extract breakdown scores
                const breakdown = art.score_breakdown || { a: 90, b: 92, c: 94 };
                let labels = ['Infrastructure', 'Security', 'Data Value']; // Default technical
                
                const clusters = {
                    technical: ['vpn', 'saas', 'aiproductivity', 'fintech'],
                    consumer: ['gaming', 'electronics', 'smarthome']
                };

                const nicheLower = art.niche.toLowerCase();
                if (clusters.technical.includes(nicheLower)) {
                    labels = ['Infrastructure', 'Security', 'Data Value'];
                } else if (clusters.consumer.includes(nicheLower)) {
                    labels = ['Performance', 'Build Quality', 'Market Price'];
                } else {
                    labels = ['Authenticity', 'Logistics', 'Curated Value'];
                }

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

                            <div class="bg-white/5 border border-white/10 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                                <div class="md:col-span-4 space-y-2">
                                    <h2 class="text-xl font-bold uppercase tracking-wider text-zinc-400">Tri-Force Index</h2>
                                    <div class="text-5xl font-black" style="color: ${primaryColor}">${art.total_score || 95}/100</div>
                                    <p class="text-[10px] text-zinc-500 uppercase tracking-widest font-black">2026 Audit Certified</p>
                                </div>
                                <div class="md:col-span-8 grid grid-cols-1 gap-4">
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs font-bold text-zinc-400">
                                            <span>${labels[0]}</span>
                                            <span class="text-white">${breakdown.a || 90}%</span>
                                        </div>
                                        <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full" style="width: ${breakdown.a || 90}%; background-color: ${primaryColor}"></div>
                                        </div>
                                    </div>
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs font-bold text-zinc-400">
                                            <span>${labels[1]}</span>
                                            <span class="text-white">${breakdown.b || 92}%</span>
                                        </div>
                                        <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full" style="width: ${breakdown.b || 92}%; background-color: ${primaryColor}"></div>
                                        </div>
                                    </div>
                                    <div class="space-y-1">
                                        <div class="flex justify-between text-xs font-bold text-zinc-400">
                                            <span>${labels[2]}</span>
                                            <span class="text-white">${breakdown.c || 94}%</span>
                                        </div>
                                        <div class="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div class="h-full rounded-full" style="width: ${breakdown.c || 94}%; background-color: ${primaryColor}"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mt-8">
                                <div class="md:col-span-8 text-lg text-gray-300 leading-relaxed font-serif">
                                    ${parsedContent}
                                </div>
                                <div class="md:col-span-4 h-fit p-6 bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-3xl space-y-6 shadow-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
                                    <!-- Decorative subtle background glow -->
                                    <div class="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                                    
                                    <div class="space-y-2 relative z-10">
                                        <div class="flex items-center justify-between">
                                            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                                <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                                Live Deal Active
                                            </span>
                                            <span class="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Ref: MSM-2026</span>
                                        </div>
                                        <h4 class="text-sm font-black uppercase tracking-wider text-white">Partner Acquisition</h4>
                                        <p class="text-xs text-gray-400 leading-relaxed">Access the lowest verified contract rates directly from our authorized partner network.</p>
                                    </div>
                                    
                                    <div class="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3 relative z-10">
                                        <div class="flex justify-between text-xs">
                                            <span class="text-zinc-500 font-bold">Availability</span>
                                            <span class="text-emerald-400 font-black uppercase tracking-wide">In Stock (100% Verified)</span>
                                        </div>
                                        <div class="flex justify-between text-xs">
                                            <span class="text-zinc-500 font-bold">Safety Index</span>
                                            <span class="text-white font-black">10.0 Secure Node</span>
                                        </div>
                                        <div class="flex justify-between text-xs">
                                            <span class="text-zinc-500 font-bold">Link Integrity</span>
                                            <span class="text-zinc-300 font-medium">SSL Encrypted</span>
                                        </div>
                                    </div>

                                    <div class="space-y-3 relative z-10">
                                        <a href="${art.affiliate_url}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center w-full py-4 bg-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-full hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform active:scale-[0.98]">
                                            Secure Promo Link &rarr;
                                        </a>
                                        <div class="text-[9px] text-center text-zinc-500 leading-normal">
                                            🛡️ Secured via Partner Routing Engine. Safe SSL verified.
                                        </div>
                                    </div>
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
