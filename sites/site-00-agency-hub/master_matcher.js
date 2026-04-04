const fs = require('fs');

const MarvinMedia_PUB_ID = '1595486';
const HUB_NICHES = {
    "saas": ["Jasper", "Copy.ai", "Canva", "Wix", "Fiverr", "Create", "UKHost4u", "Hostinger", "Bluehost", "Shopify", "Squarespace", "Adobe", "Microsoft", "Mailchimp", "Constant Contact", "HubSpot", "Zendesk", "Slack", "Zoom", "Dropbox"],
    "pet": ["Zooplus", "Tail", "Petplan", "Viovet", "Animed", "Monster Pet", "Barks", "PitPat", "Petmeds", "Pet Drugs", "Fetch", "Pets at Home", "Chewy", "BarkBox"],
    "fintech": ["Revolut", "Wise", "Hiscox", "RAC", "The AA", "Quote", "Money", "Trading", "Currency", "Insurance", "Savings", "Credit", "Pension", "Klarna", "Monzo", "Tide"],
    "travel": ["Travelodge", "Expedia", "Opodo", "Park Holidays", "Warner Hotels", "Booking", "Skyscanner", "First Choice", "TUI", "Hotels.com", "Agoda", "Trip", "Easyjet", "Ryanair", "Airbnb", "Europcar"],
    "gaming": ["Zavvi", "Entertainer", "G2A", "CDKeys", "Currys", "Computeruniverse", "Game", "Nintendo", "Razer", "Logitech", "SteelSeries", "Origin", "Epic", "Steam", "Xbox", "PlayStation"],
    "vpn": ["NordVPN", "ExpressVPN", "PureVPN", "Surfshark", "CyberGhost", "Private Internet", "Hotspot", "Proton", "IPVanish", "Windscribe", "TunnelBear"],
    "wfh": ["Herman Miller", "Fully", "IKEA", "Ryman", "Office Depot", "Staples", "Moo", "Dell", "HP", "Apple", "Lenovo", "Logitech", "Steelcase"],
    "outdoor": ["Go Outdoors", "Bever", "Decathlon", "North Face", "Black Diamond", "Brisks", "Cotswold", "Snow and Rock", "Mountain Warehouse", "Millets", "Patagonia", "Columbia"],
    "smarthome": ["Appliance City", "The Range", "Currys", "Ao.com", "Ring", "Hue", "Hive", "Tado", "Blink", "Arlo", "Nest", "Ecovacs"],
    "aiproductivity": ["OpenAI", "Anthropic", "Zapier", "Midjourney", "Notion", "Airtable", "ClickUp", "Monday", "Trello", "Asana", "CoPilot", "Bard"],
    "fashion": ["Fairfax", "Farfetch", "Mytheresa", "MatchesFashion", "Net-a-Porter", "Selfridges", "Harvey Nichols", "LVMH", "Burberry", "Gucci", "Prada", "ASOS", "Nike", "Adidas", "H&M", "Zara", "Zalando", "Shein"],
    "electronics": ["NVIDIA", "ASUS", "MSI", "Gigabyte", "Logitech", "Razer", "Corsair", "Intel", "AMD", "EVGA", "Western Digital", "Samsung", "Sony", "Dell", "HP", "Acer"]
};

async function mapPrograms() {
    console.log("🧩 Executing Master Matcher (MarvinMedia -> Marvin Media)...");
    try {
        const directory = JSON.parse(fs.readFileSync('MarvinMedia_full_directory.json', 'utf8'));
        const matches = {};

        Object.entries(HUB_NICHES).forEach(([niche, keywords]) => {
            matches[niche] = [];
            keywords.forEach(keyword => {
                const found = directory.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()));
                found.forEach(p => {
                    matches[niche].push({
                        id: p.id,
                        name: p.name,
                        region: p.region,
                        trackingUrl: `https://www.awin1.com/cread.php?awinmid=${p.id}&awinaffid=${MarvinMedia_PUB_ID}&clickref=marvin_${niche}`
                    });
                });
            });
        });

        fs.writeFileSync('MarvinMedia_niche_matches.json', JSON.stringify(matches, null, 2));
        
        let total = 0;
        Object.keys(matches).forEach(niche => {
            console.log(`✅ Niche [${niche}]: Found ${matches[niche].length} potential partners.`);
            total += matches[niche].length;
        });

        console.log(`\n🚀 TOTAL SYNERGY MATCHES: ${total}`);

    } catch (error) {
        console.error("❌ Mapping Error:", error.message);
    }
}

mapPrograms();
