/**
 * Trigger Alerts Orchestrator v1.0
 * Marvin Sluis Media Group | Behavioral Price-Drop Engine
 * 
 * This script scans live_price_index.json for significant price drops
 * and generates priority editorial dispatches for Supabase.
 */

const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const { prepareSocialPost } = require('./social_pulse_x');

// --- Configuration ---
const SUPABASE_URL = 'https://zaqkctlrvebulnbvirzl.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; 
const DROP_THRESHOLD = 5.0; // Minimum 5% drop to trigger an alert

const supabase = (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) 
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) 
    : null;

async function processAlerts() {
    console.log("🔍 [TRIGGER ENGINE] Scanning for significant price drops (>5%)...");

    if (!fs.existsSync('live_price_index.json')) {
        console.error("[ERROR] live_price_index.json not found.");
        return;
    }

    const index = JSON.parse(fs.readFileSync('live_price_index.json', 'utf8'));
    const drops = Object.entries(index).filter(([name, data]) => data.isPriceDrop && data.dropPercentage >= DROP_THRESHOLD);

    if (drops.length === 0) {
        console.log("✅ No significant price drops detected.");
        return;
    }

    console.log(`🔥 [ALERT] Found ${drops.length} price drops above threshold!`);

    for (const [name, data] of drops) {
        console.log(`🚀 [DEALING] Preparing alert for ${name} (-${data.dropPercentage}%)...`);

        const alertDispatch = {
            niche: name.toLowerCase(), // Simplified mapping for alert
            title: `🚨 PRICE ALERT: ${name} is now ${data.lastPrice} (-${data.dropPercentage}%)`,
            content: `The Marvin Sluis Media Group has detected a significant price drop for ${name}. Previously ${data.previousPrice}, it is now available at ${data.lastPrice}. This is a verified high-fidelity signal.`,
            image_url: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200", // Generic finance/deal image
            affiliate_url: `https://marvinsluis-media.pages.dev/verification?mid=${name}`, 
            created_at: new Date().toISOString(),
            language: 'en' // Defaulting to en for alerts for now
        };

        if (supabase) {
            console.log(`[DEPLOYING] Injecting Alert dispatch into Supabase...`);
            const { error } = await supabase.from('hubs_content').insert([alertDispatch]);
            if (error) {
                console.error(`[ERROR] Supabase Injection: ${error.message}`);
            } else {
                console.log(`[SUCCESS] Alert Live for ${name}`);
            }
        } else {
            console.warn(`[SKIP] Supabase client not initialized (missing keys). Alert prepared but not deployed.`);
        }

        // Prepare social signal
        await prepareSocialPost(alertDispatch);
    }
}

processAlerts();
