const fs = require('fs');

const API_KEY = '6975f078-a13b-4265-b772-76b99ea46fd6';
const PUB_ID = '2834344';

async function fetchTrackingLinks() {
    console.log("🔗 Generating Live Tracking Links...");
    try {
        const report = JSON.parse(fs.readFileSync('awin_status_report.json', 'utf8'));
        const joinedLinks = [];

        for (const p of report.joined) {
            console.log(`   Fetching link for: ${p.name} (${p.id})...`);
            
            // Get link details
            const response = await fetch(`https://api.awin.com/publishers/${PUB_ID}/programmes/${p.id}/details`, {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            });
            const details = await response.json();
            
            // Note: Awin usually provides a default tracking link
            // If not directly in details, we construct it using the standard pattern:
            // https://www.awin1.com/cread.php?awinmid={mid}&awinaffid={pubid}&p=
            const trackingUrl = `https://www.awin1.com/cread.php?awinmid=${p.id}&awinaffid=${PUB_ID}&p=`;
            
            joinedLinks.push({
                id: p.id,
                name: p.name,
                url: trackingUrl
            });
        }

        fs.writeFileSync('awin_live_links.json', JSON.stringify(joinedLinks, null, 2));
        console.log(`✅ Success! Generated ${joinedLinks.length} live links.`);

    } catch (error) {
        console.error("❌ Link Generation Error:", error.message);
    }
}

fetchTrackingLinks();
