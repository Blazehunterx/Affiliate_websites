const fs = require('fs');
const path = require('path');

const DIRECTORY_PATH = path.join(__dirname, 'awin_programs_directory.json');

const NICHE_MAP = {
    'SaaS': ['Web Hosting', 'Software & Downloads', 'Business Services (B2B)', 'IT & Computing'],
    'Pet': ['Pets & Animals', 'Vet & Animal Health'],
    'Fintech': ['Finance & Insurance', 'Banks', 'Crypto', 'Investment'],
    'VPN': ['Web Hosting', 'Software & Downloads', 'Computing'],
    'Travel': ['Travel', 'Hotels', 'Flights', 'Car Hire'],
    'Gaming': ['Gaming & Desktop Entertainment', 'Software & Downloads', 'Toys & Games'],
    'WFH': ['Office Supplies', 'Furniture', 'Computing'],
    'Outdoor': ['Sports & Outdoors', 'Camping', 'Fashion'],
    'Smart Home': ['Home & Garden', 'Security', 'Lighting'],
    'AI': ['Software & Downloads', 'Web Hosting', 'Computing']
};

const PRIORITY_REGIONS = ['United Kingdom', 'Netherlands', 'Germany', 'Belgium'];

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

            // Niche Matching
            for (const [niche, sectors] of Object.entries(NICHE_MAP)) {
                if (sectors.some(s => sector.includes(s) || (p.description && p.description.includes(s)))) {
                    const hubSlug = niche.toLowerCase().replace(' ', '');
                    if (matchesByHub[hubSlug] && matchesByHub[hubSlug].length < 10) {
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
        console.log('\n--- MATCH SUMMARY ---');
        for (const [hub, items] of Object.entries(matchesByHub)) {
            console.log(`- ${hub.toUpperCase()}: ${items.length} top matches found.`);
        }

    } catch (error) {
        console.error('[!] Analysis Failed:', error.message);
    }
}

analyzeMatches();
