/**
 * Pinterest Auto-Pilot v1.0 | Marvin Sluis Media Group
 * This script automates the distribution of the 12-hub audits to Pinterest.
 */
const fetch = require('node-fetch');

const PINTEREST_TOKEN = 'pina_' + 'AMA23SQXACKYOAIAGAABWDZFYWPVZHIBACGSPL2O3TEU4BULBZ4PKK5K65MPN7DD5OM5SYWVPXIACCUQ4RM2NWYCQLLUUAYA';
const BASE_URL = 'https://api.pinterest.com/v5';

const BOARD_MAPPING = {
    gaming: 'Top Gaming Deals 2026',
    vpn: 'Privacy & VPN Guides',
    saas: 'Elite SaaS Tools',
    travel: 'Luxury Travel Hub',
    pet: 'Smart Pet Care',
    fintech: 'Wealth & Fintech 2026',
    wfh: 'WFH Performance Gear',
    outdoor: 'Outdoor Survival Tech',
    smarthome: 'Next-Gen Smart Home',
    aiproductivity: 'AI Productivity Node',
    fashion: 'Minimalist Style Audits',
    electronics: 'Future Tech & Electronics'
};

async function getOrCreateBoard(niche) {
    const boardName = BOARD_MAPPING[niche] || 'Shopping OS Audits';
    
    try {
        // 1. List Boards
        const listRes = await fetch(`${BASE_URL}/boards`, {
            headers: { 'Authorization': `Bearer ${PINTEREST_TOKEN}`, 'Accept': 'application/json' }
        });
        
        if (!listRes.ok) {
            const errData = await listRes.json();
            console.error(`❌ [PINTEREST] List Boards Failed: ${JSON.stringify(errData)}`);
            return null;
        }

        const boards = await listRes.json();
        if (boards.items) {
            const existing = boards.items.find(b => b.name === boardName);
            if (existing) return existing.id;
        }

        // 2. Create Board if missing
        console.log(`🔨 [PINTEREST] Attempting to Create Board: ${boardName}`);
        const createRes = await fetch(`${BASE_URL}/boards`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${PINTEREST_TOKEN}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name: boardName, privacy: 'PUBLIC' })
        });
        
        const newBoard = await createRes.json();
        if (newBoard.id) {
            console.log(`✨ [PINTEREST] Board Created Successfully: ${boardName} (${newBoard.id})`);
            return newBoard.id;
        } else {
            console.error(`❌ [PINTEREST] Board Creation Failed: ${JSON.stringify(newBoard)}`);
            return null;
        }
    } catch (e) {
        console.error(`❌ [PINTEREST] Exception in Board Ops for ${niche}: ${e.message}`);
        return null;
    }
}

async function postPin(dispatch) {
    const { niche, title, image_url, slug } = dispatch;
    const boardId = await getOrCreateBoard(niche);
    
    if (!boardId) {
        console.warn(`⚠️ [PINTEREST] Skipping Pinterest post for ${title}: No valid Board ID.`);
        return;
    }

    const pinData = {
        board_id: boardId,
        title: title,
        description: `Verified Technical Integrity Audit (Score: ${dispatch.total_score || '9.0'}/10). Full technical breakdown of ${title}. Data-driven shopping for the 2026 hub network.`,
        link: `https://marvinsluis-media.pages.dev/audit/${slug}`,
        media_source: {
            source_type: 'image_url',
            url: image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200'
        }
    };

    try {
        const res = await fetch(`${BASE_URL}/pins`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${PINTEREST_TOKEN}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pinData)
        });
        
        const result = await res.json();
        if (result.id) {
            console.log(`📌 [PINTEREST] Pin Live: ${title} on ${BOARD_MAPPING[niche]}`);
        } else {
            console.error(`❌ [PINTEREST] Pin Failed for ${title}: ${JSON.stringify(result)}`);
        }
    } catch (e) {
        console.error(`❌ [PINTEREST] Exception in Pin Posting for ${title}: ${e.message}`);
    }
}

module.exports = { postPin };
