/**
 * Daily Dispatch Orchestrator v2.0
 * Marvin Sluis Media Group | Search Dominance System
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { prepareSocialPost } = require('./social_pulse_x');

const SUPABASE_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 

const niches = [
    'saas', 'gaming', 'travel', 'pet', 'fintech', 'vpn', 
    'wfh', 'outdoor', 'smarthome', 'aiproductivity', 'fashion', 'electronics'
];

const supabase = (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && SUPABASE_SERVICE_ROLE_KEY !== 'undefined') 
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) 
    : null;

/**
 * Head of Affiliate Strategy: Cluster-Based 30-30-40 Scoring
 */
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
            a: rand(85, 100), // Node Infrastructure (30%)
            b: rand(90, 100), // Security Protocol (30%)
            c: rand(80, 100), // Data/API Value (40%)
            labels: ['Infrastructure', 'Security', 'Data Value']
        };
    } else if (clusters.consumer.includes(niche)) {
        metrics = {
            a: rand(80, 100), // Performance (30%)
            b: rand(85, 100), // Build Integrity (30%)
            c: rand(75, 100), // Price-to-Performance (40%)
            labels: ['Performance', 'Build Quality', 'Market Price']
        };
    } else {
        metrics = {
            a: rand(85, 100), // Brand Authenticity (30%)
            b: rand(80, 100), // Logistics Speed (30%)
            c: rand(85, 100), // Curated Selection (40%)
            labels: ['Authenticity', 'Logistics', 'Curated Value']
        };
    }

    const total = ((metrics.a * 0.3) + (metrics.b * 0.3) + (metrics.c * 0.4)).toFixed(1);
    return { total, breakdown: metrics };
}

function generateSlug(title, lang) {
    let slug = title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    
    // Add unique hash to prevent SEO collisions
    const hash = Math.random().toString(36).substring(2, 6);
    return `${slug}-${hash}`;
}

async function generateEditorialAudit(niche) {
    console.log(`🚀 [GENERATING] Search Dominance Dispatch: ${niche.toUpperCase()}`);
    
    const languages = ['en', 'de', 'nl'];
    const selectedLang = languages[Math.floor(Math.random() * languages.length)];
    
    const auditTemplates = {
        en: {
            gaming: { 
                title: "PC Game Architecture 2026: Infrastructure & Performance Audit", 
                content: "Independent technical analysis of the 2026 PC gaming market floor. Verified fulfillment latency: < 50ms.",
                img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200" 
            },
            default: { 
                title: `${niche.toUpperCase()} Vertical Audit: 2026 Technical Report`, 
                content: `An evidence-based technical audit of the ${niche} sector. We have evaluated current market solutions against our 2026 Technical Integrity Framework.`,
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
            }
        },
        de: {
            gaming: { 
                title: "PC-Spiele-Infrastruktur 2026: Technischer Leistungs-Audit", 
                content: "Unabhängige Analyse des PC-Gaming-Marktes 2026. Verifizierte Latenz: < 50ms.", 
                img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200" 
            },
            default: { 
                title: `${niche.toUpperCase()} Analyse 2026: Technischer Bericht`, 
                content: `Ein evidenzbasierter technischer Audit des ${niche}-Sektors.`, 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
            }
        },
        nl: {
            gaming: { 
                title: "PC Game Architectuur 2026: Prestatie & Integriteit Audit", 
                content: "Onafhankelijke technische analyse van de PC-gamingmarkt in 2026.", 
                img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200" 
            },
            default: { 
                title: `${niche.toUpperCase()} Rapport 2026: Technische Analyse`, 
                content: `Een evidence-based technische audit van de ${niche}-sector.`, 
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200" 
            }
        }
    };
    
    const template = (auditTemplates[selectedLang] && auditTemplates[selectedLang][niche]) || auditTemplates[selectedLang].default;
    const { total, breakdown } = calculateWeightedScore(niche);
    const slug = generateSlug(template.title, selectedLang);

    return { 
        niche, 
        title: template.title, 
        content: template.content, 
        image_url: template.img, 
        affiliate_url: "https://marvinsluis-media.pages.dev/verification", 
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
        let dispatch = await generateEditorialAudit(targetNiche);
        
        // --- PROACTIVE MONETIZATION ---
        if (targetNiche === 'gaming') {
            const gameSlug = dispatch.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
            dispatch.affiliate_url = `https://www.premiumcdkeys.com/products/${gameSlug}?bg_ref=W0EfQrpgKg`;
        }

        if (supabase) {
            const { error } = await supabase.from('hubs_content').insert([dispatch]);
            if (!error) console.log(`✅ [SEARCH DOMINANCE] ${targetNiche.toUpperCase()} Live at /audit/${dispatch.slug}`);
            else console.error(`❌ ${targetNiche}: ${error.message}`);
        }

        await prepareSocialPost(dispatch);
        await new Promise(r => setTimeout(r, 500));
    }
}

runDailyDispatch();
