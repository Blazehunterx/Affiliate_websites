const https = require('https');
const fs = require('fs');
const path = require('path');

const API_CONFIG = {
    token: '6975f078-a13b-4265-b772-76b99ea46fd6',
    publisherId: '2834344'
};

const MATCH_FILE = path.join(__dirname, 'awin_matches_by_hub.json');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function joinProgram(programId, hubName) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            promotionDescription: `Marvin Sluis Media Group is a premium publisher network with 10 specialized hubs reaching over 100k monthly users in UK, NL, and DE. We wish to promote your brand on our authorized ${hubName.toUpperCase()} property: https://marvinsluis-media.pages.dev/${hubName.toLowerCase()}`
        });

        const options = {
            hostname: 'api.awin.com',
            path: `/publishers/${API_CONFIG.publisherId}/programmes/${programId}/join`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.token}`,
                'Content-Type': 'application/json',
                'Content-Length': payload.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 204 || res.statusCode === 200 || res.statusCode === 201) {
                    console.log(`[+] [${hubName}] Joined Successfully: ${programId}`);
                    resolve(true);
                } else {
                    console.error(`[!] [${hubName}] Failed to join ${programId}: ${res.statusCode}`);
                    console.log('Response:', data);
                    resolve(false);
                }
            });
        });

        req.on('error', (e) => {
            console.error(`[!] Request Error for ${programId}:`, e.message);
            resolve(false);
        });

        req.write(payload);
        req.end();
    });
}

async function executeAutoJoin() {
    try {
        if (!fs.existsSync(MATCH_FILE)) {
            console.error('[!] Match file not found!');
            return;
        }

        const matches = JSON.parse(fs.readFileSync(MATCH_FILE, 'utf-8'));
        let count = 0;

        for (const [hub, programs] of Object.entries(matches)) {
            console.log(`\n[*] Starting Join Wave for Hub: ${hub.toUpperCase()}...`);
            
            // Join up to 10 programs per hub
            const targets = programs.slice(0, 10);
            
            for (const program of targets) {
                console.log(`[*] Requesting Join: ${program.name} (ID: ${program.id})...`);
                await joinProgram(program.id, hub);
                count++;

                // Awin Throttling: 20 calls/min. 
                // We'll wait 5 seconds between each call to be safe (12 calls/min).
                console.log(`[*] Throttling... (Waiting 5s)`);
                await sleep(5000);
            }
        }

        console.log(`\n[COMPLETE] Sent ${count} join requests across the network.`);

    } catch (error) {
        console.error('[!] Auto-Join Failed:', error.message);
    }
}

executeAutoJoin();
