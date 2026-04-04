const axios = require('axios');
const fs = require('fs');

const API_KEY = '6975f078-a13b-4265-b772-76b99ea46fd6';
const PUB_ID = '2834344';

async function fetchProgramStatuses() {
    console.log("📡 Fetching Awin Program Statuses...");
    try {
        const response = await axios.get(`https://api.awin.com/publishers/${PUB_ID}/programmes`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            params: { relationship: 'joined' }
        });

        const pendingResponse = await axios.get(`https://api.awin.com/publishers/${PUB_ID}/programmes`, {
            headers: { 'Authorization': `Bearer ${API_KEY}` },
            params: { relationship: 'pending' }
        });

        const data = {
            joined: response.data.map(p => ({ id: p.id, name: p.name, displayUrl: p.displayUrl })),
            pending: pendingResponse.data.map(p => ({ id: p.id, name: p.name, displayUrl: p.displayUrl }))
        };

        fs.writeFileSync('awin_status_report.json', JSON.stringify(data, null, 2));
        console.log(`✅ Success! Joined: ${data.joined.length}, Pending: ${data.pending.length}`);
        
        if (data.joined.length > 0) {
            console.log("\n[JOINED PARTNERS]:");
            data.joined.forEach(p => console.log(`- ${p.name} (${p.id})`));
        }

    } catch (error) {
        console.error("❌ API Error:", error.response ? error.response.data : error.message);
    }
}

fetchProgramStatuses();
