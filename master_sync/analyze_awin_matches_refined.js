const fs = require('fs');
const path = require('path');

const DIRECTORY_PATH = path.join(__dirname, 'awin_programs_directory.json');

const HUB_MAPPING = {
    'saas': ['Web Hosting', 'Software & Downloads', 'Business Services (B2B)', 'IT & Computing', 'SaaS'],
    'pet': ['Pets & Animals', 'Vet & Animal Health', 'Pet ', 'Dog ', 'Cat ', 'Animal'],
    'fintech': ['Finance & Insurance', 'Banks', 'Crypto', 'Investment', 'Fintech', 'Insurance'],
    'vpn': ['Web Hosting', 'Software & Downloads', 'Computing', 'VPN', 'Privacy', 'Security'],
    'travel': ['Travel', 'Hotels', 'Flights', 'Car Hire', 'Holiday', 'Tours'],
    'gaming': ['Gaming & Desktop Entertainment', 'Software & Downloads', 'Toys & Games', 'Gaming', 'Esports'],
    'wfh': ['Office Supplies', 'Furniture', 'Computing', 'Remote Work', 'Monitor'],
    'outdoor': ['Sports & Outdoors', 'Camping', 'Fashion', 'Outdoor', 'Hiking'],
    'smarthome': ['Home & Garden', 'Security', 'Lighting', 'Smart Home', 'Automation'],
    'aiproductivity': ['Software & Downloads', 'Web Hosting', 'Computing', 'AI ', 'Artificial Intelligence', 'Productivity']
};

async function analyzeMatches() {
    try {
        console.log(`[*] Loading Awin Directory (${DIRECTORY_PATH})...`);
        const data = fs.readFileSync(DIRECTORY_PATH, 'utf-8');
        const programs = JSON.parse(data);
        console.log(`[*] Processing ${programs.length} programs...`);

        const matchesByHub = {
            'saas': [], 'pet': [], 'fintech': [], 'vpn': [], 'travel': [],
            'gaming': [], 'wfh': [], 'outdoor': [], 'smarthome': [], 'aiproductivity': []
        };

        programs.forEach(p => {
            if (p.status !== 'Active') return;
            
            const region = p.primaryRegion ? p.primaryRegion.name : 'Unknown';
            const sector = p.primarySector || '';
            const desc = p.description || '';

            // Niche Matching
            for (const [hubSlug, keywords] of Object.entries(HUB_MAPPING)) {
                if (keywords.some(k => sector.includes(k) || desc.includes(k))) {
                    if (matchesByHub[hubSlug].length < 15) {
                        matchesByHub[hubSlug].push({
                            id: p.id,
                            name: p.name,
                            sector: sector,
                            region: region,
                            url: p.displayUrl
                        });
                    }
                }
            }
        });

        const outputPath = path.join(__dirname, 'awin_matches_by_hub.json');
        fs.writeFileSync(outputPath, JSON.stringify(matchesByHub, null, 2));
        console.log(`[+] Success! Match report saved to: ${outputPath}`);
        
        // Print Summary
        console.log('\n--- REFINED MATCH SUMMARY ---');
        for (const [hub, items] of Object.entries(matchesByHub)) {
            console.log(`- ${hub.toUpperCase()}: ${items.length} top matches found.`);
        }

    } catch (error) {
        console.error('[!] Analysis Failed:', error.message);
    }
}

analyzeMatches();
