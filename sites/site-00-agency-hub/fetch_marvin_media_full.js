const fs = require('fs');

const TOKEN = '4f17535e-238f-4921-a7d5-bc5bb24de21f';
const PUB_ID = '1595486';

async function fetchFullDirectory() {
    console.log("📡 Fetching Full MarvinMedia Directory (1588 programs)...");
    try {
        const response = await fetch(`https://api.awin.com/publishers/${PUB_ID}/programmes?relationship=joined`, {
            headers: { 'Authorization': `Bearer ${TOKEN}` }
        });
        const joined = await response.json();

        if (!Array.isArray(joined)) {
            console.error("❌ Invalid response:", joined);
            return;
        }

        const data = joined.map(p => ({
            id: p.id,
            name: p.name,
            displayUrl: p.displayUrl,
            region: p.primaryRegion?.name || 'Unknown',
            description: p.description || ''
        }));

        fs.writeFileSync('MarvinMedia_full_directory.json', JSON.stringify(data, null, 2));
        console.log(`✅ Success! Saved ${data.length} programs to MarvinMedia_full_directory.json`);

    } catch (error) {
        console.error("❌ Fetch Error:", error.message);
    }
}

fetchFullDirectory();
