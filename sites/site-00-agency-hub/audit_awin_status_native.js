const fs = require('fs');

const API_KEY = '6975f078-a13b-4265-b772-76b99ea46fd6';
const PUB_ID = '2834344';

async function fetchProgramStatuses() {
    console.log("📡 Fetching Awin Program Statuses (Native Fetch)...");
    try {
        const response = await fetch(`https://api.awin.com/publishers/${PUB_ID}/programmes?relationship=joined`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        const joined = await response.json();

        const pendingResponse = await fetch(`https://api.awin.com/publishers/${PUB_ID}/programmes?relationship=pending`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` }
        });
        const pending = await pendingResponse.json();

        const data = {
            joined: joined.map(p => ({ id: p.id, name: p.name, displayUrl: p.displayUrl })),
            pending: pending.map(p => ({ id: p.id, name: p.name, displayUrl: p.displayUrl }))
        };

        fs.writeFileSync('awin_status_report.json', JSON.stringify(data, null, 2));
        console.log(`✅ Success! Joined: ${data.joined.length}, Pending: ${data.pending.length}`);
        
        if (data.joined.length > 0) {
            console.log("\n[JOINED PARTNERS]:");
            data.joined.forEach(p => console.log(`- ${p.name} (${p.id})`));
        }

    } catch (error) {
        console.error("❌ API Error:", error.message);
    }
}

fetchProgramStatuses();
